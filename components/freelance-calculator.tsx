'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export function FreelanceCalculatorComponent() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    experienceLevel: '',
    primarySkill: '',
    hoursPerWeek: 0,
    weeksPerYear: 0,
    hourlyRate: 0,
    monthlyExpenses: 0,
    taxRate: 0,
  })

  const updateFormData = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    console.log(formData);
    
  }

  const calculateEarnings = () => {
    const grossAnnualIncome = formData.hourlyRate * formData.hoursPerWeek * (52 - formData.weeksPerYear)
    const annualExpenses = formData.monthlyExpenses * 12
    const taxAmount = grossAnnualIncome * (formData.taxRate / 100)
    const netAnnualIncome = grossAnnualIncome - annualExpenses - taxAmount
    return {
      gross: grossAnnualIncome,
      net: netAnnualIncome,
      monthly: netAnnualIncome / 12
    }
  }

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Esperienza e Competenze</CardTitle>
              <CardDescription className="text-lg">Raccontaci della tua esperienza come sviluppatore.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="experienceLevel" className="text-lg">Livello di Esperienza</Label>
                <Select onValueChange={(value) => updateFormData('experienceLevel', value)}>
                  <SelectTrigger id="experienceLevel">
                    <SelectValue placeholder="Seleziona il tuo livello di esperienza" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="junior">Junior (0-2 anni)</SelectItem>
                    <SelectItem value="mid">Mid-level (3-5 anni)</SelectItem>
                    <SelectItem value="senior">Senior (6+ anni)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="primarySkill" className="text-lg">Competenza Principale</Label>
                <Select onValueChange={(value) => updateFormData('primarySkill', value)}>
                  <SelectTrigger id="primarySkill">
                    <SelectValue placeholder="Seleziona la tua competenza principale" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="frontend">Sviluppo Frontend</SelectItem>
                    <SelectItem value="backend">Sviluppo Backend</SelectItem>
                    <SelectItem value="fullstack">Sviluppo Full Stack</SelectItem>
                    <SelectItem value="mobile">Sviluppo Mobile</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </>
        )
      case 2:
        return (
          <>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Disponibilità di Lavoro</CardTitle>
              <CardDescription className="text-lg">Quanto tempo puoi dedicare al freelancing?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="hoursPerWeek" className="text-lg">Ore per Settimana</Label>
                <Input 
                  id="hoursPerWeek" 
                  type="number" 
                  placeholder="e.g., 40" 
                  onChange={(e) => updateFormData('hoursPerWeek', parseInt(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weeksPerYear" className="text-lg">Settimane di Ferie</Label>
                <Input 
                  id="weeksPerYear" 
                  type="number" 
                  placeholder="e.g., 2" 
                  onChange={(e) => updateFormData('weeksPerYear', parseInt(e.target.value))}
                />
              </div>
            </CardContent>
          </>
        )
      case 3:
        return (
          <>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Impostazione del Tasso Orario</CardTitle>
              <CardDescription className="text-lg">Determina il tuo tasso orario.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="hourlyRate" className="text-lg">Tasso Orario (€)</Label>
                <Input 
                  id="hourlyRate" 
                  type="number" 
                  placeholder="e.g., 50" 
                  onChange={(e) => {console.log(e.target.value); updateFormData('hourlyRate', parseInt(e.target.value))}}
                />
              </div>
            </CardContent>
          </>
        )
      case 4:
        return (
          <>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Spese e Tasse</CardTitle>
              <CardDescription className="text-lg">Considera le tue spese aziendali e le tue obbligazioni fiscali.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="monthlyExpenses" className="text-lg">Costi Fissi Mensili (€)</Label>
                <Input 
                  id="monthlyExpenses" 
                  type="number" 
                  placeholder="e.g., 1000" 
                  onChange={(e) => updateFormData('monthlyExpenses', parseInt(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="taxRate" className="text-lg">Tasso di Tassazione Stimato (%)</Label>
                <Input 
                  id="taxRate" 
                  type="number" 
                  placeholder="e.g., 30" 
                  onChange={(e) => updateFormData('taxRate', parseInt(e.target.value))}
                />
              </div>
            </CardContent>
          </>
        )
      case 5:
        const earnings = calculateEarnings()
        return (
          <>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">I Tuoi Guadagni Stimati</CardTitle>
              <CardDescription className="text-lg">Basato sulle informazioni che ci hai fornito, ecco una stima dei tuoi potenziali guadagni come sviluppatore freelance.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="font-semibold text-slate-600 text-lg">Reddito Annuale Lordo:</p>
                <p className="text-2xl text-slate-600 font-bold">${earnings.gross.toFixed(2)}</p>
              </div>
              <div className='flex justify-between'>
              <div className="space-y-2">
                <p className="font-semibold text-lg">Reddito Annuale Netto:</p>
                <p className="text-2xl font-bold text-lg">${earnings.net.toFixed(2)}</p>
              </div>
              <div className="space-y-2">
                <p className="font-semibold text-lg">Reddito Mensile Stimato:</p>
                <p className="text-2xl font-bold text-lg">${earnings.monthly.toFixed(2)}</p>
              </div>
              </div>
            </CardContent>
          </>
        )
      default:
        return null
    }
  }

  return (
    <Card className="w-full max-w-lg mx-auto">
      {renderStep()}
      <CardFooter className="flex justify-between">
        {step > 1 && (
          <Button onClick={() => setStep(step - 1)}>
            Precedente
          </Button>
        )}
        {step < 5 ? (
          <Button className="bg-yellow-500 hover:bg-yellow-700" onClick={() => setStep(step + 1)}>
            Successivo
          </Button>
        ) : (
          <Button onClick={() => setStep(1)}>
            Ricomincia
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}