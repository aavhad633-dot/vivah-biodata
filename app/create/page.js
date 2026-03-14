'use client'

import { useState } from 'react'
import PersonalForm from '@/components/form/PersonalForm'
import FamilyForm from '@/components/form/FamilyForm'
import CareerForm from '@/components/form/CareerForm'
import TemplateSelector from '@/components/form/TemplateSelector'
import PreviewPage from '@/components/form/PreviewPage'

const STEPS = [
  { id: 1, label: 'Personal' },
  { id: 2, label: 'Family' },
  { id: 3, label: 'Career' },
  { id: 4, label: 'Template' },
  { id: 5, label: 'Preview' },
]

export default function CreatePage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({})
  const [selectedTemplate, setSelectedTemplate] = useState('classic')
  const [photoURL, setPhotoURL] = useState(null)

  function updateForm(newData) {
    setFormData(prev => ({ ...prev, ...newData }))
  }

  function goTo(step) {
    setCurrentStep(step)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div style={{ minHeight: '100vh', background: '#FFFBEB', display: 'flex', flexDirection: 'column' }}>

      {/* Header */}
      <header style={{ background: '#1C1917', borderBottom: '2px solid #F59E0B', padding: '1rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <span style={{ color: '#FBD34D', fontFamily: 'Georgia, serif', fontSize: '1.5rem', fontWeight: 'bold' }}>Vivah Biodata</span>
          <span style={{ color: '#FDE68A', fontSize: '0.85rem', fontStyle: 'italic', marginLeft: '0.5rem' }}>— Premium Generator</span>
        </div>
        <a href="/" style={{ color: '#FBD34D', fontSize: '0.85rem', textDecoration: 'none' }}>← Home</a>
      </header>

      {/* Content */}
      <div style={{ flex: 1, padding: '2rem', maxWidth: '960px', width: '100%', margin: '0 auto', boxSizing: 'border-box' }}>

        {/* Step Indicator */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: '4px', marginBottom: '1.25rem' }}>
          {STEPS.map((step, idx) => (
            <div key={step.id} style={{ display: 'flex', alignItems: 'center' }}>
              <button
                onClick={() => step.id < currentStep && goTo(step.id)}
                style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '4px 8px', background: 'none', border: 'none', cursor: step.id < currentStep ? 'pointer' : 'default' }}
              >
                <div style={{
                  width: '28px', height: '28px', borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '12px', fontWeight: 'bold',
                  background: step.id === currentStep ? '#F59E0B' : step.id < currentStep ? '#16A34A' : '#D1D5DB',
                  color: '#fff',
                  flexShrink: 0
                }}>
                  {step.id < currentStep ? '✓' : step.id}
                </div>
                <span style={{
                  fontSize: '13px', fontWeight: '600',
                  color: step.id === currentStep ? '#D97706' : step.id < currentStep ? '#16A34A' : '#9CA3AF'
                }}>
                  {step.label}
                </span>
              </button>
              {idx < STEPS.length - 1 && (
                <span style={{ color: '#D1D5DB', fontSize: '1.2rem', margin: '0 2px' }}>›</span>
              )}
            </div>
          ))}
        </div>

        {/* Progress Bar */}
        <div style={{ height: '4px', background: '#E5E7EB', borderRadius: '4px', marginBottom: '2rem', overflow: 'hidden' }}>
          <div style={{
            height: '100%', background: '#F59E0B', borderRadius: '4px',
            width: `${(currentStep / 5) * 100}%`,
            transition: 'width 0.4s ease'
          }} />
        </div>

        {/* Form Steps */}
        {currentStep === 1 && (
          <PersonalForm
            data={formData}
            photoURL={photoURL}
            setPhotoURL={setPhotoURL}
            onNext={(data) => { updateForm(data); goTo(2) }}
          />
        )}
        {currentStep === 2 && (
          <FamilyForm
            data={formData}
            onBack={() => goTo(1)}
            onNext={(data) => { updateForm(data); goTo(3) }}
          />
        )}
        {currentStep === 3 && (
          <CareerForm
            data={formData}
            onBack={() => goTo(2)}
            onNext={(data) => { updateForm(data); goTo(4) }}
          />
        )}
        {currentStep === 4 && (
          <TemplateSelector
            selected={selectedTemplate}
            onSelect={setSelectedTemplate}
            onBack={() => goTo(3)}
            onNext={() => goTo(5)}
          />
        )}
        {currentStep === 5 && (
          <PreviewPage
            data={formData}
            template={selectedTemplate}
            photoURL={photoURL}
            onBack={() => goTo(4)}
          />
        )}

      </div>
    </div>
  )
}