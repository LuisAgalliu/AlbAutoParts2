export class SyncTestUtils {
  static async verifyApiConnection(): Promise<boolean> {
    try {
      const response = await fetch("/api/parts", { method: "GET" })
      return response.ok
    } catch (error) {
      console.error("API connection test failed:", error)
      return false
    }
  }

  static async verifyDataConsistency(): Promise<{
    success: boolean
    partsCount: number
    lastModified?: string
  }> {
    try {
      const response = await fetch("/api/parts")
      if (!response.ok) {
        return { success: false, partsCount: 0 }
      }

      const parts = await response.json()
      return {
        success: true,
        partsCount: Array.isArray(parts) ? parts.length : 0,
        lastModified: new Date().toISOString(),
      }
    } catch (error) {
      console.error("Data consistency test failed:", error)
      return { success: false, partsCount: 0 }
    }
  }

  static generateTestPart() {
    const timestamp = Date.now()
    return {
      name: `Test Sync ${timestamp}`,
      description: `Test part created at ${new Date().toLocaleString("sq-AL")} for cross-device sync verification.`,
      price: Math.floor(Math.random() * 5000) + 1000,
      category: "Të tjera",
      brand: "Test",
      inStock: true,
      image: "/generic-auto-part.png",
    }
  }

  static async runFullSyncTest(): Promise<{
    apiConnection: boolean
    dataSync: boolean
    addTest: boolean
    deleteTest: boolean
    timestamp: string
  }> {
    const timestamp = new Date().toISOString()

    try {
      // Test API connection
      const apiConnection = await this.verifyApiConnection()

      // Test data sync
      const dataResult = await this.verifyDataConsistency()
      const dataSync = dataResult.success

      // Test add operation
      const testPart = this.generateTestPart()
      const addResponse = await fetch("/api/parts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(testPart),
      })
      const addTest = addResponse.ok

      // Test delete operation (clean up)
      let deleteTest = false
      if (addTest) {
        const addedPart = await addResponse.json()
        const deleteResponse = await fetch(`/api/parts/${addedPart.id}`, {
          method: "DELETE",
        })
        deleteTest = deleteResponse.ok
      }

      return {
        apiConnection,
        dataSync,
        addTest,
        deleteTest,
        timestamp,
      }
    } catch (error) {
      console.error("Full sync test failed:", error)
      return {
        apiConnection: false,
        dataSync: false,
        addTest: false,
        deleteTest: false,
        timestamp,
      }
    }
  }
}
