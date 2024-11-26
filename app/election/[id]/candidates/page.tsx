'use client'

import { useRouter } from 'next/navigation'
import Header from '@/components/header'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { candidates } from '../../../data/mockData'

export default function CandidatesListPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const electionCandidates = candidates.filter(c => c.electionId === parseInt(params.id))

  const handleSelectCandidate = (candidateId: number) => {
    router.push(`/election/${params.id}/vote-confirmation/${candidateId}`)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-6 py-8">
        <h1 className="text-4xl font-semibold text-center mb-8">Candidates</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {electionCandidates.map((candidate) => (
            <Card key={candidate.id} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold">{candidate.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-lg">Party: {candidate.party}</p>
                <Button 
                  onClick={() => handleSelectCandidate(candidate.id)} 
                  className="w-full py-3 text-lg mt-4"
                >
                  Select Candidate
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
