/*!
 * dans-le-mille.fr - Viseur scope / œilleton
 * Adapté pour Hugo + GitHub Pages — Vincent B.
 * Verrou domaine supprimé dans inhibitsDrag()
 */

/***********************************************************************
 * GLOBALS
 ***********************************************************************/
var width, height;

var arrowhead = [];
arrowhead.field = {
    fillwidth:     [1.0, 0.8, 0.6, 0.4, 0.2, 0.1],
    fillcolor:     ['#181715','#181715','#181715','#181715','#F8EF19','#F8EF19'],
    linetextcolor: ['#EBEAE8','#EBEAE8','#EBEAE8','#EBEAE8','#6D5B05','#6D5B05'],
    linewidth:     [null, 1, 1, 1, null, 1]
};
arrowhead.fita = {
    fillwidth:     [1.0,0.9,0.8,0.7,0.6,0.5,0.4,0.3,0.2,0.1,0.05],
    fillcolor:     ['#FFFFFF','#FFFFFF','#010101','#010101','#009DE2','#009DE2','#E41F26','#E41F26','#FFEE00','#FFEE00','#FFEE00'],
    linetextcolor: ['#888','#888','#bbb','#bbb','#333','#333','#555','#555','#666','#666','#666'],
    linewidth:     [1,1,null,1,null,1,1,1,1,1,0.5]
};

var typOfTarget = {
    name:      ['Field 80cm','Field 60cm','Field 40cm','Field 20cm','Fita 122cm','Fita 80cm','Fita 80cm compound','Fita 60cm','Fita 40cm','Fita 40cm trispot'],
    typ:       ['field','field','field','field','fita','fita','fita','fita','fita','fita'],
    diameter:  [80,60,40,20,122,80,80,60,40,40],
    level:     [1,1,1,1,1,1,5,1,1,6],
    'repeat-x':[1,1,1,1,1,1,1,1,1,1],
    'repeat-y':[1,1,1,1,1,1,1,1,1,1],
    'spacing-x':[0,0,0,0,0,0,0,0,0,0],
    'spacing-y':[0,0,0,0,0,0,0,0,0,0]
};

var target = {
    typ: 'field', level: 1, diameter: 0.80, distanceToEye: 40,
    draggable: true, nbrArea: 2, scale: 1.0,
    font: { size: 15, family: 'arial' },
    number: { display: true }
};
var scope = {
    dIn: 0.033, dOut: 0.040, distanceToEye: 0.78,
    color: 'rgba(8, 108, 162, 0.9)', scale: 1.0,
    lens: { diopter: 0.72, display: true },
    dot:  { dIn: 0.000, dOut: 0.002, color: 'rgba(255, 42, 0, .9)', display: true }
};
var sight = {
    dIn: 0.008, dOut: 0.010, distanceToEye: 1.0,
    color: 'rgba(8, 108, 162, 0.9)', scale: 0.5, display: false,
    dot: { dOut: 0.001, color: 'rgba(255, 42, 0, .9)', display: true }
};
var mask = { display: true, dIn: 0, color: 'rgba(255, 255, 255, 1)' };

var stage, layerTarget, groupTarget, layerScope, groupScope, layerSight, groupSight, layerMask;

/***********************************************************************
 * FONCTIONS DE RENDU
 ***********************************************************************/
function init() {
    var el = document.getElementById('drawing');
    width  = el.clientWidth  || el.offsetWidth  || 440;
    // ratioWrapper vw100 = padding-bottom:100% donc height = width
    height = width;

    // Vider le container avant de recréer la scène
    document.getElementById('container').innerHTML = '';

    stage = new Konva.Stage({ container: 'container', width: width, height: height });

    if (!sight.display) {
        scope.scale  = scope.dIn / scope.dOut;
        target.scale = scope.scale * target.diameter / getDiamAreaWithoutLens();
        if (scope.lens.display) target.scale *= getApparentMagnification();
        drawTarget();
        drawScope();
    } else {
        target.draggable = false;
        var D = (sight.dot.dOut < (sight.dOut - sight.dIn) / 2 && sight.dot.display)
            ? 1 / sight.dOut * (sight.dOut - sight.dIn) / 2
            : 1 / sight.dOut * sight.dot.dOut;
        var G = getSightRatio();
        var M = 1 / (1 + 2 * D * G);
        sight.scale  = G * M;
        target.scale = M;
        drawTarget();
        drawSight();
    }
    drawMask();
}

function getSightRatio() {
    return target.distanceToEye / sight.distanceToEye * sight.dOut / target.diameter;
}

function getApparentMagnification() {
    var distObj = target.distanceToEye - scope.distanceToEye;
    var U = -1 / distObj;
    var V = U + scope.lens.diopter;
    var GrTr = U / V;
    var distImg = 1 / V;
    return Math.atan(Math.abs(GrTr) / (distImg - scope.distanceToEye)) / Math.atan(1 / target.distanceToEye);
}

function getDiamAreaWithoutLens() {
    return scope.dIn * target.distanceToEye / scope.distanceToEye;
}

function drawArrowhead(typ) {
    for (var i = target.level - 1; i < arrowhead[typ].fillwidth.length; i++) {
        var circle = new Konva.Circle({
            radius: height / 2 * arrowhead[typ].fillwidth[i],
            fill:   arrowhead[typ].fillcolor[i],
            stroke: arrowhead[typ].linetextcolor[i],
            strokeWidth: arrowhead[typ].linewidth[i]
        });
        groupTarget.add(circle);
    }
}

function drawNumbering(typ) {
    for (var i = target.level - 1; i < arrowhead[typ].fillwidth.length; i++) {
        var x = -1, y = 2;
        var value = i + 1;
        if (i != arrowhead[typ].fillwidth.length - 1)
            x = -height / 2 * (arrowhead[typ].fillwidth[i] + arrowhead[typ].fillwidth[i + 1]) / 2 - x;
        if (value == 10) value = '';
        if (value == 11) value = 10;
        var text = new Konva.Text({
            x: x, y: y, text: value,
            fontSize: target.font.size, fontFamily: target.font.family,
            fill: arrowhead[typ].linetextcolor[i]
        });
        text.setOffset({ x: text.getWidth() / 2, y: text.getHeight() / 2 });
        groupTarget.add(text);
    }
}

function drawTarget() {
    layerTarget = new Konva.Layer();
    groupTarget = new Konva.Group({
        scale: { x: target.scale, y: target.scale },
        x: width / 2, y: height / 2,
        draggable: target.draggable,
        dragBoundFunc: function(pos) {
            var x = width / 2, y = height / 2;
            var delta = arrowhead[target.typ].fillwidth[target.level + target.nbrArea - 1] * target.scale * height / 2;
            var radius = height / 2 * scope.dIn / scope.dOut + delta;
            var scale  = radius / Math.sqrt(Math.pow(pos.x - x, 2) + Math.pow(pos.y - y, 2));
            return scale < 1 ? { y: Math.round((pos.y - y) * scale + y), x: Math.round((pos.x - x) * scale + x) } : pos;
        }
    });
    drawArrowhead(target.typ);
    if (target.number.display) drawNumbering(target.typ);
    if (target.draggable) {
        groupTarget.on('mouseover', function() { document.body.style.cursor = 'pointer'; });
        groupTarget.on('mouseout',  function() { document.body.style.cursor = 'default'; });
    }
    layerTarget.add(groupTarget);
    stage.add(layerTarget);
}

function drawScope() {
    layerScope = new Konva.Layer({ listening: false });
    groupScope = new Konva.Group({ x: width / 2, y: height / 2 });
    var ring = new Konva.Ring({
        innerRadius: (height * scope.dIn / scope.dOut) / 2,
        outerRadius: height / 2,
        fill: scope.color
    });
    groupScope.add(ring);
    if (scope.dot.display) {
        var dot = new Konva.Ring({
            innerRadius: (scope.dot.dIn * height / scope.dOut) / 2,
            outerRadius: (scope.dot.dOut * height / scope.dOut) / 2,
            fill: scope.dot.color
        });
        groupScope.add(dot);
    }
    layerScope.add(groupScope);
    stage.add(layerScope);
}

function drawSight() {
    layerSight = new Konva.Layer();
    groupSight = new Konva.Group({
        scale: { x: sight.scale, y: sight.scale },
        x: width / 2, y: height / 2,
        draggable: true,
        dragBoundFunc: function(pos) {
            var x = width / 2, y = height / 2;
            var radius = height / 2 * (1 + target.scale) / 2;
            var scale  = radius / Math.sqrt(Math.pow(pos.x - x, 2) + Math.pow(pos.y - y, 2));
            return scale < 1 ? { y: Math.round((pos.y - y) * scale + y), x: Math.round((pos.x - x) * scale + x) } : pos;
        }
    });
    var ring = new Konva.Ring({
        innerRadius: (height * sight.dIn / sight.dOut) / 2,
        outerRadius: height / 2,
        fill: sight.color
    });
    groupSight.add(ring);
    if (sight.dot.display) {
        var dot = new Konva.Circle({ radius: (sight.dot.dOut * height / sight.dOut) / 2, fill: sight.dot.color });
        groupSight.add(dot);
    }
    var area = new Konva.Circle({ radius: height / 2, fill: 'rgba(255,255,255,0.01)' });
    groupSight.add(area);
    groupSight.on('mouseover', function() { document.body.style.cursor = 'pointer'; });
    groupSight.on('mouseout',  function() { document.body.style.cursor = 'default'; });
    layerSight.add(groupSight);
    stage.add(layerSight);
}

function drawMask() {
    // Mode scope   : trou = diametre exterieur du scope (height/2)
    // Mode oeilleton : trou = diametre exterieur du target + 2x point de visée
    var innerR;
    if (!sight.display) {
        innerR = height / 2;  // bord ext du scope bleu = outerRadius du Ring scope
    } else {
        var dotR = (sight.dot.dOut * height / sight.dOut) / 2 * sight.scale;
        innerR = height / 2 * target.scale + 2 * dotR;
    }
    layerMask = new Konva.Layer({ listening: false });
    var ring = new Konva.Ring({
        x: width / 2, y: height / 2,
        innerRadius: innerR,
        outerRadius: Math.sqrt(width * width + height * height) / 2,
        fill: 'rgba(255,255,255,1)'
    });
    layerMask.add(ring);
    stage.add(layerMask);
}

function selectTargetTyp() {
    var output = '';
    for (var i = 0; i < typOfTarget.name.length; i++)
        output += '<option value="' + typOfTarget.name[i] + '">' + typOfTarget.name[i] + '</option>\n';
    document.getElementById('targetTyp').innerHTML = output;
}

function hexToRgb(hex) {
    hex = hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, function(m, r, g, b) { return r+r+g+g+b+b; });
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? { r: parseInt(result[1],16), g: parseInt(result[2],16), b: parseInt(result[3],16) } : null;
}

window.addEventListener('resize', init, false);

// Attendre que le layout soit stable avant d'initialiser Konva
window.addEventListener('load', function() {
    selectTargetTyp();
    // Petit délai pour que PaperMod ait fini son layout
    setTimeout(init, 50);
}, false);

/***********************************************************************
 * GESTION DU FORMULAIRE
 ***********************************************************************/
function updateInput() {
    scope.lens.display = document.getElementById('checkbox_1').checked;
    scope.dot.display  = document.getElementById('checkbox_2').checked;
    scope.dIn          = parseFloat(document.forms['form_1'].elements['field_2'].value) / 1000;
    scope.dOut         = parseFloat(document.forms['form_1'].elements['field_3'].value) / 1000;
    var hex = document.forms['form_1'].elements['field_4'].value;
    var rgb = hexToRgb(hex);
    scope.color        = 'rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',0.9)';
    scope.distanceToEye= parseFloat(document.forms['form_1'].elements['field_5'].value);
    scope.lens.diopter = parseFloat(document.forms['form_1'].elements['field_6'].value);
    scope.dot.dIn      = parseFloat(document.forms['form_1'].elements['field_7'].value) / 1000;
    scope.dot.dOut     = parseFloat(document.forms['form_1'].elements['field_8'].value) / 1000;
    hex = document.forms['form_1'].elements['field_9'].value;
    rgb = hexToRgb(hex);
    scope.dot.color    = 'rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',0.9)';

    sight.display      = document.getElementById('radio_2').checked;
    sight.dot.display  = document.getElementById('checkbox_4').checked;
    sight.dIn          = parseFloat(document.forms['form_1'].elements['field_10'].value) / 1000;
    sight.dOut         = parseFloat(document.forms['form_1'].elements['field_11'].value) / 1000;
    hex = document.forms['form_1'].elements['field_12'].value;
    rgb = hexToRgb(hex);
    sight.color        = 'rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',0.9)';
    sight.distanceToEye= parseFloat(document.forms['form_1'].elements['field_13'].value);
    sight.dot.dOut     = parseFloat(document.forms['form_1'].elements['field_14'].value) / 1000;
    hex = document.forms['form_1'].elements['field_15'].value;
    rgb = hexToRgb(hex);
    sight.dot.color    = 'rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',0.9)';

    var i = document.getElementById('targetTyp').selectedIndex;
    target.typ           = typOfTarget.typ[i];
    target.level         = typOfTarget.level[i];
    target.diameter      = typOfTarget.diameter[i] / 100;
    target.draggable     = true;
    target.number.display= document.getElementById('checkbox_5').checked;
    target.distanceToEye = parseFloat(document.forms['form_1'].elements['field_1'].value);

    init();
}

/***********************************************************************
 * GESTION DES ONGLETS
 * Tabs CSS-driven via input[name="tab"] :checked
 * Le JS gère uniquement le toggle label Compound/Recurve
 * et active le bon tab radio quand on change de mode
 ***********************************************************************/
function initTabs() {
    var selectors = document.querySelectorAll('input[name="selector"]');
    var labelCompound = document.getElementById('label-compound');
    var labelSight    = document.getElementById('label-sight');

    selectors.forEach(function(sel) {
        sel.addEventListener('change', function() {
            var tabId = this.getAttribute('data-id');
            // Activer le tab radio correspondant
            document.getElementById(tabId).checked = true;
            // Toggle labels Compound / Recurve
            if (tabId === 'tab-B') {
                labelCompound.style.display = 'inline-block';
                labelSight.style.display    = 'none';
            } else {
                labelCompound.style.display = 'none';
                labelSight.style.display    = 'inline-block';
            }
        });
    });
}

window.addEventListener('load', initTabs, false);

/***********************************************************************
 * VALIDATION + SOUMISSION (vanilla JS)
 ***********************************************************************/
function isValidHex(v) { return /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(v); }

function validateForm() {
    var form   = document.forms['form_1'];
    var errors = [];

    function chk(name, min, max, label) {
        var v = parseFloat(form.elements[name].value);
        if (isNaN(v) || v < min || v > max)
            errors.push('<b>' + label + ':</b> un nombre entre ' + min + ' et ' + max + '. Le séparateur décimal est le point (.)');
    }
    function chkHex(name, label) {
        if (!isValidHex(form.elements[name].value))
            errors.push('<b>' + label + ':</b> code couleur HEX invalide (ex: #086ca2)');
    }
    function chkGt(nameMin, nameMax, label) {
        var vMin = parseFloat(form.elements[nameMin].value);
        var vMax = parseFloat(form.elements[nameMax].value);
        if (!isNaN(vMin) && !isNaN(vMax) && vMax <= vMin)
            errors.push('<b>' + label + ':</b> &#8709; ext. doit être supérieur à &#8709; int.');
    }

    chk('field_1',  5,   70,  'Target \u2014 Distance de la cible');
    chk('field_2',  20,  40,  'Compound \u2014 \u00d8 int. du scope');
    chk('field_3',  20,  45,  'Compound \u2014 \u00d8 ext. du scope');
    chkHex('field_4', 'Compound \u2014 Couleur du scope');
    chk('field_5',  0.5, 1.5, 'Compound \u2014 Distance \u0153il-scope');
    chk('field_6',  0.1, 1.2, 'Compound \u2014 Lentille');
    chk('field_7',  0,   19,  'Compound \u2014 \u00d8 int. du point de vis\u00e9e');
    chk('field_8',  0,   20,  'Compound \u2014 \u00d8 ext. du point de vis\u00e9e');
    chkHex('field_9', 'Compound \u2014 Couleur du point de vis\u00e9e');
    chkGt('field_7', 'field_8', 'Compound \u2014 \u00d8 scope');
    chkGt('field_2', 'field_3', 'Compound \u2014 \u00d8 scope');
    chk('field_10', 5,   19,  'Recurve \u2014 \u00d8 int. de l\'\u0153illeton');
    chk('field_11', 5,   20,  'Recurve \u2014 \u00d8 ext. de l\'\u0153illeton');
    chkHex('field_12', 'Recurve \u2014 Couleur de l\'\u0153illeton');
    chk('field_13', 0.5, 1.5, 'Recurve \u2014 Distance \u0153il-\u0153illeton');
    chk('field_14', 0.5, 5,   'Recurve \u2014 \u00d8 du point de vis\u00e9e');
    chkHex('field_15', 'Recurve \u2014 Couleur du point de vis\u00e9e');
    chkGt('field_10', 'field_11', 'Recurve \u2014 \u00d8 \u0153illeton');

    var errDiv = document.getElementById('form_1_errors');
    if (errors.length) {
        errDiv.innerHTML = errors.join('<br>');
        errDiv.classList.add('visible');
    } else {
        errDiv.innerHTML = '';
        errDiv.classList.remove('visible');
    }
    return errors.length === 0;
}

document.getElementById('bt_form_1').addEventListener('click', function(e) {
    e.preventDefault();
    if (!validateForm()) return;
    updateInput();
    // Scroll vers #drawing
    var el = document.getElementById('drawing');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
});
