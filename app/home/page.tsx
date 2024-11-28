'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Header from '@/components/header'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
// import { elections } from '../data/mockData'
import { CalendarDays, CheckCircle2, Clock } from 'lucide-react'

import { Tables } from "@/database.types";
import axios from 'axios'

export default function HomePage() {
  const [elections, setElections] = useState<Tables<"elections">[]>([]);
  
  useEffect(() => {
    async function fetchEvents() {
      try {
        const { data } = await axios.get('/api/rest/v1/get/elections/');
        setElections(data);

      } catch (error) {
        console.error("Error fetching events:", error);
      }
    }

    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-bacground to-background/50 text-foreground">
      <Header />
      <main className="container mx-auto px-6 py-12">
        {/* Page Title */}
        <h1 className="text-5xl font-extrabold mb-10 text-center ">
          Active Elections
        </h1>

        {/* Election Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {elections.map((election) => (
            <Card
              key={election.election_id}
              className="hover:shadow-xl transition-shadow duration-300 !rounded-[10px] bg-background !text-foreground/80"
            >
              <CardHeader>
                <CardTitle className="text-3xl font-semibold text-secondary-foreground/90 mb-4">
                  {election.election_name}
                </CardTitle>
              </CardHeader>

              {/* Card Content */}
              <CardContent>
                <p className="text-lg text-muted-foreground mb-6">{election.election_details}</p>

                {/* Election Status */}
                <div className="flex items-center gap-3 mb-3">
                  {election.voting_in_progress ? (
                    <CheckCircle2 className="text-green-600" size={24} />
                  ) : (
                    <Clock className="text-yellow-600" size={24} />
                  )}
                  <span className="capitalize font-bold text-lg text-foreground/70">
                    {election.voting_in_progress ? "ongoing" : "upcoming"}
                  </span>
                </div>

                {/* End Date */}
                <div className="flex items-center gap-3 mb-6 text-lg text-foreground/40">
                  <CalendarDays size={24} />
                  <span>Ends on {election.end_at}</span>
                </div>

                {/* View Details Button */}
                <Button
                  asChild
                  className="w-full py-3 text-lg font-medium bg-primary/80 text-white rounded-md hover:bg-primary/70 transition-colors"
                >
                  <Link href={`/election/${election.election_id}`}>View Details</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
