#!/usr/bin/env python3
"""Régénère data/apps.js à partir de apps.config.json et de l'API GitHub.

Pour chaque app : dernière release (pré-versions comprises), liens directs
vers les fichiers, notes de version, et copie locale du logo et des captures.

    python tools/update_store.py            # met à jour les données
    python tools/update_store.py --refresh  # retélécharge aussi les images

Variable optionnelle : GITHUB_TOKEN (évite la limite de 60 requêtes/heure).
"""

import json
import os
import re
import struct
import sys
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CONFIG = ROOT / "apps.config.json"
OUT = ROOT / "data" / "apps.js"
ASSETS = ROOT / "assets" / "apps"
REFRESH = "--refresh" in sys.argv

_cache = {}


def http(url, raw=False):
    if url in _cache:
        return _cache[url]
    headers = {"User-Agent": "store-updater", "Accept": "application/vnd.github+json"}
    token = os.environ.get("GITHUB_TOKEN")
    if token and "api.github.com" in url:
        headers["Authorization"] = f"Bearer {token}"
    with urllib.request.urlopen(urllib.request.Request(url, headers=headers), timeout=30) as r:
        body = r.read()
    result = body if raw else json.loads(body.decode("utf-8"))
    _cache[url] = result
    return result


def repo_info(repo):
    return http(f"https://api.github.com/repos/{repo}")


def releases(repo):
    rels = [r for r in http(f"https://api.github.com/repos/{repo}/releases?per_page=20") if not r["draft"]]
    return sorted(rels, key=lambda r: r["published_at"], reverse=True)


def image_size(data):
    """Renvoie (largeur, hauteur) pour PNG, JPEG ou WEBP, sinon None."""
    try:
        if data[:8] == b"\x89PNG\r\n\x1a\n":
            return struct.unpack(">II", data[16:24])
        if data[:2] == b"\xff\xd8":
            i = 2
            while i < len(data):
                if data[i] != 0xFF:
                    i += 1
                    continue
                marker = data[i + 1]
                if marker in (0xC0, 0xC1, 0xC2):
                    h, w = struct.unpack(">HH", data[i + 5:i + 9])
                    return w, h
                i += 2 + struct.unpack(">H", data[i + 2:i + 4])[0]
        if data[:4] == b"RIFF" and data[8:12] == b"WEBP":
            chunk = data[12:16]
            if chunk == b"VP8X":
                return 1 + int.from_bytes(data[24:27], "little"), 1 + int.from_bytes(data[27:30], "little")
            if chunk == b"VP8 ":
                w, h = struct.unpack("<HH", data[26:30])
                return w & 0x3FFF, h & 0x3FFF
            if chunk == b"VP8L":
                b = int.from_bytes(data[21:25], "little")
                return (b & 0x3FFF) + 1, ((b >> 14) & 0x3FFF) + 1
    except (struct.error, IndexError):
        pass
    return None


def fetch_image(repo, path, dest_stem):
    """Copie un fichier du dépôt dans assets/apps/ et renvoie {src, w, h}."""
    ext = Path(path).suffix.lower()
    dest = dest_stem.with_suffix(ext)
    if REFRESH or not dest.exists():
        branch = repo_info(repo)["default_branch"]
        data = http(f"https://raw.githubusercontent.com/{repo}/{branch}/{path}", raw=True)
        dest.parent.mkdir(parents=True, exist_ok=True)
        dest.write_bytes(data)
        print(f"  ↓ {path}")
    item = {"src": dest.relative_to(ROOT).as_posix()}
    size = image_size(dest.read_bytes())
    if size:
        item["w"], item["h"] = size
    return item


def clean_notes(md):
    """Retire des notes la section « Télécharger » et les liens « Sources au tag »."""
    md = md.replace("\r\n", "\n")
    md = re.sub(r"(?ms)^##+\s*Télécharger\s*\n.*?(?=^##|\Z)", "", md)
    md = re.sub(r"(?m)^\[Sources au tag\]\(.*?\)\s*$", "", md)
    return re.sub(r"\n{3,}", "\n\n", md).strip()


def changelog_notes(repo):
    branch = repo_info(repo)["default_branch"]
    text = http(f"https://raw.githubusercontent.com/{repo}/{branch}/CHANGELOG.md", raw=True).decode("utf-8")
    m = re.search(r"(?ms)^## (.+?)\n(.*?)(?=^## |\Z)", text)
    return m.group(2).strip() if m else ""


def resolve_download(app, dl, main_rels):
    repo = dl.get("repo", app["repo"])
    if dl.get("source") == "tag-zip":
        tag = main_rels[0]["tag_name"]
        return {
            "url": f"https://github.com/{repo}/archive/refs/tags/{tag}.zip",
            "file": f"{app['name']}-{tag}.zip",
            "version": tag,
            "size": None,
        }
    pattern = re.compile(dl["match"])
    for rel in releases(repo):
        for asset in rel["assets"]:
            if pattern.search(asset["name"]):
                return {
                    "url": asset["browser_download_url"],
                    "file": asset["name"],
                    "version": rel["tag_name"],
                    "size": asset["size"],
                    "count": asset["download_count"],
                }
    raise SystemExit(f"Aucun fichier ne correspond à {dl['match']} dans {repo}")


def build_app(app):
    print(f"• {app['name']}")
    repo = app["repo"]
    info = repo_info(repo)
    rels = releases(repo)
    latest = rels[0]
    folder = ASSETS / app["id"]

    logo = app["logo"]
    logo_repo, logo_path = (logo["repo"], logo["path"]) if isinstance(logo, dict) else (repo, logo)

    notes = changelog_notes(repo) if app.get("notesFrom") == "changelog" else clean_notes(latest.get("body") or "")

    downloads = []
    for dl in app["downloads"]:
        resolved = resolve_download(app, dl, rels)
        downloads.append(dl | resolved)

    out = {k: app[k] for k in ("id", "name", "category", "tagline", "description", "highlights") if k in app}
    out |= {
        "notesFrom": app.get("notesFrom"),
        "beta": bool(app.get("beta")),
        "notice": app.get("notice"),
        "repo": repo,
        "url": info["html_url"],
        "license": (info.get("license") or {}).get("spdx_id") if info.get("license") else None,
        "language": info.get("language"),
        "stars": info.get("stargazers_count", 0),
        "version": latest["tag_name"],
        "releaseName": latest["name"] or latest["tag_name"],
        "releaseUrl": latest["html_url"],
        "date": latest["published_at"],
        "notes": notes,
        "logo": fetch_image(logo_repo, logo_path, folder / "logo")
        | {k: app[k] for k in ("logoScale", "logoBg", "logoPad") if k in app},
        "screenshots": [
            fetch_image(repo, p, folder / f"shot-{i:02d}") for i, p in enumerate(app.get("screenshots", []), 1)
        ],
        "downloads": downloads,
    }
    if out["license"] == "NOASSERTION":
        out["license"] = None
    return out


def main():
    config = json.loads(CONFIG.read_text(encoding="utf-8"))
    data = {
        "store": config["store"],
        "generated": datetime.now(timezone.utc).isoformat(timespec="seconds"),
        "apps": [build_app(a) for a in config["apps"]],
    }
    OUT.parent.mkdir(parents=True, exist_ok=True)
    payload = json.dumps(data, ensure_ascii=False, indent=2)
    OUT.write_text(f"// Généré par tools/update_store.py — ne pas modifier à la main.\nwindow.STORE_DATA = {payload};\n", encoding="utf-8")
    print(f"✓ {OUT.relative_to(ROOT)} ({len(data['apps'])} apps)")


if __name__ == "__main__":
    main()
