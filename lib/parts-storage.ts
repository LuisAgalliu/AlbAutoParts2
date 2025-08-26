export interface Part {
  id: string
  name: string
  description: string
  price: number
  image: string
  inStock: boolean
  category?: string
  brand?: string
  createdAt?: string
}

export class PartsStorage {
  static async getAllParts(): Promise<Part[]> {
    try {
      const response = await fetch("/api/parts")
      if (!response.ok) {
        throw new Error("Failed to fetch parts")
      }
      return await response.json()
    } catch (error) {
      console.error("Error fetching parts:", error)
      return []
    }
  }

  static async addPart(part: Omit<Part, "id" | "createdAt">): Promise<Part | null> {
    try {
      const response = await fetch("/api/parts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...part,
          createdAt: new Date().toISOString(),
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to add part")
      }

      return await response.json()
    } catch (error) {
      console.error("Error adding part:", error)
      return null
    }
  }

  static async updatePart(id: string, updates: Partial<Omit<Part, "id">>): Promise<Part | null> {
    try {
      const response = await fetch(`/api/parts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
      })

      if (!response.ok) {
        throw new Error("Failed to update part")
      }

      return await response.json()
    } catch (error) {
      console.error("Error updating part:", error)
      return null
    }
  }

  static async deletePart(id: string): Promise<boolean> {
    try {
      const response = await fetch(`/api/parts/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete part")
      }

      return true
    } catch (error) {
      console.error("Error deleting part:", error)
      return false
    }
  }

  static async getPartById(id: string): Promise<Part | null> {
    try {
      const parts = await this.getAllParts()
      return parts.find((p) => p.id === id) || null
    } catch (error) {
      console.error("Error getting part by ID:", error)
      return null
    }
  }

  static async getCategories(): Promise<string[]> {
    try {
      const parts = await this.getAllParts()
      const categories = new Set(parts.map((p) => p.category).filter(Boolean))
      return Array.from(categories).sort()
    } catch (error) {
      console.error("Error getting categories:", error)
      return []
    }
  }
}
