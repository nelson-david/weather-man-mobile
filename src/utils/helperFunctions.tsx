function msToMinutes(ms: number): string {
	const minutes = Math.floor(ms / 60000); // 60000 ms in one minute
	const seconds = Math.floor((ms % 60000) / 1000); // remaining milliseconds converted to seconds
	const paddedSeconds = seconds < 10 ? `0${seconds}` : seconds; // padding seconds if less than 10
	return `${minutes}:${paddedSeconds}`;
}

export { msToMinutes };
