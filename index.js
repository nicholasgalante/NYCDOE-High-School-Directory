fetch('https://data.cityofnewyork.us/resource/8b6c-7uty.json')
	.then(response => response.json())
	.then(data => createCard(data))
	.catch(err => console.error(err));


