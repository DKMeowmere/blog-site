import React from "react"
import { CookiesProvider } from "react-cookie"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { ThemeProvider } from "styled-components"
import App from "./App"
import { store } from "./app/store"
import theme from "./app/theme"
import "./globals.css"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<CookiesProvider>
					<App />
				</CookiesProvider>
			</ThemeProvider>
		</Provider>
	</React.StrictMode>
)
