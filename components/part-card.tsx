"use client"

import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MessageCircle, Phone } from "lucide-react"
import type { Part } from "@/lib/parts-storage"

interface PartCardProps {
  part: Part
}

export function PartCard({ part }: PartCardProps) {
  const handleWhatsAppInquiry = () => {
    const phoneNumber = "355686413944"
    const message = encodeURIComponent(
      `Përshëndetje! Dëshiroj informacion për: ${part.name} (Çmimi: ${part.price} ALL)`,
    )
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank")
  }

  const handlePhoneCall = () => {
    window.open("tel:+355686413944", "_self")
  }

  return (
    <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="relative aspect-square overflow-hidden">
        <Image src={part.image || "/placeholder.svg"} alt={part.name} fill className="object-cover" />
        <div className="absolute top-3 right-3">
          <Badge variant={part.inStock ? "default" : "destructive"} className="shadow-md">
            {part.inStock ? "Në stock" : "Jo në stock"}
          </Badge>
        </div>
      </div>

      <CardContent className="flex-1 p-4">
        <div className="mb-2">
          {part.category && (
            <Badge variant="outline" className="text-xs mb-2">
              {part.category}
            </Badge>
          )}
        </div>
        <h3 className="font-bold text-lg mb-2 line-clamp-2">{part.name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{part.description}</p>
        <div className="text-2xl font-bold text-blue-600 mb-4">{part.price.toLocaleString()} ALL</div>
      </CardContent>

      <CardFooter className="p-4 pt-0 space-y-2">
        <div className="flex gap-2 w-full">
          <Button
            onClick={handleWhatsAppInquiry}
            className="flex-1 bg-green-600 hover:bg-green-700"
            disabled={!part.inStock}
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            WhatsApp
          </Button>
          <Button
            onClick={handlePhoneCall}
            variant="outline"
            className="flex-1 bg-transparent"
            disabled={!part.inStock}
          >
            <Phone className="h-4 w-4 mr-2" />
            Telefon
          </Button>
        </div>
        {!part.inStock && <p className="text-sm text-gray-500 text-center">Kontaktoni për disponueshmëri</p>}
      </CardFooter>
    </Card>
  )
}
