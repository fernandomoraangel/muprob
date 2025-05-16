// Almacenar las instancias de los gráficos
let charts = {
    uniform: null,
    bernoulli: null,
    binomial: null,
    poisson: null,
    normal: null,
    exponential: null,
    markov: null
};

// Funciones para actualizar gráficos

function updateUniformChart() {
    const ctx = document.getElementById('uniformChart').getContext('2d');
    const minNote = parseInt(document.getElementById('uniformMinNote').value);
    const maxNote = parseInt(document.getElementById('uniformMaxNote').value);
    const numNotes = parseInt(document.getElementById('uniformNumNotes').value);
    
    const data = Array.from({length: numNotes}, () => Math.random() * (maxNote - minNote) + minNote);
    
    if (charts.uniform) {
        charts.uniform.data.datasets[0].data = data.map(x => parseFloat(x.toFixed(2)));
        charts.uniform.update();
    } else {
        charts.uniform = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: Array.from({length: numNotes}, (_, i) => `Nota ${i+1}`),
                datasets: [{
                    label: 'Distribución Uniforme',
                    data: data.map(x => parseFloat(x.toFixed(2))),
                    backgroundColor: 'rgba(59, 130, 246, 0.5)',
                    borderColor: 'rgba(59, 130, 246, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Valor MIDI'
                        },
                        ticks: {
                            callback: function(value) {
                                return value.toFixed(2);
                            }
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Notas'
                        }
                    }
                },
                plugins: {
                    legend: {
                        position: 'top'
                    }
                }
            }
        });
    }
}

function updateBernoulliChart() {
    const ctx = document.getElementById('bernoulliChart').getContext('2d');
    const p = parseFloat(document.getElementById('bernoulliP').value);
    const numEvents = parseInt(document.getElementById('bernoulliNumEvents').value);
    
    const success = Array.from({length: numEvents}, () => Math.random() < p ? 1 : 0);
    const data = [success.filter(x => x === 1).length, success.filter(x => x === 0).length];
    
    if (charts.bernoulli) {
        charts.bernoulli.data.datasets[0].data = data;
        charts.bernoulli.update();
    } else {
        charts.bernoulli = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Éxito', 'Fracaso'],
                datasets: [{
                    data: data,
                    backgroundColor: ['rgba(59, 130, 246, 0.5)', 'rgba(239, 68, 68, 0.5)'],
                    borderColor: ['rgba(59, 130, 246, 1)', 'rgba(239, 68, 68, 1)'],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top'
                    }
                }
            }
        });
    }
}

function updateBinomialChart() {
    const ctx = document.getElementById('binomialChart').getContext('2d');
    const n = parseInt(document.getElementById('binomialN').value);
    const p = parseFloat(document.getElementById('binomialP').value);
    
    const data = Array.from({length: n + 1}, (_, k) => {
        const combinations = (n, k) => {
            let result = 1;
            for (let i = 1; i <= k; i++) {
                result *= (n + 1 - i) / i;
            }
            return result;
        };
        return combinations(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k);
    });

    if (charts.binomial) {
        charts.binomial.data.datasets[0].data = data.map(x => parseFloat(x.toFixed(4)));
        charts.binomial.update();
    } else {
        charts.binomial = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: Array.from({length: n + 1}, (_, k) => `k=${k}`),
                datasets: [{
                    label: 'Distribución Binomial',
                    data: data.map(x => parseFloat(x.toFixed(4))),
                    backgroundColor: 'rgba(59, 130, 246, 0.5)',
                    borderColor: 'rgba(59, 130, 246, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Probabilidad'
                        },
                        ticks: {
                            callback: function(value) {
                                return value.toFixed(4);
                            }
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Número de Éxitos'
                        }
                    }
                },
                plugins: {
                    legend: {
                        position: 'top'
                    }
                }
            }
        });
    }
}

function updatePoissonChart() {
    const ctx = document.getElementById('poissonChart').getContext('2d');
    const lambda = parseFloat(document.getElementById('poissonLambda').value);
    const maxK = 10; // Número máximo de eventos a mostrar
    
    const data = Array.from({length: maxK + 1}, (_, k) => {
        return Math.pow(lambda, k) * Math.exp(-lambda) / factorial(k);
    });

    if (charts.poisson) {
        charts.poisson.data.datasets[0].data = data.map(x => parseFloat(x.toFixed(4)));
        charts.poisson.update();
    } else {
        charts.poisson = new Chart(ctx, {
            type: 'line',
            data: {
                labels: Array.from({length: maxK + 1}, (_, k) => `k=${k}`),
                datasets: [{
                    label: 'Distribución Poisson',
                    data: data.map(x => parseFloat(x.toFixed(4))),
                    borderColor: 'rgba(59, 130, 246, 1)',
                    tension: 0.1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Probabilidad'
                        },
                        ticks: {
                            callback: function(value) {
                                return value.toFixed(4);
                            }
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Número de Eventos'
                        }
                    }
                },
                plugins: {
                    legend: {
                        position: 'top'
                    }
                }
            }
        });
    }
}

function updateNormalChart() {
    const ctx = document.getElementById('normalChart').getContext('2d');
    const mean = parseFloat(document.getElementById('normalMean').value);
    const stdDev = parseFloat(document.getElementById('normalStdDev').value);
    const numPoints = 100;
    
    const data = Array.from({length: numPoints}, (_, i) => {
        const x = mean - 3 * stdDev + (i / (numPoints - 1)) * 6 * stdDev;
        return Math.exp(-Math.pow(x - mean, 2) / (2 * stdDev * stdDev)) / (stdDev * Math.sqrt(2 * Math.PI));
    });

    if (charts.normal) {
        charts.normal.data.datasets[0].data = data.map(x => parseFloat(x.toFixed(4)));
        charts.normal.update();
    } else {
        charts.normal = new Chart(ctx, {
            type: 'line',
            data: {
                labels: Array.from({length: numPoints}, (_, i) => 
                    (mean - 3 * stdDev + (i / (numPoints - 1)) * 6 * stdDev).toFixed(2)
                ),
                datasets: [{
                    label: 'Distribución Normal',
                    data: data.map(x => parseFloat(x.toFixed(4))),
                    borderColor: 'rgba(59, 130, 246, 1)',
                    tension: 0.1,
                    fill: true,
                    backgroundColor: 'rgba(59, 130, 246, 0.1)'
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Densidad de Probabilidad'
                        },
                        ticks: {
                            callback: function(value) {
                                return value.toFixed(4);
                            }
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Valor'
                        }
                    }
                },
                plugins: {
                    legend: {
                        position: 'top'
                    }
                }
            }
        });
    }
}

function updateExponentialChart() {
    const ctx = document.getElementById('exponentialChart').getContext('2d');
    const lambda = parseFloat(document.getElementById('expoLambda').value);
    const maxTime = 5; // Tiempo máximo a mostrar
    const numPoints = 100;
    
    const data = Array.from({length: numPoints}, (_, i) => {
        const x = (i / (numPoints - 1)) * maxTime;
        return lambda * Math.exp(-lambda * x);
    });

    if (charts.exponential) {
        charts.exponential.data.datasets[0].data = data.map(x => parseFloat(x.toFixed(4)));
        charts.exponential.update();
    } else {
        charts.exponential = new Chart(ctx, {
            type: 'line',
            data: {
                labels: Array.from({length: numPoints}, (_, i) => 
                    ((i / (numPoints - 1)) * maxTime).toFixed(2)
                ),
                datasets: [{
                    label: 'Distribución Exponencial',
                    data: data.map(x => parseFloat(x.toFixed(4))),
                    borderColor: 'rgba(59, 130, 246, 1)',
                    tension: 0.1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Densidad de Probabilidad'
                        },
                        ticks: {
                            callback: function(value) {
                                return value.toFixed(4);
                            }
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Tiempo'
                        }
                    }
                },
                plugins: {
                    legend: {
                        position: 'top'
                    }
                }
            }
        });
    }
}

function updateMarkovChart() {
    const ctx = document.getElementById('markovChart').getContext('2d');
    const states = [60, 64, 67]; // C4, E4, G4
    const transitionMatrix = [
        [parseFloat(document.getElementById('m00').value), parseFloat(document.getElementById('m01').value), parseFloat(document.getElementById('m02').value)],
        [parseFloat(document.getElementById('m10').value), parseFloat(document.getElementById('m11').value), parseFloat(document.getElementById('m12').value)],
        [parseFloat(document.getElementById('m20').value), parseFloat(document.getElementById('m21').value), parseFloat(document.getElementById('m22').value)]
    ];

    const labels = ['C4', 'E4', 'G4'];
    const data = transitionMatrix.map(row => row.map(prob => parseFloat((prob * 100).toFixed(2))));

    if (charts.markov) {
        charts.markov.data.datasets[0].data = data;
        charts.markov.update();
    } else {
        charts.markov = new Chart(ctx, {
            type: 'heatmap',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    label: 'Matriz de Transición'
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Estado Siguiente'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Estado Actual'
                        }
                    }
                },
                plugins: {
                    legend: {
                        position: 'top'
                    }
                }
            }
        });
    }
}

// Función auxiliar para factorial
function factorial(n) {
    return n <= 1 ? 1 : n * factorial(n - 1);
}

// Eventos para actualizar gráficos
window.addEventListener('load', () => {
    // Función para actualizar cualquier gráfico
    function updateChart(sectionId) {
        const chartId = sectionId + 'Chart';
        const chart = document.getElementById(chartId);
        if (chart) {
            const ctx = chart.getContext('2d');
            // Limpiar el canvas
            ctx.clearRect(0, 0, chart.width, chart.height);
            // Actualizar el gráfico correspondiente
            switch(sectionId) {
                case 'uniform': updateUniformChart(); break;
                case 'bernoulli': updateBernoulliChart(); break;
                case 'binomial': updateBinomialChart(); break;
                case 'poisson': updatePoissonChart(); break;
                case 'normal': updateNormalChart(); break;
                case 'exponential': updateExponentialChart(); break;
                case 'markov': updateMarkovChart(); break;
            }
        }
    }

    // Actualizar gráficos iniciales
    updateChart('uniform');
    updateChart('bernoulli');
    updateChart('binomial');
    updateChart('poisson');
    updateChart('normal');
    updateChart('exponential');
    updateChart('markov');
    
    // Agregar eventos a los inputs
    document.querySelectorAll('input, select').forEach(input => {
        input.addEventListener('change', () => {
            const section = input.closest('.distribution-section');
            if (section) {
                const sectionId = section.id;
                updateChart(sectionId);
            }
        });
    });
});
