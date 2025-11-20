import { useState } from 'react'

const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function EducationPanel() {
  const [userId] = useState('demo@tritrack')
  const [exam, setExam] = useState('GRE')
  const [plan, setPlan] = useState(null)

  const generate = async () => {
    const res = await fetch(`${backend}/education/plan`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ user_id: userId, exam, hours_per_day: 2, weeks: 8 }) })
    const data = await res.json()
    setPlan(data)
  }

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
      <h3 className="text-white font-semibold mb-4">Education</h3>
      <div className="flex gap-2">
        <select value={exam} onChange={e => setExam(e.target.value)} className="rounded bg-slate-900/60 p-2 text-blue-100">
          <option>UPSC</option>
          <option>SSC</option>
          <option>NEET</option>
          <option>GRE</option>
        </select>
        <button onClick={generate} className="px-3 py-2 bg-blue-600 hover:bg-blue-500 rounded text-white">Generate Plan</button>
      </div>
      {plan && (
        <div className="mt-3 space-y-2 max-h-52 overflow-auto pr-2">
          {plan.items.map((it, idx) => (
            <div key={idx} className="bg-slate-900/50 rounded p-2 text-blue-100 text-sm flex justify-between">
              <span>{it.topic}</span>
              <span className="font-semibold">{it.hours}h</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
