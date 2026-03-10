# CONTEXT - Migration dans-le-mille.fr vers Hugo/GitHub Pages

## Date
2026-02-27

## Objectif
Migration du site dans-le-mille.fr (tir à l'arc / arc compound) vers Hugo + PaperMod
hébergé sur GitHub Pages sous le compte 123Vincent.

## Structure locale
C:\Users\labor\GitHub\dans-le-mille\   → 123Vincent/dans-le-mille.git
C:\Users\labor\GitHub\photometrie\     → 123VincentB/123VincentB.github.io.git
C:\Users\labor\GitHub\pyldt\           → 123VincentB/pyldt.git

## Comptes GitHub
- 123VincentB : photométrie/métrologie, pyldt
- 123Vincent  : dans-le-mille.fr, misterwackesdalsace.fr (futur)

## SSH
Host github-123Vincent  → ~/.ssh/id_ed25519_github_123Vincent
Host github-123VincentB → ~/.ssh/id_ed25519_github_123VincentB

## Site dans-le-mille
- URL temporaire : https://123vincent.github.io/dans-le-mille/
- URL finale : https://dans-le-mille.fr/ (CNAME à configurer après migration)
- baseURL hugo.toml : https://123vincent.github.io/dans-le-mille/
- Thème : PaperMod
- Déploiement : GitHub Actions → branche gh-pages

## Structure du contenu
content/
├── articles/
│   ├── arc-compound/          ✓ migré
│   ├── balistique-exterieure/
│   ├── balistique-terrain-pente/
│   ├── efficacite-arc/
│   ├── reglage-viseur/
│   └── scope-lentille/
└── calculateurs/
    ├── efficacite-arc/
    ├── balistique/
    ├── balistique-terrain-pente/
    ├── graduation-viseur/
    └── viseur-scope-oeilleton/

## Configuration hugo.toml
- baseURL = "https://123vincent.github.io/dans-le-mille/"
- theme = PaperMod
- sections : Articles + Calculateurs
- ShowToc = true / TocOpen = true (global)
- markup.goldmark.renderer.unsafe = true
- outputs : HTML uniquement pour sections/taxonomy

## Shortcode img
layouts/shortcodes/img.html
- Paramètres : src, alt, width (défaut 100%), align (défaut center), caption
- Utilisation : {{< img src="images/x.png" alt="..." width="60%" align="center" caption="..." >}}
- Fonctionne avec div wrapper + figure inline-block

## Notes de bas de page
Syntaxe Markdown native :
texte[^1]
[^1]: référence

## État d'avancement
- [x] Hugo installé et configuré
- [x] PaperMod installé
- [x] GitHub Actions configuré
- [x] Chapitre 1 migré avec images
- [ ] Chapitres 2 à 6 à migrer
- [ ] Calculateurs 1 à 5 à migrer
- [ ] CNAME dans-le-mille.fr à configurer
- [ ] misterwackesdalsace.fr (projet futur)

## Source originale
http://dans-le-mille.fr/