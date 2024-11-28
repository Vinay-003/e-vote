import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function WelcomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
      <h1 className="text-5xl font-extrabold mb-6 text-popover-foreground text-center">
        Welcome to E-Voting App
      </h1>
      
      <p className="text-lg text-gray-600 mb-10 text-center max-w-lg">
        A seamless and secure way to cast your vote. Join us to make voting easier and more accessible.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Button asChild className="px-8 py-4 text-lg font-medium">
          <Link href="/login">Login</Link>
        </Button>
        <Button asChild variant="outline" className="px-8 py-4 text-lg font-medium">
          <Link href="/signup">Sign Up</Link>
        </Button>
      </div>
    </div>
  )
}
