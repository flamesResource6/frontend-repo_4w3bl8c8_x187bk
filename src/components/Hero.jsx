import Spline from '@splinetool/react-spline'

export default function Hero() {
  return (
    <section className="relative min-h-[70vh] w-full overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/qQUip0dJPqrrPryE/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-24">
        <div className="backdrop-blur-sm/50"></div>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]">
          TriTrack
        </h1>
        <p className="mt-4 text-blue-100 max-w-2xl">
          A personal triple-tracker for Health, Education, and Money — one clean dashboard, smart suggestions, and effortless progress.
        </p>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-950/10 via-slate-950/40 to-slate-950"></div>
    </section>
  )
}
