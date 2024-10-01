function msToMinutes(ms: number): string {
	const minutes = Math.floor(ms / 60000); // 60000 ms in one minute
	const seconds = Math.floor((ms % 60000) / 1000); // remaining milliseconds converted to seconds
	const paddedSeconds = seconds < 10 ? `0${seconds}` : seconds; // padding seconds if less than 10
	return `${minutes}:${paddedSeconds}`;
}

function getWeatherIcon(temperature: number): string {
	if (temperature >= 30) {
		// Hot weather
		return "🔥";
	} else if (temperature >= 20 && temperature < 30) {
		// Sunny/clear weather
		return "☀️";
	} else if (temperature >= 15 && temperature < 20) {
		// Partly cloudy
		return "🌤️";
	} else if (temperature >= 10 && temperature < 15) {
		// Cloudy/overcast
		return "☁️";
	} else if (temperature >= 5 && temperature < 10) {
		// Light rain/drizzle
		return "🌦️";
	} else if (temperature >= 0 && temperature < 5) {
		// Rainy weather
		return "🌧️";
	} else if (temperature >= -5 && temperature < 0) {
		// Snowy weather
		return "🌨️";
	} else if (temperature < -5) {
		// Extremely cold weather
		return "❄️";
	} else {
		// Default case for unexpected inputs
		return "🌫️";
	}
}

export { msToMinutes, getWeatherIcon };
