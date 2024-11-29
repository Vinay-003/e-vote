'use client'

import Link from 'next/link'
import { Logo } from '@/app/(auth)/components/Logo'
import { SignupForm } from '@/app/(auth)/components/SignupForm'

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-bacground to-background/50 flex flex-col items-center justify-center p-4 text-foreground">
      <div className="w-full max-w-md">
        <div className="bg-background/50 border rounded-2xl px-8 pt-6 pb-8 mb-4">
          <h2 className="text-2xl font-bold mb-6 text-center">Create your account</h2>
          <SignupForm />
        </div>
        <p className="text-center text-gray-300 text-sm">
          Already have an account?{' '}
          <Link href="/login" className="text-primary hover:underline">
            Log in
          </Link>
        </p>
      </div>
      <div className="mt-8 text-center text-gray-400 text-xs">
        By signing up, you agree to our{' '}
        <Link href="/terms" className="text-primary hover:underline">
          Terms of Service
        </Link>{' '}
        and{' '}
        <Link href="/privacy" className="text-primary hover:underline">
          Privacy Policy
        </Link>
        .
      </div>
      {/* Decorative elements */}
      <div className="fixed top-0 left-0 w-full h-4 bg-gradient-to-r from-primary to-secondary"></div>
      <div className="fixed bottom-0 right-0 w-64 h-64 bg-primary opacity-10 rounded-full blur-3xl"></div>
      <div className="fixed top-1/4 left-1/4 w-32 h-32 bg-secondary opacity-10 rounded-full blur-2xl"></div>
    </div>
  )
}

