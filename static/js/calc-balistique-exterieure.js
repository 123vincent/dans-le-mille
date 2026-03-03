/* calc-balistique-exterieure.js
 * Dépend de : vincentb.js, Chart.js
 * dans-le-mille.fr — Vincent B.
 */

(function () {

    // ── Instances Chart.js (une par graphique) ────────────────────────────────
    var charts = {};

    // ── Validation ────────────────────────────────────────────────────────────
    var rules = {
        field_1: { min: 100,  max: 400,  label: 'Vitesse initiale' },
        field_2: { min: 50,   max: 2000, label: 'Poids de la flèche' },
        field_3: { min: 0,    max: 0.01, label: 'Coefficient balistique' },
        field_4: { min: -45,  max: 45,   label: 'Pente du terrain' },
        field_5: { min: 0.01, max: 45,   label: 'Angle de tir' },
        field_6: { min: 0,    max: 70,   label: 'Distance de la cible' },
        field_7: { min: 0,    max: 15,   label: 'Temps de vol de la flèche' }
    };

    function isValidList(str) {
        return /^(\d{1,2}(\.\d+)?\s*,\s*){1,}\d{1,2}(\.\d+)?$/.test(str.trim());
    }

    function validateField(form, name) {
        var input = form.elements[name];
        if (!input) return true; // champ absent du formulaire = non requis
        var val = parseFloat(input.value);
        var r   = rules[name];
        if (isNaN(val) || val < r.min || val > r.max) {
            showError(form, '<b>' + r.label + ':</b> un nombre entre ' + r.min + ' et ' + r.max
                + '. Le séparateur décimal est le point (.)');
            input.classList.add('input-error');
            return false;
        }
        return true;
    }

    function showError(form, msg) {
        form.querySelector('.error').innerHTML = msg;
    }

    function clearErrors(form) {
        form.querySelectorAll('.input-error').forEach(function(el) { el.classList.remove('input-error'); });
        form.querySelector('.error').innerHTML = '';
    }

    // ── Affichage / masquage ──────────────────────────────────────────────────
    function showOutput(n) {
        document.getElementById('output_form_' + n).classList.add('visible');
    }
    function hideOutput(n) {
        document.getElementById('output_form_' + n).classList.remove('visible');
    }

    [1, 2, 3, 4, 5, 6].forEach(function(n) {
        document.getElementById('close_output_form_' + n).addEventListener('click', function() {
            hideOutput(n);
        });
    });

    // ── Energie cinétique + tableau m/Vo ─────────────────────────────────────
    function afficherKinetic(masse_gr, vitesse_fps) {
        var wout = getKineticEnergy(masse_gr, vitesse_fps);
        var html = '<dl><dd>W<sub>out</sub> = ½ · m · Vo² = ' + round(wout, 1)
            + ' Joules, avec m [kg] et Vo [m/s].</dd></dl>'
            + '<p>Cette énergie cinétique dépend directement de la puissance de l\'arc. '
            + 'Donc m et Vo sont liés pour une puissance d\'arc donnée. '
            + 'Si vous modifiez m, il faudra parallèlement modifier Vo pour conserver la même énergie cinétique et inversement.</p>'
            + '<div class="calc-h3">Suggestion d\'arrangements «\u00a0m\u00a0- Vo\u00a0» possibles\u00a0:</div>'
            + '<table><tr><th>m [gr]</th><th>m [g]</th><th>v [fps]</th><th>v [m/s]</th></tr>';
        for (var c = 300; c <= 500; c += 50) {
            var v = Math.sqrt(30864 * wout / c);
            html += '<tr>'
                + '<td>' + c + '</td>'
                + '<td>' + round(c / 15.432, 1).toFixed(1) + '</td>'
                + '<td>' + round(v / 0.3048, 1).toFixed(1) + '</td>'
                + '<td>' + round(v, 1).toFixed(1) + '</td>'
                + '</tr>';
        }
        return html + '</table>';
    }

    // ── Graphique trajectoire (form 1 à 5 sauf 2) ────────────────────────────
    function drawTrajectory(formNum, balistic, canvasId, ratioId) {
        var pts = balistic.points;
        var trajData = [], terrainData = [];
        for (var i = 0; i < pts.x.length; i++) trajData.push({ x: pts.x[i], y: pts.y[i] });
        terrainData.push({ x: pts.x[0], y: pts.y[0] });
        terrainData.push({ x: pts.x[pts.x.length - 1], y: pts.y[pts.y.length - 1] });

        var maxX  = Math.max.apply(Math, pts.x);
        var maxY  = Math.max.apply(Math, pts.y);
        var minY  = Math.min.apply(Math, pts.y);
        var rangeY = Math.abs(maxY - minY);
        var tickY  = Math.ceil(rangeY / 6) || 1;

        // Ratio CSS dynamique
        var ratio = 5 * Math.ceil(rangeY / maxX * 100 / 5);
        if (ratio < 20) ratio = 20;
        if (ratio > 100) ratio = 100;
        if (ratioId) document.getElementById(ratioId).className = 'ratioWrapper vw' + ratio;

        if (charts[canvasId]) { charts[canvasId].destroy(); }
        var ctx = document.getElementById(canvasId).getContext('2d');
        charts[canvasId] = new Chart(ctx, {
            type: 'line',
            data: {
                datasets: [
                    {
                        label: 'trajectoire',
                        data: trajData,
                        borderColor: '#FFBA00',
                        backgroundColor: 'transparent',
                        borderWidth: 3,
                        pointRadius: 0,
                        tension: 0.3
                    },
                    {
                        label: 'terrain',
                        data: terrainData,
                        borderColor: '#3E3E3E',
                        backgroundColor: 'transparent',
                        borderWidth: 2,
                        pointRadius: 0
                    }
                ]
            },
            options: {
                responsive: true,
                parsing: false,
                plugins: { legend: { display: true, position: balistic.pente < -10 ? 'bottom' : 'top' } },
                scales: {
                    x: {
                        type: 'linear',
                        title: { display: true, text: 'Distance [m]' },
                        min: 0,
                        max: maxGrad(maxX, 50)
                    },
                    y: {
                        title: { display: true, text: 'Hauteur [m]' },
                        max: maxGrad(maxY, tickY)
                    }
                }
            }
        });
    }

    // ── Graphique campagne form 6 (distTir vs angTir) ─────────────────────────
    function drawCampagne(data) {
        var maxX = Math.max.apply(Math, data.map(function(d) { return d.x; }));
        var maxY = Math.max.apply(Math, data.map(function(d) { return d.y; }));
        if (charts['graphe_6']) { charts['graphe_6'].destroy(); }
        var ctx = document.getElementById('graphe_6').getContext('2d');
        charts['graphe_6'] = new Chart(ctx, {
            type: 'line',
            data: {
                datasets: [{
                    data: data,
                    borderColor: '#FFBA00',
                    backgroundColor: 'transparent',
                    borderWidth: 3,
                    pointRadius: 3,
                    tension: 0.3
                }]
            },
            options: {
                responsive: true,
                parsing: false,
                plugins: { legend: { display: false } },
                scales: {
                    x: { type: 'linear', title: { display: true, text: 'distTir [m]' }, min: 0, max: maxGrad(maxX, 5) },
                    y: { title: { display: true, text: 'angTir [°]' }, min: 0, max: maxGrad(maxY, 0.2) }
                }
            }
        });
    }

    // ── Formulaire 1 : Portée maximale ────────────────────────────────────────
    document.getElementById('bt_form_1').addEventListener('click', function(e) {
        e.preventDefault();
        var form = document.forms['form_1'];
        clearErrors(form);
        var ok = validateField(form, 'field_1') & validateField(form, 'field_2')
               & validateField(form, 'field_3') & validateField(form, 'field_4');
        if (!ok) return;

        var Vo_fps = parseFloat(form.elements.field_1.value);
        var m_gr   = parseFloat(form.elements.field_2.value);
        var b      = new Balistic();
        b.cb    = parseFloat(form.elements.field_3.value);
        b.pente = parseFloat(form.elements.field_4.value);
        b.Vo    = Vo_fps / 3.28084;
        b.m     = m_gr / 15.432 / 1000;

        var config = '<dl>'
            + '<dd>Vo = ' + round(Vo_fps, 1) + ' [fps] <i>(soit\u00a0: ' + round(b.Vo, 1) + ' m/s)</i>, vitesse initiale de la flèche.</dd>'
            + '<dd>m = ' + round(m_gr, 1) + ' [gr] <i>(soit\u00a0: ' + round(1000 * b.m, 3) + ' grammes)</i>, poids de la flèche.</dd>'
            + '<dd>cb = ' + round(b.cb, 12) + ' [ ], coefficient balistique de la flèche.</dd>'
            + '<dd>pente = ' + b.pente + ' [°], pente du terrain.</dd>'
            + '</dl>';
        document.getElementById('form_1_config').innerHTML = config;

        var res = b.getMaximum();
        var resultat = '';
        var hasTrajectory = false;

        if (typeof res.alert === 'undefined') {
            resultat = '<dl>'
                + '<dd>angTir = ' + round(res.angle, 2) + ' [°], angle de tir.</dd>'
                + '<dd>distMax = ' + round(res.distance, 3) + ' [m], distance maximale de tir.</dd>'
                + '<dd>tempsVol = ' + round(res.temps, 2) + ' [s], temps de vol de la flèche.</dd>'
                + '</dl>';
            if (res.temps > 0) hasTrajectory = true;
        } else {
            resultat = '<dl class="calc-error"><dd>' + res.alert + '</dd><dd>→ ajuster les paramètres.</dd></dl>';
        }
        document.getElementById('form_1_resultat').innerHTML = resultat;

        var figEl  = document.getElementById('figure_1');
        var infoEl = document.getElementById('form_1_info');
        if (hasTrajectory) {
            figEl.style.display  = 'block';
            infoEl.style.display = 'block';
            drawTrajectory(1, b, 'graphe_1', 'ratio_1');
            document.getElementById('form_1_info').innerHTML = afficherKinetic(m_gr, Vo_fps);
        } else {
            figEl.style.display  = 'none';
            infoEl.style.display = 'none';
        }
        showOutput(1);
    });

    // ── Formulaire 2 : Distance de tir ────────────────────────────────────────
    document.getElementById('bt_form_2').addEventListener('click', function(e) {
        e.preventDefault();
        var form = document.forms['form_2'];
        clearErrors(form);
        var ok = validateField(form, 'field_1') & validateField(form, 'field_2')
               & validateField(form, 'field_3') & validateField(form, 'field_4')
               & validateField(form, 'field_5');
        if (!ok) return;

        var Vo_fps = parseFloat(form.elements.field_1.value);
        var m_gr   = parseFloat(form.elements.field_2.value);
        var b      = new Balistic();
        b.cb     = parseFloat(form.elements.field_3.value);
        b.pente  = parseFloat(form.elements.field_4.value);
        b.angTir = parseFloat(form.elements.field_5.value);
        b.Vo     = Vo_fps / 3.28084;
        b.m      = m_gr / 15.432 / 1000;

        document.getElementById('form_2_config').innerHTML = '<dl>'
            + '<dd>Vo = ' + round(3.28084 * b.Vo, 1) + ' [fps] <i>(soit\u00a0: ' + round(b.Vo, 1) + ' m/s)</i>, vitesse initiale de la flèche.</dd>'
            + '<dd>m = ' + round(15432 * b.m, 1) + ' [gr] <i>(soit\u00a0: ' + round(1000 * b.m, 3) + ' grammes)</i>, poids de la flèche.</dd>'
            + '<dd>cb = ' + round(b.cb, 12) + ' [ ], coefficient balistique de la flèche.</dd>'
            + '<dd>pente = ' + b.pente + ' [°], pente du terrain.</dd>'
            + '<dd>angTir = ' + b.angTir + ' [°], angle de tir.</dd>'
            + '</dl>';

        var res = b.getShot();
        document.getElementById('form_2_resultat').innerHTML = '<dl>'
            + '<dd>distTir = ' + round(res.distance, 3) + ' [m], distance de tir.</dd>'
            + '<dd>tempsVol = ' + round(res.temps, 2) + ' [s], temps de vol de la flèche.</dd>'
            + '</dl>';
        document.getElementById('form_2_info').innerHTML = afficherKinetic(m_gr, Vo_fps);
        showOutput(2);
    });

    // ── Formulaire 3 : Angle de tir ───────────────────────────────────────────
    document.getElementById('bt_form_3').addEventListener('click', function(e) {
        e.preventDefault();
        var form = document.forms['form_3'];
        clearErrors(form);
        var ok = validateField(form, 'field_1') & validateField(form, 'field_2')
               & validateField(form, 'field_3') & validateField(form, 'field_4')
               & validateField(form, 'field_6');
        if (!ok) return;

        var Vo_fps = parseFloat(form.elements.field_1.value);
        var m_gr   = parseFloat(form.elements.field_2.value);
        var b      = new Balistic();
        b.cb      = parseFloat(form.elements.field_3.value);
        b.pente   = parseFloat(form.elements.field_4.value);
        b.distTir = parseFloat(form.elements.field_6.value);
        b.Vo      = Vo_fps / 3.28084;
        b.m       = m_gr / 15.432 / 1000;

        document.getElementById('form_3_config').innerHTML = '<dl>'
            + '<dd>Vo = ' + round(3.28084 * b.Vo, 1) + ' [fps] <i>(soit\u00a0: ' + round(b.Vo, 1) + ' m/s)</i>, vitesse initiale de la flèche.</dd>'
            + '<dd>m = ' + round(15432 * b.m, 1) + ' [gr] <i>(soit\u00a0: ' + round(1000 * b.m, 3) + ' grammes)</i>, poids de la flèche.</dd>'
            + '<dd>cb = ' + round(b.cb, 12) + ' [ ], coefficient balistique de la flèche.</dd>'
            + '<dd>pente = ' + b.pente + ' [°], pente du terrain.</dd>'
            + '<dd>distTir = ' + b.distTir + ' [m], distance de tir.</dd>'
            + '</dl>';

        var res = b.getAngle();
        var resultat = '';
        var infoEl = document.getElementById('form_3_info');
        if (typeof res.alert === 'undefined') {
            resultat = '<dl>'
                + '<dd>angTir = ' + round(res.angle, 4) + ' [°], angle de tir.</dd>'
                + '<dd>tempsVol = ' + round(res.temps, 2) + ' [s], temps de vol de la flèche.</dd>'
                + '</dl>';
            infoEl.style.display = 'block';
        } else {
            resultat = '<dl class="calc-error"><dd>' + res.alert + '</dd><dd>→ vérifier et ajuster les paramètres.</dd></dl>';
            infoEl.style.display = 'none';
        }
        document.getElementById('form_3_resultat').innerHTML = resultat;
        document.getElementById('form_3_info').innerHTML = afficherKinetic(m_gr, Vo_fps);
        showOutput(3);
    });

    // ── Formulaire 4 : Vitesse initiale ───────────────────────────────────────
    document.getElementById('bt_form_4').addEventListener('click', function(e) {
        e.preventDefault();
        var form = document.forms['form_4'];
        clearErrors(form);
        var ok = validateField(form, 'field_2') & validateField(form, 'field_3')
               & validateField(form, 'field_4') & validateField(form, 'field_6')
               & validateField(form, 'field_7');
        if (!ok) return;

        var m_gr = parseFloat(form.elements.field_2.value);
        var b    = new Balistic();
        b.cb      = parseFloat(form.elements.field_3.value);
        b.pente   = parseFloat(form.elements.field_4.value);
        b.distTir = parseFloat(form.elements.field_6.value);
        b.tempsVol= parseFloat(form.elements.field_7.value);
        b.m       = m_gr / 15.432 / 1000;

        document.getElementById('form_4_config').innerHTML = '<dl>'
            + '<dd>m = ' + round(15432 * b.m, 1) + ' [gr] <i>(soit\u00a0: ' + round(1000 * b.m, 3) + ' grammes)</i>, poids de la flèche.</dd>'
            + '<dd>cb = ' + round(b.cb, 12) + ' [ ], coefficient balistique de la flèche.</dd>'
            + '<dd>pente = ' + b.pente + ' [°], pente du terrain.</dd>'
            + '<dd>distTir = ' + b.distTir + ' [m], distance de tir.</dd>'
            + '<dd>tempsVol = ' + b.tempsVol + ' [s], temps de vol de la flèche.</dd>'
            + '</dl>';

        var res    = b.getVelocity();
        var infoEl = document.getElementById('form_4_info');
        var resultat = '';
        if (typeof res.alert === 'undefined') {
            resultat = '<dl>'
                + '<dd>Vo = ' + round(3.28084 * res.vitesse, 4) + ' [fps] <i>(soit\u00a0: ' + round(res.vitesse, 1) + ' m/s)</i>, vitesse initiale de la flèche.</dd>'
                + '<dd>angTir = ' + round(res.angle, 4) + ' [°], angle de tir.</dd>'
                + '</dl>';
            infoEl.style.display = 'block';
        } else {
            resultat = '<dl class="calc-error"><dd>' + res.alert + '</dd><dd>→ vérifier et ajuster les paramètres.</dd></dl>';
            infoEl.style.display = 'none';
        }
        document.getElementById('form_4_resultat').innerHTML = resultat;
        document.getElementById('form_4_info').innerHTML = afficherKinetic(m_gr, res.vitesse * 3.28084);
        showOutput(4);
    });

    // ── Formulaire 5 : Coefficient balistique ─────────────────────────────────
    document.getElementById('bt_form_5').addEventListener('click', function(e) {
        e.preventDefault();
        var form = document.forms['form_5'];
        clearErrors(form);
        var ok = validateField(form, 'field_1') & validateField(form, 'field_2')
               & validateField(form, 'field_6') & validateField(form, 'field_7');
        if (!ok) return;

        var Vo_fps = parseFloat(form.elements.field_1.value);
        var m_gr   = parseFloat(form.elements.field_2.value);
        var b      = new Balistic();
        b.distTir  = parseFloat(form.elements.field_6.value);
        b.tempsVol = parseFloat(form.elements.field_7.value);
        b.Vo       = Vo_fps / 3.28084;
        b.m        = m_gr / 15.432 / 1000;

        document.getElementById('form_5_config').innerHTML = '<dl>'
            + '<dd>Vo = ' + round(3.28084 * b.Vo, 1) + ' [fps] <i>(soit\u00a0: ' + round(b.Vo, 1) + ' m/s)</i>, vitesse initiale de la flèche.</dd>'
            + '<dd>m = ' + round(15432 * b.m, 1) + ' [gr] <i>(soit\u00a0: ' + round(1000 * b.m, 3) + ' grammes)</i>, poids de la flèche.</dd>'
            + '<dd>distTir = ' + b.distTir + ' [m], distance de tir.</dd>'
            + '<dd>tempsVol = ' + b.tempsVol + ' [s], temps de vol de la flèche.</dd>'
            + '</dl>';

        var res    = b.getCoefficientBalistic();
        var infoEl = document.getElementById('form_5_info');
        var resultat = '';
        if (typeof res.alert === 'undefined') {
            resultat = '<dl>'
                + '<dd>cb = ' + round(res.cb, 12) + ' [ ], coefficient balistique.</dd>'
                + '<dd>angTir = ' + round(res.angle, 4) + ' [°], angle de tir.</dd>'
                + '</dl>';
            infoEl.style.display = 'block';
        } else {
            resultat = '<dl class="calc-error"><dd>' + res.alert + '</dd><dd>→ vérifier et ajuster les paramètres.</dd></dl>';
            infoEl.style.display = 'none';
        }
        document.getElementById('form_5_resultat').innerHTML = resultat;
        document.getElementById('form_5_info').innerHTML = afficherKinetic(m_gr, Vo_fps);
        showOutput(5);
    });

    // ── Formulaire 6 : Campagne / Field ───────────────────────────────────────
    document.getElementById('bt_form_6').addEventListener('click', function(e) {
        e.preventDefault();
        var form = document.forms['form_6'];
        clearErrors(form);
        var raw = form.elements.field_8.value;
        var ok  = validateField(form, 'field_1') & validateField(form, 'field_2')
                & validateField(form, 'field_3') & validateField(form, 'field_4');
        if (!isValidList(raw)) {
            showError(form, '<b>Liste de distances de tir\u00a0:</b> liste de nombres, supérieurs à 0 et inférieurs à 100, séparés par une virgule (,). Minimum 2 nombres. Le séparateur décimal est le point (.)');
            form.elements.field_8.classList.add('input-error');
            ok = false;
        }
        if (!ok) return;

        var Vo_fps = parseFloat(form.elements.field_1.value);
        var m_gr   = parseFloat(form.elements.field_2.value);
        var b      = new Balistic();
        b.cb    = parseFloat(form.elements.field_3.value);
        b.pente = parseFloat(form.elements.field_4.value);
        b.Vo    = Vo_fps / 3.28084;
        b.m     = m_gr / 15.432 / 1000;

        var distances = raw.split(/[ ,]+/).map(function(v) { return round(parseFloat(v), 3); });
        distances.sort(function(a, c) { return a - c; });
        var listeStr = distances.join(', ');

        document.getElementById('form_6_config').innerHTML = '<dl>'
            + '<dd>Vo = ' + round(3.28084 * b.Vo, 1) + ' [fps] <i>(soit\u00a0: ' + round(b.Vo, 1) + ' m/s)</i>, vitesse initiale de la flèche.</dd>'
            + '<dd>m = ' + round(15432 * b.m, 1) + ' [gr] <i>(soit\u00a0: ' + round(1000 * b.m, 3) + ' grammes)</i>, poids de la flèche.</dd>'
            + '<dd>cb = ' + round(b.cb, 12) + ' [ ], coefficient balistique de la flèche.</dd>'
            + '<dd>pente = ' + b.pente + ' [°], pente du terrain.</dd>'
            + '<dd>listeDist = ' + listeStr + ' [m], liste de distances de tir.</dd>'
            + '</dl>';

        var tableau = '<table><tr><th>distTir [m]</th><th>angTir [°]</th><th>tempsVol [s]</th></tr>';
        var chartData = [];
        var errCount  = 0;
        for (var i = 0; i < distances.length; i++) {
            b.distTir = distances[i];
            var res   = b.getAngle();
            if (typeof res.alert === 'undefined') {
                tableau += '<tr><td>' + round(distances[i], 3) + '</td>'
                    + '<td>' + round(res.angle, 4).toFixed(4) + '</td>'
                    + '<td>' + round(res.temps, 2).toFixed(2) + '</td></tr>';
                chartData.push({ x: distances[i], y: res.angle });
            } else {
                tableau += '<tr><td>' + round(distances[i], 3) + '</td>'
                    + '<td><i>hors de portée</i></td><td><i>out of reach</i></td></tr>';
                errCount++;
            }
        }
        tableau += '</table>';

        showOutput(6);

        var figEl  = document.getElementById('figure_6');
        var infoEl = document.getElementById('form_6_info');

        if (errCount === distances.length) {
            document.getElementById('form_6_resultat').innerHTML =
                '<dl class="calc-error"><dd>Les distances de tir sont hors de portées.</dd>'
                + '<dd>→ vérifier et ajuster les paramètres.</dd></dl>';
            figEl.style.display  = 'none';
            infoEl.style.display = 'none';
        } else {
            document.getElementById('form_6_resultat').innerHTML = tableau;
            figEl.style.display  = 'block';
            infoEl.style.display = 'block';
            drawCampagne(chartData);
            document.getElementById('form_6_info').innerHTML = afficherKinetic(m_gr, Vo_fps);
        }
    });

})();
