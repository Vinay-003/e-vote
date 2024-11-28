'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Home, User, Bell, LogOut, Menu } from 'lucide-react'

import axios from 'axios'

export default function Header() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  const Logout = async () => {
    console.log('Logging out')
    try {
      await axios.get('/api/auth/v1/logout')
      router.push('/login')
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const res = await axios.get('/api/isUserAdmin');
        console.log(res);
        if (res.data.isAdmin) {
          setIsAdmin(true);
        }
      } catch (error) {
        console.error(error);
      }
    };
    checkAdminStatus();
  }, [])

  const NavItems = () => (
    <>
    { isAdmin &&
      (<li>
        <Button variant="ghost" asChild className="w-full justify-start">
          <Link href="/admin" className="flex items-center gap-2">
            {/* <Home size={20} /> */}
            <span>Admin</span>
          </Link>
        </Button>
      </li>)
    }
      <li>
        <Button variant="ghost" asChild className="w-full justify-start">
          <Link href="/voting" className="flex items-center gap-2">
            {/* <Home size={20} /> */}
            <span>Voting</span>
          </Link>
        </Button>
      </li>
      <li>
        <Button variant="ghost" asChild className="w-full justify-start">
          <Link href="/home" className="flex items-center gap-2">
            <Home size={20} />
            <span>Home</span>
          </Link>
        </Button>
      </li>
      <li>
        <Button variant="ghost" asChild className="w-full justify-start">
          <Link href="/profile" className="flex items-center gap-2">
            <User size={20} />
            <span>Profile</span>
          </Link>
        </Button>
      </li>
      <li>
        <Button variant="ghost" asChild className="w-full justify-start">
          <Link href="/notifications" className="flex items-center gap-2">
            <Bell size={20} />
            <span>Notifications</span>
          </Link>
        </Button>
      </li>
      <li>
        <Button variant="ghost" className="w-full justify-start" onClick={Logout}>
          <LogOut size={20} />
          <span>Logout</span>
        </Button>
      </li>
    </>
  )

  return (
    <header className="  shadow-md">
      <nav className="container mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          <Link href="/home" className="text-xl font-bold">E-Voting</Link>
          <ul className="hidden md:flex space-x-4">
            <NavItems />
          </ul>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <ul className="space-y-4 mt-4">
                <NavItems />
              </ul>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  )
}

