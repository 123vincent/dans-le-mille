# CONTEXT — Calculateur 5 : Viseur scope / oeilleton

## Migration complete — 5/5 calculateurs migres

1. Efficacite de l arc
2. Balistique exterieure (6 formulaires)
3. Balistique terrain en pente
4. Graduation du viseur
5. Viseur scope / oeilleton  <- cette session

## Fichiers

layouts/shortcodes/calc-viseur-scope.html
static/js/calc-viseur-scope.js
content/calculateurs/viseur-scope/index.md

## Points techniques

TABS CSS-DRIVEN
- input[name=tab] + label*3 + .tab*3 freres directs dans section.tabs
- nth-of-type fonctionnel uniquement dans cette structure
- JS : initTabs() toggle radio tab-B/C et labels Compound/Recurve

KONVA
- height = width (ratioWrapper vw100 = padding-bottom:100%)
- setTimeout(init, 50) pour layout stable
- Vider #container avant chaque init()

VERROU DOMAINE SUPPRIME
- inhibitsDrag() force mask.dIn=0, mask.color=rgba(255,255,255,0.01)

ORDRE LAYERS
layerTarget -> layerScope -> layerSight -> layerMask

DRAG DEBLOQUE
- layerScope : listening: false
- layerMask  : listening: false
- Seul layerTarget (scope) ou layerSight (oeilleton) capte les evenements

MASQUE BLANC innerRadius
- Mode scope     : height / 2  (bord ext anneau bleu)
- Mode oeilleton : height/2 * target.scale + 2 * dotR

## Git

git add static/js/calc-viseur-scope.js layouts/shortcodes/calc-viseur-scope.html content/calculateurs/viseur-scope/index.md
git commit -m "feat: calculateur viseur scope/oeilleton (calc 5/5) - migration complete"
git push
