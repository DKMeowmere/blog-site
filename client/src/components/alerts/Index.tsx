import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { AlertIcon } from "./AlertIcon"
import { Alert, AlertsContainer } from "./styles"
import { deleteAlert } from "../../app/features/appSlice"

export default function Alerts() {
	const alerts = useAppSelector(state => state.app.alerts)
	const alertLifeTime = useAppSelector(state => state.app.alertLifeTime)
	const dispatch = useAppDispatch()

	return (
		<AlertsContainer>
			{alerts.map(alert => {
				setTimeout(() => {
					dispatch(deleteAlert())
				}, alertLifeTime)

				return (
					<Alert
						type={alert.type}
						key={crypto.randomUUID()}
					>
						<AlertIcon type={alert.type} />
						{alert.body}
					</Alert>
				)
			})}
		</AlertsContainer>
	)
}
