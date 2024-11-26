'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/header'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { candidates } from '../../../../data/mockData'

export default function VoteConfirmationPage({ params }: { params: { id: string, candidateId: string } }) {
  const [voterId, setVoterId] = useState('')
  const router = useRouter()
  const candidate = candidates.find(c => c.id === parseInt(params.candidateId))

  if (!candidate) {
    return <div className="text-center text-red-600">Candidate not found</div>
  }

  const handleCastVote = () => {
    // Add your vote casting logic here
    console.log('Vote cast for candidate:', candidate.id, 'with voter ID:', voterId)
    router.push(`/election/${params.id}/vote-success`)
  }

  const handleCancel = () => {
    router.back()
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-6 py-8">
        <Card className="max-w-md mx-auto shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-3xl font-semibold">Confirm Your Vote</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg mb-4">You are about to cast your vote for:</p>
            <p className="text-2xl font-bold mb-6">{candidate.name} ({candidate.party})</p>
            <div className="mb-6">
              <Label htmlFor="voterId" className="text-lg">Enter your Voter ID</Label>
              <Input
                id="voterId"
                value={voterId}
                onChange={(e) => setVoterId(e.target.value)}
                required
                className="mt-2 text-lg"
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between gap-4">
            <Button variant="outline" onClick={handleCancel} className="py-3 text-lg w-full sm:w-auto">Cancel</Button>
            <Button onClick={handleCastVote} className="py-3 text-lg w-full sm:w-auto">Cast Vote</Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  )
}
