import { useState } from 'react'
import typescriptLogo from './assets/typescript.svg'
import viteLogo from './assets/vite.svg'

function App() {
  const [count, setCount] = useState(0)

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 bg-slate-950 px-6 text-center text-white">
      <div className="flex items-center gap-6">
        <a href="https://vite.dev" target="_blank" rel="noreferrer">
          <img className="h-24 transition hover:drop-shadow-[0_0_2em_#646cffaa]" src={viteLogo} alt="Vite logo" />
        </a>
        <a href="https://www.typescriptlang.org/" target="_blank" rel="noreferrer">
          <img
            className="h-24 transition hover:drop-shadow-[0_0_2em_#3178c6aa]"
            src={typescriptLogo}
            alt="TypeScript logo"
          />
        </a>
      </div>

      <section className="space-y-6">
        <h1 className="text-4xl font-bold sm:text-6xl">Vite + React + TypeScript</h1>
        <button
          className="rounded-lg bg-indigo-500 px-5 py-3 font-medium text-white transition hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          type="button"
          onClick={() => setCount((currentCount) => currentCount + 1)}
        >
          count is {count}
        </button>
        <p className="text-slate-300">
          Edit <code className="rounded bg-slate-800 px-2 py-1 text-slate-100">src/App.tsx</code> and save to test HMR.
        </p>
      </section>
    </main>
  )
}

export default App
