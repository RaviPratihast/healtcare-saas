// Service worker: registered once from the app. Handles push payloads and activates quickly.

self.addEventListener('install', () => {
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim())
})

self.addEventListener('push', (event) => {
  let data = {}
  try {
    data = event.data?.json() ?? {}
  } catch {
    data = { body: event.data?.text() ?? '' }
  }
  const title = data.title ?? 'HealthCare'
  const body = data.body ?? ''
  const icon = data.icon ?? '/favicon.svg'

  event.waitUntil(
    self.registration.showNotification(title, {
      body,
      icon,
    }),
  )
})
