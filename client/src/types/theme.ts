export type Theme = {
	media: {
		breakpoints: {
			xs: string
			sm: string
			md: string
			lg: string
			xl: string
		}
		containerWidth: {
			xs: string
			sm: string
			md: string
			lg: string
			xl: string
		}
	}
	colors: {
		mainBlue: string
		whiteText: string
		blackText: string
		errorMain: string
		errorSecondary: string
		warningMain: string
		warningSecondary: string
		successMain: string
		successSecondary: string
		infoMain: string
		infoSecondary: string
	}
}
