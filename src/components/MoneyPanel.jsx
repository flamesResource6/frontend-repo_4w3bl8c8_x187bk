import { useState, useEffect } from 'react'

const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function MoneyPanel() {
  const [userId] = useState('demo@tritrack')
  const [hustleName, setHustleName] = useState('SaaS')
  const [amount, setAmount] = useState(100)
  const [type, setType] = useState('income')
  const [summary, setSummary] = useState(null)

  const addTx = async () => {
    await fetch(`${backend}/money/tx`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ user_id: userId, hustle_name: hustleName, amount: Number(amount), type }) })
    loadSummary()
  }

  const loadSummary = async () => {
    const res = await fetch(`${backend}/money/summary?user_id=${encodeURIComponent(userId)}`)
    const data = await res.json()
    setSummary(data)
  }

  useEffect(() => { loadSummary() }, [])

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
      <h3 className="text-white font-semibold mb-4">Money</h3>
      <div className="grid grid-cols-3 gap-2">
        <input value={hustleName} onChange={e => setHustleName(e.target.value)} className="rounded bg-slate-900/60 p-2 text-blue-100" />
        <input type="number" value={amount} onChange={e => setAmount(e.target.value)} className="rounded bg-slate-900/60 p-2 text-blue-100" />
        <select value={type} onChange={e => setType(e.target.value)} className="rounded bg-slate-900/60 p-2 text-blue-100"><option value="income">Income</option><option value="expense">Expense</option></select>
      </div>
      <div className="flex gap-2 mt-3">
        <button onClick={addTx} className="px-3 py-2 bg-emerald-600 hover:bg-emerald-500 rounded text-white">Add</button>
        <button onClick={loadSummary} className="px-3 py-2 bg-slate-600 hover:bg-slate-500 rounded text-white">Refresh</button>
      </div>

      {summary && (
        <div className="mt-4 text-blue-100 text-sm space-y-3">
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-slate-900/50 p-3 rounded">Income: <span className="font-semibold">{summary.monthly_forecast.income}</span></div>
            <div className="bg-slate-900/50 p-3 rounded">Expense: <span className="font-semibold">{summary.monthly_forecast.expense}</span></div>
            <div className="bg-slate-900/50 p-3 rounded">Profit: <span className="font-semibold">{summary.monthly_forecast.profit}</span></div>
          </div>
          <div className="space-y-2 max-h-52 overflow-auto pr-2">
            {Object.entries(summary.per_hustle).map(([name, vals]) => (
              <div key={name} className="bg-slate-900/50 rounded p-2 flex justify-between">
                <span>{name}</span>
                <span className="font-semibold">{(vals.income - vals.expense).toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
