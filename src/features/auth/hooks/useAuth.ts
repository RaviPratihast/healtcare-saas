import { useCallback } from 'react'
import { useAuthStore } from '@/features/auth/store/authStore'
import { auth, signInWithEmailAndPassword, signOut } from '@/services/firebase'

export function useAuth() {
  const { setUser, clearUser, setLoading, setError } = useAuthStore()

  const login = useCallback(
    async (email: string, password: string) => {
      setLoading(true)
      setError(null)

      try {
        const credential = await signInWithEmailAndPassword(auth, email, password)
        setUser(credential.user)
      } catch (error) {
        const message =
          error instanceof Error ? error.message : 'Unable to sign in. Please try again.'
        setError(message)
        clearUser()
      } finally {
        setLoading(false)
      }
    },
    [clearUser, setError, setLoading, setUser],
  )

  const logout = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      await signOut(auth)
      clearUser()
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Unable to sign out. Please try again.'
      setError(message)
    } finally {
      setLoading(false)
    }
  }, [clearUser, setError, setLoading])

  return { login, logout }
}
