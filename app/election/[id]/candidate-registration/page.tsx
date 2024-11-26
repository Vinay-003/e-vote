'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/header'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"

export default function CandidateRegistrationPage({ params }: { params: { id: string } }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    metamaskId: '',
  })
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Add your candidate registration logic here
    console.log('Candidate registration submitted:', formData)
    alert('You have successfully registered as a candidate in the selected election.')
    router.push('/home')
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-6 py-8">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl font-semibold text-center">Candidate Registration</CardTitle>
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
                    required
                    className="p-3 text-lg"
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="email" className="text-lg">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="p-3 text-lg"
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="phoneNumber" className="text-lg">Phone Number</Label>
                  <Input
                    id="phoneNumber"
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                    className="p-3 text-lg"
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="metamaskId" className="text-lg">MetaMask ID</Label>
                  <Input
                    id="metamaskId"
                    value={formData.metamaskId}
                    onChange={handleChange}
                    required
                    className="p-3 text-lg"
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row justify-between gap-4">
            <Button variant="outline" onClick={() => router.back()} className="w-full sm:w-auto px-6 py-3 text-lg">Cancel</Button>
            <Button type="submit" onClick={handleSubmit} className="w-full sm:w-auto px-6 py-3 text-lg">Register</Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  )
}
