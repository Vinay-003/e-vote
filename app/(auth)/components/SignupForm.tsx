import React, { useState, Suspense } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SocialLoginButtons } from "./SocialLoginButtons"
import Loader from "@/components/ui/loader"
import Loading from "@/components/loading";
import Alert from "@/components/ui/alert";

import { useRouter } from 'next/navigation'
import { SignUp } from "../actions/actions"

export function SignupForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)
    // Simulate API call
    try {
      setError(null);
      const { error } = await SignUp({ email, password });
      console.log(error);
      if (error) {
        setError(error);
        setIsLoading(false)
        return false;
      }
      router.push(`/confirm?type=signup`);
    } catch (error) {
      alert('An error occurred during signup.')
    }
    setIsLoading(false)
  }

  return (
    <Suspense fallback={<Loading />}>
      {error && <Alert status="error" message={error || ""} />}
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="john@example.com" required onChange={(e) => setEmail(e.currentTarget.value)}/>
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" required onChange={(e) => setPassword(e.currentTarget.value)}/>
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? <>'Signing in...' <i className="flex text-white "> <Loader /> </i></> : 'Sign up'}
        </Button>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-gray-500">Or continue with</span>
        </div>
      </div>
      <div className="flex justify-center">
        <SocialLoginButtons />
      </div>
    </div>
    </Suspense>
  )
}

