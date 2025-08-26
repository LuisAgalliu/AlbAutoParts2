"use client"

import { useState, useEffect, useMemo } from "react"
import { PartsStorage, type Part } from "@/lib/parts-storage"
import { PartCard } from "@/components/part-card"
import { PartsFilter } from "@/components/parts-filter"
import { Button } from "@/components/ui/button"
import { ArrowUp, Loader2 } from "lucide-react"

export default function PartsPage() {
  const [parts, setParts] = useState<Part[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    stockStatus: "",
  })
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    loadPartsAndCategories()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const loadPartsAndCategories = async () => {
    try {
      setIsLoading(true)
      setError(null)

      const [partsData, categoriesData] = await Promise.all([PartsStorage.getAllParts(), PartsStorage.getCategories()])

      setParts(partsData)
      setCategories(categoriesData)
    } catch (err) {
      console.error("Error loading parts:", err)
      setError("Gabim në ngarkimin e pjesëve. Ju lutem rifreskoni faqen.")
    } finally {
      setIsLoading(false)
    }
  }

  const filteredParts = useMemo(() => {
    return parts.filter((part) => {
      const matchesSearch =
        !filters.search ||
        part.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        part.description.toLowerCase().includes(filters.search.toLowerCase())

      const matchesCategory = !filters.category || part.category === filters.category

      const matchesStock =
        !filters.stockStatus ||
        (filters.stockStatus === "inStock" && part.inStock) ||
        (filters.stockStatus === "outOfStock" && !part.inStock)

      return matchesSearch && matchesCategory && matchesStock
    })
  }, [parts, filters])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Duke ngarkuar pjesët...</h2>
          <p className="text-gray-600">Ju lutem prisni një moment</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Gabim në ngarkim</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Button onClick={loadPartsAndCategories} className="bg-blue-600 hover:bg-blue-700">
            Provo Përsëri
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Pjesët <span className="text-blue-600">tona</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Eksploroni katalogun tonë të gjerë të pjesëve të makinave me cilësi të lartë
          </p>
        </div>

        {/* Filter */}
        <PartsFilter categories={categories} onFilterChange={setFilters} />

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Gjetur <span className="font-semibold text-blue-600">{filteredParts.length}</span> pjesë
            {filters.search && ` për "${filters.search}"`}
          </p>
        </div>

        {/* Parts Grid */}
        {filteredParts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {filteredParts.map((part) => (
              <PartCard key={part.id} part={part} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-semibold mb-2 text-gray-900">Nuk u gjetën pjesë</h3>
            <p className="text-gray-600 mb-6">Provoni të ndryshoni kriteret e kërkimit</p>
            <Button onClick={() => setFilters({ search: "", category: "", stockStatus: "" })}>Pastro Filtrat</Button>
          </div>
        )}

        {/* Scroll to Top Button */}
        {showScrollTop && (
          <Button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 rounded-full w-12 h-12 shadow-lg z-50"
            size="icon"
          >
            <ArrowUp className="h-5 w-5" />
          </Button>
        )}
      </div>
    </div>
  )
}
