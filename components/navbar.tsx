"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Menu, X, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const menuItems = [
    { href: "/", label: "Kryefaqja" },
    { href: "/parts", label: "Pjesët" },
    { href: "/about", label: "Rreth nesh" },
    { href: "/contact", label: "Kontakti" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav className={`bg-white shadow-lg sticky top-0 z-50 transition-all duration-300 ${isScrolled ? "py-3" : "py-6"}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="AlbAutoParts"
              width={280}
              height={80}
              className={`h-auto w-auto transition-all duration-300 ${isScrolled ? "max-h-14 sm:max-h-16" : "max-h-16 sm:max-h-20"}`}
              priority
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors py-2 px-1"
              >
                {item.label}
              </Link>
            ))}
            <Button
              onClick={() => window.open("tel:+355686413944")}
              className="bg-blue-600 hover:bg-blue-700 hidden lg:flex"
              size="sm"
            >
              <Phone className="h-4 w-4 mr-2" />
              Telefono
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <Button
              onClick={() => window.open("tel:+355686413944")}
              variant="ghost"
              size="icon"
              className="text-blue-600"
            >
              <Phone className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 pt-4 border-t border-gray-100 mt-4">
            <div className="flex flex-col space-y-1">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-gray-700 hover:text-blue-600 hover:bg-gray-50 font-medium py-3 px-4 rounded-lg transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-gray-100 space-y-2">
                <Button
                  onClick={() => {
                    window.open("tel:+355686413944")
                    setIsOpen(false)
                  }}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  size="lg"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Telefono: 068 641 3944
                </Button>
                <Button
                  onClick={() => {
                    const message = encodeURIComponent("Përshëndetje! Dëshiroj informacion për pjesë makinash.")
                    window.open(`https://wa.me/355686413944?text=${message}`)
                    setIsOpen(false)
                  }}
                  variant="outline"
                  className="w-full bg-green-50 border-green-200 text-green-700 hover:bg-green-100"
                  size="lg"
                >
                  WhatsApp
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
