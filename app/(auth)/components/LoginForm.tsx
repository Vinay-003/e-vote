import React, { useState, Suspense } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SocialLoginButtons } from "./SocialLoginButtons"
import Loader from "@/components/ui/loader"
import Alert from "@/components/ui/alert";
import Loading from "@/components/loading";

import { useRouter } from 'next/navigation'
import { Login } from "../actions/actions"

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [email, setEmail] = useState<string>(' ')
  const [password, setPassword] = useState<string>(' ')

  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)
      const { error } = await Login({ email, password });
      if (error) {
        setError(error);
      } else {
        router.push("/home");
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
        {isLoading ? <>'Loging in...' <i className="flex text-white "> <Loader /> </i></> : 'Log In'}
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

