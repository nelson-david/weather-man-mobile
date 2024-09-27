function formatDate(dateString: any) {
	const date = new Date(dateString);

	// Array of weekday names
	const daysOfWeek = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];

	// Array of month names
	const monthsOfYear = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	// Get the day of the week
	const dayOfWeek = daysOfWeek[date.getDay()];

	// Get the day of the month
	const dayOfMonth = date.getDate();

	// Determine the ordinal suffix for the day (st, nd, rd, th)
	const ordinalSuffix = (day: any) => {
		if (day > 3 && day < 21) return "th";
		switch (day % 10) {
			case 1:
				return "st";
			case 2:
				return "nd";
			case 3:
				return "rd";
			default:
				return "th";
		}
	};

	// Get the month name
	const month = monthsOfYear[date.getMonth()];

	// Format the final string
	return `${dayOfWeek}, ${dayOfMonth}${ordinalSuffix(dayOfMonth)} ${month}`;
}

export { formatDate };
