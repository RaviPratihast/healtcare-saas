import { useEffect } from 'react'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signInAnonymously,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  type AuthError,
} from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { auth } from '@/services/firebase'
import { useAuthStore } from '@/features/auth/store/authStore'
import { triggerLoginNotification } from '@/services/notifications'

const googleProvider = new GoogleAuthProvider()

function resolveFirebaseError(code: string): string {
  const errors: Record<string, string> = {
    'auth/user-not-found': 'No account found with this email.',
    'auth/wrong-password': 'Incorrect password.',
    'auth/invalid-email': 'Please enter a valid email address.',
    'auth/invalid-credential': 'Invalid email or password.',
    'auth/email-already-in-use': 'An account with this email already exists.',
    'auth/weak-password': 'Password must be at least 6 characters.',
    'auth/too-many-requests': 'Too many attempts. Please try again later.',
    'auth/popup-closed-by-user': 'Google sign-in was cancelled.',
    'auth/missing-email': 'Enter your email address.',
    'auth/unauthorized-continue-uri':
      'This site’s domain must be listed under Firebase Console → Authentication → Settings → Authorized domains.',
    'auth/invalid-continue-uri': 'Password reset link is misconfigured. Check Authorized domains in Firebase.',
    'auth/operation-not-allowed':
      'Email/password sign-in is disabled for this project. Enable it in Firebase Console → Authentication → Sign-in method.',
  }
  return errors[code] ?? 'Something went wrong. Please try again.'
}

export function useAuth() {
  const { user, isLoading, error, setUser, setLoading, setError } = useAuthStore()
  const navigate = useNavigate()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser)
      setLoading(false)
    })
    return unsubscribe
  }, [setUser, setLoading])

  async function login(email: string, password: string) {
    setLoading(true)
    setError(null)
    try {
      const result = await signInWithEmailAndPassword(auth, email, password)
      await triggerLoginNotification(result.user.email ?? 'User')
      navigate('/dashboard')
    } catch (err) {
      setError(resolveFirebaseError((err as AuthError).code))
    } finally {
      setLoading(false)
    }
  }

  async function register(email: string, password: string) {
    setLoading(true)
    setError(null)
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password)
      await triggerLoginNotification(result.user.email ?? 'User')
      navigate('/dashboard')
    } catch (err) {
      setError(resolveFirebaseError((err as AuthError).code))
    } finally {
      setLoading(false)
    }
  }

  async function googleLogin() {
    setLoading(true)
    setError(null)
    try {
      const result = await signInWithPopup(auth, googleProvider)
      await triggerLoginNotification(
        result.user.displayName ?? result.user.email ?? 'User',
      )
      navigate('/dashboard')
    } catch (err) {
      setError(resolveFirebaseError((err as AuthError).code))
    } finally {
      setLoading(false)
    }
  }

  async function guestLogin() {
    setLoading(true)
    setError(null)
    try {
      await signInAnonymously(auth)
      navigate('/dashboard')
    } catch (err) {
      setError(resolveFirebaseError((err as AuthError).code))
    } finally {
      setLoading(false)
    }
  }

  /**
   * Password reset: does not toggle global `isLoading` so the sign-in form stays usable.
   * Uses a continue URL so Identity Toolkit requests match Firebase authorized domains.
   */
  async function forgotPassword(
    email: string,
  ): Promise<{ ok: true } | { ok: false; message: string }> {
    const trimmed = email.trim()
    if (!trimmed) {
      return { ok: false, message: 'Enter your email in the field above, then try again.' }
    }

    const actionCodeSettings = {
      url: `${window.location.origin}/login`,
      handleCodeInApp: false,
    }

    try {
      await sendPasswordResetEmail(auth, trimmed, actionCodeSettings)
      return { ok: true }
    } catch (err) {
      const code = (err as AuthError).code
      // Match Firebase’s anti-enumeration behavior: same outcome as “email sent”
      if (code === 'auth/user-not-found') {
        return { ok: true }
      }
      return { ok: false, message: resolveFirebaseError(code || 'unknown') }
    }
  }

  async function logout() {
    await signOut(auth)
    setUser(null)
    navigate('/login')
  }

  return { user, isLoading, error, login, register, googleLogin, guestLogin, forgotPassword, logout }
}
