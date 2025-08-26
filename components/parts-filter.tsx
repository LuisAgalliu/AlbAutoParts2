"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, X } from "lucide-react"

interface PartsFilterProps {
  categories: string[]
  onFilterChange: (filters: {
    search: string
    category: string
    stockStatus: string
  }) => void
}

export function PartsFilter({ categories, onFilterChange }: PartsFilterProps) {
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("all")
  const [stockStatus, setStockStatus] = useState("all")

  const handleFilterChange = () => {
    onFilterChange({ search, category, stockStatus })
  }

  const clearFilters = () => {
    setSearch("")
    setCategory("all")
    setStockStatus("all")
    onFilterChange({ search: "", category: "all", stockStatus: "all" })
  }

  const hasActiveFilters = search || category !== "all" || stockStatus !== "all"

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="h-5 w-5 text-gray-600" />
        <h3 className="font-semibold text-lg">Filtro Pjesët</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Kërko pjesë..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger>
            <SelectValue placeholder="Kategoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Të gjitha</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={stockStatus} onValueChange={setStockStatus}>
          <SelectTrigger>
            <SelectValue placeholder="Disponueshmëria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Të gjitha</SelectItem>
            <SelectItem value="inStock">Në stock</SelectItem>
            <SelectItem value="outOfStock">Jo në stock</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex gap-2">
          <Button onClick={handleFilterChange} className="flex-1">
            Filtro
          </Button>
          {hasActiveFilters && (
            <Button onClick={clearFilters} variant="outline" size="icon">
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {search && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Kërkim: {search}
              <X className="h-3 w-3 cursor-pointer" onClick={() => setSearch("")} />
            </Badge>
          )}
          {category !== "all" && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Kategoria: {category}
              <X className="h-3 w-3 cursor-pointer" onClick={() => setCategory("all")} />
            </Badge>
          )}
          {stockStatus !== "all" && (
            <Badge variant="secondary" className="flex items-center gap-1">
              {stockStatus === "inStock" ? "Në stock" : "Jo në stock"}
              <X className="h-3 w-3 cursor-pointer" onClick={() => setStockStatus("all")} />
            </Badge>
          )}
        </div>
      )}
    </div>
  )
}
