import { Theme } from "../types/theme"

const theme: Theme = {
	media: {
		breakpoints: {
			xs: "0px",
			sm: "600px",
			md: "900px",
			lg: "1200px",
			xl: "1536px",
		},
		containerWidth: {
			xs: "300px",
			sm: "540px",
			md: "810px",
			lg: "1080px",
			xl: "1380px",
		},
	},
	colors: {
		mainBlue: "#3d69fe",
		whiteText: "#fff",
		blackText: "#fff",
		errorMain: "#da5252",
		errorSecondary: "#fdeded",
		warningMain: "#ee7f23",
		warningSecondary: "#fff4e5",
		successMain: "#458b49",
		successSecondary: "#edf7ed",
		infoMain: "#319eda",
		infoSecondary: "#e5f6fd",
	},
}

export default theme
