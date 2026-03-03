# CONTEXT — Migration des 5 calculateurs vers Hugo + GitHub Pages
# Session du 2026-03-03

## Vue d'ensemble

Migration complète de tous les calculateurs JavaScript de dans-le-mille.fr
depuis l'hébergement o2switch vers Hugo + GitHub Pages (123VincentB.github.io/dans-le-mille).

Stack cible : Hugo + PaperMod, vanilla JS, Chart.js (CDN), Konva.js (CDN).
Suppression de toutes les dépendances jQuery / jQuery.validate / Flot.

---

## Calculateur 1 — Efficacité de l'arc

Shortcode : layouts/shortcodes/calc-efficacite-arc.html
JS        : static/js/calc-efficacite-arc.js
Source    : script_0XX (jQuery + Flot)

Points clés :
- Conversion Flot -> Chart.js
- Validation jQuery.validate -> vanilla JS
- Formulaire simple, 1 graphe

---

## Calculateur 2 — Balistique extérieure

Shortcode : layouts/shortcodes/calc-balistique-exterieure.html
JS        : static/js/calc-balistique-exterieure.js
Source    : script_016 (jQuery + Flot)

Points clés :
- 6 formulaires indépendants avec 6 blocs résultats (show/hide)
- Chaque bloc résultat a sa propre instance Chart.js
- CSS @media print inline dans le shortcode (priorité sur PaperMod)
  -> body * visibility:hidden, .calc-output.visible visibility:visible
- Conversion spline cubique pour interpolation

---

## Calculateur 3 — Balistique terrain en pente

Shortcode : layouts/shortcodes/calc-balistique-pente.html
JS        : static/js/calc-balistique-pente.js
Source    : script_019

Points clés :
- 1 formulaire, 1 graphe Chart.js avec 2 courbes (plat/pente)
- Ligne horizontale rouge fixe à distCible
- Tooltip dynamique : interpolation spline cubique en temps réel
  -> mode 'index', callback afterBody, position X curseur -> angle -> dist viseur
- CSS @media print identique calc 2

---

## Calculateur 4 — Graduation du viseur

Shortcode : layouts/shortcodes/calc-graduation-viseur.html
JS        : static/js/calc-graduation-viseur.js
JS libs   : static/js/vincentb.graduation.js (verrou neutralisé)
            static/js/vincentb.graphe.js (verrou neutralisé)
Source    : script_020

Points clés :
- Dépendances custom : classe Graduation (canvas, réglette imprimable)
  et classe Graphe (canvas natif, pas Chart.js, axe Y inversé)
- Verrou domaine dans les deux libs :
  window.btoa(hostname) == "ZGFucy1sZS1taWxsZS5mcg=="
  -> neutralisé par regex, remplacé par /* verrou domaine supprimé */
- Image ParametresDeVisee.png dans formulaire
- Instructions impression/collage intégrées dans bloc résultats
- CSS @media print identique calc 2/3

---

## Calculateur 5 — Viseur scope / oeilleton

Shortcode : layouts/shortcodes/calc-viseur-scope.html
JS        : static/js/calc-viseur-scope.js
Source    : script_023e (jQuery + Konva.js)
Dépendance: Konva.js 9 (CDN jsdelivr)

Points clés :

TABS CSS-DRIVEN (structure critique) :
- input[name=tab]*3 + label*3 + .tab*3 tous frères directs dans section.tabs
- Sélecteurs : .tabs input:nth-of-type(2):checked ~ .tab:nth-of-type(2) etc.
- Tout wrapper intermédiaire casse les nth-of-type -> ne pas en ajouter
- JS initTabs() : toggle radio tab-B/C + toggle labels Compound/Recurve

KONVA :
- height = width (ratioWrapper vw100 = padding-bottom:100%)
- setTimeout(init, 50) pour layout stable avant mesure dimensions
- Vider #container (innerHTML='') avant chaque init()

VERROU DOMAINE :
- inhibitsDrag() original : vérifie btoa(hostname)
- Supprimé : mask.dIn=0, mask.color=rgba(255,255,255,0.01) forcé

ORDRE LAYERS : layerTarget -> layerScope -> layerSight -> layerMask

DRAG DEBLOQUE :
- Problème : layerScope et layerMask captaient les événements souris
- Solution : listening:false sur layerScope et layerMask
- Seul layerTarget (mode scope) ou layerSight (mode oeilleton) est draggable

MASQUE BLANC (anneau Konva.Ring) :
- Mode scope     : innerR = height/2  (= bord ext anneau bleu scope)
- Mode oeilleton : innerR = height/2 * target.scale + 2 * dotR

---

## Patterns communs à tous les calculateurs

SUPPRESSION JQUERY :
- $.validator -> validation vanilla JS (chk/chkHex/chkGt helpers)
- $.animate scrollTo -> element.scrollIntoView({behavior:'smooth'})
- $(form).submit -> button type="button" + addEventListener click

CSS PRINT (inline dans chaque shortcode, priorité garantie) :
  @media print {
    body * { visibility: hidden !important; }
    .calc-output.visible, .calc-output.visible * { visibility: visible !important; }
    .calc-output.visible { position: absolute; top:0; left:0; width:100%; }
  }

VERROUS DOMAINE :
- Pattern : window.btoa(hostname) == "ZGFucy1sZS1taWxsZS5mcg=="
- Présent dans : vincentb.graduation.js, vincentb.graphe.js, script_023e (inhibitsDrag)
- Tous neutralisés

---

## Déploiement

Site : https://123vincent.github.io/dans-le-mille/calculateurs/
Repo : github.com/123VincentB/dans-le-mille
Build : GitHub Actions -> Hugo -> gh-pages

Commit type utilisé : "feat: calculateur <nom> (calc N/5)"
