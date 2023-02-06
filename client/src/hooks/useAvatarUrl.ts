import { useAppSelector } from "../app/hooks"

export function useAvatarUrl() {
	const serverUrl = useAppSelector(state => state.app.serverUrl)

	function getAvatarUrl(path: string | null | undefined) {
		if (!path) {
			return `${serverUrl}/static/uploads/avatars/default-avatar.jpg`
		}
		return `${serverUrl}/static/uploads/avatars/${path}`
	}

	return { getAvatarUrl }
}
