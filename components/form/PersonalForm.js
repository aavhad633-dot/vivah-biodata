'use client'

import { useState } from 'react'

export default function PersonalForm({ data, photoURL, setPhotoURL, onNext }) {
  const [form, setForm] = useState({
    fullName: data.fullName || '',
    dob: data.dob || '',
    tob: data.tob || '',
    pob: data.pob || '',
    height: data.height || '',
    complexion: data.complexion || '',
    religion: data.religion || '',
    caste: data.caste || '',
    gotra: data.gotra || '',
    bloodGroup: data.bloodGroup || '',
    rashi: data.rashi || '',
    nakshatra: data.nakshatra || '',
    manglik: data.manglik || '',
    phone: data.phone || '',
    email: data.email || '',
  })

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handlePhoto(e) {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => setPhotoURL(ev.target.result)
    reader.readAsDataURL(file)
  }

  function handleSubmit() {
    if (!form.fullName.trim()) {
      alert('Please enter your full name.')
      return
    }
    onNext(form)
  }

  return (
    <div className="bg-white border border-amber-200 rounded-2xl p-8 shadow-sm">
      <h2 className="font-serif text-2xl text-stone-800 mb-1">Personal Details</h2>
      <p className="text-stone-400 text-sm mb-6">This information will appear prominently in your biodata.</p>

      {/* Photo Upload */}
      <div className="mb-6">
        <label className="block text-xs font-bold uppercase tracking-widest text-stone-400 mb-2">Your Photo</label>
        <div className="flex items-center gap-4">
          <div className="w-24 h-28 border-2 border-dashed border-amber-300 rounded-lg overflow-hidden flex items-center justify-center bg-amber-50">
            {photoURL
              ? <img src={photoURL} alt="preview" className="w-full h-full object-cover" />
              : <span className="text-2xl">📷</span>
            }
          </div>
          <div>
            <input type="file" accept="image/*" onChange={handlePhoto} className="hidden" id="photo-input" />
            <label htmlFor="photo-input" className="cursor-pointer bg-amber-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-amber-600 transition-colors">
              {photoURL ? 'Change Photo' : 'Upload Photo'}
            </label>
            <p className="text-xs text-stone-400 mt-1">JPG or PNG, 3:4 ratio recommended</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Full Name *" name="fullName" value={form.fullName} onChange={handleChange} placeholder="e.g. Arjun Sharma" />
        <Field label="Date of Birth *" name="dob" type="date" value={form.dob} onChange={handleChange} />
        <Field label="Time of Birth" name="tob" type="time" value={form.tob} onChange={handleChange} />
        <Field label="Place of Birth" name="pob" value={form.pob} onChange={handleChange} placeholder="City, State" />
        <Field label="Height" name="height" value={form.height} onChange={handleChange} placeholder='e.g. 5&apos;8"' />
        <Select label="Complexion" name="complexion" value={form.complexion} onChange={handleChange}
          options={['Fair / गोरा', 'Wheatish / गेहुंआ', 'Dark / सांवला']} />
        <Field label="Religion" name="religion" value={form.religion} onChange={handleChange} placeholder="e.g. Hindu" />
        <Field label="Caste / Community" name="caste" value={form.caste} onChange={handleChange} placeholder="e.g. Brahmin" />
        <Field label="Gotra / Clan" name="gotra" value={form.gotra} onChange={handleChange} placeholder="e.g. Kashyap" />
        <Select label="Blood Group" name="bloodGroup" value={form.bloodGroup} onChange={handleChange}
          options={['A+','A-','B+','B-','O+','O-','AB+','AB-']} />
      </div>

      <div className="mt-2 mb-1">
        <p className="text-xs font-bold uppercase tracking-widest text-stone-400 mt-6 mb-3">Astrological Details</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Field label="Rashi" name="rashi" value={form.rashi} onChange={handleChange} placeholder="e.g. Mesh" />
        <Field label="Nakshatra" name="nakshatra" value={form.nakshatra} onChange={handleChange} placeholder="e.g. Ashwini" />
        <Select label="Manglik" name="manglik" value={form.manglik} onChange={handleChange}
          options={['No / नहीं', 'Yes / हाँ', 'Partial / आंशिक']} />
      </div>

      <p className="text-xs font-bold uppercase tracking-widest text-stone-400 mt-6 mb-3">Contact</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Phone Number" name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+91 98765 43210" />
        <Field label="Email Address" name="email" type="email" value={form.email} onChange={handleChange} placeholder="your@email.com" />
      </div>

      <div className="flex justify-end mt-8">
        <button onClick={handleSubmit}
          className="bg-amber-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-amber-600 transition-colors">
          Family Details →
        </button>
      </div>
    </div>
  )
}

function Field({ label, name, value, onChange, type = 'text', placeholder = '' }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-bold uppercase tracking-widest text-stone-400">{label}</label>
      <input
        type={type} name={name} value={value} onChange={onChange} placeholder={placeholder}
        className="border border-stone-200 rounded-lg px-3 py-2 text-sm text-stone-700 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 bg-white"
      />
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