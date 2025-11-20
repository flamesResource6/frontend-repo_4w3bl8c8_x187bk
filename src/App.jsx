import Hero from './components/Hero'
import HealthPanel from './components/HealthPanel'
import EducationPanel from './components/EducationPanel'
import MoneyPanel from './components/MoneyPanel'

function App() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Hero />

      <section className="relative z-10 max-w-6xl mx-auto px-6 -mt-24">
        <div className="grid md:grid-cols-3 gap-6">
          <HealthPanel />
          <EducationPanel />
          <MoneyPanel />
        </div>
      </section>

      <footer className="max-w-6xl mx-auto px-6 py-12 text-blue-100/70">
        Built with a modern, vibrant, futuristic vibe.
      </footer>
    </div>
  )
}

export default App
