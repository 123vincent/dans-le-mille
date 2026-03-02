---
title: "Le scope à la loupe"
date: 2016-10-10
lastmod: 2026-03-02
weight: 6
tags: ["scope", "lentille", "vergence", "champ de vision"]
description: "Analyse optique du système de visée sur un arc compound : champ de vision, vergence, grossissement, image inversée, visette correctrice."
math: true
---

## Configuration courante

Il existe probablement autant de combinaisons de matériel ou de configurations de visée que d'archers. L'étude dans ce chapitre portera sur une configuration courante, celle que l'on voit habituellement sur les arcs lors de rencontres FITA, Indoor ou Field (tir en campagne).

## Jeu des 9 différences

<div style="display:flex; gap:1rem; margin:0;">
  <div style="flex:1;">{{< img src="images/jean-charles-valladont-2016.jpg" alt="Jean-Charles Valladont, vice-champion olympique Rio 2016" width="100%" >}}</div>
  <div style="flex:1;">{{< img src="images/michael-schloesser-2015.jpg" alt="Michael Schloesser en 2015" width="100%" >}}</div>
</div>

*Ces images ont été choisies non pas pour valoriser deux grands champions mais simplement car elles présentent un angle de vue et une perspective très similaires. Merci pour votre compréhension.*

Quelles sont les différences entre l'équipement de visée d'un arc classique et d'un compound ?

- L'œilleton sur un arc classique se nomme « scope » sur un arc à poulies.
- Le diamètre du scope est plus grand qu'un œilleton.
- Le scope est généralement équipé d'une lentille permettant de grossir l'image de la cible.
- Le point de visée du scope peut être une fibre optique courte ou longue, un point ou un cercle de diamètre spécifique.
- Le scope comporte un niveau à bulle, indicateur de la verticalité de l'arc.
- Sur le compound, la tête du viseur comporte un 3ème axe de réglage.
- Le coulisseau vertical du viseur sur un compound est généralement plus court.
- L'extension du viseur est généralement plus courte sur le compound. Le viseur se trouve plus près de la poignée d'arc.
- Une visette comportant un petit trou est fixée sur la corde de l'arc à poulies.

## Analyse de l'optique

{{< img src="images/scheme-optics-of-the-compound.png" alt="Analyse de l'optique du compound" width="100%" align="center" caption="Fig.1 - Schéma du système de visée sur un compound" >}}

## Le champ de vision

Sur un arc classique, en phase de visée l'archer positionne le centre de son œilleton sur le centre de la cible. Son champ de vision global lui permet de voir la position de la corde par rapport à son œilleton et peut ainsi corriger son alignement latéral. Son œilleton très petit — une dizaine de millimètres de diamètre, situé à environ un mètre devant lui — se noie dans la surface de la cible.

Le système de visée optique sur un arc à poulies ressemble au principe d'une lunette de tir. Le regard de l'archer passe à travers deux éléments de visée — le trou de la visette et le scope — distants respectivement d'environ 10 cm et 80 cm de l'œil. Le champ de vision de l'archer est limité par le cône illustré en fig.1. Même si l'archer tire avec les deux yeux ouverts, l'œil directeur prend le contrôle de la perception visuelle. C'est comme si l'archer regardait d'un œil à travers un tube.

Comme expérience, prenez un rouleau d'essuie-tout vide, regardez avec un œil à travers le trou et visez un objet. Même en gardant les deux yeux ouverts, votre cerveau perçoit le champ de vision défini par le diamètre du tube, et tout ce qui se trouve à l'extérieur devient secondaire.

Plus le diamètre du tube est petit, plus le champ de vision est réduit, et moins de lumière passe à travers.

## Définir le champ de vision

Le champ de vision est la portion de cible visible à travers le trou de la visette. Il s'exprime en mètres (largeur circulaire visible) ou en degrés (angle du cône). En admettant qu'à travers le trou de la visette on voit le scope en entier (fig.1), le champ de vision est réduit au diamètre intérieur du scope.

avec :  
$\text{diamètre intérieur scope} = 0{,}040\,m = 40\,mm$  
$\text{distance œil-scope} = 0{,}80\,m = 80\,cm$  
$\text{distance œil-cible} = 10\,m$

Dans le cas d'un scope **sans lentille** :

$$\text{champ de vision} = \frac{distOeilCible \times diamIntScope}{distOeilScope}$$

$$\text{champ de vision} = \frac{10\,m \times 0{,}040}{0{,}80} = 0{,}50\,m = 50\,cm$$

À une distance de 10 m, on peut observer une portion circulaire de 50 cm de large.

### Astuce

Pour mesurer sa distance œil-scope : se faire photographier de profil à une distance supérieure à 10 m. Après impression, mesurer avec une règle la distance œil-scope ainsi que la longueur de la flèche point-encoche. En utilisant la [règle de trois](https://fr.wikipedia.org/wiki/R%C3%A8gle_de_trois)[^1] et en connaissant la longueur réelle de la flèche, on en déduit la distance réelle œil-scope.

$$longReelleOeilScope = longReelleFleche \times \frac{mesureImageOeilScope}{mesureImageFleche}$$

**Attention** : photographier l'archer de loin (distance supérieure à 10 m) afin de réduire les distorsions dues aux grands angles.

## La ligne de mire

La ligne de mire est cette ligne virtuelle allant de l'œil de l'archer au centre de la cible en passant par le trou de la visette et le centre du scope. En phase de visée, l'archer s'assure d'aligner aussi précisément que possible ces éléments entre eux. Grâce à la visette, la précision de tir est nettement améliorée par rapport au système de visée sur un arc classique.

Spontanément on pourrait penser que plus ce trou de visette est petit et plus précis sera l'alignement... c'est une fausse bonne idée.

{{< img src="images/scheme-optics-scope-peep-sight-animated.gif" alt="Schéma optique de la visée sur un compound" width="100%" align="center" caption="Fig.2 - Le trou de la visette prédéfinit un champ de vision" >}}

**1ère situation — trou de visette très petit (fig.3a)** : cela resserre le champ de vision et réduit considérablement la luminosité du système optique.

**2ème situation — trou de visette intermédiaire (fig.3b)** : le corps du scope se trouve en dehors du champ de vision. La luminosité n'est pas optimale. L'archer n'a pas d'indicateur franc lui permettant d'apprécier si le point de visée se trouve parfaitement centré dans le trou de la visette — le positionnement est approximatif et demande plus de concentration.

{{< img src="images/scope-peep-sight-1-animated.gif" alt="Visée à travers un petit trou de visette" width="40%" align="center" caption="Fig.3a - Petit trou de visette" >}}

{{< img src="images/scope-peep-sight-2-animated.gif" alt="Visée à travers un trou de visette moyen" width="40%" align="center" caption="Fig.3b - Trou de visette intermédiaire" >}}

{{< img src="images/scope-peep-sight-3-animated.gif" alt="Visée à travers un grand trou de visette" width="40%" align="center" caption="Fig.3c - Grand trou de visette" >}}

**3ème situation — grand trou de visette (fig.3c)** : le corps du scope se trouve dans le champ de vision. La luminosité est parfaitement optimisée. Le trou de visette optimal est celui qui permet d'englober le corps du scope avec une **petite marge** de confort. L'épaisseur de matière du scope est un indicateur franc permettant de s'assurer de la parfaite concentricité — certains nomment cela le **cerclage**. La précision du cerclage dépend de la marge de confort disponible, elle doit correspondre aux préférences de l'archer.

## Diamètre du scope

Il n'y a pas de choix idéal, tout est question de compromis. Généralement les archers pratiquant le tir nature ou le tir en campagne choisiront un scope de 42 mm ou 35 mm pour une bonne luminosité et un champ de vision confortable. Pour du FITA ou du tir en salle, des scopes de 29 mm sont courants.

## Comment voit mon œil ?

Tout comme l'oreille perçoit des sons, l'œil perçoit de la lumière. Les rayons lumineux visibles se situent dans une bande passante de 380 à 780 nanomètres ($1\,nm = 0{,}000\,000\,001\,m$). Chaque longueur d'onde correspond à une couleur lumineuse.

Un faisceau lumineux solaire contient toutes les longueurs d'ondes visibles — le mélange donne du blanc (lumière blanche). Un rayon laser ne contient qu'une seule longueur d'onde (monochromatique).

Quand un rayon traverse un matériau plus dense, il est freiné et change de direction : **le rayon se réfracte**. Selon sa longueur d'onde, le changement de direction ne sera pas le même pour un rayon rouge (780 nm) que pour un rayon bleu (380 nm). Les densités des matériaux sont caractérisées par leur indice de réfraction $n$ ($n = 1$ pour l'air, $n = 1{,}33$ pour l'eau, $n = 1{,}5$ pour le verre).

Notre œil est composé de matières organiques translucides de densités différentes qui forment un système optique complexe. Les faisceaux lumineux réfléchis par un objet traversent successivement la cornée ($n = 1{,}377$), l'humeur aqueuse ($n = 1{,}337$), le cristallin ($n = 1{,}41$), le corps vitré ($n = 1{,}336$) et l'image se projette sur la rétine. La **vergence** de l'œil produit une image inversée de l'objet — le cerveau redresse l'image captée par la rétine.

{{< img src="images/human-eye.png" alt="Principe optique d'un œil humain" width="60%" align="center" caption="Fig.4 - Le principe optique d'un œil humain" >}}

## Principe d'une lentille optique

La **vergence** est la tendance d'une lentille à faire converger ou diverger les rayons. C'est la puissance intrinsèque de la lentille, exprimée en dioptrie [D].

### Formule des opticiens

La formule de vergence[^2] [^3] (ou formule de Descartes, ou *thin-lens equation*) permet de localiser la position de l'image $img$ en fonction de la distance de l'objet $obj$ et de la puissance $P$ de la lentille mince :

$$\frac{n_a}{obj} + P = \frac{n_p}{img}$$

avec :  
$n_a$ : indice de réfraction du milieu antérieur.  
$n_p$ : indice de réfraction du milieu postérieur.  
$obj$ [m] : distance de l'objet.  
$img$ [m] : distance de l'image.  
$P$ [D] : puissance de la lentille mince (signe $+$ pour convergente, signe $-$ pour divergente).

{{< img src="images/thin-lens-equation.png" alt="Équation des opticiens" width="100%" align="center" caption="Fig.5 - Schéma de l'équation des opticiens" >}}

Application pratique :

$n_a = n_p = 1$ (milieux antérieur et postérieur dans l'air)  
$obj = -9{,}2\,m$ (signe $-$ car l'objet se situe à gauche par rapport au centre optique $O$)  
$P = +0{,}72\,D$ (lentille convergente)

$$\frac{1}{-9{,}2} + 0{,}72 = \frac{1}{img}$$

$$-0{,}109\,D + 0{,}72\,D = +0{,}611\,D$$

$$img = \frac{1}{+0{,}611\,D} = 1{,}636\,m$$

Une image nette de l'objet est projetée sur un plan image situé à 1,636 m après la lentille.

### Vergences réduites

$$U = \frac{n_a}{obj} \qquad \text{(vergence réduite objet)}$$

$$V = \frac{n_p}{img} \qquad \text{(vergence réduite image)}$$

$$U + P = V \qquad \text{(formule des opticiens)}$$

avec :

$$img = \frac{n_p}{V} \qquad obj = \frac{n_a}{U}$$

Cette formule permet de calculer très simplement des systèmes optiques complexes composés de plusieurs lentilles (téléobjectifs, télescopes, microscopes, jumelles, lunettes).

### Grandissement transversal

$$Grandissement_{transversal} = \frac{img}{obj} = \frac{U}{V} = \frac{-0{,}109\,D}{+0{,}611\,D} = -0{,}178\times$$

L'image a 0,178 fois la taille de l'objet. Le **signe $-$** indique que l'image est **inversée**.

### Données des fabricants

Les archeries sérieuses indiquent la puissance de la lentille en dioptrie. Tableau d'équivalence approximatif :

| Dioptrie | Grossissement |
| :------: | :-----------: |
|   0,25   |      2×       |
|  0,375   |      3×       |
|   0,5    |      4×       |
|  0,625   |      5×       |
|   0,75   |      6×       |
|  0,875   |      7×       |
|   1,0    |      8×       |

L'ATA (*Archery Trade Association*) publie une formule pour déterminer le grossissement apparent :

$$\text{grossissement apparent} = \frac{1}{1 - D \times ESM}$$

avec $D$ la dioptrie de la lentille et $ESM$ la distance œil-scope en mètres *(Eye to Scope Distance in Meters)*.

## Grossissement du scope

L'ATA indique clairement que le tableau d'équivalence ci-dessus est fantaisiste. Elle parle de **grossissement apparent**. Calculons ce grossissement avec la formule des opticiens.

{{< img src="images/single-lens-bow-scope.png" alt="Grossissement apparent du scope" width="100%" align="center" caption="Fig.6 - Schéma du grossissement apparent du scope" >}}

En fonction de la configuration précédente :  
$obj_1 = -9{,}2\,m$, $P = +0{,}72\,D$, $img_1 = 1{,}636\,m$, $grandissement = -0{,}178\times$.

avec $O_1 O_2 = 0{,}8\,m$ (distance œil-scope).

**SANS la lentille**, l'archer voit le sapin directement :

$$\arctan(c/d) = \arctan(1/10) = 5{,}7° \quad \text{(angle du triangle 1 en } O_2\text{)}$$

$c = 1$ (taille de l'objet de facteur = 1)  
$d = obj_1 + O_1 O_2 = 9{,}2 + 0{,}8 = 10\,m$

**AVEC la lentille**, l'archer voit l'image du sapin :

$$\arctan(a/b) = \arctan(0{,}178/0{,}836) = 12{,}0° \quad \text{(angle du triangle 2 en } O_2\text{)}$$

$a = c \times grandissement = 0{,}178$  
$b = img_1 - O_1 O_2 = 1{,}636 - 0{,}8 = 0{,}836\,m$

Le **grossissement apparent** est le rapport entre l'angle du triangle 2 « image » sur l'angle du triangle 1 « objet » :

$$\text{grossissement} = \frac{\arctan(a/b)}{\arctan(c/d)} = \frac{12{,}0°}{5{,}7°} = 2{,}1\times$$

L'image de l'objet placé à 10 m paraît 2,1 fois plus grande. Le grossissement apparent change en fonction de la distance de l'objet car la position de l'image varie.

### Application numérique

avec $O_1 O_2 = 0{,}8\,m$, $P = +0{,}72\,D$, $a = 0{,}035\,m$ (diamètre scope) :

| $obj_1$ |   $U$    |   $P$   |   $V$    | $img_1$ | $G_{rTr}$ |  $G$  |
| :-----: | :------: | :-----: | :------: | :-----: | :-------: | :---: |
|  9,2 m  | −0,109 D | +0,72 D | +0,611 D | 1,636 m | −0,1778×  | 2,10× |
| 19,2 m  | −0,052 D | +0,72 D | +0,668 D | 1,497 m | −0,0780×  | 2,23× |
| 29,2 m  | −0,034 D | +0,72 D | +0,686 D | 1,458 m | −0,0499×  | 2,27× |
| 39,2 m  | −0,026 D | +0,72 D | +0,694 D | 1,440 m | −0,0367×  | 2,29× |
| 49,2 m  | −0,020 D | +0,72 D | +0,700 D | 1,429 m | −0,0290×  | 2,31× |
| 59,2 m  | −0,017 D | +0,72 D | +0,703 D | 1,422 m | −0,0240×  | 2,32× |
| 69,2 m  | −0,014 D | +0,72 D | +0,706 D | 1,417 m | −0,0205×  | 2,32× |

### Comparaison avec la formule de l'ATA

$$\frac{1}{1 - D \times ESM} = \frac{1}{1 - 0{,}72 \times 0{,}8} = 2{,}36\times$$

La formule de l'ATA est une bonne approximation pour des objets situés à des distances supérieures à 70 m.

## Mesurer la puissance de sa lentille

Certains s'interrogent sur la valeur de la vergence employée dans les applications numériques. Pour connaître la puissance exacte des lentilles de vos scopes, rendez-vous chez un opticien — ils sont équipés de bancs optiques permettant cette mesure. Généralement leur machine indique des valeurs échelonnées tous les 0,25 dioptries, mais ils peuvent déconnecter l'échelonnage et indiquer une valeur précise.

Une lentille de scope n'est ni plus ni moins qu'un verre de lunettes. Certaines lentilles telles que Zeiss ou Swarovski sont de qualité supérieure — en plus d'un traitement antireflet (environ +10 % de luminosité), elles corrigent en partie les aberrations chromatiques et sphériques. L'optique Swarovski est composée d'un doublet achromatique (deux lentilles collées), limitant ces aberrations.

## Traitement antireflet

Certaines lentilles comportent un traitement antireflet : une couche de métallisation de quelques nanomètres d'épaisseur, proportionnelle aux longueurs d'ondes lumineuses, évitant qu'une partie du flux lumineux soit réfléchi. Ce traitement laisse passer environ 10 % de flux lumineux supplémentaire.

**Attention** : orienter la face traitée antireflet **vers la cible** et NON vers l'archer. Sur vos lunettes de vue, le traitement antireflet est appliqué sur la face externe. Pour des lunettes de soleil, c'est l'inverse — sur la face interne, côté œil.

## Quelle est la portion du blason visible à travers mon scope ?

Nous savons calculer le grossissement apparent — mais quelle portion de la cible voit-on exactement dans le scope ? Pour les calculs suivants, j'admets que le champ visuel délimité par le trou de la visette couvre tout le diamètre intérieur du scope.

{{< img src="images/visible-area-through-lens-bow-scope.png" alt="Portion de cible visible à travers le scope" width="100%" align="center" caption="Fig.7 - Portion de cible visible à travers le scope" >}}

Relation entre deux triangles ayant le même angle depuis l'œil :

$$\frac{c \times G}{d} = \frac{a}{b}$$

avec :  
$c$ [m] : portion de blason visible à travers le scope.  
$G$ [×] : grossissement apparent, $G = 2{,}10\times$.  
$d$ [m] : distance de l'œil à la cible, $d = 9{,}2 + 0{,}8 = 10\,m$.  
$a$ [m] : diamètre de l'ouverture du scope, $a = 35\,mm = 0{,}035\,m$.  
$b$ [m] : distance de l'œil à l'axe optique de la lentille, $b = 0{,}8\,m$.

$$c = \frac{a \times d}{b \times G} = \frac{0{,}035 \times 10}{0{,}8 \times 2{,}10} = 0{,}208\,m = 20{,}8\,cm$$

On voit à travers le scope une portion de blason de 20,8 cm de diamètre. Si l'on tire sur un blason de 20 cm de diamètre, on le voit en entier avec une petite marge de 0,4 cm.

### Application numérique

avec $P = +0{,}72\,D$, $b = 0{,}8\,m$, $a = 0{,}035\,m$ :

|  $d$  |  $G$  |   $c$    |
| :---: | :---: | :------: |
| 10 m  | 2,10× | 20,8 cm  |
| 20 m  | 2,23× | 39,2 cm  |
| 30 m  | 2,27× | 57,8 cm  |
| 40 m  | 2,29× | 76,3 cm  |
| 50 m  | 2,31× | 94,8 cm  |
| 60 m  | 2,32× | 113,4 cm |
| 70 m  | 2,32× | 131,9 cm |

## Image inversée ?

Pour connaître le sens de projection de l'image sur la rétine, il faut étudier le signe du grandissement transversal du système optique complet. Signe **négatif** → image inversée. Signe **positif** → image dans le même sens.

Le grandissement total est le produit des grandissements individuels de chaque optique.

{{< img src="images/image-ways-bow-scope.png" alt="Orientation de l'image sur la rétine" width="100%" align="center" caption="Fig.8 - Orientation de l'image sur la rétine" >}}

**1er cas — $img_1$ est plus grand que la distance $O_1 O_2$** :

$$G_{rTr1} = \frac{img_1}{obj_1} \qquad G_{rTr2} = \frac{img_2}{obj_2} \qquad G_{rTr\,total} = G_{rTr1} \times G_{rTr2}$$

| $obj_1$ | $img_1$ | $G_{rTr1}$ | $obj_2$ | $img_2$ | $G_{rTr2}$ | $G_{rTr\,total}$ |
| :-----: | :-----: | :--------: | :-----: | :-----: | :--------: | :--------------: |
| NÉGATIF | POSITIF |  NÉGATIF   | POSITIF | POSITIF |  POSITIF   |   **NÉGATIF**    |

L'image finale projetée sur la rétine est inversée (signe négatif). L'œil interprète cette image comme naturellement orientée — tout va bien.

**2ème cas — $img_1$ est plus petit que la distance $O_1 O_2$** :

Situation possible si $O_1 O_2 = 1\,m$ et $P_{scope} = +1{,}2\,D$ :

| $obj_1$ | $img_1$ | $G_{rTr1}$ | $obj_2$ | $img_2$ | $G_{rTr2}$ | $G_{rTr\,total}$ |
| :-----: | :-----: | :--------: | :-----: | :-----: | :--------: | :--------------: |
| NÉGATIF | POSITIF |  NÉGATIF   | NÉGATIF | POSITIF |  NÉGATIF   |   **POSITIF**    |

L'image finale est dans le même sens que l'objet initial (signe positif). L'œil l'interprétera à l'envers — on marche sur la tête !

## Images floutées

Selon l'archer, sa vue, son allonge, la puissance de l'optique, la luminosité ambiante, etc., l'image de la cible peut être perçue floutée. Réduire le diamètre du trou de la visette est une astuce permettant d'améliorer sensiblement l'impression de netteté (effet sténopéïque).

{{< img src="images/pinhole-bow-scope.png" alt="L'effet sténopéïque de la visette" width="60%" align="center" caption="Fig.9 - Effet sténopéïque de la visette (visette en noir ; pupille en violet)" >}}

La réduction du diamètre de la pupille augmente la profondeur de champ en diminuant le diamètre de la tache floue projetée sur la rétine. Le même effet se produit en réduisant le diamètre du trou de la visette. Une image floue paraîtra plus nette.

Les deux images ci-dessous sont exactement les mêmes — la même cible FITA floutée — mais l'image de droite est affichée à la moitié de la taille de l'image de gauche. Elle paraît plus nette.

Selon que l'on tire en salle ou à l'extérieur, la perception de l'image sera sensiblement différente. Certains archers changent le diamètre du trou de la visette en conséquence.

## Visettes correctrices

Certains fabricants proposent des visettes correctrices équipées d'une petite lentille concave de $-1$, $-2$ ou $-3$ dioptries. Une lentille concave est divergente et a une vergence négative.

{{< img src="images/correction-lens-bow-scope.png" alt="Schéma de principe scope - visette correctrice" width="100%" align="center" caption="Fig.10 - Configuration scope-visette correctrice" >}}

Cette configuration est semblable au principe optique de la lunette de Galilée[^4]. Pour une configuration optimale, le foyer $f_1$ de la lentille 1 (scope) doit coïncider avec le foyer $f_2$ de la lentille 2 (visette).

La distance focale est l'inverse de la vergence :

$$DF_1 = \frac{n}{V_1} = \frac{1}{+0{,}72\,D} = 1{,}389\,m$$

### Distance visette-scope

$$O_1 O_2 = \frac{n}{V_1} + \frac{n}{V_2}$$

$$O_1 O_2 = \frac{1}{+0{,}72\,D} + \frac{1}{-2\,D} = 1{,}389\,m - 0{,}5\,m = 0{,}889\,m = 88{,}9\,cm$$

### Choix de la correction

Les fabricants n'offrent que trois puissances :

| $V_2$ | $O_1 O_2$ |
| :---: | :-------: |
| −1 D  |  38,9 cm  |
| −2 D  |  88,9 cm  |
| −3 D  | 105,6 cm  |

Sur ma configuration (fig.1), la distance visette-scope mesurée = 70 cm. La correction qui s'en rapproche le plus est une visette correctrice de $-2\,D$. En avançant le scope de 10 cm on obtient 80 cm — proche de l'idéal (88,9 cm) mais pas suffisant. Le choix des puissances étant très restreint, une visette correctrice peut ne pas être la solution idéale selon la configuration de l'archer.

### Ajustement de ma configuration

$$O_1 O_2 = \frac{1}{+0{,}8\,D} + \frac{1}{-2{,}0\,D} = 0{,}750\,m = 75{,}0\,cm$$

Ma distance visette-scope actuelle = 70 cm. En avançant le scope de 5 cm on atteint l'entraxe idéal. Mais en changeant la vergence et l'entraxe visette-scope, on modifie le grossissement apparent, la portion de blason visible sera plus petite, la luminosité un peu atténuée. **Le choix de la netteté est une question de compromis.**

La visette correctrice a ses inconvénients : verre non traité (−10 % de luminosité), poussière incrustée difficile à nettoyer, et surtout l'humidité à l'extérieur — une minuscule gouttelette dans le trou et on n'y voit plus rien. Prévoir une petite soufflette en forme de poire.

## Références

[^1]: Wikipédia, [Règle de trois](https://fr.wikipedia.org/wiki/R%C3%A8gle_de_trois). 02/03/2026.
[^2]: American Academy of Ophthalmology (AAO), [Optique clinique Section 3 2013-2014](https://books.google.fr/books?id=HmaGBwAAQBAJ), Optique Géométrique p3-35. 02/03/2026.
[^3]: Wikipedia, [Relation de conjugaison](https://fr.wikipedia.org/wiki/Relation_de_conjugaison), Relation de Descartes (lentilles minces dans l'air). 02/03/2026.
[^4]: digiSchool, [Lunette de Galilée](http://www.ilephysique.net/sujet-lunette-de-galilee-exercice-278341.html). Consulté le 02/03/2026.
