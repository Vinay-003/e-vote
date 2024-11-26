'use client'

import { useRouter } from 'next/navigation'
import Header from '@/components/header'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { elections } from '../../data/mockData'

export default function ElectionDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const election = elections.find(e => e.id === parseInt(params.id))

  if (!election) {
    return <div>Election not found</div>
  }

  const handleContinueAsVoter = () => {
    router.push(`/election/${params.id}/voter-registration`)
  }

  const handleRegisterAsCandidate = () => {
    router.push(`/election/${params.id}/candidate-registration`)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-6 py-8">
        <Card className="max-w-md mx-auto shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-3xl font-semibold">{election.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-lg">Status: <span className="font-semibold">{election.status}</span></p>
            <div className="space-y-4">
              {election.status === 'ongoing' ? (
                <Button onClick={handleContinueAsVoter} className="w-full py-2 px-6 text-lg">
                  Continue as Voter
                </Button>
              ) : (
                <>
                  <Button 
                    onClick={handleRegisterAsCandidate} 
                    className="w-full py-2 px-6 text-lg"
                  >
                    Register as Candidate
                  </Button>
                  <Button 
                    onClick={handleContinueAsVoter} 
                    className="w-full py-2 px-6 text-lg"
                  >
                    Continue as Voter
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
