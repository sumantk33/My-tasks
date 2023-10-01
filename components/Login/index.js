import React, { useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function LoginWrapper() {
  const [email, setEmail] = useState('')
  // const [password, setPassword] = useState('')
  // const router = useRouter()
  const { login, logout } = useAuth();

  const handleSignIn = () => {
    login('sumantk33@gmail.com', '29051999')
  }


  return (
    <div>
      <button onClick={handleSignIn}>
        Login
      </button>
      <button onClick={logout}>
        Logout
      </button>
    </div>
  )
}
