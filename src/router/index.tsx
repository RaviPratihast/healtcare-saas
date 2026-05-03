import { lazy, Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { useAuthStore } from '@/features/auth/store/authStore'
import { Layout } from '@/shared/components/Layout'
import { Spinner } from '@/shared/components/Spinner'

const LandingPage = lazy(() => import('@/pages/LandingPage'))
const LoginPage = lazy(() => import('@/pages/LoginPage'))
const ForgotPasswordPage = lazy(() => import('@/pages/ForgotPasswordPage'))
const DashboardPage = lazy(() => import('@/pages/DashboardPage'))
const AnalyticsPage = lazy(() => import('@/pages/AnalyticsPage'))
const PatientDetailsPage = lazy(() => import('@/pages/PatientDetailsPage'))

function PageSpinner() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <Spinner size="lg" label="Loading page" />
    </div>
  )
}

function AuthSpinner() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <Spinner size="lg" label="Restoring session" />
    </div>
  )
}

function ProtectedLayout() {
  const user = useAuthStore((state) => state.user)
  const isLoading = useAuthStore((state) => state.isLoading)

  if (isLoading) return <AuthSpinner />
  if (!user) return <Navigate to="/login" replace />
  return <Layout />
}

function AuthStateSync() {
  useAuth()
  return null
}

export function AppRouter() {
  return (
    <BrowserRouter>
      <AuthStateSync />
      <Suspense fallback={<PageSpinner />}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />

          <Route element={<ProtectedLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/patients" element={<PatientDetailsPage />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
