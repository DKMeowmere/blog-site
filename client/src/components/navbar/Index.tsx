import { StyledNavbar } from "./styles"
import { Link } from "react-router-dom"
import { useAppSelector } from "../../app/hooks"
import { AiOutlinePoweroff } from "react-icons/ai"
import { useLogout } from "../../hooks/useLogout"
import { useAvatarUrl } from "../../hooks/useAvatarUrl"

export default function Navbar() {
	const user = useAppSelector(state => state.app.user)
	const { logout } = useLogout()
	const { getAvatarUrl } = useAvatarUrl()

	return (
		<StyledNavbar>
			<Link to="/">
				<img src="/img/logo.svg" className="logo" alt="logo" />
			</Link>
			<div className="right">
				{!user && (
					<Link className="login-link" to="login">
						zaloguj się
					</Link>
				)}
				{user && (
					<>
						<Link to={`/profile/${user._id}`}>
							<img
								src={getAvatarUrl(user.avatarUrl)}
								alt="User avatar"
								className="avatar"
							/>
						</Link>
						<AiOutlinePoweroff className="icon" onClick={logout} />
					</>
				)}
			</div>
		</StyledNavbar>
	)
}
