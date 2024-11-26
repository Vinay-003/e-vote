import Link from 'next/link'
import Header from '@/components/header'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { elections } from '../data/mockData'
import { CalendarDays, CheckCircle2, Clock } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-6 py-12">
        {/* Page Title */}
        <h1 className="text-5xl font-extrabold mb-10 text-center text-gray-800">
          Active Elections
        </h1>

        {/* Election Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {elections.map((election) => (
            <Card
              key={election.id}
              className="hover:shadow-xl transition-shadow duration-300 rounded-lg bg-white"
            >
              {/* Card Header */}
              <CardHeader>
                <CardTitle className="text-3xl font-semibold text-gray-800 mb-4">
                  {election.name}
                </CardTitle>
              </CardHeader>

              {/* Card Content */}
              <CardContent>
                <p className="text-lg text-gray-600 mb-6">{election.description}</p>

                {/* Election Status */}
                <div className="flex items-center gap-3 mb-3">
                  {election.status === 'ongoing' ? (
                    <CheckCircle2 className="text-green-600" size={24} />
                  ) : (
                    <Clock className="text-yellow-600" size={24} />
                  )}
                  <span className="capitalize font-bold text-lg text-gray-700">
                    {election.status}
                  </span>
                </div>

                {/* End Date */}
                <div className="flex items-center gap-3 mb-6 text-lg text-gray-700">
                  <CalendarDays size={24} />
                  <span>Ends on {election.endDate}</span>
                </div>

                {/* View Details Button */}
                <Button
                  asChild
                  className="w-full py-3 text-lg font-medium bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  <Link href={`/election/${election.id}`}>View Details</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
