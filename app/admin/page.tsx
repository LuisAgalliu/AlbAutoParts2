"use client"

import { AdminGuard } from "@/components/admin-guard"
import { AdminPartsManager } from "@/components/admin-parts-manager"
import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LogOut, Settings, Package, Users, BarChart3, Home, Loader2 } from "lucide-react"
import { useState, useEffect } from "react"
import { PartsStorage } from "@/lib/parts-storage"
import Link from "next/link"

function AdminDashboard() {
  const { user, logout } = useAuth()
  const [stats, setStats] = useState({
    totalParts: 0,
    inStock: 0,
    outOfStock: 0,
    categories: 0,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadStats = async () => {
      try {
        console.log("[v0] Loading admin dashboard stats...")
        setLoading(true)
        setError(null)

        const parts = await PartsStorage.getAllParts()
        const categories = await PartsStorage.getCategories()

        console.log("[v0] Loaded parts:", parts.length)
        console.log("[v0] Loaded categories:", categories.length)

        setStats({
          totalParts: parts.length,
          inStock: parts.filter((p) => p.inStock).length,
          outOfStock: parts.filter((p) => !p.inStock).length,
          categories: categories.length,
        })
      } catch (err) {
        console.error("[v0] Error loading admin stats:", err)
        setError("Gabim në ngarkimin e të dhënave")
        setStats({
          totalParts: 0,
          inStock: 0,
          outOfStock: 0,
          categories: 0,
        })
      } finally {
        setLoading(false)
      }
    }

    loadStats()
  }, [])

  const handleLogout = () => {
    logout()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Duke ngarkuar admin panel...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
            <p className="text-gray-600 mt-1">Mirë se erdhe, {user?.username}</p>
            {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
          </div>
          <div className="flex items-center gap-4">
            <Button asChild variant="outline" className="bg-transparent">
              <Link href="/" className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                Kryefaqja
              </Link>
            </Button>
            <Badge variant="secondary" className="px-3 py-1">
              I kyçur: {new Date(user?.loginTime || "").toLocaleString("sq-AL")}
            </Badge>
            <Button onClick={handleLogout} variant="outline" className="flex items-center gap-2 bg-transparent">
              <LogOut className="h-4 w-4" />
              Dil
            </Button>
          </div>
        </div>

        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:w-auto lg:grid-cols-2">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="parts">Menaxho Pjesët</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {/* Dashboard Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Pjesë totale</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.totalParts}</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Package className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Në stock</p>
                      <p className="text-2xl font-bold text-green-600">{stats.inStock}</p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <BarChart3 className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Jo në stock</p>
                      <p className="text-2xl font-bold text-red-600">{stats.outOfStock}</p>
                    </div>
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                      <BarChart3 className="h-6 w-6 text-red-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Kategori</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.categories}</p>
                    </div>
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <Users className="h-6 w-6 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    Menaxhimi i Pjesëve
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600">Menaxhoni pjesët e makinave, shtoni të reja ose editoni ekzistueset.</p>
                  <Button className="w-full" onClick={() => document.querySelector('[value="parts"]')?.click()}>
                    <Package className="h-4 w-4 mr-2" />
                    Menaxho Pjesët
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Cilësimet
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600">Konfiguroni cilësimet e sistemit dhe ndryshoni fjalëkalimin.</p>
                  <Button variant="outline" className="w-full bg-transparent" disabled>
                    <Settings className="h-4 w-4 mr-2" />
                    Cilësimet (Së shpejti)
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* System Info */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Informacione Sistemi</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="font-semibold text-gray-700">Versioni</p>
                    <p className="text-gray-600">AlbAutoParts v1.0</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-700">Sesioni</p>
                    <p className="text-gray-600">Aktiv</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-700">Ruajtja</p>
                    <p className="text-gray-600">Server API</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="parts">
            <AdminPartsManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default function AdminPage() {
  return (
    <AdminGuard>
      <AdminDashboard />
    </AdminGuard>
  )
}
