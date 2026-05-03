import { memo } from 'react'
import { usePatientsStore } from '@/features/patients/store/patientsStore'
import type { PatientsViewMode } from '@/features/patients/store/patientsStore'
import { cn } from '@/shared/utils/cn'

function GridIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z"
      />
    </svg>
  )
}

function ListIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"
      />
    </svg>
  )
}

export const ViewToggle = memo(function ViewToggle() {
  const viewMode = usePatientsStore((s) => s.viewMode)
  const setViewMode = usePatientsStore((s) => s.setViewMode)

  function select(mode: PatientsViewMode) {
    setViewMode(mode)
  }

  return (
    <div
      className="inline-flex rounded-lg border border-gray-200 bg-gray-50 p-0.5"
      role="group"
      aria-label="View layout"
    >
      <button
        type="button"
        onClick={() => select('grid')}
        className={cn(
          'flex cursor-pointer items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
          viewMode === 'grid'
            ? 'bg-white text-gray-900 shadow-sm'
            : 'text-gray-600 hover:bg-gray-100/80 hover:text-gray-900',
        )}
        aria-pressed={viewMode === 'grid'}
      >
        <GridIcon />
        Grid
      </button>
      <button
        type="button"
        onClick={() => select('list')}
        className={cn(
          'flex cursor-pointer items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
          viewMode === 'list'
            ? 'bg-white text-gray-900 shadow-sm'
            : 'text-gray-600 hover:bg-gray-100/80 hover:text-gray-900',
        )}
        aria-pressed={viewMode === 'list'}
      >
        <ListIcon />
        List
      </button>
    </div>
  )
})
