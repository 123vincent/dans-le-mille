/* calc-balistique-pente.js
 * Dépend de : vincentb.js, Chart.js
 * dans-le-mille.fr — Vincent B.
 */

(function () {

    var chartInstance = null;

    // ── Validation ────────────────────────────────────────────────────────────
    function isValidList(str) {
        return /^(\d{1,2}(\.\d+)?\s*,\s*){1,}\d{1,2}(\.\d+)?$/.test(str.trim());
    }

    function showError(form, msg) {
        form.querySelector('.error').innerHTML = msg;
    }

    function clearErrors(form) {
        form.querySelectorAll('.input-error').forEach(function(el) { el.classList.remove('input-error'); });
        form.querySelector('.error').innerHTML = '';
    }

    function validateRange(form, name, min, max, label) {
        var input = form.elements[name];
        var val   = parseFloat(input.value);
        if (isNaN(val) || val < min || val > max) {
            showError(form, '<b>' + label + ':</b> un nombre entre ' + min + ' et ' + max
                + '. Le séparateur décimal est le point (.)');
            input.classList.add('input-error');
            return false;
        }
        return true;
    }

    // ── Affichage / masquage ──────────────────────────────────────────────────
    function showOutput() {
        document.getElementById('output_form_6').classList.add('visible');
    }

    document.getElementById('close_output_form_6').addEventListener('click', function () {
        document.getElementById('output_form_6').classList.remove('visible');
    });

    // ── Energie cinétique ─────────────────────────────────────────────────────
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
            html += '<tr><td>' + c + '</td>'
                + '<td>' + round(c / 15.432, 1).toFixed(1) + '</td>'
                + '<td>' + round(v / 0.3048, 1).toFixed(1) + '</td>'
                + '<td>' + round(v, 1).toFixed(1) + '</td></tr>';
        }
        return html + '</table>';
    }

    // ── Bouton calcul ─────────────────────────────────────────────────────────
    document.getElementById('bt_form_6').addEventListener('click', function (e) {
        e.preventDefault();
        var form = document.forms['form_6'];
        clearErrors(form);

        var ok = true;
        ok = validateRange(form, 'field_1', 100, 400,  'Vitesse initiale')          && ok;
        ok = validateRange(form, 'field_2', 50,  2000, 'Poids de la flèche')        && ok;
        ok = validateRange(form, 'field_3', 0,   0.01, 'Coefficient balistique')    && ok;
        ok = validateRange(form, 'field_4', -45, 45,   'Pente du terrain')          && ok;
        ok = validateRange(form, 'field_6', 0,   70,   'Distance de la cible')      && ok;

        var rawList = form.elements.field_8.value;
        if (!isValidList(rawList)) {
            showError(form, '<b>Liste de distances de tir\u00a0:</b> liste de nombres supérieurs à 0 et inférieurs à 100, séparés par une virgule (,). Minimum 2 nombres. Le séparateur décimal est le point (.)');
            form.elements.field_8.classList.add('input-error');
            ok = false;
        }
        if (!ok) return;

        var Vo_fps    = parseFloat(form.elements.field_1.value);
        var m_gr      = parseFloat(form.elements.field_2.value);
        var pente     = parseFloat(form.elements.field_4.value);
        var distCible = parseFloat(form.elements.field_6.value);

        var b = new Balistic();
        b.cb    = parseFloat(form.elements.field_3.value);
        b.pente = pente;
        b.Vo    = Vo_fps / 3.28084;
        b.m     = m_gr / 15.432 / 1000;

        // Tri et parsing de la liste de distances
        var distances = rawList.split(/[ ,]+/).map(function(v) { return round(parseFloat(v), 3); });
        distances.sort(function(a, c) { return a - c; });
        var listeStr = distances.join(', ');

        // Configuration
        document.getElementById('form_6_config').innerHTML = '<dl>'
            + '<dd>Vo = ' + round(3.28084 * b.Vo, 1) + ' [fps] <i>(soit\u00a0: ' + round(b.Vo, 1) + ' m/s)</i>, vitesse initiale de la flèche.</dd>'
            + '<dd>m = ' + round(15432 * b.m, 1) + ' [gr] <i>(soit\u00a0: ' + round(1000 * b.m, 3) + ' grammes)</i>, poids de la flèche.</dd>'
            + '<dd>cb = ' + round(b.cb, 12) + ' [ ], coefficient balistique de la flèche.</dd>'
            + '<dd>listeDist = ' + listeStr + ' [m], liste de distances de tir.</dd>'
            + '</dl>';

        // Calcul angles terrain en pente
        var distValides = [], angPente = [];
        for (var i = 0; i < distances.length; i++) {
            b.pente   = pente;
            b.distTir = distances[i];
            var res   = b.getAngle();
            if (typeof res.alert === 'undefined') {
                distValides.push(distances[i]);
                angPente.push(res.angle);
            } else {
                angPente.push(null);
            }
        }

        // Calcul angles terrain plat (si pente ≠ 0)
        var angPlat = [];
        if (pente !== 0) {
            for (var i = 0; i < distValides.length; i++) {
                b.pente   = 0;
                b.distTir = distValides[i];
                var res   = b.getAngle();
                angPlat.push(typeof res.alert === 'undefined' ? res.angle : null);
            }
        }

        // ── Calcul du réglage viseur ──────────────────────────────────────────
        var reglageHtml = '';
        var hasPlat = angPlat.length > 0 && angPlat[0] !== null;

        if (hasPlat && distCible <= distValides[distValides.length - 1]) {
            b.pente   = pente;
            b.distTir = distCible;
            var resCible  = b.getAngle();
            var spline    = cubicSpline(angPlat, distValides);
            var angCible  = resCible.angle;
            var distViseur = spline(angCible);

            reglageHtml = '<p>Réglage de la distance de tir sur viseur en fonction de la pente du terrain et de la distance de la cible\u00a0:</p>'
                + '<table><tr><th>Pente [°]</th><th>Cible [m]</th><th>Viseur [m]</th></tr>'
                + '<tr><td>' + round(pente, 1) + '</td>'
                + '<td>' + round(distCible, 1) + '</td>'
                + '<td>' + round(distViseur, 1) + '</td></tr>'
                + '</table>';
        }

        // ── Tableau des valeurs ───────────────────────────────────────────────
        var tableauHtml = '';
        if (hasPlat) {
            tableauHtml = '<div class="calc-h3">Tableau des valeurs\u00a0:</div>'
                + '<table><tr><th>distTir [m]</th><th>Terrain plat<br>angTir [°]</th><th>Terrain en pente<br>angTir [°]</th></tr>';
            for (var i = 0; i < distValides.length; i++) {
                tableauHtml += '<tr>'
                    + '<td>' + round(distValides[i], 3) + '</td>'
                    + '<td>' + (angPlat[i] !== null ? round(angPlat[i], 4).toFixed(4) : '<i>hors portée</i>') + '</td>'
                    + '<td>' + (angPente[i] !== null ? round(angPente[i], 4).toFixed(4) : '<i>hors portée</i>') + '</td>'
                    + '</tr>';
            }
            tableauHtml += '</table>';
        } else {
            tableauHtml = '<table><tr><th>distTir [m]</th><th>Terrain plat<br>angTir [°]</th></tr>';
            for (var i = 0; i < distValides.length; i++) {
                tableauHtml += '<tr>'
                    + '<td>' + round(distValides[i], 3) + '</td>'
                    + '<td>' + (angPente[i] !== null ? round(angPente[i], 4).toFixed(4) : '<i>hors portée</i>') + '</td>'
                    + '</tr>';
            }
            tableauHtml += '</table>';
        }

        // Avertissement distances hors portée
        var warningHtml = '';
        if (distValides.length < distances.length) {
            if (distValides.length > 0) {
                var horsPortee = distances.slice(distValides.length).map(function(d) { return round(d, 3); }).join(', ');
                warningHtml = '<p><b>Attention\u00a0:</b> les distances suivantes ' + horsPortee
                    + '\u00a0m sont hors de portée de tir\u00a0!<br>'
                    + '<i>(vérifier et ajuster éventuellement les paramètres de tir)</i></p>';
            } else {
                tableauHtml = '<dl class="calc-error"><dd>Les distances indiquées sont hors de portées de tir.</dd>'
                    + '<dd>→ vérifier et ajuster les paramètres.</dd></dl>';
            }
        }

        document.getElementById('form_6_resultat').innerHTML = reglageHtml + tableauHtml + warningHtml;

        showOutput();

        // ── Graphique ─────────────────────────────────────────────────────────
        var figEl  = document.getElementById('figure_6');
        var infoEl = document.getElementById('form_6_info');

        if (distValides.length === distances.length && hasPlat) {
            figEl.style.display  = 'block';
            infoEl.style.display = 'block';

            var datasets = [
                {
                    label: 'Terrain en pente',
                    data: distValides.map(function(d, i) { return { x: d, y: angPente[i] }; }),
                    borderColor: pente < 0 ? '#4C10AE' : '#086CA2',
                    backgroundColor: 'transparent',
                    borderWidth: 2,
                    pointRadius: 3,
                    tension: 0.3
                },
                {
                    label: 'Terrain plat',
                    data: distValides.map(function(d, i) { return { x: d, y: angPlat[i] }; }),
                    borderColor: '#FFBA00',
                    backgroundColor: 'transparent',
                    borderWidth: 2,
                    pointRadius: 3,
                    tension: 0.3
                }
            ];

            // Ligne horizontale rouge à l'angle correspondant à distCible en pente
            // Son intersection avec la courbe "plat" donne la distance viseur
            var angLigne = null, distViseur = null;
            if (distCible <= distValides[distValides.length - 1]) {
                b.pente   = pente;
                b.distTir = distCible;
                var resCible2 = b.getAngle();
                if (typeof resCible2.alert === 'undefined') {
                    angLigne = resCible2.angle;
                    var spline2  = cubicSpline(angPlat, distValides);
                    distViseur   = spline2(angLigne);
                    datasets.push({
                        label: 'Référence (cible\u00a0' + round(distCible, 1) + '\u00a0m → viseur\u00a0' + round(distViseur, 1) + '\u00a0m)',
                        data: [
                            { x: distValides[0],                    y: angLigne },
                            { x: distValides[distValides.length-1], y: angLigne }
                        ],
                        borderColor: '#FF4200',
                        backgroundColor: 'transparent',
                        borderWidth: 1.5,
                        borderDash: [6, 4],
                        pointRadius: 0,
                        tension: 0
                    });
                }
            }

            if (chartInstance) { chartInstance.destroy(); }
            var ctx = document.getElementById('graphe_6').getContext('2d');
            chartInstance = new Chart(ctx, {
                type: 'line',
                data: { datasets: datasets },
                options: {
                    responsive: true,
                    parsing: false,
                    interaction: { mode: 'index', intersect: false },
                    plugins: {
                        legend: {
                            display: true,
                            labels: {
                                generateLabels: function(chart) {
                                    return chart.data.datasets.map(function(ds, i) {
                                        return {
                                            text: ds.label,
                                            strokeStyle: ds.borderColor,
                                            fillStyle: 'transparent',
                                            lineWidth: ds.borderWidth || 2,
                                            lineDash: ds.borderDash || [],
                                            datasetIndex: i
                                        };
                                    });
                                }
                            }
                        },
                        tooltip: {
                            mode: 'index',
                            intersect: false,
                            callbacks: {
                                title: function(items) {
                                    if (!items.length) return '';
                                    return 'Distance\u00a0: ' + round(items[0].parsed.x, 1) + '\u00a0m';
                                },
                                label: function() { return null; },
                                afterBody: function(items) {
                                    if (!items.length) return [];
                                    var xVal = items[0].parsed.x;
                                    // Interpoler l'angle en pente pour cette distance X
                                    var spPente = cubicSpline(distValides, angPente.map(function(v){ return v !== null ? v : 0; }));
                                    var angX = spPente(xVal);
                                    // Interpoler la distance viseur (plat) pour cet angle
                                    var angPlatFiltre  = angPlat.filter(function(v, i){ return angPlat[i] !== null; });
                                    var distPlatFiltre = distValides.filter(function(v, i){ return angPlat[i] !== null; });
                                    var spPlatInv = cubicSpline(angPlatFiltre, distPlatFiltre);
                                    var dViseurX = spPlatInv(angX);
                                    return [
                                        'Cible (en pente)\u00a0: ' + round(xVal, 1) + '\u00a0m',
                                        'Viseur (\u00e0 plat)\u00a0: ' + round(dViseurX, 1) + '\u00a0m'
                                    ];
                                }
                            }
                        }
                    },
                    scales: {
                        x: {
                            type: 'linear',
                            title: { display: true, text: 'Distance [m]' },
                            min: distValides[0],
                            max: distValides[distValides.length - 1]
                        },
                        y: {
                            title: { display: true, text: 'Angle de tir [°]' },
                            min: Math.min.apply(null, angPente.filter(function(v) { return v !== null; })),
                            max: Math.max.apply(null, angPente.filter(function(v) { return v !== null; }))
                        }
                    }
                }
            });

            document.getElementById('form_6_info').innerHTML = afficherKinetic(m_gr, Vo_fps);
        } else {
            figEl.style.display  = 'none';
            infoEl.style.display = 'none';
        }
    });

})();
