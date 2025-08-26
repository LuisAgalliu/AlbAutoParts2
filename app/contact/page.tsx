"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MessageCircle, Send } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const handleWhatsAppClick = (phoneNumber: string) => {
    const formattedNumber = `355${phoneNumber.substring(1)}` // Remove leading 0 and add country code
    const message = encodeURIComponent("Përshëndetje! Dëshiroj informacion për pjesë makinash.")
    window.open(`https://wa.me/${formattedNumber}?text=${message}`, "_blank")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // For now, redirect to WhatsApp with the form data
    const message = encodeURIComponent(
      `Përshëndetje! Emri: ${formData.name}\nEmail: ${formData.email}\nTelefon: ${formData.phone}\nMesazhi: ${formData.message}`,
    )
    window.open(`https://wa.me/355686413944?text=${message}`, "_blank")
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            <span className="text-blue-600">Kontaktoni</span> me ne
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Jemi këtu për t'ju ndihmuar me çdo pyetje rreth pjesëve të makinave. Kontaktoni në çdo kohë!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-6 text-gray-900">Informacione Kontakti</h2>
            </div>

            {/* Phone Numbers */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  Numrat e telefonit
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-semibold text-lg">068 641 3944</p>
                    <p className="text-gray-600 text-sm">Linja kryesore</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleWhatsAppClick("0686413944")}
                      size="sm"
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <MessageCircle className="h-4 w-4 mr-1" />
                      WhatsApp
                    </Button>
                    <Button onClick={() => window.open("tel:+355686413944")} variant="outline" size="sm">
                      <Phone className="h-4 w-4 mr-1" />
                      Telefono
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-semibold text-lg">069 891 7866</p>
                    <p className="text-gray-600 text-sm">Linja dytësore</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleWhatsAppClick("0698917866")}
                      size="sm"
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <MessageCircle className="h-4 w-4 mr-1" />
                      WhatsApp
                    </Button>
                    <Button onClick={() => window.open("tel:+355698917866")} variant="outline" size="sm">
                      <Phone className="h-4 w-4 mr-1" />
                      Telefono
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Email */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-700 rounded-full flex items-center justify-center">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  Email
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="font-semibold text-lg">info@albautoparts.com</p>
                  <Button
                    onClick={() => window.open("mailto:info@albautoparts.com")}
                    variant="outline"
                    size="sm"
                    className="mt-3"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Dërgo Email
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div>
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900">Dërgoni një mesazh</CardTitle>
                <p className="text-gray-600">Plotësoni formularin dhe ne do t'ju kontaktojmë së shpejti</p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Emri i plotë *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Shkruani emrin tuaj"
                        className="h-12"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Numri i telefonit *
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="069 123 4567"
                        className="h-12"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="email@example.com"
                      className="h-12"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Mesazhi *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Shkruani mesazhin tuaj këtu..."
                      rows={5}
                      className="resize-none"
                    />
                  </div>

                  <Button type="submit" className="w-full h-12 text-lg bg-blue-600 hover:bg-blue-700">
                    <Send className="h-5 w-5 mr-2" />
                    Dërgo Mesazhin
                  </Button>

                  <p className="text-sm text-gray-500 text-center">
                    Duke dërguar formularin, ju do të ridrejtoheni në WhatsApp për komunikim të drejtpërdrejtë
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Contact CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Keni nevojë për ndihmë të menjëhershme?</h3>
            <p className="text-lg mb-6 opacity-90">Kontaktoni direkt përmes WhatsApp për përgjigje të shpejtë</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => handleWhatsAppClick("0686413944")}
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-lg px-8"
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                WhatsApp: 068 641 3944
              </Button>
              <Button
                onClick={() => handleWhatsAppClick("0698917866")}
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 bg-transparent text-lg px-8"
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                WhatsApp: 069 891 7866
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
