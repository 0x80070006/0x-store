# 0x Store

Site statique : aucun build, aucune base de données. Copiez le dossier tel quel sur le serveur (Nginx, Apache, GitHub Pages…).

```
index.html            page du store
css/style.css         styles (thème clair/sombre)
js/app.js             catalogue, fiche app, carrousel, notes de version
data/apps.js          données générées (versions, liens directs, notes)
assets/apps/<id>/     logos et captures copiés depuis les dépôts
apps.config.json      textes et règles de téléchargement, à éditer
tools/update_store.py met à jour data/apps.js depuis GitHub
```

`tools/`, `apps.config.json` et `.claude/` ne sont pas nécessaires sur le serveur.

## Publier une nouvelle version

Après une release GitHub, relancez le script : il retrouve la dernière release, les liens directs vers les `.apk` / `.exe` / `.msi` et les notes de version.

```bash
python tools/update_store.py
```

Ajoutez `--refresh` pour retélécharger aussi les logos et captures. En cas de limite d'API GitHub, définissez `GITHUB_TOKEN` (par exemple `GITHUB_TOKEN=$(gh auth token)`).

## Ajouter ou modifier une app

Éditez `apps.config.json` :

- `downloads[].match` : expression régulière sur le nom du fichier dans la release. Le script prend la release la plus récente qui contient un fichier correspondant.
- `source: "tag-zip"` : archive ZIP des sources au dernier tag (utilisé pour le thème Lumo).
- `beta: true` : affiche le badge Bêta.
- `notesFrom: "changelog"` : prend les notes dans `CHANGELOG.md` au lieu de la release.
- `logoScale`, `logoBg`, `logoPad` : cadrage du logo dans sa case.
- `store.featured` : app mise en avant en haut de la page.

## Application Android

Le dossier `android/` emballe ce même site dans une app (WebView). Au build, `index.html`, `css/`, `js/`, `data/` et `assets/` sont copiés dans l'APK.

Dans l'app, chaque bouton télécharge le fichier avec le gestionnaire de téléchargements d'Android. Les APK s'ouvrent ensuite directement dans l'installateur ; les autres fichiers vont dans Téléchargements. Les versions, liens et notes sont rafraîchis depuis l'API GitHub (au plus une fois par heure), y compris sur le site web. Le store signale aussi ses propres mises à jour.

```bash
cd android
./gradlew assembleRelease
```

La signature utilise `android/keystore.properties` et `android/release.jks`, exclus de git. **Gardez-en une copie** : sans cette clé, les mises à jour ne pourront pas s'installer par-dessus la version existante.

Pour publier une version : augmentez `versionCode` et `versionName` dans `android/app/build.gradle.kts`, compilez, puis joignez l'APK à une release GitHub sous le nom exact `0x-Store.apk`. Le bouton « Installer le store » du site pointe vers `releases/latest/download/0x-Store.apk`.
