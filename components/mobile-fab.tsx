"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { MessageCircle, Phone, ChevronUp } from "lucide-react"

export function MobileFAB() {
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleWhatsApp = () => {
    const message = encodeURIComponent("Përshëndetje! Dëshiroj informacion për pjesë makinash.")
    window.open(`https://wa.me/355686413944?text=${message}`, "_blank")
  }

  const handleCall = () => {
    window.open("tel:+355686413944", "_self")
  }

  return (
    <div className="fixed bottom-6 right-4 z-50 flex flex-col gap-3 md:hidden">
      {showScrollTop && (
        <Button
          onClick={scrollToTop}
          size="icon"
          className="w-12 h-12 rounded-full shadow-lg bg-gray-600 hover:bg-gray-700"
        >
          <ChevronUp className="h-5 w-5" />
        </Button>
      )}

      <Button
        onClick={handleCall}
        size="icon"
        className="w-12 h-12 rounded-full shadow-lg bg-blue-600 hover:bg-blue-700"
      >
        <Phone className="h-5 w-5" />
      </Button>

      <Button
        onClick={handleWhatsApp}
        size="icon"
        className="w-12 h-12 rounded-full shadow-lg bg-green-600 hover:bg-green-700"
      >
        <MessageCircle className="h-5 w-5" />
      </Button>
    </div>
  )
}
