import Chart from 'chart.js/auto'; // Si usas módulos (ESM)

const ctx = document.getElementById("ingresosChart").getContext("2d");

const ingresosChart = new Chart(ctx, {
    type: "bar",
    data: {
        labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo"],
        datasets: [{
            label: "Ingresos",
            data: [1200, 1500, 1100, 1800, 2000],
            backgroundColor: "#1a237e",
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false
    }
});
