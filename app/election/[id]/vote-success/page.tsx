import Link from 'next/link'
import Header from '@/components/header'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"

export default function VoteSuccessPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-6 py-8">
        <Card className="max-w-md mx-auto shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-3xl font-semibold">Vote Cast Successfully</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg mb-4">
              Thank you for participating in the democratic process. Your vote has been successfully cast and recorded.
            </p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button asChild className="py-3 text-lg w-full sm:w-auto">
              <Link href="/home">Return to Home</Link>
            </Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  )
}
