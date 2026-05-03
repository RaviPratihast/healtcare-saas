import { LayoutGrid, List } from 'lucide-react'
import { memo } from 'react'
import { usePatientsStore } from '@/features/patients/store/patientsStore'
import type { PatientsViewMode } from '@/features/patients/store/patientsStore'
import { cn } from '@/shared/utils/cn'

export const ViewToggle = memo(function ViewToggle() {
  const viewMode = usePatientsStore((s) => s.viewMode)
  const setViewMode = usePatientsStore((s) => s.setViewMode)

  function select(mode: PatientsViewMode) {
    setViewMode(mode)
  }

  return (
    <div
      className="inline-flex rounded-lg border border-slate-200 bg-slate-50 p-0.5"
      role="group"
      aria-label="View layout"
    >
      <button
        type="button"
        onClick={() => select('grid')}
        className={cn(
          'flex cursor-pointer items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2',
          viewMode === 'grid'
            ? 'bg-white text-slate-900'
            : 'text-slate-500 hover:bg-slate-100/80 hover:text-slate-900',
        )}
        aria-pressed={viewMode === 'grid'}
      >
        <LayoutGrid size={18} strokeWidth={1.5} aria-hidden />
        Grid
      </button>
      <button
        type="button"
        onClick={() => select('list')}
        className={cn(
          'flex cursor-pointer items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2',
          viewMode === 'list'
            ? 'bg-white text-slate-900'
            : 'text-slate-500 hover:bg-slate-100/80 hover:text-slate-900',
        )}
        aria-pressed={viewMode === 'list'}
      >
        <List size={18} strokeWidth={1.5} aria-hidden />
        List
      </button>
    </div>
  )
})
