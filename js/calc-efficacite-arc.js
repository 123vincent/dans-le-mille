/* calc-efficacite-arc.js — Calculateur efficacité de l'arc
 * Dépend de : vincentb.js, Chart.js
 * dans-le-mille.fr — Vincent B.
 */

(function () {

    // ── Références DOM ────────────────────────────────────────────────────────
    var form1   = document.getElementById('form_1');
    var form2   = document.getElementById('form_2');
    var out1    = document.getElementById('output_form_1');
    var out2    = document.getElementById('output_form_2');
    var chartInstance = null;

    // ── Validation personnalisée : liste de nombres séparés par virgule ───────
    function isValidList(str) {
        return /^(\d+(\.\d+)?\s*,\s*){1,}\d+(\.\d+)?$/.test(str.trim());
    }

    function showError(input, msg) {
        var err = input.closest('form').querySelector('.error');
        err.innerHTML = msg;
        input.classList.add('input-error');
    }

    function clearErrors(form) {
        form.querySelectorAll('.input-error').forEach(function (el) {
            el.classList.remove('input-error');
        });
        form.querySelector('.error').innerHTML = '';
    }

    // ── Affichage / masquage des blocs résultats ──────────────────────────────
    function showOutput(el) {
        el.classList.add('visible');
    }

    function hideOutput(el) {
        el.classList.remove('visible');
    }

    // ── Bouton fermeture ──────────────────────────────────────────────────────
    document.getElementById('close_output_form_1').addEventListener('click', function () {
        hideOutput(out1);
    });
    document.getElementById('close_output_form_2').addEventListener('click', function () {
        hideOutput(out2);
    });

    // ── Formulaire 1 : Energie statique ───────────────────────────────────────
    document.getElementById('bt_form_1').addEventListener('click', function (e) {
        e.preventDefault();
        clearErrors(form1);

        var band    = parseFloat(form1.elements.field_1.value);
        var allonge = parseFloat(form1.elements.field_2.value);
        var rawList = form1.elements.field_3.value;

        // Validation
        var valid = true;
        if (isNaN(band) || band < 0 || band > 10) {
            showError(form1.elements.field_1,
                '<b>Band:</b> un nombre entre 0 et 10. Le séparateur décimal est le point (.)');
            valid = false;
        }
        if (isNaN(allonge) || allonge < 20 || allonge > 35) {
            showError(form1.elements.field_2,
                '<b>Allonge:</b> un nombre entre 20 et 35. Le séparateur décimal est le point (.)');
            valid = false;
        }
        if (!isValidList(rawList)) {
            showError(form1.elements.field_3,
                '<b>Force:</b> une liste de nombres séparés par une virgule (,). Minimum 2 nombres. Le séparateur décimal est le point (.)');
            valid = false;
        }
        if (!valid) return;

        var forces = rawList.split(/[ ,]+/).map(function (v) { return round(parseFloat(v), 3); });
        var data   = getStaticEnergy(band, allonge, forces);

        // Tableau
        var html = '<table><tr><th>[inch]</th><th>[lbs]</th><th>[Joule]</th><th>cumul [J]</th></tr>';
        for (var i = 0; i < data.length; i++) {
            html += '<tr>'
                + '<td>' + round(data[i].allonge, 1).toFixed(1) + '</td>'
                + '<td>' + round(data[i].force,   1).toFixed(1) + '</td>'
                + '<td>' + round(data[i].energie, 1).toFixed(1) + '</td>'
                + '<td>' + round(data[i].cumul,   1).toFixed(1) + '</td>'
                + '</tr>';
        }
        html += '</table>';
        document.getElementById('energy_tab').innerHTML = html;

        // Energie accumulée
        var win = data[data.length - 1].cumul;
        document.getElementById('energy_value').innerHTML =
            '<dl><dd>W<sub>in</sub> = ' + round(win, 1).toFixed(1) + ' joules</dd></dl>';

        // Pré-remplir le champ Win du formulaire 2
        document.getElementById('win').value = round(win, 1);

        // Graphique Chart.js
        var step = (allonge - band) / (forces.length - 1);
        var labels = [], values = [];
        for (var i = 0; i < forces.length; i++) {
            labels.push(round(band + i * step, 2));
            values.push(forces[i]);
        }

        if (chartInstance) {
            chartInstance.destroy();
        }
        var ctx = document.getElementById('figure_1').getContext('2d');
        chartInstance = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    data: values,
                    borderColor: '#FFBA00',
                    backgroundColor: 'rgba(255,186,0,0.25)',
                    borderWidth: 3,
                    pointRadius: 4,
                    fill: true,
                    tension: 0.3
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    x: {
                        title: { display: true, text: 'Allonge [inch]' },
                        min: 0,
                        max: maxGrad(allonge, 2)
                    },
                    y: {
                        title: { display: true, text: 'Force [lbs]' },
                        min: 0,
                        max: maxGrad(Math.max.apply(null, forces), 10)
                    }
                }
            }
        });

        showOutput(out1);
    });

    // ── Formulaire 2 : Performances de tir ────────────────────────────────────
    document.getElementById('bt_form_2').addEventListener('click', function (e) {
        e.preventDefault();
        clearErrors(form2);

        var win    = parseFloat(form2.elements.field_1.value);
        var masse  = parseFloat(form2.elements.field_2.value);
        var vitesse = parseFloat(form2.elements.field_3.value);

        // Validation
        var valid = true;
        if (isNaN(win) || win < 0 || win > 150) {
            showError(form2.elements.field_1,
                '<b>Energie accumulée:</b> un nombre entre 0 et 150. Le séparateur décimal est le point (.)');
            valid = false;
        }
        if (isNaN(masse) || masse < 200 || masse > 600) {
            showError(form2.elements.field_2,
                '<b>Poids de la flèche:</b> un nombre entre 200 et 600. Le séparateur décimal est le point (.)');
            valid = false;
        }
        if (isNaN(vitesse) || vitesse < 100 || vitesse > 400) {
            showError(form2.elements.field_3,
                '<b>Vitesse de la flèche:</b> un nombre entre 100 et 400. Le séparateur décimal est le point (.)');
            valid = false;
        }
        if (!valid) return;

        // Configuration
        var html = '<dl>'
            + '<dd>Energie statique, W<sub>in</sub> = ' + round(win, 1) + ' J</dd>'
            + '<dd>Poids de la flèche, m = ' + round(masse, 1) + ' gr'
            + ' <i>(soit\u00a0: ' + round(masse / 15.432, 1) + ' grammes)</i></dd>'
            + '<dd>Vitesse de la flèche, v = ' + round(vitesse, 1) + ' fps'
            + ' <i>(soit\u00a0: ' + round(0.3048 * vitesse, 1) + ' m/s)</i></dd>'
            + '</dl>';
        document.getElementById('configuration').innerHTML = html;

        // Energie cinétique
        var wout = getKineticEnergy(masse, vitesse);
        document.getElementById('kinetic_energy').innerHTML =
            '<dl><dd>W<sub>out</sub> = ' + round(wout, 1) + ' J</dd></dl>';

        // Efficacité
        var eff = getBowEfficiency(win, masse, vitesse);
        document.getElementById('bow_efficiency').innerHTML =
            '<dl><dd>Eff<sub>arc</sub> = ' + round(eff, 1) + ' %</dd></dl>';

        // Masse virtuelle
        var mk = getVirtualMass(win, masse, vitesse);
        document.getElementById('virtual_mass').innerHTML =
            '<dl><dd>m<sub>k</sub> = ' + round(mk, 1) + ' gr'
            + ' <i>(soit\u00a0: ' + round(mk / 15.432, 1) + ' grammes)</i></dd></dl>';

        // Tableau masse / vitesse / efficacité
        html = '<table>'
            + '<tr><th>m [gr]</th><th>m [g]</th><th>v [fps]</th><th>v [m/s]</th><th>Eff<sub>arc</sub> [%]</th></tr>';
        for (var m = 200; m <= 600; m += 50) {
            var v  = getArrowVelocity(win, masse, vitesse, m);
            var ef = getMassEfficiency(win, masse, vitesse, m);
            html += '<tr>'
                + '<td>' + m + '</td>'
                + '<td>' + round(m / 15.432, 1).toFixed(1) + '</td>'
                + '<td>' + round(v,  1).toFixed(1) + '</td>'
                + '<td>' + round(0.3048 * v, 1).toFixed(1) + '</td>'
                + '<td>' + round(ef, 1).toFixed(1) + '</td>'
                + '</tr>';
        }
        html += '</table>';
        document.getElementById('alternative_arrow_weight').innerHTML = html;

        showOutput(out2);
    });

})();
