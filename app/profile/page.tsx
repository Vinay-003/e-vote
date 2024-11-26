'use client'

import { useState } from 'react'
import Header from '@/components/header'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { countries } from '../data/mockData'

const mockUser = {
  fullName: "John Doe",
  email: "john.doe@example.com",
  phoneNumber: "+1234567890",
  country: "United States",
}

export default function ProfilePage() {
  const [user, setUser] = useState(mockUser)
  const [isEditing, setIsEditing] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.id]: e.target.value })
  }

  const handleCountryChange = (value: string) => {
    setUser({ ...user, country: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Profile updated:', user)
    setIsEditing(false)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl">User Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid w-full gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="fullName" className="text-lg">Full Name</Label>
                  <Input
                    id="fullName"
                    value={user.fullName}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="text-lg p-3"
                    aria-describedby="fullName-helper"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email" className="text-lg">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={user.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="text-lg p-3"
                    aria-describedby="email-helper"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="phoneNumber" className="text-lg">Phone Number</Label>
                  <Input
                    id="phoneNumber"
                    type="tel"
                    value={user.phoneNumber}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="text-lg p-3"
                    aria-describedby="phoneNumber-helper"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="country" className="text-lg">Country</Label>
                  <Select
                    disabled={!isEditing}
                    value={user.country}
                    onValueChange={handleCountryChange}
                    aria-describedby="country-helper"
                  >
                    <SelectTrigger className="text-lg p-3">
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
          <CardFooter className="flex justify-end space-x-2">
            {isEditing ? (
              <>
                <Button variant="outline" onClick={() => setIsEditing(false)} size="lg">Cancel</Button>
                <Button onClick={handleSubmit} size="lg">Save Changes</Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)} size="lg" disabled={isEditing}>Edit Profile</Button>
            )}
          </CardFooter>
        </Card>
      </main>
    </div>
  )
}
