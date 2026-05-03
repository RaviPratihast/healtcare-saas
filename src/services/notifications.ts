const DEFAULT_ICON = '/favicon.svg'

function noop(): void {}

export async function registerServiceWorker(): Promise<void> {
  if (!('serviceWorker' in navigator)) return
  try {
    await navigator.serviceWorker.register('/sw.js')
  } catch {
    noop()
  }
}

export async function triggerLoginNotification(userName: string): Promise<void> {
  try {
    if (!('serviceWorker' in navigator)) return

    const permission = await Notification.requestPermission()
    if (permission !== 'granted') return

    const registration = await navigator.serviceWorker.ready
    await registration.showNotification('Welcome back', {
      body: `${userName} - you have new patient alerts today.`,
      icon: DEFAULT_ICON,
    })
  } catch {
    noop()
  }
}
