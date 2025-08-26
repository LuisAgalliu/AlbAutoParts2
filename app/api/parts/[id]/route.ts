import { type NextRequest, NextResponse } from "next/server"
import { getGlobalPartsData, setGlobalPartsData } from "@/lib/global-parts-storage"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    console.log("[v0] PUT /api/parts/[id] - Updating part with ID:", params.id)
    const updatedPart = await request.json()
    console.log("[v0] PUT /api/parts/[id] - Update data:", updatedPart)

    const partsData = getGlobalPartsData()
    const { id } = params

    const partIndex = partsData.findIndex((part) => part.id === id)
    if (partIndex === -1) {
      console.log("[v0] PUT /api/parts/[id] - Part not found with ID:", id)
      return NextResponse.json({ error: "Part not found" }, { status: 404 })
    }

    partsData[partIndex] = { ...partsData[partIndex], ...updatedPart, id }
    setGlobalPartsData(partsData)

    console.log("[v0] PUT /api/parts/[id] - Part updated successfully")
    return NextResponse.json(partsData[partIndex])
  } catch (error) {
    console.error("[v0] Error updating part:", error)
    return NextResponse.json({ error: "Failed to update part" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    console.log("[v0] DELETE /api/parts/[id] - Deleting part with ID:", params.id)
    const partsData = getGlobalPartsData()
    const { id } = params

    const originalLength = partsData.length
    const filteredParts = partsData.filter((part) => part.id !== id)

    if (filteredParts.length === originalLength) {
      console.log("[v0] DELETE /api/parts/[id] - Part not found with ID:", id)
      return NextResponse.json({ error: "Part not found" }, { status: 404 })
    }

    setGlobalPartsData(filteredParts)

    console.log("[v0] DELETE /api/parts/[id] - Part deleted successfully")
    return NextResponse.json({ message: "Part deleted successfully" })
  } catch (error) {
    console.error("[v0] Error deleting part:", error)
    return NextResponse.json({ error: "Failed to delete part" }, { status: 500 })
  }
}
