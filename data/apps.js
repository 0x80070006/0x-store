// Généré par tools/update_store.py — ne pas modifier à la main.
window.STORE_DATA = {
  "store": {
    "name": "0x Store",
    "owner": "0x80070006",
    "tagline": "Des applications libres, sans pistage, à télécharger en direct depuis leurs releases officielles.",
    "featured": "bastion",
    "repo": "0x80070006/0x-store",
    "apk": "0x-Store.apk"
  },
  "generated": "2026-10-09T20:34:50+00:00",
  "apps": [
    {
      "id": "bastion",
      "name": "Bastion",
      "category": "Sécurité",
      "tagline": "Anti-perte et anti-vol pour Android, piloté depuis votre PC.",
      "description": "Bastion protège votre téléphone Android ou GrapheneOS sans Google, sans compte cloud et sans télémétrie. La console Windows localise, fait sonner, verrouille ou efface l'appareil à distance. Tout transite par un relay auto-hébergeable qui ne voit que des blobs chiffrés et signés de bout en bout.",
      "highlights": [
        "Localisation, suivi en continu et géorepérage avec alertes entrée/sortie",
        "Verrouillage et effacement à distance contresignés par une clé privilégiée",
        "Mode perdu plein écran, sirène et annonce vocale",
        "Caméra, micro et interphone deux voies chiffrés",
        "Photo anti-intrusion et détection de changement de SIM",
        "Relay intégré ou auto-hébergé, sans Google Play Services"
      ],
      "notesFrom": null,
      "beta": false,
      "notice": null,
      "repo": "0x80070006/bastion",
      "url": "https://github.com/0x80070006/bastion",
      "license": "GPL-3.0",
      "language": "Rust",
      "stars": 0,
      "version": "v0.3.1",
      "releaseName": "Bastion 0.3.1 — interphone + console",
      "releaseUrl": "https://github.com/0x80070006/bastion/releases/tag/v0.3.1",
      "date": "2026-10-08T18:17:47Z",
      "notes": "Interphone deux voies et interface « console de commande ». Contient aussi le contrôle à distance (écran + saisie) introduit en 0.3.0.\n\n## Nouveautés\n- **Interphone (deux voies)** : parler ET entendre la personne en direct, chiffré de bout en bout (bouton « Parler » du panneau caméra). Indicateur micro visible sur le téléphone.\n- **Interface console** : restyle sobre côté PC — monospace majuscules, géométrie équerrée, navigation à barre d'accent, scrollbars fines. UI du téléphone inchangée.\n- **Aide au diagnostic** : si la recopie d'écran ne démarre pas, le panneau indique quoi faire (installer 0.3.1+, activer le service d'accessibilité, déverrouiller).\n\n## Installation\n- **PC** : `Bastion_0.3.1_x64-setup.exe` (installe/ met à jour en place).\n- **Téléphone** : `Bastion-0.3.1.apk` (même clé de signature → mise à jour en place ; versionCode 4). Puis activer une fois **Réglages → Accessibilité → « Contrôle à distance Bastion »**.\n\n## Rappel sécurité\nLa saisie à distance n'atteint jamais un écran verrouillé sécurisé ; le code PIN ne peut pas être contourné à distance. Cadence écran ~1 i/s (limite OS).\n\nSHA-256\n- APK : \\`ebde9bca914aeacc6b074482a1ac760644f7b9a2911750e1eaf0e655066dcf30\\`\n- EXE : \\`614bb4676d259443b5f6fd0801aa92db2cd9816a072639dcc8e33cff05ca224b\\`",
      "logo": {
        "src": "assets/apps/bastion/logo.svg"
      },
      "screenshots": [
        {
          "src": "assets/apps/bastion/shot-01.png",
          "w": 800,
          "h": 500
        },
        {
          "src": "assets/apps/bastion/shot-02.png",
          "w": 488,
          "h": 1055
        }
      ],
      "downloads": [
        {
          "label": "Android",
          "kind": "APK",
          "platform": "android",
          "match": "^Bastion-[\\d.]+\\.apk$",
          "url": "https://github.com/0x80070006/bastion/releases/download/v0.3.1/Bastion-0.3.1.apk",
          "file": "Bastion-0.3.1.apk",
          "version": "v0.3.1",
          "size": 8066488,
          "count": 6
        },
        {
          "label": "Windows",
          "kind": "EXE",
          "platform": "windows",
          "match": "_x64-setup\\.exe$",
          "hint": "Installation rapide, par utilisateur",
          "url": "https://github.com/0x80070006/bastion/releases/download/v0.3.1/Bastion_0.3.1_x64-setup.exe",
          "file": "Bastion_0.3.1_x64-setup.exe",
          "version": "v0.3.1",
          "size": 4916504,
          "count": 0
        },
        {
          "label": "Windows",
          "kind": "MSI",
          "platform": "windows",
          "match": "_x64_en-US\\.msi$",
          "hint": "Installation classique, toute la machine",
          "url": "https://github.com/0x80070006/bastion/releases/download/v0.3.1/Bastion_0.3.1_x64_en-US.msi",
          "file": "Bastion_0.3.1_x64_en-US.msi",
          "version": "v0.3.1",
          "size": 6483968,
          "count": 1
        }
      ]
    },
    {
      "id": "apklab",
      "name": "APK Lab",
      "category": "Développement",
      "tagline": "Décompile, explore, recompile et signe des APK, en local.",
      "description": "APK Lab enveloppe jadx et apktool dans une interface web locale. Déposez un APK ou un XAPK : le code Java est reconstruit, le smali et les ressources extraits, le manifeste résumé. Recompilez et signez ensuite l'APK en un clic pour le tester sur un appareil. Rien ne quitte votre machine.",
      "highlights": [
        "APK, XAPK, APKS et APKM avec extraction automatique des splits",
        "Code Java via jadx, smali et ressources via apktool",
        "Aperçu du manifeste : permissions sensibles, composants exportés, technos détectées",
        "Recherche plein texte et regex, requêtes prêtes à l'emploi (secrets, URLs, Firebase…)",
        "Recompilation, zipalign et signature en un clic",
        "Prérequis : Python 3.10+, JDK 17+ et build-tools Android"
      ],
      "notesFrom": null,
      "beta": false,
      "notice": null,
      "repo": "0x80070006/apklab",
      "url": "https://github.com/0x80070006/apklab",
      "license": null,
      "language": "Python",
      "stars": 0,
      "version": "v1.0.0",
      "releaseName": "APK Lab 1.0.0",
      "releaseUrl": "https://github.com/0x80070006/apklab/releases/tag/v1.0.0",
      "date": "2026-10-09T07:47:33Z",
      "notes": "Première version d'APK Lab.\n\n### Installation\nTélécharge **APKLab-Setup-1.0.0.msi** ci-dessous et lance-le. L'installeur demande où installer (par défaut `C:\\Program Files\\APK Lab`) et propose un raccourci sur le bureau.\n\nPrérequis sur la machine : **Python 3.10+**, un **JDK 17+** (Android Studio en fournit un) et les **build-tools du SDK Android** pour la signature. jadx et apktool sont téléchargés au premier lancement.\n\n### Contenu\n- Décompilation APK / XAPK / APKS / APKM (Java via jadx, smali + ressources via apktool)\n- Aperçu du manifeste : permissions sensibles, composants exportés, frameworks, bibliothèques natives\n- Explorateur de fichiers coloré + recherche plein texte / regex\n- **Recompilation + signature** en un clic (apktool → zipalign → apksigner, certificat de debug local)\n- Export .zip, tout en local sur 127.0.0.1",
      "logo": {
        "src": "assets/apps/apklab/logo.webp",
        "w": 1254,
        "h": 1254
      },
      "screenshots": [
        {
          "src": "assets/apps/apklab/shot-01.jpg",
          "w": 800,
          "h": 525
        },
        {
          "src": "assets/apps/apklab/shot-02.jpg",
          "w": 800,
          "h": 525
        },
        {
          "src": "assets/apps/apklab/shot-03.jpg",
          "w": 800,
          "h": 525
        },
        {
          "src": "assets/apps/apklab/shot-04.jpg",
          "w": 800,
          "h": 525
        }
      ],
      "downloads": [
        {
          "label": "Windows",
          "kind": "MSI",
          "platform": "windows",
          "match": "\\.msi$",
          "url": "https://github.com/0x80070006/apklab/releases/download/v1.0.0/APKLab-Setup-1.0.0.msi",
          "file": "APKLab-Setup-1.0.0.msi",
          "version": "v1.0.0",
          "size": 757760,
          "count": 1
        }
      ]
    },
    {
      "id": "replscope",
      "name": "ReplScope",
      "category": "Administration système",
      "tagline": "Moniteur de réplication Active Directory, en lecture seule.",
      "description": "ReplScope est un moniteur de réplication Active Directory moderne, inspiré de replmon, pour Windows Server 2022 à 2026. Il n'écrit jamais dans l'annuaire et ne stocke aucun identifiant. Exécutable autonome : aucun runtime .NET à installer.",
      "highlights": [
        "Arbre Forêt → Site → DC → partitions avec état agrégé",
        "Détection des changements répliqués via le suivi des USN",
        "Détail des objets créés, modifiés ou supprimés pour chaque lien",
        "Onglets Métriques et Historique (30 jours), export CSV",
        "Mode ligne de commande pour la supervision et les tâches planifiées",
        "Connexion « en tant que » depuis un poste hors domaine"
      ],
      "notesFrom": null,
      "beta": false,
      "notice": null,
      "repo": "0x80070006/ReplScope",
      "url": "https://github.com/0x80070006/ReplScope",
      "license": null,
      "language": "C#",
      "stars": 0,
      "version": "v1.4.0",
      "releaseName": "ReplScope 1.4.0",
      "releaseUrl": "https://github.com/0x80070006/ReplScope/releases/tag/v1.4.0",
      "date": "2026-10-08T13:25:09Z",
      "notes": "Détail des objets répliqués (volet sous la liste et dans l'historique), barres Fraîcheur et Activité, mise à jour auto 10 s par défaut.",
      "logo": {
        "src": "assets/apps/replscope/logo.png",
        "w": 512,
        "h": 512
      },
      "screenshots": [],
      "downloads": [
        {
          "label": "Windows",
          "kind": "EXE",
          "platform": "windows",
          "match": "^ReplScope\\.exe$",
          "hint": "Portable, aucune installation",
          "url": "https://github.com/0x80070006/ReplScope/releases/download/v1.4.0/ReplScope.exe",
          "file": "ReplScope.exe",
          "version": "v1.4.0",
          "size": 49405134,
          "count": 1
        }
      ]
    },
    {
      "id": "keyra",
      "name": "Keyra",
      "category": "Clavier",
      "tagline": "Clavier AZERTY français, réactif et 100 % hors ligne.",
      "description": "Keyra est un clavier Android local, écrit en Kotlin avec un cœur en Rust. Il n'a aucune permission réseau et chiffre tout ce qu'il conserve. Correction et prédiction françaises tournent entièrement sur l'appareil.",
      "highlights": [
        "Aucune permission INTERNET, tableau de transparence intégré",
        "Correction et prédiction en Rust : 1,5 ms par frappe",
        "AZERTY, BÉPO, QWERTY, QWERTZ et Dvorak",
        "Données chiffrées XChaCha20-Poly1305, clé dans le Keystore",
        "Presse-papiers éphémère, extraits de texte, emoji en français",
        "Geste panique qui détruit la clé de chiffrement"
      ],
      "notesFrom": null,
      "beta": false,
      "notice": null,
      "repo": "0x80070006/keyra",
      "url": "https://github.com/0x80070006/keyra",
      "license": "MIT",
      "language": "Kotlin",
      "stars": 1,
      "version": "v12.0",
      "releaseName": "Keyra 12.0",
      "releaseUrl": "https://github.com/0x80070006/keyra/releases/tag/v12.0",
      "date": "2026-10-06T19:26:19Z",
      "notes": "# Keyra 12.0\n\n## Nouveautés\n- **Frappe réactive** :\n  - une seule vue dessine le clavier ;\n  - la touche visée est la plus proche du doigt, sans zone morte ;\n  - un second doigt valide aussitôt le premier ;\n  - glisser depuis ?123 pour taper un symbole.\n- **Correction et prédiction réécrites en Rust**, mesurées sur 200 fautes :\n  - 83,5 % de corrections justes (79,5 % en 11.0) et 1,5 % de corrections fausses (4 %) ;\n  - 1,5 ms par frappe dans 95 % des cas (33 ms en 11.0).\n- **Bandeau à la SwiftKey** : mot tapé, correction en gras, suggestion suivante, emoji. Un appui long masque une suggestion.\n- **Vie privée** :\n  - stockage chiffré ;\n  - presse-papiers éphémère ;\n  - incognito par application ;\n  - détection des secrets ;\n  - geste panique ;\n  - pavé PIN mélangé.\n- **Tableau de transparence**, **extraits de texte** (protégeables par empreinte), **export et import chiffrés**.\n- **Dispositions** BÉPO, QWERTY, QWERTZ et Dvorak ; rangée de chiffres ; vibration, son et bulle d'aperçu réglables.\n- **Gestes** : pavé tactile sur Espace, Retour arrière accéléré et glissé, balayages.\n\n## Sécurité et publication\n- **Permissions** : deux permissions *normales* seulement, `VIBRATE` et `USE_BIOMETRIC`. Toujours **pas d'accès Internet**.\n- **Publication** :\n  - APK signé v2 et v3, avec rotation possible (v3.1) ;\n  - signature Sigstore ;\n  - SBOM CycloneDX ;\n  - build reproductible.\n- **Audit** : auto-audit OWASP MASVS (`docs/masvs-audit.md`).\n\n## Limites connues\n- **Dictée vocale** : elle passe par le service de reconnaissance du téléphone, qui peut être en ligne.\n- **Mémoire** : l'effacement est fait au mieux sur la JVM, et la clé de données reste en mémoire tant que le téléphone est déverrouillé.\n- **Appareil réel** : pas encore validé sur un Pixel 9a physique sous GrapheneOS.\n\n## Fichiers et vérification\n- `keyra-v12.0.apk` : APK à installer, signé (APK Signature Scheme v3).\n  Certificat `CN=Keyra`, empreinte SHA-256 :\n  `4dd7554877b6aa99c839a76a7945e18745b9b300d5846b7f96c658c1b210728d`\n  Vérifier : `apksigner verify --print-certs keyra-v12.0.apk`\n- `keyra-v12.0-unsigned.apk` : APK non signé, compilé par la CI (Linux) pour le commit 95408c6, reproductible depuis l'étiquette.\n- `keyra-v12.0.sbom.cdx.json` : SBOM CycloneDX.\n- `SHA256SUMS` : `sha256sum -c SHA256SUMS`\n\nCette première publication a été signée localement par le mainteneur, sans signature Sigstore. Les suivantes passeront par le workflow `release.yml` (Sigstore) dès que les secrets de signature seront configurés.",
      "logo": {
        "src": "assets/apps/keyra/logo.png",
        "w": 512,
        "h": 512,
        "logoScale": 1.12
      },
      "screenshots": [],
      "downloads": [
        {
          "label": "Android",
          "kind": "APK",
          "platform": "android",
          "match": "^keyra-v[\\d.]+\\.apk$",
          "url": "https://github.com/0x80070006/keyra/releases/download/v12.0/keyra-v12.0.apk",
          "file": "keyra-v12.0.apk",
          "version": "v12.0",
          "size": 1514385,
          "count": 2
        }
      ]
    },
    {
      "id": "telecomhand",
      "name": "TelecomHand",
      "category": "Contrôle à distance",
      "tagline": "Votre téléphone devient la télécommande de votre PC.",
      "description": "TelecomHand transforme un téléphone Android en télécommande pour un ordinateur Windows ou une machine Linux / Raspberry Pi, sur votre réseau privé. Installez l'agent sur la machine à contrôler, puis l'application sur le téléphone.",
      "highlights": [
        "Pavé tactile avec gestes et saisie clavier",
        "Aperçu de l'écran distant",
        "Raccourcis et commandes système selon l'agent",
        "Agents Windows et Raspberry Pi / Linux",
        "Conçu pour un réseau privé, par exemple Tailscale"
      ],
      "notesFrom": null,
      "beta": false,
      "notice": "Agents v1.7.0 : définissez dans config.json un code unique d'au moins 16 caractères et n'exposez pas l'agent à Internet.",
      "repo": "0x80070006/TelecomHand",
      "url": "https://github.com/0x80070006/TelecomHand",
      "license": "MIT",
      "language": "Kotlin",
      "stars": 1,
      "version": "v1.8.0",
      "releaseName": "TelecomHand v1.8.0",
      "releaseUrl": "https://github.com/0x80070006/TelecomHand/releases/tag/v1.8.0",
      "date": "2026-09-25T22:19:27Z",
      "notes": "## Sécurité des agents historiques\n\nLes archives des agents Windows et Raspberry Pi de cette version ont été publiées avant la génération automatique de codes forts. Définissez dans config.json un code unique d'au moins 16 caractères et limitez l'accès au réseau privé. Le correctif est disponible dans les sources actuelles, pas dans ces anciennes archives. Si un agent était accessible avec son code initial, remplacez ce code.\n\n## État\n\nAPK Android v1.8 ; agents Windows et Raspberry Pi disponibles séparément en v1.7.\n\n## Notes d'origine\n\nbug fix",
      "logo": {
        "src": "assets/apps/telecomhand/logo.png",
        "w": 1254,
        "h": 1254,
        "logoScale": 1.06
      },
      "screenshots": [
        {
          "src": "assets/apps/telecomhand/shot-01.png",
          "w": 912,
          "h": 2048
        },
        {
          "src": "assets/apps/telecomhand/shot-02.png",
          "w": 912,
          "h": 2048
        },
        {
          "src": "assets/apps/telecomhand/shot-03.png",
          "w": 912,
          "h": 2048
        },
        {
          "src": "assets/apps/telecomhand/shot-04.png",
          "w": 912,
          "h": 2048
        },
        {
          "src": "assets/apps/telecomhand/shot-05.png",
          "w": 912,
          "h": 2048
        },
        {
          "src": "assets/apps/telecomhand/shot-06.png",
          "w": 912,
          "h": 2048
        }
      ],
      "downloads": [
        {
          "label": "Android",
          "kind": "APK",
          "platform": "android",
          "match": "Android-v[\\d.]+\\.apk$",
          "url": "https://github.com/0x80070006/TelecomHand/releases/download/v1.8.0/TelecomHand-Android-v1.8.0.apk",
          "file": "TelecomHand-Android-v1.8.0.apk",
          "version": "v1.8.0",
          "size": 24961342,
          "count": 4
        },
        {
          "label": "Agent Windows",
          "kind": "ZIP",
          "platform": "windows",
          "match": "Windows-x64-v[\\d.]+\\.zip$",
          "url": "https://github.com/0x80070006/TelecomHand/releases/download/v1.7.0/TelecomHand-Windows-x64-v1.7.0.zip",
          "file": "TelecomHand-Windows-x64-v1.7.0.zip",
          "version": "v1.7.0",
          "size": 34493260,
          "count": 4
        },
        {
          "label": "Agent Raspberry Pi",
          "kind": "TAR.GZ",
          "platform": "linux",
          "match": "RaspberryPi-v[\\d.]+\\.tar\\.gz$",
          "url": "https://github.com/0x80070006/TelecomHand/releases/download/v1.7.0/TelecomHand-RaspberryPi-v1.7.0.tar.gz",
          "file": "TelecomHand-RaspberryPi-v1.7.0.tar.gz",
          "version": "v1.7.0",
          "size": 9341,
          "count": 2
        }
      ]
    },
    {
      "id": "lumo",
      "name": "Lumo",
      "category": "Multimédia",
      "tagline": "Thème cinématique et extension d'interface pour Jellyfin.",
      "description": "Lumo transforme l'interface web de Jellyfin 12 : Hero cinématique, rails de plateformes et de studios, fiches de film repensées, fond nébuleuse animé. L'installateur Linux ou Windows injecte le CSS et le runtime directement dans jellyfin-web, et se désinstalle proprement. Une application Android compagnon ouvre l'interface Lumo en plein écran avec contrôles multimédia et Picture-in-Picture.",
      "highlights": [
        "Hero cinématique avec rotation fluide des fonds",
        "Rails plateformes et studios avec logos officiels",
        "Fiches de film : synopsis, réalisateur, distribution",
        "Écran de démarrage et loaders liquides",
        "Installateurs Linux et Windows, désinstallation réversible",
        "App Android : notification média, PiP, plein écran"
      ],
      "notesFrom": "changelog",
      "beta": false,
      "notice": "Les scripts modifient les fichiers de jellyfin-web : sauvegardez votre installation avant. L'APK Android est un build debug, pour les essais.",
      "repo": "0x80070006/Noctafin-jellyfin-theme-",
      "url": "https://github.com/0x80070006/Noctafin-jellyfin-theme-",
      "license": "MIT",
      "language": "JavaScript",
      "stars": 1,
      "version": "v1.16.2",
      "releaseName": "Lumo pour Jellyfin v1.16.2",
      "releaseUrl": "https://github.com/0x80070006/Noctafin-jellyfin-theme-/releases/tag/v1.16.2",
      "date": "2026-09-29T19:47:18Z",
      "notes": "- Synchronisation atomique du fond et des informations du Hero après préchargement, avec garde contre les réponses tardives et les clics rapides.\n- Préchargement borné du prochain fond, repli visuel en cas d'erreur et fondu réduit à 320 ms.",
      "logo": {
        "src": "assets/apps/lumo/logo.png",
        "w": 1286,
        "h": 1223,
        "logoBg": "#16130c",
        "logoPad": 0.2
      },
      "screenshots": [
        {
          "src": "assets/apps/lumo/shot-01.jpg",
          "w": 1045,
          "h": 876
        },
        {
          "src": "assets/apps/lumo/shot-02.jpg",
          "w": 1045,
          "h": 876
        },
        {
          "src": "assets/apps/lumo/shot-03.jpg",
          "w": 1045,
          "h": 876
        },
        {
          "src": "assets/apps/lumo/shot-04.jpg",
          "w": 1045,
          "h": 876
        },
        {
          "src": "assets/apps/lumo/shot-05.jpg",
          "w": 1045,
          "h": 876
        }
      ],
      "downloads": [
        {
          "label": "Thème Jellyfin",
          "kind": "ZIP",
          "platform": "linux windows",
          "source": "tag-zip",
          "hint": "Installateurs Linux et Windows inclus",
          "url": "https://github.com/0x80070006/Noctafin-jellyfin-theme-/archive/refs/tags/v1.16.2.zip",
          "file": "Lumo-v1.16.2.zip",
          "version": "v1.16.2",
          "size": null
        },
        {
          "label": "App Android",
          "kind": "APK",
          "platform": "android",
          "repo": "0x80070006/LUMO",
          "match": "\\.apk$",
          "url": "https://github.com/0x80070006/LUMO/releases/download/v1.3.0/LUMO-v1.3.0-debug.apk",
          "file": "LUMO-v1.3.0-debug.apk",
          "version": "v1.3.0",
          "size": 10555102,
          "count": 4
        }
      ]
    },
    {
      "id": "holowave",
      "name": "HOLOWAVE",
      "category": "Musique",
      "tagline": "Le salon d'écoute hors ligne, avec paroles synchronisées.",
      "description": "HOLOWAVE lit la musique stockée sur votre téléphone : pas de compte, pas de streaming, pas de pub. L'interface Art Déco emprunte aux bars à cocktails des années 1930, et dans le lecteur le vinyle sort de sa pochette et tourne pendant la lecture. Les paroles défilent en temps réel, comme sur Spotify, mais restent disponibles hors ligne.",
      "highlights": [
        "Discothèque locale : albums, artistes, dossiers, titres et playlists",
        "Paroles synchronisées : fichier .lrc, paroles intégrées au MP3/FLAC, puis LRCLIB",
        "Paroles gardées sur l'appareil, « Tout préparer » pour toute la discothèque",
        "Lecture écran éteint, jaquette Art Déco sur l'écran de verrouillage",
        "Coups de cœur, file d'attente, aléatoire et répétition",
        "Aucun traqueur, une seule connexion (LRCLIB) désactivable"
      ],
      "notesFrom": null,
      "beta": false,
      "notice": null,
      "repo": "0x80070006/holowave-deco",
      "url": "https://github.com/0x80070006/holowave-deco",
      "license": "MIT",
      "language": "Kotlin",
      "stars": 0,
      "version": "v2.0.0",
      "releaseName": "HOLOWAVE 2.0 — Art Déco",
      "releaseUrl": "https://github.com/0x80070006/holowave-deco/releases/tag/v2.0.0",
      "date": "2026-10-09T20:33:34Z",
      "notes": "Refonte complète de HoloWave : lecteur de musique hors ligne façon jazz-bar Art Déco.\n\n- Discothèque locale (albums, artistes, dossiers, titres, playlists, coups de cœur)\n- Pochette et vinyle qui tourne pendant la lecture\n- Paroles synchronisées hors ligne : intégrées au fichier, import .lrc, ou LRCLIB (gardées en cache)\n- Lecture en veille, lecteur système sur l'écran de verrouillage : piste glissable, couleurs de l'album, bouton coup de cœur\n- Aucun compte, aucun traqueur ; seule connexion possible : lrclib.net en HTTPS (désactivable)\n\nAndroid 10 ou plus récent.\n\n**SHA-256** `\\09495714b729a907c7fc0e74b60f12720d9c7b41d7ff250fbf15b61d7da5a52f`\n**Certificat de signature (SHA-256)** `18e5200893891d6d54fdba71740fae793bdbb3da244f35564dbe0e090e95146f`",
      "logo": {
        "src": "assets/apps/holowave/logo.png",
        "w": 512,
        "h": 512,
        "logoScale": 1.08
      },
      "screenshots": [
        {
          "src": "assets/apps/holowave/shot-01.jpg",
          "w": 540,
          "h": 1212
        },
        {
          "src": "assets/apps/holowave/shot-02.jpg",
          "w": 540,
          "h": 1212
        },
        {
          "src": "assets/apps/holowave/shot-03.jpg",
          "w": 540,
          "h": 1212
        },
        {
          "src": "assets/apps/holowave/shot-04.jpg",
          "w": 540,
          "h": 1212
        },
        {
          "src": "assets/apps/holowave/shot-05.jpg",
          "w": 540,
          "h": 1212
        },
        {
          "src": "assets/apps/holowave/shot-06.jpg",
          "w": 540,
          "h": 1212
        },
        {
          "src": "assets/apps/holowave/shot-07.jpg",
          "w": 540,
          "h": 1212
        }
      ],
      "downloads": [
        {
          "label": "Android",
          "kind": "APK",
          "platform": "android",
          "match": "^HOLOWAVE\\.apk$",
          "hint": "Android 10 ou plus récent",
          "url": "https://github.com/0x80070006/holowave-deco/releases/download/v2.0.0/HOLOWAVE.apk",
          "file": "HOLOWAVE.apk",
          "version": "v2.0.0",
          "size": 4433982,
          "count": 0
        }
      ]
    },
    {
      "id": "cap",
      "name": "Cap",
      "category": "Navigation",
      "tagline": "GPS libre et privé : navigation virage par virage, sans compte.",
      "description": "Cap est une application de navigation Android inspirée de l'ergonomie de Waze, sans compte, sans pistage, sans publicité et sans Google Play Services. Les alertes que vous signalez restent sur votre téléphone, chiffrées, et ne sont jamais partagées. En développement actif : des bugs sont possibles.",
      "highlights": [
        "Carte vectorielle OpenStreetMap, thème jour/nuit automatique",
        "Jusqu'à 3 itinéraires, navigation vocale virage par virage",
        "Proposition de déviation quand un ralentissement est détecté",
        "Ajout d'arrêt en route avec détour estimé",
        "Alertes personnelles 100 % locales et chiffrées",
        "Tableau de bord vie privée avec journal réseau"
      ],
      "notesFrom": null,
      "beta": true,
      "notice": "Pas de trafic en direct ni de mode hors ligne pour l'instant. Le guidage peut se tromper : respectez toujours la signalisation.",
      "repo": "0x80070006/cap",
      "url": "https://github.com/0x80070006/cap",
      "license": "GPL-3.0",
      "language": "Kotlin",
      "stars": 0,
      "version": "v0.1.0",
      "releaseName": "Cap 0.1.0",
      "releaseUrl": "https://github.com/0x80070006/cap/releases/tag/v0.1.0",
      "date": "2026-10-09T13:45:52Z",
      "notes": "Première version publique de **Cap**, GPS libre et privé pour Android (8.0+), sans compte, sans pistage, sans Google Play Services.\n\n### Points forts\n- Nouveau logo.\n- Carte MapLibre (OpenStreetMap) : eau bleue, espaces verts, bâtiments gris ; vue plate de dessus par défaut, zoom et inclinaison réglables.\n- Recherche avec autocomplétion, réglages enregistrés par bouton dédié, son activable depuis l’accueil, favoris personnalisables (nom + icône), point de départ au choix.\n- 1 à 3 itinéraires, navigation virage par virage avec voix locale, recalcul sur déviation, **proposition de déviation** en cas de ralentissement détecté.\n- Ajout d'arrêt en route avec détour estimé, pause (survit à la fermeture), arrêt annulable.\n- **Alertes personnelles 100 % locales et chiffrées** (12 catégories, 2 appuis, opacité réduite permanente, rappel d'approche, export chiffré).\n- Tableau de bord Vie privée avec journal réseau, « Tout effacer ».\n- Français / English.\n\n### Limites connues\nPas de trafic en direct (la détection de bouchon repose sur votre propre vitesse), pas de mode hors ligne, serveurs publics de démonstration par défaut (remplaçables). Détail : [ROADMAP](docs/ROADMAP.md).\n\n### Vérification\n- SHA-256 de `Cap-0.1.0.apk` : `2fa326c9822057ac44f09654955676d439ba3ae262f51f23710c94cd83a3e9b2`\n- Certificat de signature (SHA-256) : `dff5ed4ae0500eb75db6c0c75ab22c4b1d84db9421fdf4b93d418fdce3772868`",
      "logo": {
        "src": "assets/apps/cap/logo.png",
        "w": 194,
        "h": 193,
        "logoScale": 1.04
      },
      "screenshots": [
        {
          "src": "assets/apps/cap/shot-01.png",
          "w": 1080,
          "h": 2424
        },
        {
          "src": "assets/apps/cap/shot-02.png",
          "w": 1080,
          "h": 2424
        },
        {
          "src": "assets/apps/cap/shot-03.png",
          "w": 1080,
          "h": 2424
        },
        {
          "src": "assets/apps/cap/shot-04.png",
          "w": 1080,
          "h": 2424
        },
        {
          "src": "assets/apps/cap/shot-05.png",
          "w": 1080,
          "h": 2424
        },
        {
          "src": "assets/apps/cap/shot-06.png",
          "w": 1080,
          "h": 2424
        },
        {
          "src": "assets/apps/cap/shot-07.png",
          "w": 1080,
          "h": 2424
        },
        {
          "src": "assets/apps/cap/shot-08.png",
          "w": 1080,
          "h": 2424
        }
      ],
      "downloads": [
        {
          "label": "Android",
          "kind": "APK",
          "platform": "android",
          "match": "^Cap-[\\d.]+\\.apk$",
          "url": "https://github.com/0x80070006/cap/releases/download/v0.1.0/Cap-0.1.0.apk",
          "file": "Cap-0.1.0.apk",
          "version": "v0.1.0",
          "size": 51288642,
          "count": 0
        }
      ]
    }
  ]
};
