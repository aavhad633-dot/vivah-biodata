'use client'

const TEMPLATES = [
  {
    id: 'classic',
    name: 'Classic Elegance',
    desc: 'Traditional red & gold — best for Hindu families',
    previewHTML: `
      <div style="background:#FFF9F0;height:100%;padding:12px;font-family:serif;position:relative;">
        <div style="height:4px;background:linear-gradient(90deg,#8B2E2E,#C9963A,#8B2E2E);border-radius:2px;margin-bottom:8px;"></div>
        <div style="text-align:center;margin-bottom:8px;">
          <div style="font-size:20px;color:#8B2E2E;">ॐ</div>
          <div style="font-size:13px;font-weight:bold;color:#1A1208;">Arjun Sharma</div>
          <div style="font-size:8px;letter-spacing:2px;color:#7A6045;text-transform:uppercase;">Marriage Biodata</div>
          <div style="height:1px;background:linear-gradient(90deg,transparent,#C9963A,transparent);margin:4px auto;width:70%;"></div>
        </div>
        <div style="display:flex;justify-content:space-between;font-size:8px;color:#3D2B0E;margin:2px 4px;"><span style="color:#7A6045;font-weight:bold;">Date of Birth</span><span>12 Apr 1995</span></div>
        <div style="display:flex;justify-content:space-between;font-size:8px;color:#3D2B0E;margin:2px 4px;"><span style="color:#7A6045;font-weight:bold;">Height</span><span>5'10"</span></div>
        <div style="display:flex;justify-content:space-between;font-size:8px;color:#3D2B0E;margin:2px 4px;"><span style="color:#7A6045;font-weight:bold;">Education</span><span>B.Tech</span></div>
        <div style="display:flex;justify-content:space-between;font-size:8px;color:#3D2B0E;margin:2px 4px;"><span style="color:#7A6045;font-weight:bold;">Company</span><span>TCS, Pune</span></div>
        <div style="height:4px;background:linear-gradient(90deg,#8B2E2E,#C9963A,#8B2E2E);border-radius:2px;margin-top:8px;"></div>
      </div>`
  },
  {
    id: 'modern',
    name: 'Modern Dark',
    desc: 'Sleek dark theme — contemporary & professional',
    previewHTML: `
      <div style="background:#1A1A2E;height:100%;padding:12px;font-family:sans-serif;border-left:3px solid #C9963A;">
        <div style="font-size:7px;font-weight:bold;letter-spacing:2px;color:#C9963A;text-transform:uppercase;margin-bottom:4px;">Marriage Biodata</div>
        <div style="font-size:15px;font-weight:bold;color:#fff;font-family:serif;line-height:1.1;margin-bottom:6px;">Arjun<br/>Sharma</div>
        <div style="display:flex;gap:4px;flex-wrap:wrap;margin-bottom:8px;">
          <span style="border:1px solid #C9963A;color:#C9963A;font-size:7px;padding:1px 5px;border-radius:10px;">B.Tech</span>
          <span style="border:1px solid #C9963A;color:#C9963A;font-size:7px;padding:1px 5px;border-radius:10px;">TCS</span>
        </div>
        <div style="font-size:8px;color:#aaa;margin:2px 0;">D.O.B <span style="color:#fff;">12 Apr 1995</span></div>
        <div style="font-size:8px;color:#aaa;margin:2px 0;">Height <span style="color:#fff;">5'10"</span></div>
        <div style="font-size:8px;color:#aaa;margin:2px 0;">Rashi <span style="color:#fff;">Mesh</span></div>
      </div>`
  },
  {
    id: 'floral',
    name: 'Floral Romance',
    desc: 'Elegant pink — popular for bride biodata',
    previewHTML: `
      <div style="background:#FFF0F5;height:100%;padding:12px;font-family:serif;position:relative;">
        <div style="text-align:center;font-size:12px;color:#D4537E;letter-spacing:4px;margin-bottom:4px;">❀ ✿ ❀</div>
        <div style="text-align:center;font-size:7px;letter-spacing:2px;color:#C4608A;text-transform:uppercase;margin-bottom:2px;">Vivah Parichay Patrika</div>
        <div style="text-align:center;font-size:13px;font-weight:bold;color:#7B1D4F;margin-bottom:4px;">Priya Sharma</div>
        <div style="height:1px;background:linear-gradient(90deg,transparent,#D4537E,transparent);margin:4px auto;width:60%;"></div>
        <div style="display:flex;justify-content:space-between;font-size:8px;margin:2px 4px;"><span style="color:#C4608A;font-weight:bold;">Date of Birth</span><span style="color:#4A1B3A;">12 Apr 1997</span></div>
        <div style="display:flex;justify-content:space-between;font-size:8px;margin:2px 4px;"><span style="color:#C4608A;font-weight:bold;">Height</span><span style="color:#4A1B3A;">5'4"</span></div>
        <div style="display:flex;justify-content:space-between;font-size:8px;margin:2px 4px;"><span style="color:#C4608A;font-weight:bold;">Education</span><span style="color:#4A1B3A;">MBA</span></div>
        <div style="display:flex;justify-content:space-between;font-size:8px;margin:2px 4px;"><span style="color:#C4608A;font-weight:bold;">Work</span><span style="color:#4A1B3A;">Infosys, Pune</span></div>
        <div style="text-align:center;font-size:12px;color:#D4537E;letter-spacing:4px;margin-top:6px;">❀ ✿ ❀</div>
      </div>`
  }
]

export default function TemplateSelector({ selected, onSelect, onBack, onNext }) {
  return (
    <div className="bg-white border border-amber-200 rounded-2xl p-8 shadow-sm">
      <h2 className="font-serif text-2xl text-stone-800 mb-1">Choose Your Template</h2>
      <p className="text-stone-400 text-sm mb-6">Pick a design that best represents you. All templates are A4, print-ready.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {TEMPLATES.map(tpl => (
          <div
            key={tpl.id}
            onClick={() => onSelect(tpl.id)}
            className={`border-2 rounded-xl overflow-hidden cursor-pointer transition-all hover:-translate-y-1 ${
              selected === tpl.id
                ? 'border-amber-500 shadow-lg shadow-amber-100'
                : 'border-stone-200 hover:border-amber-300'
            }`}
          >
            <div className="h-52 relative"
              dangerouslySetInnerHTML={{ __html: tpl.previewHTML }}
            />
            {selected === tpl.id && (
              <div className="absolute" style={{display:'none'}} />
            )}
            <div className={`px-4 py-3 border-t relative ${selected === tpl.id ? 'bg-amber-50 border-amber-200' : 'bg-white border-stone-100'}`}>
              {selected === tpl.id && (
                <span className="absolute -top-3 right-3 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-full">✓ Selected</span>
              )}
              <div className="font-semibold text-stone-800 text-sm">{tpl.name}</div>
              <div className="text-stone-400 text-xs mt-0.5">{tpl.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 text-sm text-stone-600">
        <span className="font-bold text-amber-700">💡 Tip: </span>
        You can go back and change the template anytime from the Preview page.
      </div>

      <div className="flex justify-between">
        <button onClick={onBack}
          className="border border-stone-200 text-stone-500 px-6 py-3 rounded-lg font-semibold hover:border-amber-300 hover:text-amber-600 transition-colors">
          ← Back
        </button>
        <button onClick={onNext}
          className="bg-amber-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-amber-600 transition-colors">
          Preview Biodata →
        </button>
      </div>
    </div>
  )
}