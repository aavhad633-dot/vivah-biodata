'use client'

import { useState } from 'react'

export default function FamilyForm({ data, onBack, onNext }) {
  const [form, setForm] = useState({
    fatherName: data.fatherName || '',
    fatherOcc: data.fatherOcc || '',
    motherName: data.motherName || '',
    motherOcc: data.motherOcc || '',
    brothers: data.brothers || '',
    sisters: data.sisters || '',
    nativePlace: data.nativePlace || '',
    currentCity: data.currentCity || '',
    familyType: data.familyType || 'Nuclear',
    familyStatus: data.familyStatus || 'Upper Middle Class',
    familyNote: data.familyNote || '',
  })

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function setChip(field, value) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="bg-white border border-amber-200 rounded-2xl p-8 shadow-sm">
      <h2 className="font-serif text-2xl text-stone-800 mb-1">Family Details</h2>
      <p className="text-stone-400 text-sm mb-6">Family background builds trust with potential matches.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Father's Name" name="fatherName" value={form.fatherName} onChange={handleChange} placeholder="Father's full name" />
        <Field label="Father's Occupation" name="fatherOcc" value={form.fatherOcc} onChange={handleChange} placeholder="e.g. Retired Govt. Officer" />
        <Field label="Mother's Name" name="motherName" value={form.motherName} onChange={handleChange} placeholder="Mother's full name" />
        <Field label="Mother's Occupation" name="motherOcc" value={form.motherOcc} onChange={handleChange} placeholder="e.g. Homemaker" />
        <Field label="Brother(s)" name="brothers" value={form.brothers} onChange={handleChange} placeholder="e.g. 1 Elder (Married)" />
        <Field label="Sister(s)" name="sisters" value={form.sisters} onChange={handleChange} placeholder="e.g. 1 Younger (Unmarried)" />
        <Field label="Native Place" name="nativePlace" value={form.nativePlace} onChange={handleChange} placeholder="Ancestral hometown" />
        <Field label="Current City" name="currentCity" value={form.currentCity} onChange={handleChange} placeholder="Where family lives now" />
      </div>

      <p className="text-xs font-bold uppercase tracking-widest text-stone-400 mt-6 mb-3">Family Type</p>
      <div className="flex gap-2 flex-wrap mb-4">
        {['Nuclear', 'Joint', 'Extended'].map(v => (
          <button key={v} onClick={() => setChip('familyType', v)}
            className={`px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${
              form.familyType === v
                ? 'bg-amber-500 border-amber-500 text-white'
                : 'bg-white border-stone-200 text-stone-500 hover:border-amber-300'
            }`}>
            {v}
          </button>
        ))}
      </div>

      <p className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-3">Family Status</p>
      <div className="flex gap-2 flex-wrap mb-4">
        {['Middle Class', 'Upper Middle Class', 'Affluent'].map(v => (
          <button key={v} onClick={() => setChip('familyStatus', v)}
            className={`px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${
              form.familyStatus === v
                ? 'bg-amber-500 border-amber-500 text-white'
                : 'bg-white border-stone-200 text-stone-500 hover:border-amber-300'
            }`}>
            {v}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-1 mt-2">
        <label className="text-xs font-bold uppercase tracking-widest text-stone-400">Additional Note</label>
        <textarea name="familyNote" value={form.familyNote} onChange={handleChange} rows={3}
          placeholder="Any other detail about your family..."
          className="border border-stone-200 rounded-lg px-3 py-2 text-sm text-stone-700 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 resize-none" />
      </div>

      <div className="flex justify-between mt-8">
        <button onClick={onBack}
          className="border border-stone-200 text-stone-500 px-6 py-3 rounded-lg font-semibold hover:border-amber-300 hover:text-amber-600 transition-colors">
          ← Back
        </button>
        <button onClick={() => onNext(form)}
          className="bg-amber-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-amber-600 transition-colors">
          Career Details →
        </button>
      </div>
    </div>
  )
}

function Field({ label, name, value, onChange, placeholder = '' }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-bold uppercase tracking-widest text-stone-400">{label}</label>
      <input type="text" name={name} value={value} onChange={onChange} placeholder={placeholder}
        className="border border-stone-200 rounded-lg px-3 py-2 text-sm text-stone-700 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 bg-white" />
    </div>
  )
}