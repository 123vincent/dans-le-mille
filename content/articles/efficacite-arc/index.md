---
title: "Calculer l'efficacité de son arc"
date: 2016-10-10
lastmod: 2026-02-27
tags: ["efficacité", "énergie", "vitesse", "IBO"]
description: "Comment évaluer les performances de son arc compound : énergie accumulée, cycle d'hystérésis, énergie cinétique, masse virtuelle et standard IBO."
math: true
---

Je peux lire « IBO Rating up to 336 fps » dans le tableau des caractéristiques techniques publiées par le constructeur de mon arc à poulies. Mes flèches volent à une vitesse de 336 foot/s soit 368 km/h. Wouaw, mon compound est une vraie bête de course !… mais qu'en est-il en réalité ? Comment interpréter les caractéristiques fournies par les constructeurs ? Comment mesurer la puissance de mon arc ? Comment évaluer la vitesse d'une flèche ? Comment déterminer l'efficacité de mon compound ?

## Une méthode

Il y a certainement mille façons d'évaluer les performances de son arc. Je me suis basé sur une méthode publiée en 1975 par **Norbert F. Mullaney**[^1], et qui me semble être aujourd'hui encore tout aussi crédible.

## Unités de mesure

90 % du marché de l'archerie est anglo-saxon. Ces pays utilisent les unités de mesure anglaises. Pour une meilleure compréhension, je choisis d'indiquer les valeurs dans le système international d'unités SI[^2], qui m'est plus familier.

## Partie 1 : Énergies statiques

### Énergie accumulée

L'énergie accumulée est déterminée à l'aide de la **courbe de force-allonge**. Avec un peson, on relève la force de traction sur la corde, à intervalle régulier, jusqu'à pleine allonge.

1) On obtient le **tableau 1** suivant :

{{< img src="images/tableaux-force-allonge.gif" alt="Tableaux de valeur force-allonge" width="100%" align="center" caption="Tableau 1 - Relevé force-allonge" >}}

2) **Tableau 2** : les valeurs sont converties dans le système SI. Les longueurs sont exprimées en mètre et les forces en Newton : $10\,\text{cm} = 0{,}10\,\text{m}$ et $1\,\text{N} = 1\,\text{kg} \times 9{,}81\,\text{m/s}^2$. Ce sont ces valeurs qui ont servi à construire le **graphique 1**.

Pour comparaison, le **tableau 3** présente les valeurs converties en unités anglaises : $1\,\text{in} = 2{,}54\,\text{cm}$ et $1\,\text{kg} = 2{,}20462\,\text{lbs}$. Peu importe le système d'unité utilisé, la courbe force-allonge (*Force-Draw Curve*) sera exactement la même. Le **graphique 1** commence à 0,18 m (soit 7 pouces), ce qui correspond au band de l'arc. 0,72 m (soit 28 pouces) est la pleine allonge.

{{< img src="images/graphique-force-allonge.png" alt="Graphique force-allonge" width="100%" align="center" caption="Graphique 1 - Courbe force-allonge" >}}

L'énergie accumulée $W_{\text{in}}$ correspond à la surface située entre la courbe et l'axe des abscisses. En mathématique, il s'agit de l'intégration[^3] de la courbe, de 0 jusqu'à la pleine allonge. Le calcul est simple : il suffit de calculer l'énergie accumulée de chaque segment, puis de les additionner :

$$W_{\text{in}} = W_{\text{in(1)}} + W_{\text{in(2)}} + \cdots + W_{\text{in(n)}}$$

{{< img src="images/graphique-energie-accumulee.png" alt="Graphique énergie accumulée" width="100%" align="center" caption="Graphique 2 - Énergie accumulée par segment" >}}

L'énergie accumulée d'un segment est la valeur moyenne de $a$ et $b$ multipliée par la largeur du segment (pas). Le résultat est une énergie en joules [J] :

$$W_{\text{in par segment}} = \frac{(a+b)}{2} \times \text{pas}$$

Pas besoin d'ordinateur pour faire cette intégration — une simple feuille de papier et une calculette suffisent. On obtient le résultat suivant :

{{< img src="images/tableaux-energie-accumulee.gif" alt="Tableau de calcul de l'énergie accumulée" width="60%" align="center" caption="Tableau - Calcul de l'énergie accumulée" >}}

Quand cet arc est armé jusqu'à pleine allonge (0,72 m soit 28 pouces), il accumule une énergie de **88 joules**. Le pic de force maximale de la courbe est de 218 N. Pour un arc à poulies, ce pic se situe vers le milieu de la courbe ; pour les autres types d'arc, il est atteint à pleine allonge.

### Rendement

Lors du choix d'un arc, l'objectif est qu'il accumule le plus d'énergie possible pour une force maximale donnée. Ce rapport représente le rendement de l'arc :

$$\begin{aligned}
\text{Rendement} &= \frac{W_{\text{in}}}{\text{Pic} \times (\text{pleine allonge} - \text{band})} \times 100 \\\\
&= \frac{88}{218 \times (0{,}72 - 0{,}18)} \times 100 = 74{,}7\,\%
\end{aligned}$$

### Cycle d'hystérésis

Dans tout système mécanique naissent des phénomènes de frottement entre pièces fixes et mobiles. Lors de la décoche, l'arc subit des pertes d'énergie dues notamment à l'élasticité des branches, aux frottements cordes-poulies, etc. On peut visualiser ces pertes en traçant la courbe d'hystérésis.

Pour mesurer cette boucle : avec un peson, on relève la force de traction à intervalle régulier depuis le band jusqu'à pleine allonge, puis dans le sens inverse depuis la pleine allonge jusqu'au band.

{{< img src="images/graphique-energie-disponible.png" alt="Courbe d'hystérésis" width="100%" align="center" caption="Graphique 3 - Cycle d'hystérésis" >}}

L'énergie disponible $W_{\text{dispo}}$ est calculée avec la même méthode que $W_{\text{in}}$. L'efficacité statique est alors :

$$Eff_{statique} = \frac{W_{dispo}}{W_{in}} \times 100$$

## Partie 2 : Performances de tir

### Énergie cinétique

Lors du décochage, l'énergie accumulée est restituée à la flèche sous forme de vitesse. L'énergie cinétique $W_{\text{out}}$ tient compte de l'énergie disponible **et** de toutes les pertes cinétiques (frictions, vibrations, résistance de l'air, frottement sur le repose-flèche, etc.) — c'est **toute** l'énergie restituée à la flèche :

$$W_{out} = \frac{1}{2} m v^2$$

$$\begin{aligned}
&\text{avec} \\\\
&W_{out} = \text{énergie cinétique en [joules]} \\\\
&m = \text{masse de la flèche en [kg]} \\\\
&v = \text{vitesse de la flèche en [m/s]}
\end{aligned}$$

### La vitesse de la flèche

La vitesse d'une flèche détermine sa trajectoire. Moins la flèche est rapide, plus sa trajectoire est courbée et moins le tir est précis. Il existe plusieurs méthodes de mesure :

- **Par effet Doppler** (principe du radar) : un faisceau d'ondes est projeté vers la flèche, le décalage entre émission et réception donne la vitesse. *(radarchron)*
- **Par barrage photo-électrique** : la flèche coupe deux barrières lumineuses séparées d'une distance connue, un chronomètre mesure le temps de passage. *(Shooting Chrony)*
- **Par la vitesse du son** (337 m/s) : on enregistre le son d'une séquence de tir avec un smartphone. On mesure le temps entre le « **clac** » du décochage et le « **toc** » de l'impact dans la cible. *(Achrono pour iPhone)*

J'ai opté pour la solution smartphone : abordable (moins d'un euro), pratique, intuitive, et elle tient compte de l'aérodynamisme de la flèche. Inconvénient : en extérieur, le vent peut ralentir la flèche, et la mesure nécessite de tirer seul.

Application numérique :

$$\begin{aligned}
m &= \frac{354\,\text{[gr]}}{15{,}432} \times 0{,}001 = 0{,}02294\,\text{kg} \\\\
v &= 269\,\text{[fps]} \times 0{,}3048 = 82\,\text{m/s} \\\\
W_{\text{out}} &= \frac{1}{2}mv^2 = \frac{1}{2} \times 0{,}022939 \times 82^2 = 77{,}12\,\text{J}
\end{aligned}$$

#### Fiabilité de la mesure de vitesse

Pour garantir une certaine précision[^4], il faut répéter la mesure plusieurs fois et travailler sur un échantillon. La valeur moyenne caractérise l'échantillon, et l'écart-type *sigma* indique la dispersion des données autour de cette moyenne — plus *sigma* est petit, plus la mesure est fiable :

$$\text{moyenne} = \frac{\text{mes}_1 + \text{mes}_2 + \cdots + \text{mes}_n}{n}$$

$$\sigma = \sqrt{\frac{(\text{mes}_1 - \bar{x})^2 + (\text{mes}_2 - \bar{x})^2 + \cdots + (\text{mes}_n - \bar{x})^2}{n - 1}}$$

### Efficacité de l'arc

L'efficacité réelle de l'arc est le rapport entre l'énergie cinétique transmise à la flèche et l'énergie accumulée :

$$\begin{aligned}
W_{\text{in}} &= 88\,\text{J} \\\\
W_{\text{out}} &= 77{,}12\,\text{J} \\\\
\text{Eff.}_{\text{arc}} &= \frac{W_{\text{out}}}{W_{\text{in}}} \times 100 = \frac{77{,}12}{88} \times 100 = 87{,}6\,\%
\end{aligned}$$

### La masse virtuelle

**Paul Klopsteg** a introduit le concept de masse virtuelle $m_K$ : une masse fictive se déplaçant à la vitesse de la flèche et représentant toutes les pertes d'énergie générées par l'arc.

En partant de :

$W_{\text{out}} = \frac{1}{2}mv^2 \quad \Leftrightarrow \quad v^2 = \frac{2W_{\text{out}}}{m}$

On pose :

$\begin{aligned}
W_{\text{in}} &= \frac{1}{2}(m + m_K)v^2 \\\\
&= \frac{1}{2}mv^2 + \frac{1}{2}m_K v^2 \\\\
&= W_{\text{out}} + \frac{1}{2}m_K \left(\frac{2W_{\text{out}}}{m}\right) \\\\
W_{\text{in}} &= W_{\text{out}} + \frac{m_K}{m} W_{\text{out}}
\end{aligned}$

D'où :

$\begin{aligned}
\frac{m_K}{m} W_{\text{out}} &= W_{\text{in}} - W_{\text{out}} \\\\
m_K &= m \left(\frac{W_{\text{in}}}{W_{\text{out}}} - 1\right)
\end{aligned}$

Application numérique :

$\begin{aligned}
W_{\text{in}} &= 88\,\text{J} \\\\
W_{\text{out}} &= 77{,}12\,\text{J} \\\\
m &= 354\,\text{grains} \\\\
m_K &= 354 \times \left(\frac{88}{77{,}12} - 1\right) = 49{,}94\,\text{grains}
\end{aligned}$

#### Calcul de la vitesse en fonction du poids de la flèche

<dl>
<dd>En arrangeant la formule de $W_{\text{in}}$ :</dd>
<dd>$\begin{aligned}
W_{\text{in}} &= \frac{1}{2}(m + m_K)v^2 \\\\
v &= \sqrt{\frac{2\,W_{\text{in}}}{m + m_K}}
\end{aligned}$</dd>
<dd>Ne pas oublier de convertir les grains [gr] en [kg]! :</dd>
<dd>$1\,\text{kg} = \dfrac{1\,\text{gr}}{15{,}432} \times 0{,}001$</dd>
<dd>Application pratique :</dd>
<dd>$\begin{aligned}
W_{\text{in}} &= 88\,\text{J} \\
m_K &= 50\,\text{gr} = 0{,}00324\,\text{kg}
\end{aligned}$</dd>
</dl>

{{< img src="images/tableau-vitesse-poids.gif" alt="Tableau vitesse en fonction du poids de la flèche" width="60%" align="left" caption="Tableau - Vitesse de la flèche en fonction de son poids" >}}

#### Calcul de l'efficacité en fonction du poids de la flèche

<dl>
  <dd>On arrange la formule suivante :</dd>
  <dd>$\begin{aligned}
Eff_{\text{arc}} &= \frac{W_{\text{out}}}{W_{\text{in}}} \times 100 \\\\
&= \frac{\tfrac{1}{2}mv^2}{\tfrac{1}{2}(m+m_K)v^2} \times 100 \\\\
&= \frac{m}{m + m_K} \times 100
\end{aligned}$</dd>
  <dd>Application pratique :</dd>
  <dd>$m_K = 50\,\text{gr} = 0{,}00324\,\text{kg}$</dd>
</dl>

{{< img src="images/tableau-poids-efficacite.gif" alt="Tableau efficacité en fonction du poids de la flèche" width="50%" align="left" caption="Tableau - Efficacité de l'arc en fonction du poids de la flèche" >}}

### Standard IBO

Les vitesses annoncées par les constructeurs suivent le standard IBO, qui définit des paramètres de test précis :

- Puissance de l'arc : 70 lbs
- Poids de la flèche : 350 grains (soit 5 grains par lbs)
- Allonge : 30 in

### En bref

- En armant l'arc, celui-ci accumule une certaine quantité d'énergie. Le relevé de la courbe force-allonge permet de calculer $W_{\text{in}}$. Comme pour tout système mécanique, il y a des pertes statiques — seule une partie de cette énergie est disponible.
- Pour évaluer l'énergie cinétique réellement transmise à la flèche, il faut mesurer sa vitesse à l'aide d'un chronographe.
- L'efficacité réelle de l'arc est le rapport $W_{\text{out}} / W_{\text{in}}$.
- La masse virtuelle $m_K$ matérialise toutes les pertes de la configuration arc-flèche et permet d'évaluer le meilleur compromis poids/efficacité.
- Connaître ces informations ne fera pas de moi un meilleur archer, mais me permettra de mieux comprendre et configurer mon arc.

## Références

[^1]: Norb Mullaney, [How and Why Archery World Bow Test are Conducted](http://www.outlab.it/doc/norb75.pdf), Archery World, édition 1975. Consulté le 27.02.2026.
[^2]: Wikipedia, [Système international d'unités](https://fr.wikipedia.org/wiki/Syst%C3%A8me_international_d%27unit%C3%A9s), 27.02.2026.
[^3]: Wikipedia, [Intégration (mathématiques)](https://fr.wikipedia.org/wiki/Int%C3%A9gration_(math%C3%A9matiques)), Méthodes numériques, 27.02.2026.
[^4]: Neamar, [La moyenne et l'écart type](http://neamar.fr/Res/Harmonisation/). Consulté le 27.02.2026.
