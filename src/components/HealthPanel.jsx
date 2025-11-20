import { useState } from 'react'

const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function HealthPanel() {
  const [profile, setProfile] = useState({ user_id: 'demo@tritrack', age: 28, sex: 'male', height_cm: 178, weight_kg: 75, activity_level: 'moderate', goal: 'maintain' })
  const [metrics, setMetrics] = useState(null)
  const [foodInput, setFoodInput] = useState('banana')
  const [logs, setLogs] = useState([])

  const saveProfile = async () => {
    const res = await fetch(`${backend}/health/profile`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(profile) })
    const data = await res.json()
    setMetrics(data)
  }

  const addFood = async () => {
    await fetch(`${backend}/health/food/parse`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ user_id: profile.user_id, input: foodInput, source: 'text' }) })
    loadLogs()
  }

  const loadLogs = async () => {
    const res = await fetch(`${backend}/health/food/logs?user_id=${encodeURIComponent(profile.user_id)}`)
    const data = await res.json()
    setLogs(data)
  }

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
      <h3 className="text-white font-semibold mb-4">Health</h3>
      <div className="grid grid-cols-2 gap-3 text-sm">
        <label className="text-blue-100">Age<input className="w-full mt-1 rounded bg-slate-900/60 p-2" type="number" value={profile.age} onChange={e => setProfile({ ...profile, age: Number(e.target.value) })} /></label>
        <label className="text-blue-100">Sex<select className="w-full mt-1 rounded bg-slate-900/60 p-2" value={profile.sex} onChange={e => setProfile({ ...profile, sex: e.target.value })}><option value="male">Male</option><option value="female">Female</option></select></label>
        <label className="text-blue-100">Height (cm)<input className="w-full mt-1 rounded bg-slate-900/60 p-2" type="number" value={profile.height_cm} onChange={e => setProfile({ ...profile, height_cm: Number(e.target.value) })} /></label>
        <label className="text-blue-100">Weight (kg)<input className="w-full mt-1 rounded bg-slate-900/60 p-2" type="number" value={profile.weight_kg} onChange={e => setProfile({ ...profile, weight_kg: Number(e.target.value) })} /></label>
        <label className="text-blue-100 col-span-2">Activity<select className="w-full mt-1 rounded bg-slate-900/60 p-2" value={profile.activity_level} onChange={e => setProfile({ ...profile, activity_level: e.target.value })}><option value="sedentary">Sedentary</option><option value="light">Light</option><option value="moderate">Moderate</option><option value="active">Active</option><option value="very_active">Very Active</option></select></label>
        <label className="text-blue-100 col-span-2">Goal<select className="w-full mt-1 rounded bg-slate-900/60 p-2" value={profile.goal} onChange={e => setProfile({ ...profile, goal: e.target.value })}><option value="lose">Lose</option><option value="maintain">Maintain</option><option value="gain">Gain</option></select></label>
      </div>
      <div className="flex gap-2 mt-3">
        <button onClick={saveProfile} className="px-3 py-2 bg-blue-600 hover:bg-blue-500 rounded text-white">Save & Calculate</button>
      </div>

      {metrics && (
        <div className="mt-4 grid grid-cols-2 gap-3 text-blue-100 text-sm">
          <div className="bg-slate-900/50 p-3 rounded">BMI: <span className="font-semibold">{metrics.bmi}</span></div>
          <div className="bg-slate-900/50 p-3 rounded">BMR: <span className="font-semibold">{metrics.bmr}</span></div>
          <div className="bg-slate-900/50 p-3 rounded">TDEE: <span className="font-semibold">{metrics.tdee}</span></div>
          <div className="bg-slate-900/50 p-3 rounded">Target: <span className="font-semibold">{metrics.calorie_target}</span></div>
        </div>
      )}

      <div className="mt-4">
        <div className="flex gap-2">
          <input value={foodInput} onChange={e => setFoodInput(e.target.value)} placeholder="Add food (e.g., banana)" className="flex-1 rounded bg-slate-900/60 p-2 text-blue-100" />
          <button onClick={addFood} className="px-3 py-2 bg-emerald-600 hover:bg-emerald-500 rounded text-white">Log</button>
          <button onClick={loadLogs} className="px-3 py-2 bg-slate-600 hover:bg-slate-500 rounded text-white">Refresh</button>
        </div>
        <div className="mt-3 space-y-2 max-h-52 overflow-auto pr-2">
          {logs.map((it, idx) => (
            <div key={idx} className="bg-slate-900/50 rounded p-2 text-blue-100 text-sm flex justify-between">
              <span>{it.description}</span>
              <span className="font-semibold">{it.nutrients.calories} kcal</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
