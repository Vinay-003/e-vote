'use client'

import { useState } from 'react'
import Header from '@/components/header'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Bell, CheckCircle } from 'lucide-react'

const mockNotifications = [
  { id: 1, message: "New election: Presidential Election 2024", read: false, date: "2023-06-15" },
  { id: 2, message: "Your candidate registration was successful", read: true, date: "2023-06-14" },
  { id: 3, message: "Reminder: Voting closes in 24 hours", read: false, date: "2023-06-13" },
  { id: 4, message: "New poll added: Climate Change Policy", read: false, date: "2023-06-12" },
  { id: 5, message: "Election results are now available", read: true, date: "2023-06-11" },
]

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications)

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })))
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Notifications</h1>
          <Button onClick={markAllAsRead} size="lg" variant="outline" className="text-gray-700">Mark All as Read</Button>
        </div>
        <div className="space-y-4">
          {notifications.map((notification) => (
            <Card key={notification.id} className={`transition-shadow duration-300 ${notification.read ? 'bg-gray-50' : 'bg-white shadow-lg'}`}>
              <CardHeader className="flex flex-row items-center gap-4">
                <div className={`p-2 rounded-full ${notification.read ? 'bg-gray-200' : 'bg-blue-100'}`}>
                  <Bell size={24} className={notification.read ? 'text-gray-500' : 'text-blue-500'} />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-lg font-semibold">
                    {notification.message}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">{notification.date}</p>
                </div>
              </CardHeader>
              <CardContent>
                {!notification.read && (
                  <Button 
                    onClick={() => markAsRead(notification.id)} 
                    variant="outline" 
                    className="w-full sm:w-auto text-blue-600 border-blue-600 hover:bg-blue-50"
                  >
                    <CheckCircle className="mr-2 h-4 w-4" /> Mark as Read
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
