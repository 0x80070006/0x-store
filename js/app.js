(() => {
  "use strict";

  const DATA = window.STORE_DATA;
  const APPS = DATA.apps;
  const $ = (sel, root = document) => root.querySelector(sel);

  /* ---------- Icons ---------- */
  const svg = (body, extra = "") => `<svg aria-hidden="true" viewBox="0 0 24 24" ${extra}>${body}</svg>`;
  const ICON = {
    android: svg('<path d="M3.5 18a8.5 8.5 0 0 1 17 0z"/><path d="M7 9.5 5.2 6.5M17 9.5l1.8-3"/><circle cx="8.6" cy="14.2" r="1.1" fill="currentColor" stroke="none"/><circle cx="15.4" cy="14.2" r="1.1" fill="currentColor" stroke="none"/>'),
    windows: svg('<path d="M3.5 5.6 10.5 4.6v6.9h-7zM13 4.3l7.5-1.1v8.3H13zM3.5 13h7v6.9l-7-1zM13 13h7.5v8.3L13 20.2z" fill="currentColor" stroke="none"/>'),
    linux: svg('<rect x="3" y="4" width="18" height="13" rx="2"/><path d="m7 9 2.5 2L7 13M12 13h4M9 20.5h6"/>'),
    download: svg('<path d="M12 4v11M7 10.5l5 5 5-5M5 20h14"/>'),
    github: svg('<path d="M12 2.5a9.5 9.5 0 0 0-3 18.5c.5.1.7-.2.7-.5v-1.7c-2.7.6-3.3-1.2-3.3-1.2-.4-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.6.3-1.1.6-1.3-2.1-.2-4.4-1.1-4.4-4.7 0-1 .4-1.9 1-2.6-.1-.2-.4-1.2.1-2.5 0 0 .8-.3 2.6 1a9 9 0 0 1 4.8 0c1.8-1.3 2.6-1 2.6-1 .5 1.3.2 2.3.1 2.5.6.7 1 1.6 1 2.6 0 3.7-2.3 4.5-4.4 4.7.3.3.7.9.7 1.8v2.7c0 .3.2.6.7.5A9.5 9.5 0 0 0 12 2.5Z" fill="currentColor" stroke="none"/>'),
    check: svg('<path d="m5 12.5 4.5 4.5L19 7.5"/>'),
    info: svg('<circle cx="12" cy="12" r="9"/><path d="M12 11v5.5M12 7.5v.01"/>'),
    chevron: svg('<path d="m6 9 6 6 6-6"/>'),
    prev: svg('<path d="m15 5-7 7 7 7"/>'),
    next: svg('<path d="m9 5 7 7-7 7"/>'),
    external: svg('<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>'),
  };
  const PLATFORM_LABEL = { android: "Android", windows: "Windows", linux: "Linux" };

  /* ---------- Helpers ---------- */
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

  const formatSize = (bytes) => {
    if (!bytes) return "";
    const mb = bytes / 1048576;
    return mb >= 1 ? `${mb.toLocaleString("fr-FR", { maximumFractionDigits: 1 })} Mo` : `${Math.max(1, Math.round(bytes / 1024))} Ko`;
  };
  const formatDate = (iso) => new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" });
  const rtf = new Intl.RelativeTimeFormat("fr", { numeric: "auto" });
  const relative = (iso) => {
    const days = Math.round((new Date(iso) - Date.now()) / 86400000);
    if (Math.abs(days) < 30) return rtf.format(days, "day");
    if (Math.abs(days) < 365) return rtf.format(Math.round(days / 30), "month");
    return rtf.format(Math.round(days / 365), "year");
  };

  const userPlatform = (() => {
    const ua = navigator.userAgent;
    if (/Android/i.test(ua)) return "android";
    if (/Windows/i.test(ua)) return "windows";
    if (/Linux|X11/i.test(ua)) return "linux";
    return null;
  })();

  APPS.forEach((app) => {
    app.platforms = [...new Set(app.downloads.flatMap((d) => d.platform.split(" ")))];
  });

  const primaryDownload = (app) =>
    app.downloads.find((d) => d.platform.split(" ").includes(userPlatform)) || app.downloads[0];

  const platformIcon = (platform) => ICON[platform.split(" ")[0]] || ICON.download;

  const appIcon = (app, extraClass = "") => {
    const { src, w, h, logoScale, logoBg, logoPad } = app.logo;
    const style = [];
    if (logoBg) style.push(`background:${logoBg}`);
    if (logoPad) style.push(`padding:${logoPad * 100}%`);
    const imgStyle = logoScale ? ` style="transform:scale(${logoScale})"` : "";
    const cls = `app-icon${logoPad ? " app-icon--padded" : ""} ${extraClass}`.trim();
    return `<span class="${cls}"${style.length ? ` style="${style.join(";")}"` : ""}><img src="${esc(src)}" alt="" ${w ? `width="${w}" height="${h}"` : ""} loading="lazy" decoding="async"${imgStyle}></span>`;
  };

  /* ---------- Minimal Markdown (release notes) ---------- */
  function inline(text, base) {
    const parts = text.split(/(`[^`]+`)/g);
    return parts.map((part) => {
      if (/^`[^`]+`$/.test(part)) return `<code>${esc(part.slice(1, -1))}</code>`;
      let s = esc(part);
      s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, label, href) => {
        const url = /^https?:\/\//.test(href) ? href : `${base}/${href.replace(/^\.?\//, "")}`;
        return `<a href="${url}" target="_blank" rel="noopener">${label}</a>`;
      });
      s = s.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
      s = s.replace(/(^|[^*\w])\*([^*\s][^*]*?)\*(?!\w)/g, "$1<em>$2</em>");
      return s;
    }).join("");
  }

  function markdown(src, base) {
    const lines = src.replace(/\r/g, "").split("\n");
    const out = [];
    const listRe = /^(\s*)([-*+]|\d+[.)])\s+(.*)$/;
    let i = 0;
    while (i < lines.length) {
      const line = lines[i];
      if (!line.trim()) { i++; continue; }

      if (/^```/.test(line)) {
        const code = [];
        for (i++; i < lines.length && !/^```/.test(lines[i]); i++) code.push(lines[i]);
        i++;
        out.push(`<pre><code>${esc(code.join("\n"))}</code></pre>`);
        continue;
      }
      const heading = line.match(/^(#{1,6})\s+(.*)$/);
      if (heading) {
        const level = Math.min(heading[1].length + 1, 4);
        out.push(`<h${level}>${inline(heading[2], base)}</h${level}>`);
        i++;
        continue;
      }
      if (/^\s*>/.test(line)) {
        const quote = [];
        for (; i < lines.length && /^\s*>/.test(lines[i]); i++) quote.push(lines[i].replace(/^\s*>\s?/, ""));
        out.push(`<blockquote>${markdown(quote.join("\n"), base)}</blockquote>`);
        continue;
      }
      if (/^\s*\|/.test(line) && /^\s*\|?\s*:?-{2,}/.test(lines[i + 1] || "")) {
        const cells = (l) => l.trim().replace(/^\||\|$/g, "").split("|").map((c) => inline(c.trim(), base));
        const head = cells(line);
        const rows = [];
        for (i += 2; i < lines.length && /^\s*\|/.test(lines[i]); i++) rows.push(cells(lines[i]));
        out.push(`<table><thead><tr>${head.map((c) => `<th>${c}</th>`).join("")}</tr></thead><tbody>${rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join("")}</tr>`).join("")}</tbody></table>`);
        continue;
      }
      if (listRe.test(line)) {
        const items = [];
        for (; i < lines.length; i++) {
          const m = lines[i].match(listRe);
          if (m) items.push({ indent: m[1].length, ordered: /\d/.test(m[2]), text: m[3] });
          else if (lines[i].trim() && /^\s+/.test(lines[i]) && items.length) items[items.length - 1].text += " " + lines[i].trim();
          else break;
        }
        let html = "";
        const stack = [];
        for (const item of items) {
          while (stack.length && item.indent < stack[stack.length - 1].indent) html += `</li></${stack.pop().tag}>`;
          const top = stack[stack.length - 1];
          if (!top || item.indent > top.indent) {
            const tag = item.ordered ? "ol" : "ul";
            stack.push({ indent: item.indent, tag });
            html += `<${tag}>`;
          } else {
            html += "</li>";
          }
          html += `<li>${inline(item.text, base)}`;
        }
        while (stack.length) html += `</li></${stack.pop().tag}>`;
        out.push(html);
        continue;
      }
      const para = [];
      for (; i < lines.length && lines[i].trim() && !/^(#{1,6}\s|```|\s*>|\s*\|)/.test(lines[i]) && !listRe.test(lines[i]); i++) para.push(lines[i].trim());
      out.push(`<p>${inline(para.join(" "), base)}</p>`);
    }
    return out.join("\n");
  }

  /* ---------- Hero ---------- */
  function renderHero() {
    const app = APPS.find((a) => a.id === DATA.store.featured) || APPS[0];
    const dl = primaryDownload(app);
    const shot = app.screenshots.find((s) => s.w > s.h) || app.screenshots[0];
    $("#hero").innerHTML = `
      <div class="hero__card">
        <div>
          <p class="hero__kicker">À la une · ${esc(app.category)}</p>
          <div class="hero__title">${appIcon(app)}<h1>${esc(app.name)}</h1></div>
          <p class="hero__tagline">${esc(app.tagline)}</p>
          <p class="hero__meta">${esc(app.version)} · ${app.platforms.map((p) => PLATFORM_LABEL[p]).join(" · ")}${app.license ? ` · ${esc(app.license)}` : ""}</p>
          <div class="hero__actions">
            <a class="btn btn--primary" href="${esc(dl.url)}" title="${esc(dl.file)}">${ICON.download}Télécharger · ${esc(dl.kind)}</a>
            <a class="btn btn--ghost" href="#/${app.id}">Voir la fiche</a>
          </div>
        </div>
        ${shot ? `<button type="button" class="hero__shot" data-app="${app.id}" data-shot="${app.screenshots.indexOf(shot)}" aria-label="Agrandir la capture"><img src="${esc(shot.src)}" alt="Capture de ${esc(app.name)}" width="${shot.w}" height="${shot.h}"></button>` : ""}
        <div class="hero__stripes" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div>
      </div>`;
  }

  /* ---------- Grid ---------- */
  const state = { query: "", platform: "all" };

  function card(app) {
    const dl = primaryDownload(app);
    return `
      <li>
        <article class="card">
          ${appIcon(app)}
          <div class="card__head">
            <h3 class="card__name"><a href="#/${app.id}">${esc(app.name)}</a>${app.beta ? '<span class="badge">Bêta</span>' : ""}</h3>
            <p class="card__cat">${esc(app.category)}</p>
          </div>
          <p class="card__tagline">${esc(app.tagline)}</p>
          <div class="card__foot">
            <span class="platforms" title="${app.platforms.map((p) => PLATFORM_LABEL[p]).join(", ")}">${app.platforms.map((p) => ICON[p]).join("")}</span>
            <span class="card__version">${esc(app.version)}</span>
            <a class="btn btn--primary btn--sm" href="${esc(dl.url)}" title="${esc(dl.file)}${dl.size ? ` · ${formatSize(dl.size)}` : ""}">${ICON.download}${esc(dl.kind)}</a>
          </div>
        </article>
      </li>`;
  }

  function renderGrid() {
    const q = state.query.trim().toLowerCase();
    const list = APPS.filter((app) => {
      if (state.platform !== "all" && !app.platforms.includes(state.platform)) return false;
      if (!q) return true;
      return [app.name, app.category, app.tagline, app.description, ...app.highlights].join(" ").toLowerCase().includes(q);
    });
    $("#grid").innerHTML = list.map(card).join("");
    $("#empty").hidden = list.length > 0;
    $("#result-count").textContent = `${list.length} app${list.length > 1 ? "s" : ""} open source`;
  }

  /* ---------- Detail sheet ---------- */
  const sheet = $("#sheet");

  function downloadButton(dl, primary) {
    const meta = [dl.version, formatSize(dl.size), dl.hint].filter(Boolean).join(" · ");
    return `
      <a class="dl${primary ? " dl--primary" : ""}" href="${esc(dl.url)}" title="${esc(dl.file)}">
        <span class="dl__icon">${platformIcon(dl.platform)}</span>
        <span class="dl__text">
          <span class="dl__label">${esc(dl.label)}<b>${esc(dl.kind)}</b></span>
          <span class="dl__meta">${esc(meta)}</span>
        </span>
        <span class="dl__arrow">${ICON.download}</span>
      </a>`;
  }

  function renderDetail(app) {
    const primary = primaryDownload(app);
    const wide = app.screenshots.length && app.screenshots.every((s) => s.w > s.h);
    const base = `${app.url}/blob/HEAD`;
    const stats = [
      ["Version", app.version],
      ["Mise à jour", relative(app.date)],
      ["Licence", app.license || "Open source"],
      ["Code", app.language || "—"],
    ];
    $("#sheet-body").innerHTML = `
      <article class="detail">
        <header class="detail__head">
          ${appIcon(app)}
          <div>
            <h2 class="detail__title" id="sheet-title">${esc(app.name)}${app.beta ? '<span class="badge">Bêta</span>' : ""}</h2>
            <p class="detail__sub">${esc(app.category)} · ${app.platforms.map((p) => PLATFORM_LABEL[p]).join(", ")}</p>
          </div>
        </header>
        <p class="detail__tagline">${esc(app.tagline)}</p>

        <div class="downloads">${app.downloads.map((d) => downloadButton(d, d === primary)).join("")}</div>

        <dl class="stats">${stats.map(([k, v]) => `<div class="stat"><dt>${k}</dt><dd>${esc(v)}</dd></div>`).join("")}</dl>

        ${app.notice ? `<div class="notice">${ICON.info}<p>${esc(app.notice)}</p></div>` : ""}

        ${app.screenshots.length ? `
        <section class="section" aria-label="Captures d'écran">
          <h3>Aperçu</h3>
          <div class="shots${wide ? " shots--wide" : ""}">
            <button type="button" class="icon-btn shots__nav shots__nav--prev" data-scroll="-1" aria-label="Défiler vers la gauche" disabled>${ICON.prev}</button>
            <div class="shots__rail" tabindex="0">
              ${app.screenshots.map((s, i) => `<button type="button" class="shot" data-app="${app.id}" data-shot="${i}" aria-label="Agrandir la capture ${i + 1}"><img src="${esc(s.src)}" alt="Capture ${i + 1} de ${esc(app.name)}" width="${s.w}" height="${s.h}" decoding="async"></button>`).join("")}
            </div>
            <button type="button" class="icon-btn shots__nav shots__nav--next" data-scroll="1" aria-label="Défiler vers la droite">${ICON.next}</button>
          </div>
        </section>` : ""}

        <section class="section">
          <h3>À propos</h3>
          <div class="about">
            <p>${esc(app.description)}</p>
            <ul class="highlights">${app.highlights.map((h) => `<li>${ICON.check}<span>${esc(h)}</span></li>`).join("")}</ul>
          </div>
        </section>

        <section class="section">
          <details class="notes">
            <summary>
              <div>
                <p class="notes__title">Notes de version</p>
                <p class="notes__sub">${esc(app.releaseName)} · ${formatDate(app.date)}</p>
              </div>
              <span class="notes__chev">${ICON.chevron}</span>
            </summary>
            <div class="notes__body">
              <div class="md">${app.notes ? markdown(app.notes, base) : "<p>Pas de notes pour cette version.</p>"}</div>
              <p class="notes__foot"><a href="${esc(app.url)}/releases" target="_blank" rel="noopener">Historique complet des versions →</a></p>
            </div>
          </details>
        </section>

        <div class="detail__links">
          <a class="btn btn--ghost" href="${esc(app.url)}" target="_blank" rel="noopener">${ICON.github}Code source</a>
          <a class="btn btn--ghost" href="${esc(app.releaseUrl)}" target="_blank" rel="noopener">${ICON.external}Release sur GitHub</a>
        </div>
      </article>`;
    setupRail();
  }

  function setupRail() {
    const rail = $(".shots__rail", sheet);
    if (!rail) return;
    const prev = $(".shots__nav--prev", sheet);
    const next = $(".shots__nav--next", sheet);
    const update = () => {
      prev.disabled = rail.scrollLeft < 4;
      next.disabled = rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 4;
    };
    rail.addEventListener("scroll", update, { passive: true });
    rail.querySelectorAll("img").forEach((img) => img.addEventListener("load", update, { once: true }));
    update();
  }

  function openSheet(app) {
    document.title = `${app.name} · ${DATA.store.name}`;
    renderDetail(app);
    if (!sheet.open) sheet.showModal();
    $(".sheet__panel", sheet).scrollTop = 0;
    document.body.classList.add("locked");
  }

  function closeSheet() {
    if (location.hash) history.replaceState(null, "", location.pathname + location.search);
    if (lightbox.open) lightbox.close();
    if (sheet.open) sheet.close();
    document.body.classList.remove("locked");
    document.title = DATA.store.name;
  }

  function route() {
    const id = decodeURIComponent(location.hash.replace(/^#\/?/, ""));
    const app = APPS.find((a) => a.id === id);
    if (app) openSheet(app);
    else if (sheet.open) closeSheet();
  }

  /* ---------- Lightbox ---------- */
  const lightbox = $("#lightbox");
  const lb = { app: null, index: 0 };

  function showShot() {
    const shot = lb.app.screenshots[lb.index];
    const img = $("#lightbox-img");
    img.src = shot.src;
    img.alt = `Capture ${lb.index + 1} de ${lb.app.name}`;
    const many = lb.app.screenshots.length > 1;
    $("#lightbox-count").textContent = many ? `${lb.index + 1} / ${lb.app.screenshots.length}` : "";
    lightbox.querySelectorAll(".lightbox__nav").forEach((b) => (b.hidden = !many));
  }

  function openLightbox(app, index) {
    lb.app = app;
    lb.index = index;
    showShot();
    if (!lightbox.open) lightbox.showModal();
  }

  function stepLightbox(delta) {
    const n = lb.app.screenshots.length;
    lb.index = (lb.index + delta + n) % n;
    showShot();
  }

  /* ---------- Live data (GitHub API) ----------
     data/apps.js is a snapshot; this refreshes versions, links and notes
     from GitHub at most once per hour, and silently keeps the snapshot on failure. */
  const LIVE_KEY = "store-live-v1";
  const LIVE_TTL = 3600e3;
  const releaseCache = {};

  async function gh(path) {
    const res = await fetch(`https://api.github.com/${path}`, { headers: { Accept: "application/vnd.github+json" } });
    if (!res.ok) throw new Error(`GitHub ${res.status}`);
    return res.json();
  }

  const releasesOf = (repo) =>
    (releaseCache[repo] ||= gh(`repos/${repo}/releases?per_page=20`).then((list) =>
      list.filter((r) => !r.draft).sort((a, b) => b.published_at.localeCompare(a.published_at))));

  const cleanNotes = (md) =>
    md.replace(/\r\n/g, "\n").split(/(?=^##+ )/m).filter((part) => !/^##+\s*Télécharger/.test(part)).join("")
      .replace(/^\[Sources au tag\]\(.*?\)\s*$/gm, "").replace(/\n{3,}/g, "\n\n").trim();

  async function changelogNotes(repo) {
    const res = await fetch(`https://raw.githubusercontent.com/${repo}/HEAD/CHANGELOG.md`);
    if (!res.ok) throw new Error(`CHANGELOG ${res.status}`);
    const m = (await res.text()).match(/^## .+?\n([\s\S]*?)(?=^## |(?![\s\S]))/m);
    return m ? m[1].trim() : "";
  }

  async function resolveDownload(app, dl, latest) {
    const repo = dl.repo || app.repo;
    if (dl.source === "tag-zip") {
      const tag = latest.tag_name;
      return { ...dl, url: `https://github.com/${repo}/archive/refs/tags/${tag}.zip`, file: `${app.name}-${tag}.zip`, version: tag, size: null };
    }
    const re = new RegExp(dl.match);
    for (const rel of await releasesOf(repo)) {
      const asset = rel.assets.find((a) => re.test(a.name));
      if (asset) return { ...dl, url: asset.browser_download_url, file: asset.name, version: rel.tag_name, size: asset.size };
    }
    return dl;
  }

  async function resolveApp(app) {
    const latest = (await releasesOf(app.repo))[0];
    return {
      id: app.id,
      version: latest.tag_name,
      releaseName: latest.name || latest.tag_name,
      releaseUrl: latest.html_url,
      date: latest.published_at,
      notes: app.notesFrom === "changelog" ? await changelogNotes(app.repo) : cleanNotes(latest.body || ""),
      downloads: await Promise.all(app.downloads.map((d) => resolveDownload(app, d, latest))),
    };
  }

  async function loadLive() {
    try {
      const cached = JSON.parse(localStorage.getItem(LIVE_KEY));
      if (cached && Date.now() - cached.at < LIVE_TTL && cached.at > Date.parse(DATA.generated)) return cached;
    } catch (err) { /* no cache */ }
    const live = {
      at: Date.now(),
      apps: await Promise.all(APPS.map(resolveApp)),
      storeVersion: await gh(`repos/${DATA.store.repo}/releases/latest`).then((r) => r.tag_name, () => null),
    };
    try { localStorage.setItem(LIVE_KEY, JSON.stringify(live)); } catch (err) { /* storage unavailable */ }
    return live;
  }

  async function liveRefresh() {
    let live;
    try { live = await loadLive(); } catch (err) { return; }
    let changed = false;
    for (const patch of live.apps) {
      const app = APPS.find((a) => a.id === patch.id);
      if (!app || (app.version === patch.version && app.notes === patch.notes && JSON.stringify(app.downloads) === JSON.stringify(patch.downloads))) continue;
      Object.assign(app, patch);
      changed = true;
    }
    if (changed) {
      renderHero();
      renderGrid();
      const open = sheet.open && APPS.find((a) => a.id === location.hash.replace(/^#\/?/, ""));
      if (open) renderDetail(open);
    }
    if (IN_APP && live.storeVersion && isNewer(live.storeVersion, IN_APP[1])) showInstallButton("Mettre à jour le store", "Mise à jour");
  }

  /* ---------- Store app (APK) ---------- */
  const IN_APP = /0xStoreApp\/([\d.]+)/.exec(navigator.userAgent);
  const STORE_APK = `https://github.com/${DATA.store.repo}/releases/latest/download/${DATA.store.apk}`;

  const isNewer = (a, b) => {
    const pa = a.replace(/^v/, "").split(".").map(Number);
    const pb = b.replace(/^v/, "").split(".").map(Number);
    for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
      if ((pa[i] || 0) !== (pb[i] || 0)) return (pa[i] || 0) > (pb[i] || 0);
    }
    return false;
  };

  function showInstallButton(long, short) {
    const btn = $("#install-store");
    btn.href = STORE_APK;
    btn.title = DATA.store.apk;
    if (long) $(".install-btn__long", btn).textContent = long;
    if (short) $(".install-btn__short", btn).textContent = short;
    btn.hidden = false;
  }

  // Called by the Android app on the system back gesture; returns true if handled.
  window.storeBack = () => {
    if (lightbox.open) { lightbox.close(); return true; }
    if (sheet.open) { closeSheet(); return true; }
    return false;
  };

  /* ---------- Events ---------- */
  document.addEventListener("click", (e) => {
    const shot = e.target.closest("[data-shot]");
    if (shot) {
      openLightbox(APPS.find((a) => a.id === shot.dataset.app), Number(shot.dataset.shot));
      return;
    }
    const scroll = e.target.closest("[data-scroll]");
    if (scroll) {
      const rail = $(".shots__rail", sheet);
      rail.scrollBy({ left: Number(scroll.dataset.scroll) * rail.clientWidth * 0.8 });
    }
  });

  sheet.addEventListener("click", (e) => {
    if (e.target === sheet || e.target.closest("[data-close]")) closeSheet();
  });
  sheet.addEventListener("cancel", (e) => {
    e.preventDefault();
    if (!lightbox.open) closeSheet();
  });

  lightbox.addEventListener("click", (e) => {
    const step = e.target.closest("[data-step]");
    if (step) stepLightbox(Number(step.dataset.step));
    else if (e.target === lightbox || e.target.closest("[data-close]")) lightbox.close();
  });
  lightbox.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") stepLightbox(1);
    if (e.key === "ArrowLeft") stepLightbox(-1);
  });

  $("#filters").addEventListener("click", (e) => {
    const chip = e.target.closest("[data-filter]");
    if (!chip) return;
    state.platform = chip.dataset.filter;
    document.querySelectorAll("#filters .chip").forEach((c) => c.setAttribute("aria-pressed", String(c === chip)));
    renderGrid();
  });

  const search = $("#search");
  search.addEventListener("input", () => {
    state.query = search.value;
    renderGrid();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "/" && !sheet.open && document.activeElement !== search) {
      e.preventDefault();
      search.focus();
    }
  });

  $("#theme-toggle").addEventListener("click", () => {
    const root = document.documentElement;
    const dark = root.dataset.theme ? root.dataset.theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
    root.dataset.theme = dark ? "light" : "dark";
    try { localStorage.setItem("store-theme", root.dataset.theme); } catch (err) { /* stockage indisponible */ }
  });

  window.addEventListener("hashchange", route);

  /* ---------- Init ---------- */
  document.title = DATA.store.name;
  document.querySelectorAll("[data-store-name]").forEach((el) => (el.textContent = DATA.store.name));
  $("#generated").textContent = `Catalogue mis à jour le ${formatDate(DATA.generated)}.`;
  if (IN_APP) document.documentElement.classList.add("in-app");
  else showInstallButton();
  renderHero();
  renderGrid();
  route();
  liveRefresh();
})();
