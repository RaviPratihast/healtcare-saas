import type { User } from 'firebase/auth'
import { create } from 'zustand'

type AuthState = {
  user: User | null
  isLoading: boolean
  error: string | null
  loginFormNonce: number
  setUser: (user: User | null) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  bumpLoginFormNonce: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  error: null,
  loginFormNonce: 0,
  setUser: (user) => set({ user }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  bumpLoginFormNonce: () => set((s) => ({ loginFormNonce: s.loginFormNonce + 1 })),
}))
