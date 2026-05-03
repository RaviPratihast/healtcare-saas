import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'

function devWelcome(): Plugin {
  return {
    name: 'dev-welcome',
    configureServer(server) {
      server.httpServer?.once('listening', () => {
        console.log('')
        console.log(
          '  \x1b[32m────────────╱╲───╱╲╱╲──────────────────────────────\x1b[0m',
        )
        console.log('')
        console.log('  \x1b[1mRavi Shankar Pratihast\x1b[0m')
        console.log(
          '  \x1b[2mFrontend Developer — Raga.AI Assignment Submission\x1b[0m',
        )
        console.log('')
        console.log('  What you are looking at:')
        console.log(
          '  \x1b[2m› A production-grade healthcare SaaS built in under 72 hours\x1b[0m',
        )
        console.log('  \x1b[2m› Firebase auth with 4 sign-in methods\x1b[0m')
        console.log(
          '  \x1b[2m› Feature-based architecture ready to scale into micro-frontends\x1b[0m',
        )
        console.log('  \x1b[2m› Zero Redux. Zustand keeps state sane.\x1b[0m')
        console.log(
          '  \x1b[2m› Every component typed, no console.log left behind\x1b[0m',
        )
        console.log('')
        console.log(
          "  \x1b[34mI don't just build UIs. I think about why each decision exists.\x1b[0m",
        )
        console.log(
          '  \x1b[2mThat is why I want to work on what Raga.AI is building.\x1b[0m',
        )
        console.log('')
        console.log(
          '  \x1b[32m────────────╱╲───╱╲╱╲──────────────────────────────\x1b[0m',
        )
        console.log('')
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [devWelcome(), react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
