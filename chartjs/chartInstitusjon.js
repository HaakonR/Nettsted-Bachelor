var data = JSON.parse(sessionStorage.getItem("institusjon"));
var color = Chart.helpers.color;
var barChartData = {
    labels: ["2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016"],

    datasets: [{
        label: 'Nivå 1',
        backgroundColor:'#EE2323',
        borderWidth: 1,
        data:  [data.produksjon[18],data.produksjon[16],data.produksjon[14],data.produksjon[12],data.produksjon[10],data.produksjon[8],data.produksjon[6],data.produksjon[4],data.produksjon[2],data.produksjon[0]]
    }, {
        label: 'Nivå 2',
        backgroundColor:'#8C0606',
        borderWidth: 1,
        data: [-data.produksjon[19],-data.produksjon[17],-data.produksjon[15],-data.produksjon[13],-data.produksjon[11],-data.produksjon[9],-data.produksjon[7],-data.produksjon[5],-data.produksjon[3],-data.produksjon[1]]
    }]

};
var opt = {
    responsive: true,
    legend: {
        display: true,
        labels: {
            fontSize: 16,
            fontColor: 'black',
            fontFamily: "Open Sans",
        }
    },
    tooltips: {
        titleFontSize: 17,
        bodyFontSize: 17,
        callbacks: {
            label: function(tooltipItem, chartData) {
                var niva1 = chartData.datasets["0"].label;
                var niva2 = chartData.datasets["1"].label;
                var niva2Tall = (tooltipItem.yLabel - tooltipItem.yLabel) -tooltipItem.yLabel;
                if(tooltipItem.yLabel < 0) {
                    return niva2 + ": " + niva2Tall;
                } else {
                    return niva1 + ": " + tooltipItem.yLabel;
                }

            }
        }
    },
    scales: {
        yAxes: [{
            stacked:true,
            ticks: {
                fontSize: 13,
                fontColor: 'black',
                fontFamily: "Open Sans",
                callback: function(label, index, labels) {
                    if (Math.floor(label) === label) {
                        if(label < 0) {
                            return (label - label) - label;
                        }
                        return label;
                    }
                },
            }

        }],
        xAxes: [{
            stacked: true,
            ticks: {
                fontColor: 'black',
                fontFamily: "Open Sans",
                fontSize: 16,
            }
        }]
    }
};
window.onload = function() {
    var ctx = document.getElementById("canvas").getContext("2d");
    window.myBar = new Chart(ctx, {
        type: 'bar',
        data: barChartData,
        options: opt
    });
};