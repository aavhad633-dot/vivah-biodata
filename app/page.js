export default function Home() {
  return (
    <div style={{ minHeight: '100vh', background: '#FFFBEB', display: 'flex', flexDirection: 'column' }}>

      {/* Header */}
      <header style={{ background: '#1C1917', borderBottom: '2px solid #F59E0B', padding: '1rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <span style={{ color: '#FBD34D', fontFamily: 'Georgia, serif', fontSize: '1.6rem', fontWeight: 'bold' }}>Vivah Biodata</span>
          <span style={{ color: '#FDE68A', fontSize: '0.85rem', fontStyle: 'italic', marginLeft: '0.5rem' }}>— Premium Generator</span>
        </div>
      </header>

      {/* Hero Section */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem 2rem' }}>
        <div style={{ maxWidth: '1100px', width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>

          {/* Left: Text */}
          <div>
            <div style={{ display: 'inline-block', background: '#FEF3C7', border: '1px solid #FDE68A', color: '#B45309', fontSize: '11px', fontWeight: 'bold', letterSpacing: '2px', textTransform: 'uppercase', padding: '4px 12px', borderRadius: '20px', marginBottom: '1.2rem' }}>
              Free · No signup required
            </div>
            <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '3rem', fontWeight: 'bold', color: '#1C1917', lineHeight: '1.15', marginBottom: '1rem' }}>
              Beautiful Marriage<br />
              <span style={{ color: '#D97706' }}>Biodata</span> in Minutes
            </h1>
            <p style={{ color: '#78716C', fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '2rem' }}>
              Create a professional, print-ready marriage biodata with 3 elegant templates.
              Fill your details, preview live, and download as a PDF instantly.
            </p>

            {/* Feature list */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem', marginBottom: '2rem' }}>
              {['3 Premium Templates', 'Hindi & Gujarati Support', 'Live PDF Preview', 'Photo Upload', 'Instant Download', 'No Account Needed'].map(f => (
                <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#57534E' }}>
                  <span style={{ color: '#16A34A', fontWeight: 'bold' }}>✓</span> {f}
                </div>
              ))}
            </div>

            <a href="/create" style={{
              display: 'inline-block', background: '#F59E0B', color: '#fff',
              padding: '14px 40px', borderRadius: '10px', fontSize: '1.05rem',
              fontWeight: 'bold', textDecoration: 'none',
              boxShadow: '0 4px 20px rgba(245,158,11,0.35)',
              transition: 'background 0.2s'
            }}>
              Create Your Biodata →
            </a>
          </div>

          {/* Right: Template preview cards */}
          <div style={{ position: 'relative', height: '420px' }}>

            {/* Classic card */}
            <div style={{
              position: 'absolute', top: '0', right: '0', width: '260px',
              background: '#FFF9F0', border: '2px solid #E8D5AA', borderRadius: '16px',
              padding: '1.2rem', boxShadow: '0 12px 40px rgba(0,0,0,0.1)',
              transform: 'rotate(2deg)'
            }}>
              <div style={{ height: '4px', background: 'linear-gradient(90deg,#8B2E2E,#C9963A,#8B2E2E)', borderRadius: '2px', marginBottom: '10px' }} />
              <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                <div style={{ fontSize: '1.4rem', color: '#8B2E2E' }}>ॐ</div>
                <div style={{ fontFamily: 'Georgia,serif', fontWeight: 'bold', color: '#1A1208' }}>Arjun Sharma</div>
                <div style={{ fontSize: '10px', letterSpacing: '2px', color: '#7A6045', textTransform: 'uppercase' }}>Marriage Biodata</div>
              </div>
              {[['Date of Birth','12 April 1995'],['Height',"5'10\""],['Education','B.Tech, COEP'],['Company','TCS, Pune']].map(([k,v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '3px' }}>
                  <span style={{ color: '#B45309', fontWeight: '600' }}>{k}</span>
                  <span style={{ color: '#44403C' }}>{v}</span>
                </div>
              ))}
              <div style={{ height: '4px', background: 'linear-gradient(90deg,#8B2E2E,#C9963A,#8B2E2E)', borderRadius: '2px', marginTop: '10px' }} />
            </div>

            {/* Modern dark card */}
            <div style={{
              position: 'absolute', bottom: '0', left: '0', width: '260px',
              background: '#1A1A2E', border: '2px solid #C9963A', borderRadius: '16px',
              padding: '1.2rem', boxShadow: '0 12px 40px rgba(0,0,0,0.2)',
              transform: 'rotate(-1deg)'
            }}>
              <div style={{ fontSize: '9px', fontWeight: 'bold', letterSpacing: '2px', color: '#C9963A', textTransform: 'uppercase', marginBottom: '6px' }}>Marriage Biodata</div>
              <div style={{ fontFamily: 'Georgia,serif', fontSize: '1.3rem', color: '#fff', fontWeight: 'bold', marginBottom: '8px', lineHeight: 1.2 }}>Priya<br/>Patel</div>
              <div style={{ display: 'flex', gap: '6px', marginBottom: '10px' }}>
                {['MBA','Infosys'].map(t => (
                  <span key={t} style={{ border: '1px solid #C9963A', color: '#C9963A', fontSize: '9px', padding: '2px 8px', borderRadius: '10px' }}>{t}</span>
                ))}
              </div>
              {[['D.O.B','5 March 1997'],['Height',"5'4\""],['Rashi','Mesh']].map(([k,v]) => (
                <div key={k} style={{ fontSize: '10px', color: '#aaa', marginBottom: '3px' }}>{k} <span style={{ color: '#fff' }}>{v}</span></div>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ background: '#1C1917', borderTop: '1px solid #292524', padding: '1rem 2rem', textAlign: 'center', color: '#78716C', fontSize: '13px' }}>
        Built with ♡ for every shaadi · Vivah Biodata
      </footer>

    </div>
  )
}