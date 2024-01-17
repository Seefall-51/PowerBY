function Graph() {
	document.getElementById('fileUpload').addEventListener('change', handleFileSelect);

	function handleFileSelect(event) {
	const file = event.target.files[0];

	if (file) {
		const reader = new FileReader();

		reader.onload = function (e) {
		const csvContent = e.target.result;
		const data = parseCSV(csvContent);

		createChart(data);
		};

		reader.readAsText(file);
	}
	

	function parseCSV(csvContent) {
	const lines = csvContent.split('\n');
	const data = [];

	for (let i = 0; i < lines.length; i++) {
		const line = lines[i].trim();

		if (line) {
		const values = line.split(',');
		data.push(values);
		}
	}

	return data;
	}
	
	function createChart(data) {
		const labels = data[0]; 
		data.shift(); 

		const datasets = [];

		for (let i = 0; i < data[0].length; i++) {
			const values = data.map(row => parseFloat(row[i]));
			datasets.push({
			label: labels[i],
			data: values,
			borderColor: getRandomColor(),
			fill: false,
			});
		}

		const ctx = document.getElementById('myChart').getContext('2d');
		const myChart = new Chart(ctx, {
			type: 'line',
			data: {
			labels: labels,
			datasets: datasets,
			},
		});
		}

		function getRandomColor() {
		const letters = '0123456789ABCDEF';
		let color = '#';
		for (let i = 0; i < 6; i++) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
		}
	}
}

function OtherGraph() {
	d3.csv("data.csv").then(makeChart);

	function makeChart(countries) {
		var countryLabels = countries.map(function (d) {
			return d.pays;
		});
		var populationData = countries.map(function (d) {
			return d.population;
		});

		var chart = new Chart("myChart", {
			type: "bar",
			data: {
				labels: countryLabels,
				datasets: [
					{
						data: populationData,
						backgroundColor: 'grey'
					}
				]
			}
		});

		return chart;
	}
}
