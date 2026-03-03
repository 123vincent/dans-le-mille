/*!
 * dans-le-mille.fr - fonctions de calcul communes
 * Auteur: Vincent B. — Licence WTFPL http://www.wtfpl.net/
 */

function round(value, decimals) {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}

function maxGrad(value, step) {
    return Math.ceil(value / step) * step;
}

function getMinTab(arr) {
    return Math.min.apply(null, arr);
}

function getMaxTab(arr) {
    return Math.max.apply(null, arr);
}

/**
 * Energie statique accumulée lors de l'armement de l'arc.
 * @param {number} band      - Brace height [inch]
 * @param {number} allonge   - Draw length [inch]
 * @param {Array}  forces    - Tableau de forces [lbs] (min 2 valeurs)
 * @returns {Array} Tableau d'objets {allonge, force, energie, cumul}
 */
function getStaticEnergy(band, allonge, forces) {
    var n = forces.length;
    var step = (allonge - band) / (n - 1);
    var result = new Array(n);

    result[0] = { allonge: band, force: forces[0], energie: 0, cumul: 0 };

    for (var i = 1; i < n; i++) {
        var energie = 4.44973752 * (forces[i - 1] + forces[i]) / 2 * step * 0.0254;
        result[i] = {
            allonge: band + i * step,
            force:   forces[i],
            energie: energie,
            cumul:   result[i - 1].cumul + energie
        };
    }
    return result;
}

/**
 * Energie cinétique de la flèche.
 * @param {number} masse   - Masse de la flèche [grain]
 * @param {number} vitesse - Vitesse [fps]
 * @returns {number} Energie cinétique [joule]
 */
function getKineticEnergy(masse, vitesse) {
    var v_ms = 0.3048 * vitesse;
    return (masse / 15.432) * 5e-4 * v_ms * v_ms;
}

/**
 * Efficacité de l'arc [%].
 * @param {number} win    - Energie statique [joule]
 * @param {number} masse  - Masse flèche [grain]
 * @param {number} vitesse - Vitesse flèche [fps]
 */
function getBowEfficiency(win, masse, vitesse) {
    return getKineticEnergy(masse, vitesse) / win * 100;
}

/**
 * Masse virtuelle de l'arc [grain].
 */
function getVirtualMass(win, masse, vitesse) {
    var wout = getKineticEnergy(masse, vitesse);
    return masse * (win / wout - 1);
}

/**
 * Vitesse théorique pour une masse de flèche donnée [fps].
 * @param {number} win    - Energie statique [joule]
 * @param {number} masse  - Masse flèche de référence [grain]
 * @param {number} vitesse - Vitesse flèche de référence [fps]
 * @param {number} masseNouvelle - Masse flèche cible [grain]
 */
function getArrowVelocity(win, masse, vitesse, masseNouvelle) {
    var mk = getVirtualMass(win, masse, vitesse);
    var m_kg  = masseNouvelle / 15.432 * 0.001;
    var mk_kg = mk / 15.432 * 0.001;
    return Math.sqrt(2 * win / (m_kg + mk_kg)) / 0.3048;
}

/**
 * Efficacité en masse [%] pour une masse de flèche donnée.
 */
function getMassEfficiency(win, masse, vitesse, masseNouvelle) {
    var mk = getVirtualMass(win, masse, vitesse);
    return masseNouvelle / (masseNouvelle + mk) * 100;
}

/**
 * Graduation du viseur.
 */
var getGradSight = function(a, e, f, d, c, b, m) {
    var g  = 180 * Math.atan((c - f) / a) / Math.PI;
    var k  = 1000 * d * Math.cos(Math.PI * (e + g) / 180);
    d      = 1000 * d * Math.sin(Math.PI * (e + g) / 180);
    a     *= 1000;
    f      = 1000 * (c - f);
    m      = (1000 * b * Math.sin(Math.PI * (m + g + e) / 180) - f) /
             (1000 * b * Math.cos(Math.PI * (m + g + e) / 180) - a);
    e      = -1 / ((d - 0) / (k - 0));
    b      = d - e * k;
    a      = (b - (f - m * a)) / (m - e);
    e      = e * a + b;
    return Math.sqrt((a - k) * (a - k) + (e - d) * (e - d));
};

/**
 * Interpolation spline cubique.
 * @param {Array} xs - Abscisses
 * @param {Array} ys - Ordonnées
 * @returns {Function} Fonction d'interpolation f(x)
 */
var cubicSpline = function(xs, ys) {
    var n = xs.length;
    if (n !== ys.length) throw 'cubicSpline: xs et ys doivent avoir la même longueur.';

    var idx = [];
    for (var i = 0; i < n; i++) idx.push(i);
    idx.sort(function(a, b) { return xs[a] < xs[b] ? -1 : 1; });

    var x = [], y = [];
    for (var i = 0; i < n; i++) { x.push(+xs[idx[i]]); y.push(+ys[idx[i]]); }

    var c = [], d = [];
    c[0] = 0; d[0] = 0;
    for (var i = 1; i < n - 1; i++) {
        var g = (x[i] - x[i-1]) / (x[i+1] - x[i-1]);
        var m = g * d[i-1] + 2;
        d[i] = (g - 1) / m;
        c[i] = (y[i+1] - y[i]) / (x[i+1] - x[i]) - (y[i] - y[i-1]) / (x[i] - x[i-1]);
        c[i] = (6 * c[i] / (x[i+1] - x[i-1]) - g * c[i-1]) / m;
    }
    d[n-1] = 0;
    for (var i = n - 2; i >= 0; i--) d[i] = d[i] * d[i+1] + c[i];

    return function(b) {
        var lo = 0, hi = n - 1, mid;
        do {
            mid = hi - 1;
            if (x[mid] > b) hi = mid; else lo = mid;
        } while (hi - lo > 1);
        var h  = x[hi] - x[lo];
        var t  = (x[hi] - b) / h;
        var u  = (b - x[lo]) / h;
        return t * y[lo] + u * y[hi] + ((t*t*t - t) * d[lo] + (u*u*u - u) * d[hi]) * h * h / 6;
    };
};
