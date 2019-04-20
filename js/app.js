window.addEventListener('load', () => {

	let long;
	let lat;

	let temparatureDescription = document.querySelector('.temperature-description');
	let temperatureDegree = document.querySelector('h2.temperature-degree');
	let locationTimezone = document.querySelector('h1.location-timezone');
	let temperatureSection = document.querySelector('div.temperature-section');
	let temperatureSpan = document.querySelector('div.temperature-section span');

	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(position => {
			long = position.coords.longitude;
			lat = position.coords.latitude;

			const proxy = 'https://cors-anywhere.herokuapp.com/';
			const api = `${proxy}https://api.darksky.net/forecast/f3a30626c444f088196fd33adb7b56b2/${lat},${long}`;

			fetch(api)
				.then(response => {
					return response.json();
				})
				.then(data => {
					console.log(data);
					const {temperature, summary, icon} = data.currently;

					temperatureDegree.textContent = temperature;
					temparatureDescription.textContent = summary;
					locationTimezone.textContent = data.timezone;

					let celsius = (temperature - 32) * (5 / 9);

					temperatureSection.addEventListener('click', () => {
						if(temperatureSpan.textContent === 'F'){
							temperatureSpan.textContent = 'C';
							temperatureDegree.textContent = celsius.toFixed(2);

						} else {
							temperatureSpan.textContent = 'F';
							temperatureDegree.textContent = temperature;
						}
					});

					const iconId = document.querySelector('div.location .icon'); 

					setIcons(icon , iconId);
				});
			
		});
	}

	const setIcons = (icon, id) => {
		const skycons = new Skycons({color: 'white'});
		const currentIcon = icon.replace(/-/g, '_').toUpperCase();

		skycons.play();
		return skycons.set(id, Skycons[currentIcon]);
	}

});