import type { User } from 'firebase/auth'
import { create } from 'zustand'

type AuthState = {
  user: User | null
  isLoading: boolean
  error: string | null
  setUser: (user: User | null) => void
  clearUser: () => void
  setLoading: (isLoading: boolean) => void
  setError: (error: string | null) => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  error: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
}))
