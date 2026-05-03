import { create } from 'zustand'
import { mockPatients } from '@/features/patients/data/mockPatients'
import type { Patient } from '@/features/patients/types/patient'

export type PatientsViewMode = 'grid' | 'list'

type PatientsState = {
  patients: Patient[]
  viewMode: PatientsViewMode
  searchQuery: string
  setViewMode: (mode: PatientsViewMode) => void
  setSearchQuery: (q: string) => void
}

export const usePatientsStore = create<PatientsState>((set) => ({
  patients: mockPatients,
  viewMode: 'grid',
  searchQuery: '',
  setViewMode: (mode) => set({ viewMode: mode }),
  setSearchQuery: (q) => set({ searchQuery: q }),
}))
