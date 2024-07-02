
// labels and dataset arrays
const labels = ["2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012"];
const data = {
    labels: labels,
    datasets: []
};

// Extract data 
function extractData() {
    const table = document.getElementById('table1');
    const rows = table.querySelectorAll('tbody tr');

    rows.forEach((row) => {
        const cells = row.querySelectorAll('td, th');
        const country = cells[1].innerText;
        const values = Array.from(cells)
            .slice(2)
            .map(cell => parseFloat(cell.innerText.replace(',', '.')));

        const countryDataset = {
            label: country,
            data: values,
            borderColor: getRandomColor(),
            fill: false
        };
        data.datasets.push(countryDataset);
    });
}

// random color
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

extractData();

//Chart.js configuration
const config = {
    type: 'line',
    data: data,
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Offences recorded by the police, 2002-12'
            }
        }
    }
};

const myChart = new Chart(
    document.getElementById('myChart'),
    config
);

// Chart 2

const ctx = document.getElementById('myChart2').getContext('2d');
const chart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: [
            'Latvia', 'Lithuania', 'Estonia', 'Czech Republic', 'Poland',
            'Slovakia', 'Hungary', 'England and Wales(UK)', 'Scotland(UK)', 'Spain',
            'Romania', 'Malta', 'Bulgaria', 'Luxembourg', 'Portugal',
            'Croatia', 'Italy', 'Greece', 'France', 'Austria',
            'Belgium', 'Northern Ireland(UK)', 'The Netherlands', 'Germany', 'Ireland',
            'Cyprus', 'Denmark', 'Sweden', 'Slovenia', 'Finland'
        ],
        datasets: [
            {
                label: '2007–09',
                data: [
                    312, 247, 266, 198, 228, 159, 148,
                    151, 150, 158, 132, 126, 132, 139,
                    106, 108, 98, 105, 99, 101, 93,
                    84, 90, 89, 76, 84, 66, 74, 66, 63
                ],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            },
            {
                label: '2010–12',
                data: [
                    312, 307, 253, 217, 214, 197, 169,
                    154, 154, 152, 150, 143, 132, 126,
                    120, 116, 113, 112, 106, 104, 101,
                    91, 84, 84, 80, 78, 72, 71, 65, 60
                ],
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1
            }
        ]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        },
        plugins: {
            title: {
                display: true,
                text: 'Prison Population, Average per Year (per 100,000 inhabitants)'
            }
        }
    }
});

// Ajax

function loadData() {
    fetch("https://canvasjs.com/services/data/datapoints.php")
        .then(response => response.json())
        .then(dataPoints => {
            displayData(dataPoints);
        })
        .catch(error => console.error("Error fetching data:", error));
}

function displayData(dataPoints) {
    var output = "<ul>";
    dataPoints.forEach(function (point) {
        output += "<li>X: " + point[0] + ", Y: " + point[1] + "</li>";
    });
    output += "</ul>";
    document.getElementById("dataPoints").innerHTML = output;
}

loadData();


function loadData() {
    fetch("https://canvasjs.com/services/data/datapoints.php")
        .then(response => response.json())
        .then(dataPoints => {
            displayChart(dataPoints);
        })
        .catch(error => console.error("Error fetching data:", error));
}

function displayChart(dataPoints) {
    const data = dataPoints.map(point => ({
        x: point[0],
        y: point[1]
    }));

    const chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        theme: "light2",
        title: {
            text: "Data Points"
        },
        axisY: {
            title: "Y Value"
        },
        data: [{
            type: "line",
            dataPoints: data
        }]
    });

    chart.render();
}

loadData();
