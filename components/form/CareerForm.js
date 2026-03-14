'use client'

import { useState } from 'react'

export default function CareerForm({ data, onBack, onNext }) {
  const [form, setForm] = useState({
    education: data.education || '',
    eduExtra: data.eduExtra || '',
    empType: data.empType || '',
    company: data.company || '',
    designation: data.designation || '',
    income: data.income || '',
    workCity: data.workCity || '',
    prefAge: data.prefAge || '',
    prefLoc: data.prefLoc || '',
    aboutMe: data.aboutMe || '',
  })

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <div className="bg-white border border-amber-200 rounded-2xl p-8 shadow-sm">
      <h2 className="font-serif text-2xl text-stone-800 mb-1">Education & Career</h2>
      <p className="text-stone-400 text-sm mb-6">Your professional background is an important part of your biodata.</p>

      <p className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-3">Education</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
        <div className="md:col-span-2">
          <Field label="Highest Qualification *" name="education" value={form.education} onChange={handleChange} placeholder="e.g. B.Tech Computer Science — COEP, Pune (2017)" />
        </div>
        <div className="md:col-span-2">
          <Field label="Additional Qualifications" name="eduExtra" value={form.eduExtra} onChange={handleChange} placeholder="e.g. MBA, CA, MBBS..." />
        </div>
      </div>

      <p className="text-xs font-bold uppercase tracking-widest text-stone-400 mt-6 mb-3">Employment</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select label="Employment Type" name="empType" value={form.empType} onChange={handleChange}
          options={['Private Sector','Government / PSU','Self Employed / Business','Doctor','CA / Lawyer','NRI']} />
        <Field label="Company / Organisation" name="company" value={form.company} onChange={handleChange} placeholder="Company name" />
        <Field label="Designation" name="designation" value={form.designation} onChange={handleChange} placeholder="e.g. Software Engineer" />
        <Field label="Annual Income" name="income" value={form.income} onChange={handleChange} placeholder="e.g. 8–10 LPA" />
        <Field label="Work Location" name="workCity" value={form.workCity} onChange={handleChange} placeholder="City where you work" />
      </div>

      <p className="text-xs font-bold uppercase tracking-widest text-stone-400 mt-6 mb-3">Partner Preference (Optional)</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Preferred Age Range" name="prefAge" value={form.prefAge} onChange={handleChange} placeholder="e.g. 22–27 years" />
        <Field label="Preferred Location" name="prefLoc" value={form.prefLoc} onChange={handleChange} placeholder="e.g. Maharashtra, Any" />
      </div>

      <div className="flex flex-col gap-1 mt-4">
        <label className="text-xs font-bold uppercase tracking-widest text-stone-400">About Me</label>
        <textarea name="aboutMe" value={form.aboutMe} onChange={handleChange} rows={3}
          placeholder="A short note about your personality, hobbies, life goals..."
          className="border border-stone-200 rounded-lg px-3 py-2 text-sm text-stone-700 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 resize-none" />
      </div>

      <div className="flex justify-between mt-8">
        <button onClick={onBack}
          className="border border-stone-200 text-stone-500 px-6 py-3 rounded-lg font-semibold hover:border-amber-300 hover:text-amber-600 transition-colors">
          ← Back
        </button>
        <button onClick={() => onNext(form)}
          className="bg-amber-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-amber-600 transition-colors">
          Choose Template →
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

function Select({ label, name, value, onChange, options }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-bold uppercase tracking-widest text-stone-400">{label}</label>
      <select name={name} value={value} onChange={onChange}
        className="border border-stone-200 rounded-lg px-3 py-2 text-sm text-stone-700 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 bg-white">
        <option value="">Select...</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  )
}