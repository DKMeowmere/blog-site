import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/home/Index"
import Login from "./pages/login/Index"
import Signup from "./pages/signup/Index"
import Navbar from "./components/navbar/Index"
import { Container } from "./components/container/Container"
import { useEffect } from "react"
import { useCookies } from "react-cookie"
import { useAppDispatch, useAppSelector } from "./app/hooks"
import { login } from "./app/features/appSlice"
import Blog from "./pages/blog/Index"
import CreateBlog from "./pages/createBlog/Index"
import NotFoundPage from "./pages/404/Index"
import UpdateBlog from "./pages/updateBlog/Index"
import Profile from "./pages/profile/Index"
import UpdateProfile from "./pages/updateProfile/Index"
import Alerts from "./components/alerts/Index"

function App() {
	const [cookies, setCookies] = useCookies()
	const dispatch = useAppDispatch()
	const serverUrl = useAppSelector(state => state.app.serverUrl)

	useEffect(() => {
		const user = cookies.user

		if (user) {
			dispatch(login(user))
		}
		if (user && user.token) {
			fetchUser()
		}
		async function fetchUser() {
			const res = await fetch(`${serverUrl}/api/user/login`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					authorization: `Bearer ${user.token}`,
				},
			})
			const data = await res.json()
			dispatch(login(data))
			setCookies("user", data)
		}
	}, [])

	return (
		<BrowserRouter>
			<Container bgcolor="#eee">
				<Navbar />
				<Routes>
					<Route element={<Home />} path="/" />
					<Route element={<Login />} path="/login" />
					<Route element={<Signup />} path="/signup" />
					<Route element={<CreateBlog />} path="/blogs/create" />
					<Route element={<Blog />} path="/blogs/:id" />
					<Route element={<UpdateBlog />} path="/blogs/:id/update" />
					<Route element={<Profile />} path="/profile/:id" />
					<Route
						element={<UpdateProfile />}
						path="/profile/:id/update"
					/>
					<Route element={<NotFoundPage />} path="*" />
				</Routes>
				<Alerts />
			</Container>
		</BrowserRouter>
	)
}

export default App
