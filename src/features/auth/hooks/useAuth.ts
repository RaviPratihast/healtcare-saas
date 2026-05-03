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

function authErrorCode(err: unknown): string {
  if (err && typeof err === 'object' && 'code' in err && typeof (err as AuthError).code === 'string') {
    return (err as AuthError).code
  }
  return 'auth/unknown'
}

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
    'auth/invalid-api-key':
      'Firebase API key is missing or rejected. Copy the Web API key from Firebase Console → Project settings, put it in `.env` as VITE_FIREBASE_API_KEY, then restart `pnpm dev`. If the key uses restrictions, allow `localhost` (and your dev port) as an HTTP referrer.',
    'auth/app-not-authorized':
      'This app is not allowed to use Firebase with this API key. Check Firebase Console → Project settings → Your apps, and ensure you are using the Web app’s config.',
    'auth/network-request-failed': 'Network error. Check your connection and try again.',
  }
  if (errors[code]) return errors[code]
  if (code !== 'auth/unknown') {
    return `Sign-in failed (${code}). Check Firebase Console → Authentication and your .env values.`
  }
  return 'Something went wrong. Please try again.'
}

function rejectWithAuthMessage(err: unknown): never {
  const message = resolveFirebaseError(authErrorCode(err))
  useAuthStore.getState().setError(message)
  throw new Error(message)
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
    setError(null)
    try {
      const result = await signInWithEmailAndPassword(auth, email, password)
      setUser(result.user)
      navigate('/dashboard')
      void triggerLoginNotification(result.user.email ?? 'User')
    } catch (err) {
      rejectWithAuthMessage(err)
    }
  }

  async function register(email: string, password: string) {
    setError(null)
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password)
      setUser(result.user)
      navigate('/dashboard')
      void triggerLoginNotification(result.user.email ?? 'User')
    } catch (err) {
      rejectWithAuthMessage(err)
    }
  }

  async function googleLogin() {
    setError(null)
    try {
      const result = await signInWithPopup(auth, googleProvider)
      setUser(result.user)
      navigate('/dashboard')
      void triggerLoginNotification(
        result.user.displayName ?? result.user.email ?? 'User',
      )
    } catch (err) {
      rejectWithAuthMessage(err)
    }
  }

  async function guestLogin() {
    setError(null)
    try {
      const result = await signInAnonymously(auth)
      setUser(result.user)
      navigate('/dashboard')
      void triggerLoginNotification('Guest')
    } catch (err) {
      rejectWithAuthMessage(err)
    }
  }

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
      const code = authErrorCode(err)
      if (code === 'auth/user-not-found') {
        return { ok: true }
      }
      return { ok: false, message: resolveFirebaseError(code) }
    }
  }

  async function logout() {
    await signOut(auth)
    setUser(null)
    useAuthStore.getState().bumpLoginFormNonce()
    navigate('/login')
  }

  return { user, isLoading, error, login, register, googleLogin, guestLogin, forgotPassword, logout }
}
