export interface Election {
  id: number
  name: string
  status: 'ongoing' | 'upcoming'
  description: string
  endDate: string
}

export interface Candidate {
  id: number
  name: string
  party: string
  electionId: number
  bio: string
}

