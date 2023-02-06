import { useEffect } from "react"
import { LoadingScreenContainer, Spinner } from "./styles"

export default function LoadingScreen() {
  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
			document.body.style.overflow = "hidden auto"
		}
	}, [])

	return (
		<LoadingScreenContainer>
			<Spinner />
		</LoadingScreenContainer>
	)
}
