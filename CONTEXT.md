# CONTEXT.md — Projet dans-le-mille.fr → Hugo + GitHub Pages

## État actuel
- 6 articles migrés et en ligne
- CSS personnalisé fonctionnel
- Prochaine étape : migration des calculateurs (JavaScript côté client)

---

## Infrastructure

### Dépôt Git
- Compte GitHub : `123Vincent` *(distinct de 123VincentB utilisé pour photométrie/pyldt)*
- Remote : `git@github-123Vincent:123vincent/dans-le-mille.git`
- Branche principale : `main`
- Déploiement : branche `gh-pages` via GitHub Actions

### URLs
- Site temporaire : https://123vincent.github.io/dans-le-mille/
- Site final : https://dans-le-mille.fr/ *(CNAME à configurer, o2switch pas encore résilié)*

### Structure locale
```
C:\Users\labor\GitHub\dans-le-mille\
├── .github\workflows\hugo.yml
├── content\
│   ├── articles\
│   │   ├── arc-compound\index.md
│   │   ├── efficacite-arc\index.md
│   │   ├── balistique-exterieure\index.md
│   │   ├── balistique-terrain-pente\index.md
│   │   ├── viser-bien-viser-juste\index.md
│   │   └── scope-lentille\index.md
│   └── calculateurs\
│       └── _index.md
├── layouts\
│   ├── partials\
│   │   └── extend_head.html   ← KaTeX + Google Fonts + custom.css (via relURL)
│   └── shortcodes\
│       └── img.html
├── static\
│   └── css\
│       └── custom.css
└── hugo.toml
```

---

## hugo.toml

```toml
baseURL = "https://123vincent.github.io/dans-le-mille/"
languageCode = "fr-FR"
title = "Dans le mille"
theme = "PaperMod"

[params]
  description = "Documentation technique sur le tir à l'arc et l'arc compound"
  author = "Vincent B."
  defaultTheme = "auto"
  ShowReadingTime = false
  ShowPostNavLinks = true
  ShowBreadCrumbs = true
  ShowToc = true
  TocOpen = true
  ShowLastMod = true
  math = true

[menu]
  [[menu.main]]
    name = "Articles"
    url = "/articles/"
    weight = 1
  [[menu.main]]
    name = "Calculateurs"
    url = "/calculateurs/"
    weight = 2

[taxonomies]
  tag = "tags"
  category = "categories"

[outputs]
  home = ["HTML", "RSS"]
  section = ["HTML"]
  taxonomy = ["HTML"]
  term = ["HTML"]

[markup]
  [markup.goldmark]
    [markup.goldmark.renderer]
      unsafe = true
```

---

## Fichiers clés

### extend_head.html
```html
{{ if .Params.math | default .Site.Params.math }}
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css">
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js"></script>
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js"
  onload="renderMathInElement(document.body, {
    delimiters: [
      {left: '$$', right: '$$', display: true},
      {left: '$', right: '$', display: false}
    ]
  });"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="{{ "css/custom.css" | relURL }}">
{{ end }}
```

`custom.css` est chargé en fin de `extend_head.html` (voir ci-dessus).
**Important** : utiliser `relURL` et non `/css/custom.css` — le chemin absolu ne fonctionne pas en production car le site est servi depuis un sous-répertoire `/dans-le-mille/`.

### shortcode img.html
Paramètres : `src`, `alt`, `width` (défaut 100%), `align` (center/left/right), `caption`
```
{{< img src="images/x.png" alt="..." width="60%" align="center" caption="..." >}}
```

---

## Articles migrés

| #   | Titre                                          | Dossier                    | Images source       |
| --- | ---------------------------------------------- | -------------------------- | ------------------- |
| 1   | Arc à poulies / Compound — comment ça marche ? | `arc-compound`             | `assets/media/009/` |
| 2   | Calculer l'efficacité de son arc               | `efficacite-arc`           | `assets/media/011/` |
| 3   | Balistique extérieure — Le vol d'une flèche    | `balistique-exterieure`    | `assets/media/012/` |
| 4   | Viser bien, viser juste                        | `viser-bien-viser-juste`   | `assets/media/013/` |
| 5   | Tirer sur un terrain en pente                  | `balistique-terrain-pente` | `assets/media/018/` |
| 6   | Le scope à la loupe                            | `scope-lentille`           | `assets/media/021/` |

Ordre d'affichage géré par `weight: 1` à `weight: 6` dans le front matter de chaque article.

---

## Règles KaTeX validées

- Sauts de ligne dans `aligned` : `\\\\` (4 backslashes)
- Subscripts texte : `W_{in}`, `Eff_{arc}` — **pas de `\text{}` dans les subscripts**
- `\text{}` uniquement dans le corps d'une formule, jamais en subscript/superscript
- `\!` (espace négatif) non supporté par KaTeX → à éviter
- `\left(` et `\right)` fonctionnent sans `\!`
- Encodage des fichiers .md : **LF obligatoire** (pas CRLF), sinon KaTeX ne parse pas les blocs multi-lignes

## Règles CSS

- `customCSS` dans `hugo.toml` charge le CSS trop tôt (avant PaperMod) → inutilisable pour surcharger
- Solution : charger `custom.css` en fin de `extend_head.html` avec `relURL`
- En production, toujours utiliser `{{ "chemin" | relURL }}` pour les ressources statiques

---

## Calculateurs à migrer

Les 5 calculateurs originaux sont des outils JavaScript côté client hébergés sur o2switch :

| #   | Nom                         | URL originale                                 |
| --- | --------------------------- | --------------------------------------------- |
| 1   | Efficacité de l'arc         | calculer-efficacite-de-son-arc-compound.html  |
| 2   | Balistique extérieure       | annexe-balistique-exterieure.html             |
| 3   | Balistique terrain en pente | *(lié au ch.5)*                               |
| 4   | Graduation du viseur        | *(lié au ch.4)*                               |
| 5   | Viseur scope œilleton       | annexe-parametrer-viseur-scope-oeilleton.html |

### Approche prévue
- Pages Hugo dans `content/calculateurs/`
- JavaScript intégré directement dans le contenu Markdown via HTML inline (`unsafe = true`)
- Ou shortcode dédié si le JS est complexe
- Pas de dépendance serveur — tout côté client

---

## Prochaines étapes

- [ ] Récupérer les sources JS des calculateurs depuis o2switch
- [ ] Intégrer les calculateurs dans `content/calculateurs/`
- [ ] Configurer le CNAME `dans-le-mille.fr` → `123vincent.github.io`
- [ ] Résilier l'hébergement o2switch après validation complète
