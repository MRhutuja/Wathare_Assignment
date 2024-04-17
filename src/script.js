const ctx = document.getElementById('cycleChart').getContext('2d');
const labels = ['08:53', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '16:53'];
const data = {
    labels,
    datasets: [{
        label: 'Cycle Status',
        data: [1, 0, 0, 1, 1, 0, 1, 0], 
        backgroundColor: (context) => {
            const value = context.dataset.data[context.dataIndex];
            return value === 0 ? 'yellow' : (value === 1 ? 'green' : 'red');
        },
        borderColor: 'black',
        borderWidth: 1
    }]
};

new Chart(ctx, {
    type: 'line',
    data: data,
    options: {
        scales: {
            xAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Time'
                }
            }]
        }
    }
});