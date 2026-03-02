---
title: "Viser bien, viser juste"
date: 2016-10-10
lastmod: 2026-03-02
weight: 4
tags: ["viseur", "scope"]
description: "Réglage du viseur sur un arc compound ou classique : alignement, ajustement mécanique, géométrie de visée et calcul de la graduation."
math: true
---

L'usage d'un viseur permet d'accroître considérablement sa performance de tir. Le viseur est un accessoire servant à pointer son arc sur la cible. Derrière cette apparente simplicité se cache une multitude de subtilités.

## Objectif : pointer dans le jaune

On parle couramment de [viseur](https://www.google.fr/search?q=viseur+tir+arc&source=lnms&tbm=isch), mais il s'agit en fait de plusieurs éléments :

- le **viseur**, support fixé à l'arc et équipé de chariots et d'axes pour effectuer les réglages,
- l'**œilleton** ou le **scope**, élément optique comportant un point de référence sous la forme d'une pastille ou d'une croix, lumineux ou opaque, qui sert à viser. [L'œilleton](https://www.google.fr/search?q=oeilleton+arc+classique&source=lnms&tbm=isch) est utilisé sur les arcs classiques. [Le scope](https://www.google.fr/search?q=scope+compound&source=lnms&tbm=isch) est utilisé sur les compounds. Le scope peut être équipé d'une lentille agrandissant la cible et d'un petit niveau à bulle pour s'assurer de la verticalité de l'arc.  
Sur un arc à poulies, le scope est généralement associé à une petite [visette](https://www.google.fr/search?q=visette+arc+poulies&source=lnms&tbm=isch), bague de référence fixée sur la corde, proche de l'œil, à travers laquelle on perçoit le scope.

## Réglage de sa visée

La méthode consiste à tirer une flèche ou une volée de quelques flèches en visant le centre de sa cible. Si le groupement se situe au-dessus du centre, il faudra **déplacer l'œilleton "vers le sens de l'erreur"** — donc dans ce cas vers le haut. Puis répéter l'opération jusqu'à obtenir une précision acceptable.

Si le groupement se situe en bas et à droite du centre, il s'agit d'un défaut combiné vertical et latéral. Il faudra déplacer l'œilleton vers le bas et vers la droite. Corriger d'abord le défaut dans un sens (par exemple vertical), répéter jusqu'à ce que le groupement arrive à la hauteur du centre, puis corriger le défaut latéral de la même façon.

## Alignement du viseur

Le but du viseur est de pointer son arc vers le centre de la cible. Pour augmenter la précision, il convient d'aligner les éléments du viseur à l'axe de la corde.

{{< img src="images/bow-sight-axis-alignment.png" alt="Réglage du viseur, mauvais alignement" width="60%" align="center" caption="Fig.1 - Mauvais alignement du viseur par rapport à l'axe de la corde" >}}

Sur l'illustration ci-dessus, le guide vertical du viseur n'est pas parallèle à l'axe de la corde. Si l'on glisse l'œilleton vers le bas, celui-ci se décale légèrement à droite par rapport à l'axe de la corde et pousse la flèche à se planter à gauche du centre.

Si l'on tire toute la saison à la même distance, il suffit de corriger ce défaut latéral en agissant sur les molettes de réglage du viseur. Mais si l'on souhaite pratiquer le tir campagne où les distances varient de 10 m à 60 m, il faudra effectuer un ajustement mécanique des éléments du viseur à l'axe de la corde.

## Ajustement mécanique du viseur

La solution que je propose nécessite 2 petits [niveaux à bulle](https://www.google.fr/search?q=acrylic+bubble+level&tbm=isch) *(acrylic bubble level / acryl wasserwaage)*.

{{< img src="images/bow-sight-axis-adjustment.png" alt="Ajustements mécaniques du viseur" width="80%" align="center" caption="Fig.2 - Ajustements mécaniques du viseur" >}}

### Réglage du 3ème axe

Le niveau à bulle intégré dans le scope permet de contrôler la verticalité de son arc lors de la phase de tir. Si l'arc n'est pas parfaitement vertical lors du tir, cela conduit à un défaut latéral en cible.

L'indication fournie par ce niveau à bulle doit être fiable quelle que soit la pente du terrain et quel que soit l'angle de tir. Il convient pour cela de régler l'inclinaison du scope dans tous les plans.

En premier lieu, contrôler et régler le scope conformément à la figure 3, puis basculer l'arc d'environ 35-45° vers l'avant (figure 4). Dans cette nouvelle position, contrôler et régler le scope. Redresser l'arc dans sa position initiale et vérifier que la bulle reste stable. Sinon refaire la manipulation. L'emploi d'un [support d'arc](http://applearchery.com/apple-economy-vise/) simplifie grandement ce type de mise au point.

Le réglage du **3ème axe** s'adresse uniquement aux scopes disposant d'un niveau à bulle *(ne concerne pas les arcs classiques)*.

## Angles de tir

Une fois l'arc bien réglé, on glisse l'œilleton verticalement pour changer les angles de tir en fonction des distances.

{{< img src="images/archery-shooting-angles.gif" alt="Régler son angle de tir en fonction de la distance" width="80%" align="center" caption="Fig.3 - Angles de tir en fonction de la distance" >}}

## Marquer ses distances

Dans le [chapitre 3](/articles/balistique-exterieure/) consacré à la balistique, nous avons vu qu'à chaque distance de tir correspond un angle de tir. En fonction des conditions initiales — vitesse, poids et coefficient balistique de la flèche — celle-ci volera selon un angle plus ou moins important.

Mon objectif est de déterminer à quelle position je dois régler l'œilleton sur mon viseur pour atteindre le centre d'une cible placée à une distance définie.

### Conditions initiales

$V = 328\,\text{[fps]} \times 0{,}3048 = 100\,m/s$  
$m = 350\,\text{[gr]} / 15{,}432 \times 0{,}001 = 0{,}0227\,kg$  
$C_b = 0{,}000056547236$

### Angles de tir / distances

| distCible [m] | angTir [deg] |
| :-----------: | :----------: |
|      10       |   0,28323    |
|      20       |   0,57142    |
|      30       |   0,86448    |
|      40       |   1,16258    |
|      50       |   1,46583    |
|      60       |   1,77440    |
|      70       |   2,08840    |

{{< img src="images/graph-shooting-angle-distance.png" alt="Graphe angle de tir par rapport à la distance" width="70%" align="center" caption="Fig.4 - Angle de tir en fonction de la distance" >}}

On peut remarquer que la courbe est presque linéaire. Pourtant sur le terrain, l'espacement des traits de crayon relevés sur le viseur pour chacune des distances n'est absolument pas linéaire ! Pour les petites distances, les traits sont très rapprochés, et plus les distances augmentent et plus l'espacement s'agrandit. Pourquoi ?

### Schéma de visée

Pour répondre à cette question, analysons le schéma de visée suivant[^1][^2] :

{{< img src="images/aiming-scheme-archery.png" alt="Schéma de visée pour archerie" width="100%" align="center" caption="Fig.5 - Schéma de visée" >}}

### Géométrie dans un repère

5 points sont représentés dans un repère orthonormé (Oxy) :

- le point $O(0\,;\,0)$, origine du repère, est la position du point d'encochage de la flèche armée.
- le point $A(x_A\,;\,y_A)$, est l'intersection de l'axe de la flèche et de l'axe du coulisseau vertical du viseur.
- le point $B(x_B\,;\,y_B)$, est le centre de la cible.
- le point $C(x_C\,;\,y_C)$, est la position de la visette *(pour arc classique : la position de l'œil)*.
- le point $D(x_D\,;\,y_D)$, est la position de l'œilleton sur le viseur.

3 droites :

$(d1)\; y = a_1 x + b_1$ : droite passant par C et B, axe de visée ou ligne de mire.  
$(d2)\; y = a_2 x + b_2$ : droite passant par O et A, axe de la flèche.  
$(d3)\; y = a_3 x + b_3$ : droite passant par A et D, axe du coulisseau vertical du viseur.

Contraintes :

$(d3) \perp (d2)$ : l'axe du coulisseau vertical du viseur est perpendiculaire à l'axe de la flèche.  
$angTir = (d2) \angle (OB)$ : l'angle de tir est l'angle que forment l'axe de la flèche et l'axe pointant vers la cible.  
$angTerrain = (OB) \angle (Ox)$ : la pente du terrain est l'angle que forment l'axe pointant vers la cible et l'horizon.

Distances à définir :

$OA$ : distance du point d'encochage jusqu'à l'axe du coulisseau vertical du viseur.  
$d = AD$ : distance de l'axe de la flèche à la position de l'œilleton sur le viseur. C'est notre objectif !

Ne soyez pas découragé — les maths c'est souvent très simple ! Ce sont ceux qui vous les expliquent qui les rendent indigestes.

#### Petit rappel sur les droites

L'équation d'une droite est de la forme $y = a \cdot x + b$.

$a$ est la **pente** de cette droite *(coefficient directeur)*. Par exemple : je me promène en montagne et je monte d'1 mètre tous les 3 mètres, $a = 1/3$. Dans un repère orthonormé cela correspond à $\Delta y = 1$ pour $\Delta x = 3$.

$b$ *(ordonnée à l'origine)* est le niveau où la droite coupe l'axe vertical $Oy$. Sur le graphe ci-dessous, la droite coupe $Oy$ pour $y = 2$ quand $x = 0$, donc $b = 2$.

L'équation de cette droite est $y = \frac{1}{3} x + 2$.

{{< img src="images/equation-droite.png" alt="Équation d'une droite" width="50%" align="center" caption="Fig.6 - Équation d'une droite" >}}

Deux droites $y = a_1 x + b_1$ et $y = a_2 x + b_2$ sont **perpendiculaires** quand le produit de leurs pentes est égal à $-1$ : $a_1 \cdot a_2 = -1$. Dans l'exemple de la promenade en montagne, la pente perpendiculaire à la montée serait de descendre 3 mètres par mètre, donc $a_2 = -3/1$.

### Résoudre nos équations

**Le point $B(x_B\,;\,y_B)$**

$hautEncoche = 1{,}60\,m$ : je mesure 1m80, l'encoche est à 1,60 m du sol.  
$hautCible = 1{,}30\,m$ : le centre de la cible se trouve à 1,30 m du sol.  
$distCible = 10\,m$

$$x_B = distCible = 10\,m$$

$$y_B = hautCible - hautEncoche = -0{,}30\,m$$

Donc $B(10\,;\,-0{,}30)$.

Le décalage entre la hauteur de l'encoche et le centre de la cible est variable selon la taille de l'archer. J'ai nommé $angTerrain$ l'angle que forme ce décalage par rapport à la distance de tir :

$$angTerrain = \arctan(y_B / x_B) = \arctan(-0{,}30 / 10) = -1{,}718°$$

**Le point $A(x_A\,;\,y_A)$**

$angTir = 0{,}28323°$ : angle de tir pour une distance de cible de 10 m en tenant compte d'une pente de $-1{,}718°$.  
$OA = 0{,}910\,m$ : distance du point d'encochage jusqu'à l'axe du coulisseau vertical du viseur.

$$x_A = OA \cdot \cos(angTerrain + angTir)$$

$$y_A = OA \cdot \sin(angTerrain + angTir)$$

Donc $A(0{,}909714\,;\,-0{,}022791)$.

**Le point $C(x_C\,;\,y_C)$**

$distEncVisette = 0{,}170\,m$ : distance de l'encoche à la visette pour compound *(ou à l'œil pour le classique)*.  
$angCorde = 41{,}19°$ : angle de l'axe de la flèche à la corde pour compound.

$$x_C = distEncVisette \cdot \cos(angTerrain + angTir + angCorde)$$

$$y_C = distEncVisette \cdot \sin(angTerrain + angTir + angCorde)$$

Donc $C(0{,}130694\,;\,0{,}108716)$.

**La droite $(d1)$ : axe de visée passant par C et B**

$$a_1 = \frac{y_B - y_C}{x_B - x_C} \qquad b_1 = y_B - a_1 \cdot x_B$$

**La droite $(d2)$ : axe de la flèche passant par O et A**

$$a_2 = \frac{y_A}{x_A} \qquad b_2 = 0$$

**La droite $(d3)$ : axe du coulisseau passant par A et D**

$(d3) \perp (d2)$, donc $a_2 \cdot a_3 = -1 \Rightarrow a_3 = -1/a_2$

$$b_3 = y_A - a_3 \cdot x_A$$

**Le point $D(x_D\,;\,y_D)$ : intersection de $(d1)$ et $(d3)$**

$$\begin{aligned}
(d1) &= (d3) \\\\
a_1 x_D + b_1 &= a_3 x_D + b_3 \\\\
x_D &= \frac{b_3 - b_1}{a_1 - a_3} \\\\
y_D &= a_3 x_D + b_3
\end{aligned}$$

Donc $D(0{,}912198\,;\,0{,}076351)$.

**Et pour finir : $d = AD$** [(distance entre 2 points)](https://fr.wikipedia.org/wiki/Distance_entre_deux_points_sur_le_plan_cart%C3%A9sien)

$$\begin{aligned}
d &= \sqrt{(x_D - x_A)^2 + (y_D - y_A)^2} \\\\
d &= 0{,}099174\,m = 99{,}174\,mm
\end{aligned}$$

Voilà, toutes nos équations sont définies. Un tableur permettra d'automatiser cette série de calculs.

### Résultats

Informations nécessaires aux calculs :

$V = 100\,m/s$ — $m = 0{,}0227\,kg$ — $C_b = 0{,}000056547236$  
$hautEncoche = 1{,}60\,m$ — $hautCible = 1{,}30\,m$  
$OA = 0{,}910\,m$ — $distEncVisette = 0{,}170\,m$ — $angCorde = 41{,}19°$

| distCible [m] | angTir [deg] | *d* "absolu" [mm] | *d* "relatif" [mm] |
| :-----------: | :----------: | :---------------: | :----------------: |
|      10       |   0,28323    |      99,174       |       0,525        |
|      20       |   0,57142    |      99,699       |         0          |
|      30       |   0,86448    |      97,172       |       2,527        |
|      40       |   1,16258    |      93,837       |       5,862        |
|      50       |   1,46583    |      90,135       |       9,564        |
|      60       |   1,77440    |      86,212       |       13,487       |
|      70       |   2,08840    |      82,130       |       17,569       |

$d\,\text{"absolu"} = d = \text{distance } AD$  
$d\,\text{"relatif"} = d\,\text{"absolu max"} - d\,\text{"absolu"}$

### Régler son scope pour un tir à 40 m

{{< img src="images/sight-graduation-graph.png" alt="Graphe graduation viseur par rapport à la distance" width="90%" align="center" caption="Fig.7 - Graduation du viseur en fonction de la distance" >}}

On constate que la courbe n'est plus linéaire. Dans notre cas, pour tirer à 10 m, il faudra régler le viseur comme si l'on devait tirer à 21 m. Ce réglage peut paraître étonnant mais il est causé par le décalage de la ligne de visée par rapport à l'axe de la flèche. Selon la morphologie de l'archer et la configuration de son arc, cette courbe sera différente.

## Feuille de calcul

📥 [table-of-the-sighting-scheme_v1.xls](medias/table-of-the-sighting-scheme_v1.xls) — Excel, 31 Ko

## Références

[^1]: Forum tircollectif.com, [Tir en trajectoire montante](http://www.tircollection.com/t15512-tir-en-trajectoire-montante#201085). Consulté le 02/03/2026.
[^2]: Forum tircollectif.com, [Réglages de visée](http://www.tircollection.com/t12646-reglages-de-visee). Consulté le 02/03/2026.
