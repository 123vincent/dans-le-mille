---
title: "Tirer sur un terrain en pente"
date: 2016-10-10
lastmod: 2026-03-02
weight: 5
tags: ["balistique", "pente du terrain"]
description: "Ajustement du modèle balistique pour un terrain en pente : projection de la pesanteur, rotation de repère, et estimation pratique de la correction de tir."
math: true
---

## Satanée gravité !

L'air de rien, la gravité terrestre est présente dans notre quotidien. Nous n'y prêtons même plus attention, tellement c'est normal. Pour en prendre conscience, je vous propose de faire l'expérience suivante : posez vos deux mains sur le sol, bras tendus, jambes tendues, corps parallèle au sol, et maintenez cette position le plus longtemps possible. Pas si facile — difficile de résister à l'attraction terrestre !

Tel un aimant, la Terre attire la matière vers elle. C'est pour cette raison que l'eau coule dans les rivières, que la pomme tombe de l'arbre... et que la trajectoire de notre flèche n'est pas droite.

## Ajustement de notre modèle mathématique

La force de pesanteur est une force dirigée vers le centre de la Terre. Cette force est toujours perpendiculaire à la surface terrestre et non à la pente du terrain.

Il convient d'ajuster le modèle mathématique étudié dans le [chapitre 3](/articles/balistique-exterieure/) — adapté pour un terrain plat — pour tenir compte de la pente du terrain.

{{< img src="images/balistique-modele-mathematique-pente.png" alt="Modèle mathématique du vol d'une flèche sur un terrain en pente" width="100%" align="center" caption="Fig.1 - Modèle mathématique adapté à un terrain en pente" >}}

### 2) Accélération — nouveauté

La seule chose qui change par rapport au [modèle du chapitre 3](/articles/balistique-exterieure/) se situe au paragraphe **2) Accélération** : la projection de la force de pesanteur sur les axes du repère $(0\,;\,x\,;\,y)$.

Projection des forces sur les axes x et y, avec l'angle exprimé en **degré** :

$$F_{Gx} = F_G \times \cos(-1 \times pente - 90)$$

$$F_{Gy} = F_G \times \sin(pente - 90)$$

Projection des forces sur les axes x et y, avec l'angle exprimé en **radian** (pour Excel), sachant que $\pi \leftrightarrow 180°$ :

$$F_{Gx} = F_G \times \cos\left(-pente \times \frac{\pi}{180} - \frac{\pi}{2}\right)$$

$$F_{Gy} = F_G \times \sin\left(pente \times \frac{\pi}{180} - \frac{\pi}{2}\right)$$

Projection de l'accélération sur x et y :

$$a_x = \frac{F_{Ax} + F_{Gx}}{m}$$

$$a_y = \frac{F_{Ay} + F_{Gy}}{m}$$

où $a_x$ et $a_y$ sont les projections de l'accélération instantanée $a$ sur les axes x et y.

### Rotation plane

J'ai effectué une rotation plane[^1] du repère $(0\,;\,x\,;\,y)$ de la valeur de la pente du terrain, dans un nouveau repère $(0\,;\,x_p\,;\,y_p)$. L'axe $x_p$ correspond à la surface terrestre. Quand le terrain est descendant, la pente est négative, et inversement pour un terrain ascendant.

Formules de changement d'axes de coordonnées :

$$x_p = x \cdot \cos(pente) - y \cdot \sin(pente)$$

$$y_p = x \cdot \sin(pente) + y \cdot \cos(pente)$$

où :  
$pente$ [°] : pente du terrain.  
$(x, y)$ : coordonnées du point dans le repère orthonormé $(0\,;\,x\,;\,y)$.  
$(x_p, y_p)$ : coordonnées du point dans le nouveau repère orthonormé $(0\,;\,x_p\,;\,y_p)$.

## Application pratique

Configuration de tir :

$V_0 = 300\,\text{[fps]}$ (soit $91{,}4\,m/s$), vitesse initiale de la flèche.  
$m = 350\,\text{[gr]}$ (soit $22{,}68\,g$), poids de la flèche.  
$C_b = 0{,}000056547236$, coefficient balistique de la flèche.  
$listeDist = 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70\,\text{[m]}$

3 simulations : pente du terrain = $0°$, $+30°$, $-30°$.

{{< img src="images/tableau-valeurs-angTir-distTir.png" alt="Tableau de valeurs, angles de tir - distances de tir" width="80%" align="center" caption="Fig.2 - Angles de tir en fonction de la distance pour différentes pentes" >}}

{{< img src="images/graphe-angTir-distTir.png" alt="Graphe, angles de tir - distances de tir" width="80%" align="center" caption="Fig.3 - Graphe des angles de tir" >}}

On s'aperçoit que, pour une distance de tir donnée, les angles de tir sont systématiquement **plus petits** quand on tire sur un terrain en pente que sur un terrain plat.

Pour une distance de tir donnée, il faudra systématiquement **réduire** le réglage de cette distance sur le viseur lorsqu'on tire sur un terrain en pente.

Pour des distances rapprochées cette correction sera minime, mais plus les distances sont longues et plus il faudra corriger l'angle de tir. Logiquement, plus la pente est proche de $0°$ *(terrain plat)*, moins il faudra ajuster les réglages. Plus le terrain est pentu, plus la correction sera importante.

On remarque aussi que selon une pente ascendante ou descendante, la correction sera sensiblement différente.

## Estimation de la correction de tir

Sur l'exemple suivant, notre archer tire sur une cible placée à 30 mètres, sur un terrain ascendant ou descendant ayant une pente de 30°. Objectif : à quelle distance doit-on régler le viseur pour atteindre le centre de la cible ?

{{< img src="images/balistique-tirer-sur-un-terrain-en-pente.png" alt="Balistique, tirer sur un terrain en pente" width="100%" align="center" caption="Fig.4 - Tirer sur un terrain en pente" >}}

Il ne faut pas prendre en compte la distance à laquelle on voit la cible *(distance parallèle à la pente du terrain)*, ici 30 m, mais estimer la **distance réelle**, parallèle à la surface terrestre.

Petit calcul de trigonométrie :

- Distance réelle, parallèle à la surface terrestre = côté adjacent
- Distance visible, parallèle à la pente du terrain = hypoténuse

$$\text{distance réelle} = \text{distance visible} \times \cos(pente)$$

Application pratique :

$$\text{distance réelle} = 30\,m \times \cos(30°) = 26\,m$$

Pour cette configuration de tir, il faudra régler son viseur sur 26 m **plus ou moins** quelques centimètres !

### Plus ou moins ?

La force de pesanteur $F_G$ est verticale et perpendiculaire à la surface terrestre. Elle est la résultante de $F_{Gx} + F_{Gy}$, où $F_{Gx}$ est la projection sur l'axe $x$ correspondant à la pente du terrain.

Sur un terrain **ascendant**, le vecteur $F_{Gx}$ est contraire au sens de vol de la flèche — il représente une décélération. La flèche ira moins loin. Pour atteindre le centre de la cible il faudra augmenter légèrement l'angle de tir : cela correspond à $26\,m$ **plus** quelques centimètres.

Sur un terrain **descendant**, le vecteur $F_{Gx}$ va dans le sens de vol de la flèche — il représente une accélération. La flèche ira plus loin. Pour atteindre la cible il faudra réduire légèrement l'angle de tir : cela correspond à $26\,m$ **moins** quelques centimètres.

### Mais de combien exactement ?

{{< img src="images/graphe-plus-ou-moins.png" alt="Graphe plus ou moins" width="100%" align="center" caption="Fig.5 - Détail de la correction autour de 26 m" >}}

Ce graphe est une représentation détaillée centrée sur les distances voisines de 26 m. On part de 30 m (distance de la cible sur terrain pentu de 30°) et on suit le cheminement illustré. La courbe jaune correspond au terrain plat.

On remarque que la compensation sur un terrain descendant est très minime $(-0{,}2\,m)$, tandis que celle sur un terrain ascendant l'est un peu davantage $(+0{,}3\,m)$.

## Comment gérer la situation sur le terrain ?

Sur le terrain on ne se promène pas forcément avec sa calculatrice. Lors d'un concours, c'est carrément interdit ! Voici un rapide tableau d'approximation pour évaluer la distance réelle en fonction de la pente :

{{< img src="images/tableau-estimation-distance-reelle.png" alt="Tableau d'estimation de la distance réelle" width="40%" align="center" caption="Fig.6 - Estimation rapide de la distance réelle" >}}

Application pratique :

Pente du terrain = 30°, se situe entre 25° et 35° dans le tableau → la distance réelle est comprise entre $-10\%$ et $-20\%$.  
Distance de tir = 30 m : $-10\%$ correspond à 3 m, $-20\%$ correspond à 6 m, entre les deux on a 4,5 m.  
**Distance réelle = 30 m − 4,5 m = 25,5 m** *(erreur au pire de 0,8 m)*.

Sur le terrain il est difficile d'évaluer précisément une pente ou une distance — nous restons dans le domaine de l'approximation. À moins de se promener avec son télémètre indiquant distance et angle, ces théories permettent surtout d'appréhender au mieux la situation et d'agir correctement sur les bons paramètres. Au pire, cela nous évitera de perdre quelques flèches.

## En bref

Généralement nous relevons nos distances de tir sur un terrain plat. Quand nous sommes amenés à tirer sur un terrain pentu, il faudra systématiquement **réduire** le réglage de la distance sur le viseur.

Il faut estimer la **distance réelle de la cible, parallèle à la surface terrestre** et non parallèle à la pente :

$$\text{distance réelle} = \text{distance parallèle à la pente} \times \cos(\text{angle de la pente})$$

Sur une pente **descendante**, enlever quelques centimètres à cette distance réelle.  
Sur une pente **ascendante**, ajouter quelques centimètres à cette distance réelle.

## Références

[^1]: Wikipedia, [Rotation plane](https://fr.wikipedia.org/wiki/Rotation_plane#Formules_de_changement_d.27axes_de_coordonn.C3.A9es). 02/03/2026.
