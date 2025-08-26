import { type NextRequest, NextResponse } from "next/server"
import { getGlobalPartsData, setGlobalPartsData, type Part } from "@/lib/global-parts-storage"

export async function GET() {
  try {
    console.log("[v0] GET /api/parts - Fetching all parts")
    const partsData = getGlobalPartsData()
    console.log("[v0] GET /api/parts - Found", partsData.length, "parts")
    return NextResponse.json(partsData)
  } catch (error) {
    console.error("[v0] Error getting parts:", error)
    return NextResponse.json([], { status: 200 })
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log("[v0] POST /api/parts - Adding new part")
    const newPart = await request.json()
    console.log("[v0] POST /api/parts - New part data:", newPart)

    const partsData = getGlobalPartsData()
    const id = Date.now().toString()
    const partWithId: Part = {
      ...newPart,
      id,
      createdAt: new Date().toISOString(),
    }

    partsData.push(partWithId)
    setGlobalPartsData(partsData)

    console.log("[v0] POST /api/parts - Part added successfully with ID:", id)
    return NextResponse.json(partWithId, { status: 201 })
  } catch (error) {
    console.error("[v0] Error adding part:", error)
    return NextResponse.json({ error: "Failed to add part" }, { status: 500 })
  }
}
