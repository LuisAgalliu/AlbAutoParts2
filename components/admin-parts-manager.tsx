"use client"

import { useState, useEffect } from "react"
import { PartsStorage, type Part } from "@/lib/parts-storage"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Plus, Edit, Trash2, Package, Search, Filter, Loader2 } from "lucide-react"
import Image from "next/image"
import { useToast } from "@/hooks/use-toast"

interface PartFormData {
  name: string
  description: string
  price: string
  category: string
  brand: string
  inStock: boolean
  image: string
}

export function AdminPartsManager() {
  const [parts, setParts] = useState<Part[]>([])
  const [filteredParts, setFilteredParts] = useState<Part[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [stockFilter, setStockFilter] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingPart, setEditingPart] = useState<Part | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()
  const [formData, setFormData] = useState<PartFormData>({
    name: "",
    description: "",
    price: "",
    category: "",
    brand: "",
    inStock: true,
    image: "",
  })

  const categories = [
    "Filtra",
    "Frena",
    "Pezullim",
    "Elektrike",
    "Goma",
    "Ftohje",
    "Motor",
    "Transmision",
    "Karroceri",
    "Të tjera",
  ]

  const brands = [
    "BMW",
    "Mercedes",
    "Audi",
    "Volkswagen",
    "Ford",
    "Opel",
    "Peugeot",
    "Renault",
    "Fiat",
    "Toyota",
    "Hyundai",
    "Skoda",
    "Seat",
    "Nissan",
    "Mazda",
    "Honda",
    "Kia",
    "Volvo",
    "Citroen",
    "Dacia",
    "Të tjera",
  ]

  useEffect(() => {
    loadParts()
  }, [])

  useEffect(() => {
    filterParts()
  }, [parts, searchTerm, categoryFilter, stockFilter])

  const loadParts = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const allParts = await PartsStorage.getAllParts()
      setParts(allParts)
    } catch (error) {
      console.error("Error loading parts:", error)
      setError("Gabim në ngarkimin e pjesëve. Ju lutem rifreskoni faqen.")
      toast({
        title: "Gabim",
        description: "Nuk mund të ngarkohen pjesët. Ju lutem provoni përsëri.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const filterParts = () => {
    let filtered = parts

    if (searchTerm) {
      filtered = filtered.filter(
        (part) =>
          part.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          part.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (categoryFilter !== "all") {
      filtered = filtered.filter((part) => part.category === categoryFilter)
    }

    if (stockFilter !== "all") {
      filtered = filtered.filter((part) => (stockFilter === "inStock" ? part.inStock : !part.inStock))
    }

    setFilteredParts(filtered)
  }

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      category: "",
      brand: "",
      inStock: true,
      image: "",
    })
  }

  const handleAddPart = async () => {
    console.log("[v0] Starting handleAddPart with formData:", formData)

    if (!formData.name || !formData.description || !formData.price) {
      console.log("[v0] Form validation failed - missing required fields")
      toast({
        title: "Gabim",
        description: "Ju lutem plotësoni të gjitha fushat e detyrueshme",
        variant: "destructive",
      })
      return
    }

    const price = Number.parseFloat(formData.price)
    if (isNaN(price) || price <= 0) {
      console.log("[v0] Price validation failed:", formData.price, "parsed as:", price)
      toast({
        title: "Gabim",
        description: "Çmimi duhet të jetë një numër pozitiv",
        variant: "destructive",
      })
      return
    }

    try {
      setIsSubmitting(true)
      const newPart = {
        name: formData.name,
        description: formData.description,
        price: price,
        category: formData.category || "Të tjera",
        brand: formData.brand || "Të tjera",
        inStock: formData.inStock,
        image: formData.image || "/generic-auto-part.png",
      }

      console.log("[v0] Calling PartsStorage.addPart with:", newPart)
      const result = await PartsStorage.addPart(newPart)
      console.log("[v0] PartsStorage.addPart result:", result)

      if (result) {
        console.log("[v0] Part added successfully, reloading parts...")
        await loadParts()
        resetForm()
        setIsAddDialogOpen(false)
        toast({
          title: "Sukses",
          description: "Pjesa u shtua me sukses!",
        })
      } else {
        console.log("[v0] PartsStorage.addPart returned false")
        toast({
          title: "Gabim",
          description: "Gabim në shtimin e pjesës. Ju lutem provoni përsëri.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("[v0] Error in handleAddPart:", error)
      toast({
        title: "Gabim",
        description: "Gabim në shtimin e pjesës. Ju lutem provoni përsëri.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEditPart = async () => {
    console.log("[v0] Starting handleEditPart with editingPart:", editingPart, "formData:", formData)

    if (!editingPart || !formData.name || !formData.description || !formData.price) {
      console.log("[v0] Edit validation failed - missing required fields or editingPart")
      toast({
        title: "Gabim",
        description: "Ju lutem plotësoni të gjitha fushat e detyrueshme",
        variant: "destructive",
      })
      return
    }

    const price = Number.parseFloat(formData.price)
    if (isNaN(price) || price <= 0) {
      console.log("[v0] Edit price validation failed:", formData.price, "parsed as:", price)
      toast({
        title: "Gabim",
        description: "Çmimi duhet të jetë një numër pozitiv",
        variant: "destructive",
      })
      return
    }

    try {
      setIsSubmitting(true)
      const updates = {
        name: formData.name,
        description: formData.description,
        price: price,
        category: formData.category || "Të tjera",
        brand: formData.brand || "Të tjera",
        inStock: formData.inStock,
        image: formData.image || editingPart.image,
      }

      console.log("[v0] Calling PartsStorage.updatePart with id:", editingPart.id, "updates:", updates)
      const result = await PartsStorage.updatePart(editingPart.id, updates)
      console.log("[v0] PartsStorage.updatePart result:", result)

      if (result) {
        console.log("[v0] Part updated successfully, reloading parts...")
        await loadParts()
        resetForm()
        setEditingPart(null)
        setIsEditDialogOpen(false)
        toast({
          title: "Sukses",
          description: "Pjesa u përditësua me sukses!",
        })
      } else {
        console.log("[v0] PartsStorage.updatePart returned false")
        toast({
          title: "Gabim",
          description: "Gabim në përditësimin e pjesës. Ju lutem provoni përsëri.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("[v0] Error in handleEditPart:", error)
      toast({
        title: "Gabim",
        description: "Gabim në përditësimin e pjesës. Ju lutem provoni përsëri.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeletePart = async (partId: string) => {
    console.log("[v0] Starting handleDeletePart with partId:", partId)

    try {
      console.log("[v0] Calling PartsStorage.deletePart with id:", partId)
      const success = await PartsStorage.deletePart(partId)
      console.log("[v0] PartsStorage.deletePart result:", success)

      if (success) {
        console.log("[v0] Part deleted successfully, reloading parts...")
        await loadParts()
        toast({
          title: "Sukses",
          description: "Pjesa u fshi me sukses!",
        })
      } else {
        console.log("[v0] PartsStorage.deletePart returned false")
        toast({
          title: "Gabim",
          description: "Gabim në fshirjen e pjesës. Ju lutem provoni përsëri.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("[v0] Error in handleDeletePart:", error)
      toast({
        title: "Gabim",
        description: "Gabim në fshirjen e pjesës. Ju lutem provoni përsëri.",
        variant: "destructive",
      })
    }
  }

  const openEditDialog = (part: Part) => {
    setEditingPart(part)
    setFormData({
      name: part.name,
      description: part.description,
      price: part.price.toString(),
      category: part.category || "",
      brand: part.brand || "",
      inStock: part.inStock,
      image: part.image,
    })
    setIsEditDialogOpen(true)
  }

  const handleInputChange = (field: keyof PartFormData, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const clearFilters = () => {
    setSearchTerm("")
    setCategoryFilter("all")
    setStockFilter("all")
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        <span className="ml-2 text-gray-600">Duke ngarkuar pjesët...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Package className="h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Gabim në ngarkim</h3>
        <p className="text-gray-600 mb-4 text-center">{error}</p>
        <Button onClick={loadParts} variant="outline" className="bg-transparent">
          Provo Përsëri
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Menaxhimi i Pjesëve</h2>
          <p className="text-gray-600">Shtoni, editoni ose fshini pjesët e makinave</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Shto Pjesë të Re
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Shto Pjesë të Re</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Emri i pjesës *</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="p.sh. Filtër Vaji BMW"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Çmimi (ALL) *</label>
                  <Input
                    type="number"
                    value={formData.price}
                    onChange={(e) => handleInputChange("price", e.target.value)}
                    placeholder="p.sh. 2500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Përshkrimi *</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Përshkruani pjesën..."
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Kategoria</label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Zgjidhni kategorinë" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Marka</label>
                  <Select value={formData.brand} onValueChange={(value) => handleInputChange("brand", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Zgjidhni markën" />
                    </SelectTrigger>
                    <SelectContent>
                      {brands.map((brand) => (
                        <SelectItem key={brand} value={brand}>
                          {brand}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Disponueshmëria</label>
                  <Select
                    value={formData.inStock ? "inStock" : "outOfStock"}
                    onValueChange={(value) => handleInputChange("inStock", value === "inStock")}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="inStock">Në stock</SelectItem>
                      <SelectItem value="outOfStock">Jo në stock</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">URL e fotos</label>
                <Input
                  value={formData.image}
                  onChange={(e) => handleInputChange("image", e.target.value)}
                  placeholder="https://example.com/image.jpg (opsionale)"
                />
                <p className="text-xs text-gray-500 mt-1">Nëse nuk vendoset, do të përdoret një foto e paracaktuar</p>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} className="bg-transparent">
                  Anulo
                </Button>
                <Button onClick={handleAddPart} disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-700">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Duke shtuar...
                    </>
                  ) : (
                    "Shto Pjesën"
                  )}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card className="border-0 shadow-md">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="h-4 w-4 text-gray-600" />
            <span className="font-medium text-gray-700">Filtrat</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Kërko pjesë..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Kategoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Të gjitha</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={stockFilter} onValueChange={setStockFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Disponueshmëria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Të gjitha</SelectItem>
                <SelectItem value="inStock">Në stock</SelectItem>
                <SelectItem value="outOfStock">Jo në stock</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={clearFilters} variant="outline" className="bg-transparent">
              Pastro Filtrat
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Parts List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredParts.map((part) => (
          <Card key={part.id} className="border-0 shadow-md hover:shadow-lg transition-shadow">
            <div className="relative aspect-square">
              <Image
                src={part.image || "/placeholder.svg"}
                alt={part.name}
                fill
                className="object-cover rounded-t-lg"
              />
              <div className="absolute top-2 right-2">
                <Badge variant={part.inStock ? "default" : "destructive"}>
                  {part.inStock ? "Në stock" : "Jo në stock"}
                </Badge>
              </div>
            </div>
            <CardContent className="p-4">
              <div className="mb-2 flex gap-2">
                {part.category && (
                  <Badge variant="outline" className="text-xs">
                    {part.category}
                  </Badge>
                )}
                {part.brand && (
                  <Badge variant="secondary" className="text-xs">
                    {part.brand}
                  </Badge>
                )}
              </div>
              <h3 className="font-bold text-lg mb-2 line-clamp-1">{part.name}</h3>
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">{part.description}</p>
              <div className="text-xl font-bold text-blue-600 mb-4">{part.price.toLocaleString()} ALL</div>
              <div className="flex gap-2">
                <Button
                  onClick={() => openEditDialog(part)}
                  variant="outline"
                  size="sm"
                  className="flex-1 bg-transparent"
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Edito
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm" className="flex-1">
                      <Trash2 className="h-4 w-4 mr-1" />
                      Fshij
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Jeni i sigurt?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Kjo veprim do të fshijë përfundimisht pjesën "{part.name}". Ky veprim nuk mund të zhbëhet.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Anulo</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDeletePart(part.id)}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        Fshij
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredParts.length === 0 && (
        <Card className="border-0 shadow-md">
          <CardContent className="text-center py-12">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Nuk u gjetën pjesë</h3>
            <p className="text-gray-600 mb-4">Nuk ka pjesë që përputhen me kriteret e kërkimit.</p>
            <Button onClick={clearFilters} variant="outline" className="bg-transparent">
              Pastro Filtrat
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edito Pjesën</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Emri i pjesës *</label>
                <Input
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="p.sh. Filtër Vaji BMW"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Çmimi (ALL) *</label>
                <Input
                  type="number"
                  value={formData.price}
                  onChange={(e) => handleInputChange("price", e.target.value)}
                  placeholder="p.sh. 2500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Përshkrimi *</label>
              <Textarea
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Përshkruani pjesën..."
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Kategoria</label>
                <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Zgjidhni kategorinë" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Marka</label>
                <Select value={formData.brand} onValueChange={(value) => handleInputChange("brand", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Zgjidhni markën" />
                  </SelectTrigger>
                  <SelectContent>
                    {brands.map((brand) => (
                      <SelectItem key={brand} value={brand}>
                        {brand}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Disponueshmëria</label>
                <Select
                  value={formData.inStock ? "inStock" : "outOfStock"}
                  onValueChange={(value) => handleInputChange("inStock", value === "inStock")}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="inStock">Në stock</SelectItem>
                    <SelectItem value="outOfStock">Jo në stock</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">URL e fotos</label>
              <Input
                value={formData.image}
                onChange={(e) => handleInputChange("image", e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button
                variant="outline"
                onClick={() => {
                  setIsEditDialogOpen(false)
                  setEditingPart(null)
                  resetForm()
                }}
                className="bg-transparent"
              >
                Anulo
              </Button>
              <Button onClick={handleEditPart} disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-700">
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Duke ruajtur...
                  </>
                ) : (
                  "Ruaj Ndryshimet"
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
