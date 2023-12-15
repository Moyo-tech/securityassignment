import { useAuthContext } from './useAuthContext'
import { useRequestContext } from './useRequestsContext'


export const useLogout = () => {
  const { dispatch } = useAuthContext()
  const { dispatch: dispatchRequests } = useRequestContext()

  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user')

    // dispatch logout action
    dispatch({ type: 'LOGOUT' })
    dispatchRequests({ type: 'SET_REQUESTS', payload: null })
  }

  return { logout }
}