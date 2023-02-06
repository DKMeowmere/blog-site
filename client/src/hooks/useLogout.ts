import { useCookies } from "react-cookie"
import { useAppDispatch } from "../app/hooks"
import { logout as logoutAction } from "../app/features/appSlice"

export const useLogout = () => {
	const [, setCookie] = useCookies(["user"])
	const dispatch = useAppDispatch()

	function logout() {
		setCookie("user", null)
		dispatch(logoutAction())
	}

	return { logout }
}
