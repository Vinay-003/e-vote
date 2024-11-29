import { Button } from "@/components/ui/button"
import { FcGoogle } from "react-icons/fc"
import { FaFacebook, FaApple } from "react-icons/fa"
import Loader from "@/components/ui/loader";

import { useRouter } from "next/navigation"
import { AuthSignIn } from "../oauth/auth_signin"
import { useState } from "react"

export function SocialLoginButtons() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleSocialLogin = async (provider: string) => {
    if (provider === 'Google') {
      setIsLoading(true)
      const { error, url } = await AuthSignIn();
      if (error) {
        alert(error)
      } else {
        if (url) {
          router.push(url)
        } else {
          alert('Failed to get the URL for redirection')
        }
      }
      setIsLoading(false)
    } else { alert(`${provider} is not yet implemented try google`) }
  }

  return (
    <div className="space-y-3">
      <Button 
        variant="outline" 
        className="w-full" 
        onClick={() => handleSocialLogin('Google')}
      >
        {isLoading ? 
        <>'Signing in...'
        <i className="flex text-white ">
          <Loader />
        </i></>: 
        (<><FcGoogle className="mr-2 h-5 w-5" /> Continue with Google</>)}
      </Button>
      <Button 
        variant="outline" 
        className="w-full" 
        onClick={() => handleSocialLogin('Facebook')}
      >
        <FaFacebook className="mr-2 h-5 w-5 text-blue-600" />
        Continue with Facebook
      </Button>
      <Button 
        variant="outline" 
        className="w-full" 
        onClick={() => handleSocialLogin('Apple')}
      >
        <FaApple className="mr-2 h-5 w-5" />
        Continue with Apple
      </Button>
    </div>
  )
}
