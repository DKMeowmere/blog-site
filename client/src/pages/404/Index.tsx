import { Link } from "react-router-dom"

export default function NotFoundPage() {
	return (
		<>
			<div>Nie znaleziono!</div>
			<Link to="/">Wróc do strony głównej</Link>
		</>
	)
}
