"use client"

import { useState, useEffect } from "react"
import { AuthService, type AdminUser } from "@/lib/auth"

export function useAuth() {
  const [user, setUser] = useState<AdminUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser()
    setUser(currentUser)
    setLoading(false)
  }, [])

  const login = (username: string, password: string): boolean => {
    const success = AuthService.login(username, password)
    if (success) {
      const currentUser = AuthService.getCurrentUser()
      setUser(currentUser)
    }
    return success
  }

  const logout = () => {
    AuthService.logout()
    setUser(null)
  }

  return {
    user,
    loading,
    isAuthenticated: user?.isAuthenticated ?? false,
    login,
    logout,
  }
}
