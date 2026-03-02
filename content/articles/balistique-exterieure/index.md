---
title: "Balistique extérieure — Le vol d'une flèche"
weight: 3
date: 2016-10-10
lastmod: 2026-03-02
tags: ["balistique", "vitesse"]
description: "Étude du vol d'une flèche : modèle mathématique, gravité, résistance de l'air, trajectoire parabolique et simulation tableur."
math: true
---

La balistique extérieure est l'étude du vol d'un projectile depuis la sortie de son arme jusqu'à l'impact. Elle s'applique plus communément aux balles de fusils, aux missiles balistiques, mais elle peut aussi s'appliquer aux flèches. Il est intéressant de connaître la trajectoire de vol d'une flèche et les différentes forces et paramètres qui l'influencent afin de maîtriser les réglages appropriés pour chaque configuration de tir.

## Droit au but !

On pourrait penser qu'il suffit d'aligner la flèche sur l'axe de la cible pour qu'elle aille se planter en plein dans le mille !  
Oui, cela serait aussi simple si notre terrain de tir se trouvait dans l'espace, quelque part entre deux galaxies...  
Mais sur le plancher des vaches, notre bonne vieille Terre nous joue des tours. Des forces viennent modifier la trajectoire de notre flèche.

{{< img src="images/balistique.png" alt="Graphique représentant la trajectoire d'une flèche" width="100%" align="center" caption="Fig.1 - Trajectoire d'une flèche" >}}

## L'accélération

En physique, l'accélération est un changement de la trajectoire d'un objet au cours du temps. Cela se traduit par un changement de vitesse durant un laps de temps.

Habituellement, par « accélération » nous comprenons une augmentation de la vitesse, et inversement par « décélération » une diminution de la vitesse. Mais en physique on différencie ces deux états par leur signe positif ou négatif. Si l'accélération est négative, il s'agit d'une diminution de vitesse, et inversement.

Dans notre cas, la trajectoire de la flèche est modifiée par deux types d'accélérations :

- la **gravité**, pesanteur ou attraction terrestre. La flèche est attirée par la Terre, comme les gouttes de pluie ou les pommes qui tombent de l'arbre.
- la **résistance de l'air**. Notre flèche est freinée par la densité de l'air environnante. Plus notre flèche sera **aérodynamique** et moins elle sera freinée par l'air, et inversement.

Le vent est aussi un paramètre qui peut modifier la trajectoire de notre flèche, et comme il est variable, on peut imaginer la complexité des calculs auxquels sont confrontés les ingénieurs en balistique[^1]. De plus, comme la Terre est ronde, pour des tirs à longue distance, il faut également tenir compte de la courbure terrestre. À chacun son métier — nous sommes des archers en herbe.

Pour l'étude de la trajectoire de notre flèche, je me limite à la gravité et à la résistance de l'air... donc un tir en salle.

À cause de l'influence de la gravité et de la résistance de l'air, la trajectoire de la flèche formera une courbure. Pour compenser ces effets, l'archer devra incliner l'axe de sa flèche vers le haut pour atteindre le centre de la cible. L'archer ajuste son **angle de tir**.

{{< img src="images/balistique-vitesse.png" alt="Influence de la vitesse sur la trajectoire d'une flèche" width="100%" align="center" caption="Fig.2 - Influence de la vitesse sur la trajectoire" >}}

Pour des conditions de tir identiques, flèches identiques, même poids :

- Si la vitesse initiale de la flèche est lente, alors la courbure de la trajectoire sera prononcée et l'angle de tir sera grand.
- Si la vitesse initiale de la flèche est rapide, alors la courbure de la trajectoire sera aplatie et l'angle de tir sera petit.

Pour mieux comprendre ce phénomène, par analogie : je souhaite arroser les plantes de mon jardin depuis un point fixe avec un tuyau d'arrosage. Je dois augmenter l'inclinaison de la buse pour que le jet d'eau atteigne les plants les plus éloignés. En modifiant la pression du jet, la portée change. Plus la pression est forte et moins j'ai besoin d'incliner la buse.

Pour les arcs équipés d'un viseur, l'archer règle la hauteur de l'œilleton ou du scope pour ajuster son angle de tir. S'il monte l'œilleton il réduit son angle de tir, s'il le descend il l'augmente. Pour des cibles placées à 50 m, il faut logiquement augmenter l'angle de tir et donc descendre l'œilleton du viseur.

## Modèle mathématique

Nous savons que le vol de notre flèche aura une allure parabolique pour atteindre sa cible, mais peut-on la déterminer avec exactitude ? Peut-on la tracer ?

Plutôt que de nous aventurer dans des développements mathématiques complexes, je propose une approche plus digeste. Nous allons créer un modèle mathématique[^2] cohérent regroupant des petites fonctions simples qui s'imbriquent les unes dans les autres. Grâce à un simple tableur, nous allons reconstituer point par point la trajectoire de notre flèche.

{{< img src="images/balistique-modele-mathematique.png" alt="Modèle mathématique du vol d'une flèche" width="100%" align="center" caption="Fig.3 - Schéma de principe du modèle mathématique" >}}

### 1) Vitesse

Équation de la vitesse par rapport à $v_x$ et $v_y$ :

$$v = \sqrt{v_x^2 + v_y^2}$$

Conditions initiales :

$V_0 = 100\,m/s$  
$\alpha = 41°$  
$x = 0$ et $y = 0$

où :  
$V_0$ [m/s] : vitesse initiale de la flèche  
$\alpha$ [°] : angle de tir  
$x$ et $y$ [m] : coordonnées du point de départ de la flèche

Projection de $V_0$ sur les axes x et y du repère orthonormé Oxy :

$$V_{0x} = V_0 \cdot \cos(\alpha)$$

$$V_{0y} = V_0 \cdot \sin(\alpha)$$

### 2) Accélération

Loi de Newton[^3] :

$$a = \frac{\sum F}{m}$$

où :  
$a$ [m/s²] : accélération instantanée  
$\sum F$ [N] : somme des forces exercées sur le centre de gravité de la flèche  
$m$ [kg] : masse de la flèche

Inventaire des forces exercées sur la flèche :

$$F_G = -m \cdot g$$

$$F_A = -\frac{1}{2} \cdot Cx \cdot \rho \cdot A \cdot v^2$$

avec :  
$F_G$ : force de gravité[^4]  
$F_A$ : force de résistance de l'air[^5]  
$g = 9{,}81$ [m/s²] : accélération gravitationnelle  
$m$ [kg] : masse de la flèche  
$Cx$ : coefficient aérodynamique  
$\rho$ [kg/m³] : masse volumique de l'air (varie avec la température et la pression)  
$A$ [m²] : aire de la section de la flèche faisant face à la résistance de l'air  
$v$ [m/s] : vitesse de déplacement de la flèche

Remarquez le signe négatif devant les équations de $F_G$ et de $F_A$ — il s'agit bien de forces qui freinent la vitesse de la flèche.

Projection des forces sur les axes x et y :

$$F_{Ax} = F_A \times \frac{v_x}{v}$$

$$F_{Ay} = F_A \times \frac{v_y}{v}$$

où $\frac{v_x}{v}$ et $\frac{v_y}{v}$ sont les rapports angulaires de $v$ par rapport à $x$ et $y$. Comme la force de résistance de l'air $F_A$ s'oppose à la vitesse $v$, elle a proportionnellement le même rapport angulaire.

Projection de l'accélération sur x et y :

$$a_x = \frac{F_{Ax}}{m}$$

$$a_y = \frac{F_{Ay} + F_G}{m}$$

où $a_x$ et $a_y$ sont les projections de l'accélération instantanée $a$ sur les axes x et y. Comme la force d'attraction terrestre $F_G$ est toujours verticale, sa projection sur l'axe x est nulle.

### 3) Temps

Le vol de la flèche durera quelques dixièmes de secondes voire plusieurs secondes selon la distance à atteindre. Nous allons décomposer ce temps de vol en de minuscules laps de temps ***dt*** et calculer comment évoluent la vitesse et la distance en fonction de l'accélération. Les distances parcourues seront notées ***dx*** et ***dy***, et les variations de vitesse ***dvx*** et ***dvy***. Plus *dt* sera petit et plus précise sera la résolution de notre trajectoire de vol !

Minuscules variations de vitesse durant un laps de temps *dt* :

$$dv_x = a_x \cdot dt$$

$$dv_y = a_y \cdot dt$$

Minuscules distances parcourues durant un laps de temps *dt* :

$$dx = \left(v_x + \frac{dv_x}{2}\right) \cdot dt$$

$$dy = \left(v_y + \frac{dv_y}{2}\right) \cdot dt$$

Pour ces deux dernières équations, une explication s'impose :  
$v_x$ est la vitesse de la flèche au **début** du laps de temps *dt*.  
$v_x + dv_x$ est la vitesse de la flèche à la **fin** du laps de temps *dt*.  
$\left(v_x + \frac{dv_x}{2}\right)$ est la **vitesse moyenne** de la flèche durant le laps de temps *dt*.

Il faut utiliser la vitesse moyenne pour le calcul de $dx$ et $dy$ !

Évolution de la distance et de la vitesse :

$$x_{(t)} = x_{(t-1)} + dx_{(t-1)}$$

$$y_{(t)} = y_{(t-1)} + dy_{(t-1)}$$

$$v_{x(t)} = v_{x(t-1)} + dv_{x(t-1)}$$

$$v_{y(t)} = v_{y(t-1)} + dv_{y(t-1)}$$

Par *...(t)* il faut comprendre : valeur au début du laps de temps *dt* actuel.  
Par *...(t-1)* il faut comprendre : valeur au laps de temps *dt* précédent.

Voilà, nous avons tous les ingrédients pour calculer et tracer la trajectoire de notre flèche.

## Trajectoire d'une flèche

À ce stade, nous avons accumulé quelques formules. Elles peuvent être utilisées telles quelles — on sent qu'elles s'imbriquent les unes dans les autres. Un [tableur](https://fr.wikipedia.org/wiki/Tableur) est l'outil parfait pour ce type de travail.

Dans un coin de la feuille de calcul on définit les différentes constantes. Pour des raisons de lisibilité, il est recommandé de les nommer. Excel dispose pour cela d'un « gestionnaire de noms » sous l'onglet « FORMULES ». Notez que les angles utilisés dans les formules trigonométriques dans Excel sont exprimés en radian : $\alpha_{radian} = \alpha_{degré} \times \pi() / 180$.

{{< img src="images/balistique-tableur-constantes.png" alt="Calcul de la trajectoire - les constantes" width="100%" align="center" caption="Fig.4 - Définition des constantes dans le tableur" >}}

Il suffit ensuite de créer les colonnes représentant les différentes variables du modèle mathématique (x, y, vx, vy, v, FA, FAx, FAy, ax, ay, dvx, dvy, dx, dy) et d'appliquer scrupuleusement les formules en imbriquant les variables entre elles.

Conditions initiales à t = 0 :  
$x = 0$  
$y = 0$  
$vx = V_0 \cdot \cos(\alpha)$  
$vy = V_0 \cdot \sin(\alpha)$

Toutes les autres formules se répètent. 1 ligne de calcul correspond à un point (x, y) de la courbe. Ajuster le nombre de lignes selon la résolution souhaitée.

{{< img src="images/balistique-tableur-formules.png" alt="Calcul de la trajectoire - les formules mathématiques" width="100%" align="center" caption="Fig.5 - Formules mathématiques dans le tableur" >}}

### Ajuster *dt*

La précision de la résolution dépend du laps de temps *dt*. Dans la pratique, les angles de tir sont petits pour des distances inférieures à 100 m, et les temps de vol sont souvent inférieurs à 1 s. Un *dt = 0,02 s* pour un temps de vol d'1 seconde correspond à 50 points (x, y) — insuffisant. Un *dt = 0,002 s* serait plus convenable : 500 points (x, y). Ajuster *dt* en fonction du temps que mettra la flèche pour se planter dans la cible.

### Déchiffrer les informations

Pour lire la portée maximale de tir, il suffit de lire la valeur de x quand le signe de y devient négatif. Cette feuille de calcul permet de répondre à de nombreuses questions :

- Quelle est la hauteur de tir maximale ?
- Quel est le temps de vol de ma flèche ?
- Quel est l'angle de tir pour atteindre ma cible placée à 30 m ?
- Avec ce même angle de tir, à combien de centimètres du centre sera plantée ma flèche si la cible se trouve à 50 m ?
- Quelle est la différence d'angle de tir entre une cible placée à 30 m et une cible placée à 50 m ?

{{< img src="images/balistique-trajectoire-fleche.png" alt="Graphique de la trajectoire d'une flèche" width="100%" align="center" caption="Fig.6 - Trajectoire calculée d'une flèche" >}}

## Ajuster le modèle

Selon que nous pratiquons le tir en plein désert ou au sommet de l'Everest, les conditions ne sont pas identiques. La température, la pression, la densité de l'air varient, et la trajectoire de notre flèche peut changer.

La force de résistance de l'air dépend de trois constantes : le coefficient aérodynamique *Cx*, la densité de l'air *ρ* et l'aire de la section de la flèche *A*. On peut les regrouper en une seule résultante $k = Cx \cdot \rho \cdot A$. Il suffit de déterminer la valeur de *k* pour ajuster le modèle à la réalité. Par exemple, avec une machine de tir, on vise le centre d'une cible à 50 m et on chronomètre le temps de vol — puis on ajuste *k* pour obtenir le même temps de vol dans le tableur.

## Restons réfléchis !

Il faut bien comprendre ce que nous faisons en changeant les valeurs des constantes. On ne peut rien casser — il s'agit d'un outil de simulation — mais les résultats peuvent être inattendus. Par exemple : que se passe-t-il si je modifie la masse de la flèche de 22,7 grammes à 1 kilogramme ? La flèche vole plus loin... bizarre, une flèche beaucoup plus lourde vole beaucoup plus loin !

Réfléchissons : une flèche de 1 kg avec une vitesse initiale $V_0 = 100\,m/s$, est-ce cohérent ?

$$W = \frac{1}{2}mv^2 = \frac{1}{2} \times 1\,kg \times 100^2 = 5000\,J$$

Notre arc développe environ 100 joules. Si j'ajuste le poids de ma flèche, cela a une incidence sur la vitesse initiale car la puissance de l'arc ne change pas. Une flèche plus lourde est peut-être aussi plus volumineuse — le *Cx* a-t-il changé ?

## Bonus

📥 [trajectoireFleche_v1.xls](medias/trajectoireFleche_v1.xls) — Fichier Excel, 454 Ko

## Références

[^1]: Wikipedia, [Balistique](https://fr.wikipedia.org/wiki/Balistique). 02/03/2026.
[^2]: Jasmin Ludwig, [Vergleich verschiedener Modellbildungssysteme](http://www.thomas-wilhelm.net/arbeiten/Zulassungsarbeit%20Modellbildung.pdf), mémoire du 14/09/2012, encadrant Prof. Dr. Thomas Wilhelm. Kapitel 6 - Der schiefe Wurf mit Luftreibung (p. 81-86). Consulté le 02/03/2026.
[^3]: Wikipedia, [Deuxième loi de Newton](https://fr.wikipedia.org/wiki/Lois_du_mouvement_de_Newton), Lois du mouvement de Newton. 02/03/2026.
[^4]: Wikipedia, [Pesanteur](https://fr.wikipedia.org/wiki/Pesanteur). 02/03/2026.
[^5]: Wikipedia, [Coefficient de traînée](https://fr.wikipedia.org/wiki/Coefficient_de_tra%C3%AEn%C3%A9e). 02/03/2026.
