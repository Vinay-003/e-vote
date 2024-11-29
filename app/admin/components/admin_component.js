'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import axios from 'axios'

import { createElection, getElections, getElectionCount, getAllCandidate, registerCandidates, verifyVoter, startVoting, stopVoting, getWinner } from '@/contract/function'


export default function AdminComponent({ account, contractInstance } ) {
  const [electionName, setElectionName] = useState('')
  const [electionDetails, setElectionDetails] = useState('')
  const [electionId, setElectionId] = useState('')
  const [electionCount, setElectionCount] = useState('')
  const [electionsList, setElectionsList] = useState([])
  const [candidateName, setCandidateName] = useState('')
  const [candidateAge, setCandidateAge] = useState('')
  const [candidateAddress, setCandidateAddress] = useState('')
  const [allCandidates, setAllCandidates] = useState([])
  const [voterAddress, setVoterAddress] = useState('')
  const [winnerAddress, setWinnerAddress] = useState('')

  async function create_election() {
      try {
        let result2 = await getElectionCount(contractInstance, account)
        const electionData = {
            election_id: (parseInt(result2.message) + 1).toString(),
            election_name: electionName,
            election_details: electionDetails
        }
        
        const res = axios.post('/api/rest/v1/create/election/', electionData)
        if (res.status === 200) {
            console.log("Election data stored to database")
        } else {
            console.log('Error:', res)
        }
    } catch (error) {
        console.error("Error storing election data to database", error)
    }
    let result = await createElection(contractInstance, account, electionName)
    console.log("result:", result)
  }

  async function get_elections() {
    let result = await getElections(contractInstance, account)
    setElectionsList(result.message.map((election) => election.eventName))
    console.log("electionCount:", result)
  }

  async function election_count() {
    let result = await getElectionCount(contractInstance, account)
    setElectionCount(result.message.toString())
    console.log("electionCount:", result)
  }

  async function get_all_candidate() {
    console.log("name:", candidateName)
    let result = await getAllCandidate(contractInstance, account, electionId)
    console.log("result:", result)
    setAllCandidates(result)
  }

  async function register_candidate() {
    console.log("name:", candidateName)
    let result = await registerCandidates(contractInstance, account, electionId, candidateName, candidateAge, candidateAddress)
    console.log("result:", result)
  }

  async function register_voter() {
    console.log("name:", candidateName)
    let result = await verifyVoter(contractInstance, account, electionId, voterAddress)
    console.log("result:", result)
  }

  async function start_voting() {
    console.log("name:", candidateName)
    let result = await startVoting(contractInstance, account, electionId)
    console.log("result:", result)
  }

  async function stop_voting() {
    console.log("name:", candidateName)
    let result = await stopVoting(contractInstance, account, electionId)
    console.log("result:", result)
  }

  async function get_Winner() {
    console.log("name:", candidateName)
    let { message } = await getWinner(contractInstance, account, electionId)
    console.log("result:", message)
    setWinnerAddress(message.name)
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Online Election Admin Panel</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Create Election</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="electionName">Election Name</Label>
                <Input id="electionName" value={electionName} onChange={(e) => setElectionName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="electionName">Election Details</Label>
                <Input id="electionName" value={electionDetails} onChange={(e) => setElectionDetails(e.target.value)} />
              </div>
              <Button onClick={create_election}>Create Election</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Election Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button onClick={election_count}>Get Election Count</Button>
              <p>Election Count: {electionCount}</p>
              <Button onClick={get_elections}>Get Elections</Button>
              <ScrollArea className="h-[100px]">
                <ul>
                  {electionsList.map((election, index) => (
                    <li key={index}>{election}</li>
                  ))}
                </ul>
              </ScrollArea>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Register Candidate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="candidateElectionId">Election ID</Label>
                <Input id="candidateElectionId" value={electionId} onChange={(e) => setElectionId(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="candidateName">Candidate Name</Label>
                <Input id="candidateName" value={candidateName} onChange={(e) => setCandidateName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="candidateAge">Candidate Age</Label>
                <Input id="candidateAge" value={candidateAge} onChange={(e) => setCandidateAge(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="candidateAddress">Candidate Address</Label>
                <Input id="candidateAddress" value={candidateAddress} onChange={(e) => setCandidateAddress(e.target.value)} />
              </div>
              <Button onClick={register_candidate}>Register Candidate</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Candidate Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="candidateListElectionId">Election ID</Label>
                <Input id="candidateListElectionId" value={electionId} onChange={(e) => setElectionId(e.target.value)} />
              </div>
              <Button onClick={get_all_candidate}>Get All Candidates</Button>
              <ScrollArea className="h-[100px]">
                <ul>
                  {allCandidates.map((candidate, index) => (
                    <li key={index}>{candidate}</li>
                  ))}
                </ul>
              </ScrollArea>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Register Voter</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="voterElectionId">Election ID</Label>
                <Input id="voterElectionId" value={electionId} onChange={(e) => setElectionId(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="voterAddress">Voter Address</Label>
                <Input id="voterAddress" value={voterAddress} onChange={(e) => setVoterAddress(e.target.value)} />
              </div>
              <Button onClick={register_voter}>Register Voter</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Voting Control</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="votingControlElectionId">Election ID</Label>
                <Input id="votingControlElectionId" value={electionId} onChange={(e) => setElectionId(e.target.value)} />
              </div>
              <div className="flex space-x-4">
                <Button onClick={start_voting}>Start Voting</Button>
                <Button onClick={stop_voting} variant="destructive">Stop Voting</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Get Winner</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="winnerElectionId">Election ID</Label>
                <Input id="winnerElectionId" value={electionId} onChange={(e) => setElectionId(e.target.value)} />
              </div>
              <Button onClick={get_Winner}>Get Winner</Button>
              <p>Winner Address: {winnerAddress}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

