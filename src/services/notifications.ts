const DEFAULT_ICON = '/favicon.svg'

export async function registerServiceWorker(): Promise<void> {
  if (!('serviceWorker' in navigator)) return
  try {
    await navigator.serviceWorker.register('/sw.js')
  } catch {
    // Blocked, private mode, or non-secure context (use localhost/https)
  }
}

/**
 * Shows a system notification after successful sign-in.
 * Uses the active service worker so the notification can appear even if the tab loses focus.
 */
export async function triggerLoginNotification(userName: string): Promise<void> {
  try {
    if (!('serviceWorker' in navigator)) return

    const permission = await Notification.requestPermission()
    if (permission !== 'granted') return

    const registration = await navigator.serviceWorker.ready
    await registration.showNotification('Welcome back', {
      body: `${userName} — you have new patient alerts today.`,
      icon: DEFAULT_ICON,
    })
  } catch {
    // Permission denied, SW not ready, or API unsupported — do not break auth flow
  }
}
