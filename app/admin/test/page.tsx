"use client"

import { useState, useEffect } from "react"
import { PartsStorage, type Part } from "@/lib/parts-storage"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RefreshCw, Database, Smartphone, Laptop, CheckCircle, XCircle } from "lucide-react"

export default function AdminTestPage() {
  const [parts, setParts] = useState<Part[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [lastUpdate, setLastUpdate] = useState<string>("")
  const [testResults, setTestResults] = useState<{
    apiConnection: boolean
    dataSync: boolean
    lastTest: string
  }>({
    apiConnection: false,
    dataSync: false,
    lastTest: "",
  })

  useEffect(() => {
    loadParts()
    runConnectivityTest()
  }, [])

  const loadParts = async () => {
    try {
      setIsLoading(true)
      const allParts = await PartsStorage.getAllParts()
      setParts(allParts)
      setLastUpdate(new Date().toLocaleString("sq-AL"))
    } catch (error) {
      console.error("Error loading parts:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const runConnectivityTest = async () => {
    try {
      // Test API connection
      const response = await fetch("/api/parts")
      const apiWorking = response.ok

      // Test data consistency
      const parts = await PartsStorage.getAllParts()
      const dataWorking = Array.isArray(parts)

      setTestResults({
        apiConnection: apiWorking,
        dataSync: dataWorking,
        lastTest: new Date().toLocaleString("sq-AL"),
      })
    } catch (error) {
      console.error("Connectivity test failed:", error)
      setTestResults({
        apiConnection: false,
        dataSync: false,
        lastTest: new Date().toLocaleString("sq-AL"),
      })
    }
  }

  const addTestPart = async () => {
    const testPart = {
      name: `Test Pjesë ${Date.now()}`,
      description: "Kjo është një pjesë teste për të verifikuar sinkronizimin ndërmjet pajisjeve.",
      price: Math.floor(Math.random() * 10000) + 1000,
      category: "Të tjera",
      brand: "Test",
      inStock: true,
      image: "/generic-auto-part.png",
    }

    try {
      const result = await PartsStorage.addPart(testPart)
      if (result) {
        await loadParts()
        alert("Pjesa teste u shtua me sukses! Kontrolloni në pajisje të tjera.")
      }
    } catch (error) {
      console.error("Error adding test part:", error)
      alert("Gabim në shtimin e pjesës teste.")
    }
  }

  const deleteTestParts = async () => {
    try {
      const testParts = parts.filter((part) => part.name.startsWith("Test Pjesë"))

      for (const part of testParts) {
        await PartsStorage.deletePart(part.id)
      }

      await loadParts()
      alert(`U fshinë ${testParts.length} pjesë teste.`)
    } catch (error) {
      console.error("Error deleting test parts:", error)
      alert("Gabim në fshirjen e pjesëve teste.")
    }
  }

  const testParts = parts.filter((part) => part.name.startsWith("Test Pjesë"))

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Test Sinkronizimi Ndërmjet Pajisjeve</h1>
        <p className="text-gray-600">
          Kjo faqe ju ndihmon të testoni nëse të dhënat sinkronizohen saktë ndërmjet pajisjeve të ndryshme.
        </p>
      </div>

      {/* System Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Statusi i Sistemit
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Lidhja me API</span>
              {testResults.apiConnection ? (
                <Badge className="bg-green-100 text-green-800">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Aktiv
                </Badge>
              ) : (
                <Badge variant="destructive">
                  <XCircle className="h-3 w-3 mr-1" />
                  Joaktiv
                </Badge>
              )}
            </div>
            <div className="flex items-center justify-between">
              <span>Sinkronizimi i të dhënave</span>
              {testResults.dataSync ? (
                <Badge className="bg-green-100 text-green-800">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Funksional
                </Badge>
              ) : (
                <Badge variant="destructive">
                  <XCircle className="h-3 w-3 mr-1" />
                  Problem
                </Badge>
              )}
            </div>
            <div className="text-sm text-gray-500">Testi i fundit: {testResults.lastTest}</div>
            <Button onClick={runConnectivityTest} variant="outline" className="w-full bg-transparent">
              <RefreshCw className="h-4 w-4 mr-2" />
              Testo Përsëri
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <RefreshCw className="h-5 w-5" />
              Të dhënat Aktuale
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Totali i pjesëve</span>
              <Badge variant="outline">{parts.length}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Pjesë teste</span>
              <Badge variant="outline">{testParts.length}</Badge>
            </div>
            <div className="text-sm text-gray-500">Përditësuar: {lastUpdate}</div>
            <Button onClick={loadParts} disabled={isLoading} variant="outline" className="w-full bg-transparent">
              {isLoading ? <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> : <RefreshCw className="h-4 w-4 mr-2" />}
              Rifresko të Dhënat
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Test Actions */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Veprime Testimi</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button onClick={addTestPart} className="bg-blue-600 hover:bg-blue-700">
              Shto Pjesë Teste
            </Button>
            <Button onClick={deleteTestParts} variant="destructive" disabled={testParts.length === 0}>
              Fshij Pjesët Teste ({testParts.length})
            </Button>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">Si të testoni sinkronizimin:</h4>
            <ol className="list-decimal list-inside space-y-1 text-blue-800 text-sm">
              <li>Shtoni një pjesë teste nga kjo faqe</li>
              <li>Hapni website-in në një pajisje tjetër (telefon, tablet, kompjuter tjetër)</li>
              <li>Shkoni te faqja "Pjesët" dhe kontrolloni nëse pjesa e re shfaqet</li>
              <li>Nëse shfaqet, sinkronizimi punon saktë!</li>
            </ol>
          </div>
        </CardContent>
      </Card>

      {/* Device Instructions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Laptop className="h-5 w-5" />
              Test në Kompjuter
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Për të testuar në kompjuter, hapni website-in në browser të ndryshëm ose në dritare inkognito.
            </p>
            <div className="bg-gray-50 p-3 rounded text-xs font-mono">
              {typeof window !== "undefined" ? window.location.origin : "https://your-site.com"}/parts
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Smartphone className="h-5 w-5" />
              Test në Telefon
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Për të testuar në telefon, hapni website-in në browser të telefonit tuaj.
            </p>
            <div className="bg-gray-50 p-3 rounded text-xs font-mono break-all">
              {typeof window !== "undefined" ? window.location.origin : "https://your-site.com"}/parts
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Test Parts List */}
      {testParts.length > 0 && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Pjesët Teste Aktuale</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {testParts.map((part) => (
                <div key={part.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <div>
                    <span className="font-medium">{part.name}</span>
                    <span className="text-sm text-gray-500 ml-2">{part.price.toLocaleString()} ALL</span>
                  </div>
                  <Badge variant="outline">{part.brand}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
