/* calc-graduation-viseur.js
 * Dépend de : vincentb.js, vincentb.graduation.js, vincentb.graphe.js, Chart.js
 * dans-le-mille.fr — Vincent B.
 */

(function () {

    // ── Validation ────────────────────────────────────────────────────────────
    var rulesMap = {
        field_1:  { min: 100,  max: 400,  label: 'Vitesse initiale' },
        field_2:  { min: 50,   max: 2000, label: 'Poids de la flèche' },
        field_3:  { min: 0,    max: 0.01, label: 'Coefficient balistique' },
        field_4:  { min: -45,  max: 45,   label: 'Pente du terrain' },
        field_9:  { min: 1,    max: 2,    label: 'Distance Sol\u00a0- Encoche' },
        field_10: { min: 1,    max: 2,    label: 'Distance Sol\u00a0- Centre Cible' },
        field_11: { min: 0.5,  max: 1.5,  label: 'Distance Encoche\u00a0- Scope' },
        field_12: { min: 0,    max: 0.5,  label: 'Distance Encoche\u00a0- Visette (ou Œil)' },
        field_13: { min: 30,   max: 130,  label: 'Angle Corde (ou Œil)' }
    };

    function clearErrors(form) {
        form.querySelectorAll('.input-error').forEach(function(el) { el.classList.remove('input-error'); });
        form.querySelector('.error').innerHTML = '';
    }

    function validateField(form, name) {
        var input = form.elements[name];
        var val   = parseFloat(input.value);
        var r     = rulesMap[name];
        if (isNaN(val) || val < r.min || val > r.max) {
            form.querySelector('.error').innerHTML =
                '<b>' + r.label + ':</b> un nombre entre ' + r.min + ' et ' + r.max
                + '. Le séparateur décimal est le point (.)';
            input.classList.add('input-error');
            return false;
        }
        return true;
    }

    // ── Affichage / masquage ──────────────────────────────────────────────────
    document.getElementById('close_output_form_1').addEventListener('click', function () {
        document.getElementById('output_form_1').classList.remove('visible');
    });

    // ── Bouton calcul ─────────────────────────────────────────────────────────
    document.getElementById('bt_form_1').addEventListener('click', function (e) {
        e.preventDefault();
        var form = document.forms['form_1'];
        clearErrors(form);

        var ok = true;
        ['field_1','field_2','field_3','field_4','field_9','field_10','field_11','field_12','field_13'].forEach(function(f) {
            if (!validateField(form, f)) ok = false;
        });
        if (!ok) return;

        var Vo_fps = parseFloat(form.elements.field_1.value);
        var m_gr   = parseFloat(form.elements.field_2.value);
        var distSolEncoche    = parseFloat(form.elements.field_9.value);
        var distSolCible      = parseFloat(form.elements.field_10.value);
        var distEncocheSrcope = parseFloat(form.elements.field_11.value);
        var distEncocheOeil   = parseFloat(form.elements.field_12.value);
        var angleCorde        = parseFloat(form.elements.field_13.value);
        var rightHander       = document.getElementById('right').checked;

        var b = new Balistic();
        b.cb    = parseFloat(form.elements.field_3.value);
        b.pente = parseFloat(form.elements.field_4.value);
        b.Vo    = Vo_fps / 3.28084;
        b.m     = m_gr / 15.432 / 1000;

        // Configuration
        var config = '<dl>'
            + '<dt>Paramètres de tir\u00a0:</dt>'
            + '<dd>Vo = ' + round(3.28084 * b.Vo, 1) + ' [fps] <i>(soit\u00a0: ' + round(b.Vo, 1) + ' m/s)</i>, vitesse initiale de la flèche.</dd>'
            + '<dd>m = ' + round(15432 * b.m, 1) + ' [gr] <i>(soit\u00a0: ' + round(1000 * b.m, 3) + ' grammes)</i>, poids de la flèche.</dd>'
            + '<dd>cb = ' + round(b.cb, 12) + ' [ ], coefficient balistique de la flèche.</dd>'
            + '<dd>pente = ' + b.pente + ' [°], pente du terrain.</dd>'
            + '<dt>Configuration de visée\u00a0:</dt>'
            + '<dd>Distance Sol\u00a0- Encoche = ' + round(distSolEncoche, 2) + ' [m]</dd>'
            + '<dd>Distance Sol\u00a0- Centre Cible = ' + round(distSolCible, 2) + ' [m]</dd>'
            + '<dd>Distance Encoche\u00a0- Scope = ' + round(distEncocheSrcope, 2) + ' [m] <i>(soit\u00a0: ' + round(100 * distEncocheSrcope, 0) + ' cm)</i></dd>'
            + '<dd>Distance Encoche\u00a0- Visette (ou Œil) = ' + round(distEncocheOeil, 2) + ' [m] <i>(soit\u00a0: ' + round(100 * distEncocheOeil, 0) + ' cm)</i></dd>'
            + '<dd>Angle Corde (ou Œil) = ' + round(angleCorde, 2) + ' [°]</dd>'
            + '</dl>';
        document.getElementById('form_1_config').innerHTML = config;

        // Calcul pour distances 10m à 70m (pas 5m)
        var distances = [], angles = [], graduations = [];
        for (var d = 2; d <= 14; d++) {
            b.distTir = 5 * d;
            var res = b.getAngle();
            if (typeof res.alert === 'undefined') {
                distances.push(5 * d);
                angles.push(res.angle);
                var grad = getGradSight(5 * d, res.angle, distSolEncoche, distEncocheSrcope, distSolCible, distEncocheOeil, angleCorde);
                graduations.push(grad);
            }
        }

        var infoEl = document.getElementById('form_1_info');

        if (distances.length < 2) {
            document.getElementById('form_1_resultat').innerHTML =
                '<dl class="calc-error"><dd>Paramètres de tir incohérents\u00a0!</dd>'
                + '<dd>→ vérifier et ajuster les paramètres.</dd></dl>';
            infoEl.style.display = 'none';
            document.getElementById('output_form_1').classList.add('visible');
            return;
        }

        // Graduation relative (0 = position max)
        var gradMax = Math.max.apply(null, graduations);
        var gradRel = graduations.map(function(v) { return gradMax - v; });

        // Tableau
        var tableau = '<table>'
            + '<tr><th>distTir [m]</th><th>angTir [°]</th><th>graduation absolue [mm]</th><th>graduation relative [mm]</th></tr>';
        for (var i = 0; i < distances.length; i++) {
            tableau += '<tr>'
                + '<td>' + round(distances[i], 3) + '</td>'
                + '<td>' + round(angles[i], 3).toFixed(3) + '</td>'
                + '<td>' + round(graduations[i], 1).toFixed(1) + '</td>'
                + '<td>' + round(gradRel[i], 1).toFixed(1) + '</td>'
                + '</tr>';
        }
        tableau += '</table>'
            + '<p>La colonne "graduation absolue" indique des valeurs en [mm] correspondant à la distance de l\'axe du scope par rapport à l\'axe de la flèche.</p>'
            + '<p>La colonne "graduation relative" indique des valeurs en [mm] correspondant à la variation entre la valeur minimale et la valeur maximale.</p>';

        document.getElementById('form_1_resultat').innerHTML = tableau;
        infoEl.style.display = 'block';

        // Graduation visuelle (canvas via vincentb.graduation.js)
        new Graduation('graduation', distances, gradRel, { rightHander: rightHander });

        // Graphe position scope / distance cible (canvas via vincentb.graphe.js)
        new Graphe('graphe_1', distances, gradRel, {
            label: {
                display: true,
                nameX: 'Distance cible [m]',
                nameY: 'Position scope [mm]'
            },
            grid: { xSpace: 5, ySpace: 2 },
            axis: { y: { order: 'desc' } }
        });

        document.getElementById('output_form_1').classList.add('visible');
    });

})();
