'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/header'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { countries } from '../../../data/mockData'

export default function VoterRegistrationPage({ params }: { params: { id: string } }) {
  const [formData, setFormData] = useState({
    name: '',
    uidNumber: '',
    phoneNumber: '',
    country: '',
  })
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleCountryChange = (value: string) => {
    setFormData({ ...formData, country: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Add your voter registration logic here
    console.log('Voter registration submitted:', formData)
    router.push(`/election/${params.id}/candidates`)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-6 py-8">
        <Card className="max-w-md mx-auto shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-3xl font-semibold">Voter Registration</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid w-full items-center gap-6">
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="name" className="text-lg">Full Name</Label>
                  <Input 
                    id="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    className="text-lg" 
                    required 
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="uidNumber" className="text-lg">UID Number</Label>
                  <Input 
                    id="uidNumber" 
                    value={formData.uidNumber} 
                    onChange={handleChange} 
                    className="text-lg" 
                    required 
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="phoneNumber" className="text-lg">Phone Number</Label>
                  <Input 
                    id="phoneNumber" 
                    type="tel" 
                    value={formData.phoneNumber} 
                    onChange={handleChange} 
                    className="text-lg" 
                    required 
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="country" className="text-lg">Country</Label>
                  <Select onValueChange={handleCountryChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a country" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country} value={country}>
                          {country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => router.back()} className="py-2 px-6 text-lg">Cancel</Button>
            <Button 
              type="submit" 
              onClick={handleSubmit} 
              className="py-2 px-6 text-lg"
            >
              Continue
            </Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  )
}
