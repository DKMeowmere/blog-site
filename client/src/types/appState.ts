import { Alerts } from "./alert"
import { User } from "./user"

export type AppState = {
	user: User | null
	serverUrl: string
	appUrl: string
	alerts: Alerts
	alertLifeTime: number
}
