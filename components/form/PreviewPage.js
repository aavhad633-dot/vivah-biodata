'use client'

import { useEffect, useRef, useState } from 'react'

export default function PreviewPage({ data, template, photoURL, onBack }) {
  const previewRef = useRef(null)
  const [downloading, setDownloading] = useState(false)

  const tplNames = { classic: 'Classic Elegance', modern: 'Modern Dark', floral: 'Floral Romance' }

  function buildHTML() {
    if (template === 'classic') return buildClassic(data, photoURL)
    if (template === 'modern') return buildModern(data, photoURL)
    return buildFloral(data, photoURL)
  }

  useEffect(() => {
    if (previewRef.current) {
      previewRef.current.innerHTML = buildHTML()
    }
  }, [data, template, photoURL])

  async function handleDownload() {
    setDownloading(true)
    try {
      const html2pdf = (await import('html2pdf.js')).default
      const wrapper = document.createElement('div')
      wrapper.style.cssText = 'position:absolute;left:-9999px;top:0;z-index:-1;'
      wrapper.innerHTML = buildHTML().trim()
      document.body.appendChild(wrapper)

      const name = (data.fullName || 'Biodata').replace(/\s+/g, '_')
      await html2pdf().set({
        margin: 0,
        filename: `Biodata_${name}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, allowTaint: true, logging: false },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      }).from(wrapper.firstElementChild).save()

      document.body.removeChild(wrapper)
    } catch (err) {
      console.error(err)
      alert('Something went wrong. Please try again.')
    }
    setDownloading(false)
  }

  return (
    <div className="bg-white border border-amber-200 rounded-2xl p-6 shadow-sm">

      {/* Top bar */}
      <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
        <div>
          <h2 className="font-serif text-2xl text-stone-800">Your Biodata Preview</h2>
          <p className="text-stone-400 text-sm">This is exactly how your PDF will look.</p>
        </div>
        <div className="flex gap-3 flex-wrap">
          <button onClick={onBack}
            className="border border-stone-200 text-stone-500 px-5 py-2 rounded-lg text-sm font-semibold hover:border-amber-300 hover:text-amber-600 transition-colors">
            ← Change Template
          </button>
          <button onClick={handleDownload} disabled={downloading}
            className="bg-green-700 text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-green-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed">
            {downloading ? '⏳ Generating...' : '⬇ Download PDF'}
          </button>
        </div>
      </div>

      {/* Template badge */}
      <div className="flex items-center gap-2 mb-4">
        <span className="bg-amber-50 border border-amber-200 text-amber-600 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full">
          {tplNames[template]}
        </span>
        <span className="text-stone-400 text-xs">Click "Change Template" to switch designs</span>
      </div>

      {/* Preview frame */}
      <div className="bg-stone-200 rounded-xl p-4 overflow-x-auto">
        <div style={{ width: '210mm', minWidth: '210mm', margin: '0 auto', boxShadow: '0 8px 40px rgba(0,0,0,0.2)', borderRadius: '4px', overflow: 'hidden' }}>
          <div ref={previewRef} />
        </div>
      </div>

      {/* Tip */}
      <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 text-sm text-stone-500 flex gap-2">
        <span>💡</span>
        <span>This is a live 1:1 preview of your PDF. Scroll right on smaller screens to see the full layout.</span>
      </div>

      {/* Bottom buttons */}
      <div className="flex justify-between mt-6">
        <button onClick={onBack}
          className="border border-stone-200 text-stone-500 px-6 py-3 rounded-lg font-semibold hover:border-amber-300 hover:text-amber-600 transition-colors">
          ← Back to Templates
        </button>
        <button onClick={handleDownload} disabled={downloading}
          className="bg-green-700 text-white px-10 py-3 rounded-lg font-semibold hover:bg-green-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed text-base">
          {downloading ? '⏳ Generating PDF...' : '⬇ Download Biodata PDF'}
        </button>
      </div>
    </div>
  )
}

// ─── Template HTML Builders ───────────────────────────────────────────────────

function ir(label, value) {
  if (!value) return ''
  return `<div style="display:flex;gap:4px;font-size:9pt;line-height:1.6;">
    <span style="color:#7A6045;font-weight:700;min-width:28mm;white-space:nowrap;">${label}</span>
    <span style="color:#2C1A06;">${value}</span>
  </div>`
}

function formatDate(d) {
  if (!d) return ''
  try { return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) }
  catch { return d }
}

function buildClassic(d, photo) {
  const photoHTML = photo ? `<img src="${photo}" style="width:100%;height:100%;object-fit:cover;">` : '<span style="font-size:9pt;color:#7A6045;">Photo</span>'
  return `<div style="width:210mm;min-height:297mm;background:#FFF9F0;padding:12mm 15mm;font-family:Georgia,serif;color:#2C1A06;box-sizing:border-box;">
    <div style="height:6px;background:linear-gradient(90deg,#8B2E2E,#C9963A,#8B2E2E);border-radius:3px;margin-bottom:8mm;"></div>
    <div style="text-align:center;margin-bottom:6mm;">
      <div style="font-size:28pt;color:#8B2E2E;">ॐ</div>
      <div style="font-size:10pt;letter-spacing:4px;text-transform:uppercase;color:#7A6045;">Marriage Biodata</div>
      <div style="font-size:24pt;font-weight:bold;color:#1A1208;margin:2mm 0;">${d.fullName || 'Your Name'}</div>
      <div style="height:1.5px;background:linear-gradient(90deg,transparent,#C9963A,transparent);margin:3mm auto;width:60%;"></div>
    </div>
    <div style="display:flex;gap:8mm;margin-bottom:6mm;">
      <div style="width:35mm;height:42mm;border:2px solid #C9963A;border-radius:4px;overflow:hidden;flex-shrink:0;background:#F0D9A8;display:flex;align-items:center;justify-content:center;">${photoHTML}</div>
      <div style="flex:1;">
        <div style="font-size:11pt;color:#8B2E2E;border-bottom:1px solid #E8D5AA;padding-bottom:1mm;margin-bottom:2mm;font-family:Georgia,serif;">Personal Information</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:0 4mm;">
          ${ir('Date of Birth', formatDate(d.dob))}${ir('Time of Birth', d.tob)}
          ${ir('Place of Birth', d.pob)}${ir('Height', d.height)}
          ${ir('Complexion', d.complexion)}${ir('Blood Group', d.bloodGroup)}
          ${ir('Religion', d.religion)}${ir('Caste', d.caste)}
          ${ir('Gotra', d.gotra)}${ir('Manglik', d.manglik)}
        </div>
      </div>
    </div>
    ${d.rashi || d.nakshatra ? `
    <div style="font-size:11pt;color:#8B2E2E;border-bottom:1px solid #E8D5AA;padding-bottom:1mm;margin-bottom:2mm;font-family:Georgia,serif;">Astrological Details</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:0 4mm;margin-bottom:4mm;">
      ${ir('Rashi', d.rashi)}${ir('Nakshatra', d.nakshatra)}
    </div>` : ''}
    <div style="font-size:11pt;color:#8B2E2E;border-bottom:1px solid #E8D5AA;padding-bottom:1mm;margin-bottom:2mm;font-family:Georgia,serif;">Education & Career</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:0 4mm;margin-bottom:4mm;">
      ${ir('Qualification', d.education)}${ir('Additional', d.eduExtra)}
      ${ir('Profession', d.empType)}${ir('Company', d.company)}
      ${ir('Designation', d.designation)}${ir('Income', d.income)}
      ${ir('Work Location', d.workCity)}
    </div>
    <div style="font-size:11pt;color:#8B2E2E;border-bottom:1px solid #E8D5AA;padding-bottom:1mm;margin-bottom:2mm;font-family:Georgia,serif;">Family Details</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:0 4mm;margin-bottom:4mm;">
      ${ir("Father's Name", d.fatherName)}${ir("Father's Occupation", d.fatherOcc)}
      ${ir("Mother's Name", d.motherName)}${ir("Mother's Occupation", d.motherOcc)}
      ${ir('Brother(s)', d.brothers)}${ir('Sister(s)', d.sisters)}
      ${ir('Native Place', d.nativePlace)}${ir('Current City', d.currentCity)}
      ${ir('Family Type', d.familyType)}${ir('Family Status', d.familyStatus)}
    </div>
    ${d.aboutMe ? `<div style="font-size:11pt;color:#8B2E2E;border-bottom:1px solid #E8D5AA;padding-bottom:1mm;margin-bottom:2mm;font-family:Georgia,serif;">About Me</div><p style="font-size:9pt;line-height:1.7;color:#2C1A06;">${d.aboutMe}</p>` : ''}
    <div style="height:6px;background:linear-gradient(90deg,#8B2E2E,#C9963A,#8B2E2E);border-radius:3px;margin-top:8mm;"></div>
    <div style="text-align:center;margin-top:3mm;font-size:8pt;color:#7A6045;">${d.phone || ''} ${d.email ? '· ' + d.email : ''}</div>
  </div>`
}

function buildModern(d, photo) {
  const photoHTML = photo ? `<img src="${photo}" style="width:100%;height:100%;object-fit:cover;">` : '<span style="font-size:9pt;color:#888;">Photo</span>'
  const row = (label, value) => value ? `<div style="font-size:8pt;color:#aaa;margin:2mm 0;">${label}<strong style="color:#fff;display:block;font-size:9pt;">${value}</strong></div>` : ''
  const cell = (label, value) => value ? `<div style="font-size:8pt;color:#aaa;"><strong style="color:#fff;display:block;font-size:9pt;">${value}</strong>${label}</div>` : ''
  return `<div style="width:210mm;min-height:297mm;background:#1A1A2E;display:flex;font-family:Arial,sans-serif;color:#fff;box-sizing:border-box;">
    <div style="width:65mm;background:#0F0F1E;padding:10mm 8mm;display:flex;flex-direction:column;align-items:center;border-right:3px solid #C9963A;">
      <div style="width:45mm;height:52mm;border:2.5px solid #C9963A;border-radius:6px;overflow:hidden;margin-bottom:5mm;background:#2A2A3E;display:flex;align-items:center;justify-content:center;">${photoHTML}</div>
      <div style="font-family:Georgia,serif;font-size:13pt;color:#fff;font-weight:bold;text-align:center;line-height:1.2;margin-bottom:3mm;">${d.fullName || 'Your Name'}</div>
      <div style="display:flex;flex-wrap:wrap;justify-content:center;gap:2mm;margin-bottom:4mm;">
        ${d.education ? `<span style="border:1px solid #C9963A;color:#C9963A;font-size:7pt;padding:1mm 3mm;border-radius:10px;">${d.education.split(' ').slice(0,2).join(' ')}</span>` : ''}
        ${d.company ? `<span style="border:1px solid #C9963A;color:#C9963A;font-size:7pt;padding:1mm 3mm;border-radius:10px;">${d.company}</span>` : ''}
      </div>
      <div style="font-size:7pt;font-weight:bold;letter-spacing:2px;text-transform:uppercase;color:#C9963A;margin:3mm 0 1mm;width:100%;">Personal</div>
      ${row('Date of Birth', formatDate(d.dob))}${row('Height', d.height)}
      ${row('Place of Birth', d.pob)}${row('Blood Group', d.bloodGroup)}
      ${d.rashi ? `<div style="font-size:7pt;font-weight:bold;letter-spacing:2px;text-transform:uppercase;color:#C9963A;margin:3mm 0 1mm;width:100%;">Astrology</div>${row('Rashi', d.rashi)}${row('Nakshatra', d.nakshatra)}` : ''}
      ${d.phone ? `<div style="font-size:7pt;font-weight:bold;letter-spacing:2px;text-transform:uppercase;color:#C9963A;margin:3mm 0 1mm;width:100%;">Contact</div>${row('Phone', d.phone)}` : ''}
      ${d.email ? row('Email', d.email) : ''}
    </div>
    <div style="flex:1;padding:10mm;">
      <div style="font-size:7pt;font-weight:bold;letter-spacing:3px;text-transform:uppercase;color:#C9963A;margin-bottom:1mm;">Marriage Biodata</div>
      <div style="font-family:Georgia,serif;font-size:22pt;color:#fff;font-weight:bold;line-height:1.1;">${(d.fullName||'Your Name').split(' ')[0]}<br/>${(d.fullName||'').split(' ').slice(1).join(' ')}</div>
      <div style="height:2px;background:linear-gradient(90deg,#C9963A,transparent);margin:3mm 0;"></div>
      ${d.aboutMe ? `<p style="font-size:9pt;color:#ccc;line-height:1.6;margin-bottom:4mm;">${d.aboutMe}</p>` : ''}
      <div style="font-size:8pt;font-weight:bold;letter-spacing:2px;text-transform:uppercase;color:#C9963A;margin:4mm 0 2mm;">Education & Career</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:3mm;">
        ${cell('Qualification', d.education)}${cell('Designation', d.designation)}
        ${cell('Company', d.company)}${cell('Income', d.income)}
        ${cell('Sector', d.empType)}${cell('Work City', d.workCity)}
      </div>
      <div style="font-size:8pt;font-weight:bold;letter-spacing:2px;text-transform:uppercase;color:#C9963A;margin:4mm 0 2mm;">Family Details</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:3mm;">
        ${cell("Father", d.fatherName)}${cell("Father's Work", d.fatherOcc)}
        ${cell("Mother", d.motherName)}${cell("Mother's Work", d.motherOcc)}
        ${cell('Brothers', d.brothers)}${cell('Sisters', d.sisters)}
        ${cell('Native Place', d.nativePlace)}${cell('Family Type', d.familyType ? d.familyType + ' / ' + d.familyStatus : '')}
      </div>
    </div>
  </div>`
}

function buildFloral(d, photo) {
  const photoHTML = photo ? `<img src="${photo}" style="width:100%;height:100%;object-fit:cover;">` : '<span style="font-size:9pt;color:#C4608A;">Photo</span>'
  const fr = (label, value) => value ? `<div style="display:flex;gap:4px;font-size:9pt;line-height:1.6;"><span style="color:#C4608A;font-weight:700;min-width:28mm;">${label}</span><span style="color:#4A1B3A;">${value}</span></div>` : ''
  return `<div style="width:210mm;min-height:297mm;background:#FFF0F5;padding:10mm 14mm;font-family:Georgia,serif;color:#4A1B3A;box-sizing:border-box;">
    <div style="text-align:center;font-size:18pt;color:#D4537E;letter-spacing:8px;margin-bottom:2mm;">❀ ✿ ❀</div>
    <div style="text-align:center;font-size:8pt;letter-spacing:4px;text-transform:uppercase;color:#C4608A;">Vivah Parichay Patrika</div>
    <div style="text-align:center;font-size:24pt;font-weight:bold;color:#7B1D4F;margin:2mm 0;">${d.fullName || 'Your Name'}</div>
    <div style="height:1px;background:linear-gradient(90deg,transparent,#D4537E,transparent);margin:3mm auto;width:60%;"></div>
    <div style="display:flex;gap:8mm;margin:4mm 0;">
      <div style="width:35mm;height:42mm;border:2px solid #D4537E;border-radius:50% 50% 40% 40%;overflow:hidden;flex-shrink:0;background:#FADADF;display:flex;align-items:center;justify-content:center;">${photoHTML}</div>
      <div style="flex:1;">
        <div style="font-size:11pt;color:#993556;margin-bottom:2mm;">❀ Personal Details</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:0 4mm;">
          ${fr('Date of Birth', formatDate(d.dob))}${fr('Height', d.height)}
          ${fr('Place of Birth', d.pob)}${fr('Complexion', d.complexion)}
          ${fr('Religion', d.religion)}${fr('Caste', d.caste)}
          ${fr('Gotra', d.gotra)}${fr('Blood Group', d.bloodGroup)}
        </div>
      </div>
    </div>
    ${d.rashi || d.nakshatra ? `<div style="font-size:11pt;color:#993556;margin:3mm 0 2mm;">❀ Astrological Details</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:0 4mm;margin-bottom:3mm;">
      ${fr('Rashi', d.rashi)}${fr('Nakshatra', d.nakshatra)}${fr('Manglik', d.manglik)}
    </div>` : ''}
    <div style="font-size:11pt;color:#993556;margin:3mm 0 2mm;">❀ Education & Career</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:0 4mm;margin-bottom:3mm;">
      ${fr('Qualification', d.education)}${fr('Company', d.company)}
      ${fr('Designation', d.designation)}${fr('Income', d.income)}
      ${fr('Work Location', d.workCity)}
    </div>
    <div style="font-size:11pt;color:#993556;margin:3mm 0 2mm;">❀ Family Details</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:0 4mm;margin-bottom:3mm;">
      ${fr("Father's Name", d.fatherName)}${fr("Father's Work", d.fatherOcc)}
      ${fr("Mother's Name", d.motherName)}${fr("Mother's Work", d.motherOcc)}
      ${fr('Brother(s)', d.brothers)}${fr('Sister(s)', d.sisters)}
      ${fr('Native Place', d.nativePlace)}${fr('Family Type', d.familyType)}
    </div>
    ${d.aboutMe ? `<div style="font-size:11pt;color:#993556;margin:3mm 0 2mm;">❀ About Me</div><p style="font-size:9pt;line-height:1.7;">${d.aboutMe}</p>` : ''}
    <div style="text-align:center;margin-top:5mm;font-size:14pt;color:#D4537E;letter-spacing:6px;">❀ ✿ ❀</div>
    ${d.phone || d.email ? `<div style="text-align:center;font-size:8pt;color:#C4608A;margin-top:2mm;">${d.phone || ''} ${d.email ? '· ' + d.email : ''}</div>` : ''}
  </div>`
}
