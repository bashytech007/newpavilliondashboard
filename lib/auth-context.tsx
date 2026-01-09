"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface User {
  id: string
  name: string
  email: string
  role: string
  avatar?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string) => Promise<void>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check local storage for persisted session
    const storedUser = localStorage.getItem("lawpavillion_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string) => {
    setIsLoading(true)
    // Mock login delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    const mockUser: User = {
      id: "1",
      name: "Chukwudi Lawal",
      email: email,
      role: "Senior Associate",
      avatar: "/placeholder-user.jpg", // We'll handle image later
    }

    setUser(mockUser)
    localStorage.setItem("lawpavillion_user", JSON.stringify(mockUser))
    setIsLoading(false)
    router.push("/")
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("lawpavillion_user")
    router.push("/login")
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
