import { Election, Candidate } from './types'

export const elections: Election[] = [
  { id: 1, name: "Presidential Election 2024", status: "ongoing", description: "National election to choose the next president", endDate: "2024-11-03" },
  { id: 2, name: "Senate Election 2024", status: "upcoming", description: "Election for Senate seats", endDate: "2024-11-03" },
  { id: 3, name: "Local Council Election 2024", status: "upcoming", description: "Election for local council members", endDate: "2024-10-15" },
  { id: 4, name: "Gubernatorial Election 2024", status: "ongoing", description: "Election for state governors", endDate: "2024-11-03" },
  { id: 5, name: "Mayoral Election 2024", status: "upcoming", description: "Election for city mayors", endDate: "2024-09-20" },
  { id: 6, name: "Referendum on Climate Policy", status: "ongoing", description: "Public vote on new climate change policies", endDate: "2024-08-01" },
]

export const candidates: Candidate[] = [
  { id: 1, name: "John Doe", party: "Democratic Party", electionId: 1, bio: "Experienced senator with a focus on healthcare reform" },
  { id: 2, name: "Jane Smith", party: "Republican Party", electionId: 1, bio: "Former governor with a strong economic policy" },
  { id: 3, name: "Bob Johnson", party: "Independent", electionId: 1, bio: "Businessman advocating for political reform" },
  { id: 4, name: "Alice Williams", party: "Green Party", electionId: 1, bio: "Environmental scientist pushing for climate action" },
]

export const countries = [
  "United States", "Canada", "United Kingdom", "Australia", "Germany", "France", "Japan", "Brazil", "India", "South Africa"
]

