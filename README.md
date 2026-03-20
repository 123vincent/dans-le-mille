# dans-le-mille

**Site actif : [https://dans-le-mille.fr/](https://dans-le-mille.fr/)**

Site de documentation technique et de calculateurs interactifs dédié au **tir à l'arc compound**.

---

## Contenu

### Articles

Documentation technique sur les fondamentaux de l'arc compound :

- Arc compound — principe et réglages
- Balistique extérieure — trajectoire de la flèche
- Balistique terrain pente — corrections pour tirs en dénivelé
- Efficacité de l'arc — énergie et performances
- Réglage du viseur
- Scope et lentille

### Calculateurs

Cinq outils de calcul interactifs :

| Calculateur | Description |
|---|---|
| **Efficacité de l'arc** | Calcul de l'énergie statique, des performances au tir et de l'impact du poids de la flèche |
| **Balistique extérieure** | Portée maximale, distance/angle, vitesse initiale, coefficient balistique, scénarios terrain |
| **Balistique terrain pente** | Corrections balistiques pour les tirs sur terrain incliné |
| **Graduation du viseur** | Calcul des graduations du viseur |
| **Viseur scope / œilleton** | Outil graphique interactif pour la configuration du scope et de l'œilleton |

---

## Stack technique

- **[Hugo](https://gohugo.io/)** — générateur de site statique
- **[PaperMod](https://github.com/adityatelange/hugo-PaperMod)** — thème Hugo (sous-module Git)
- **[Chart.js 4](https://www.chartjs.org/)** — visualisation des trajectoires balistiques
- **[Konva.js](https://konvajs.org/)** — dessin canvas pour le calculateur scope
- **[KaTeX](https://katex.org/)** — rendu des formules mathématiques
- JavaScript vanilla — logique des calculateurs

## Déploiement

Hébergé sur **[Cloudflare Pages](https://pages.cloudflare.com/)**, déployé automatiquement depuis ce dépôt GitHub.
