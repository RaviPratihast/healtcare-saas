export async function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    await navigator.serviceWorker.register('/sw.js')
  }
}

export async function triggerLoginNotification(userName: string) {
  const permission = await Notification.requestPermission()
  if (permission !== 'granted') return

  const registration = await navigator.serviceWorker.ready
  registration.showNotification('Welcome back', {
    body: `${userName} - you have new patient alerts today.`,
    icon: '/vite.svg',
  })
}
