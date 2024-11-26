'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Add your login logic here
    console.log('Login submitted:', { email, password })
    router.push('/home')
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[450px] shadow-lg rounded-lg bg-white">
        <CardHeader>
          <CardTitle className="text-3xl font-semibold text-gray-800">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full gap-6">
              <div className="flex flex-col space-y-2">
                <Label htmlFor="email" className="text-lg">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-gray-300 focus:border-blue-500 py-3 px-4"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <Label htmlFor="password" className="text-lg">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="border-gray-300 focus:border-blue-500 py-3 px-4"
                />
              </div>
            </div>
            <CardFooter  className="flex justify-between space-x-4 mt-4">
              <Button variant="outline" onClick={() => router.push('/')} className="w-24">Cancel</Button>
              <Button type="submit" className="bg-blue-500 text-white hover:bg-blue-600 w-24">Login</Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
