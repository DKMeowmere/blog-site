export function useDateFormat() {
	const dateOptions: Intl.DateTimeFormatOptions = {
		minute: "2-digit",
		hour: "2-digit",
		weekday: "long",
		day: "numeric",
		month: "long",
		year: "numeric",
	}

	function formatDate(userDate: string) {
		const date = new Date(userDate)

		return date.toLocaleDateString("pl-PL", dateOptions)
	}

	return { formatDate }
}
