"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Lock, User, Eye, EyeOff } from "lucide-react"

interface AdminLoginProps {
  onLogin: (username: string, password: string) => boolean
}

export function AdminLogin({ onLogin }: AdminLoginProps) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const success = onLogin(username, password)
      if (!success) {
        setError("Emri i përdoruesit ose fjalëkalimi është i gabuar")
      }
    } catch (err) {
      setError("Ka ndodhur një gabim gjatë hyrjes")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center p-4 sm:p-6 md:p-8">
      <Card className="w-full max-w-sm sm:max-w-md lg:max-w-lg shadow-2xl border-0">
        <CardHeader className="text-center pb-6 sm:pb-8 px-6 sm:px-8">
          <div className="w-24 h-24 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="h-12 w-12 sm:h-10 sm:w-10 text-white" />
          </div>
          <CardTitle className="text-3xl sm:text-2xl font-bold text-gray-900">Admin Panel</CardTitle>
          <p className="text-gray-600 mt-3 text-lg sm:text-base">Hyni për të menaxhuar AlbAutoParts</p>
        </CardHeader>

        <CardContent className="px-6 sm:px-8 pb-8">
          <form onSubmit={handleSubmit} className="space-y-8 sm:space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertDescription className="text-base">{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-3 sm:space-y-2">
              <label htmlFor="username" className="text-base sm:text-sm font-medium text-gray-700">
                Emri i përdoruesit
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 sm:h-5 sm:w-5 text-gray-400" />
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Shkruani emrin e përdoruesit"
                  className="pl-12 sm:pl-10 h-14 sm:h-12 text-lg sm:text-base"
                  required
                />
              </div>
            </div>

            <div className="space-y-3 sm:space-y-2">
              <label htmlFor="password" className="text-base sm:text-sm font-medium text-gray-700">
                Fjalëkalimi
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 sm:h-5 sm:w-5 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Shkruani fjalëkalimin"
                  className="pl-12 sm:pl-10 pr-12 sm:pr-10 h-14 sm:h-12 text-lg sm:text-base"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
                >
                  {showPassword ? (
                    <EyeOff className="h-6 w-6 sm:h-5 sm:w-5" />
                  ) : (
                    <Eye className="h-6 w-6 sm:h-5 sm:w-5" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-14 sm:h-12 text-xl sm:text-lg bg-blue-600 hover:bg-blue-700 font-semibold"
              disabled={loading}
            >
              {loading ? "Duke u kyçur..." : "Kyçu"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
