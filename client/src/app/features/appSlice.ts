import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { User } from "../../types/user"
import { AppState } from "../../types/appState"
import { Alert } from "../../types/alert"

const initialState: AppState = {
	user: null,
	serverUrl: "https://krajina.onrender.com",
	appUrl: "https://krajina.netlify.app/",
	alerts: [],
	alertLifeTime: 5000,
}

const appSlice = createSlice({
	name: "app",
	initialState,
	reducers: {
		login: (
			state,
			action: PayloadAction<{ token: string; user: User }>
		) => {
			state.user = action.payload.user
		},
		logout: state => {
			state.user = null
		},
		addAlert: (state, action: PayloadAction<Alert>) => {
			state.alerts.push(action.payload)
		},
		deleteAlert: state => {
			state.alerts.shift()
		},
	},
})

export default appSlice.reducer
export const { login, logout, addAlert, deleteAlert } = appSlice.actions
