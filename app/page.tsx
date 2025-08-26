import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Wrench, Truck, DollarSign, Shield, Clock, Star } from "lucide-react"
import { MobileFAB } from "@/components/mobile-fab"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/hero-car.jpg" alt="BMW on scenic road" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60" />
        </div>

        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              AlbAutoParts
            </span>
          </h1>
          <p className="text-lg sm:text-xl md:text-3xl mb-4 font-light">Pjesë makinash cilësore</p>
          <p className="text-base sm:text-lg md:text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
            për të gjitha llojet e automjeteve
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 h-auto"
            >
              <Link href="/parts">Shiko Pjesët</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-black bg-transparent text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 h-auto"
            >
              <Link href="/contact">Kontaktoni</Link>
            </Button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden sm:block">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-gray-900">
              Pse të zgjidhni <span className="text-blue-600">AlbAutoParts</span>?
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Ofrojmë pjesë makinash me cilësi të lartë për të gjitha llojet e automjeteve me shërbim profesional
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <CardContent className="text-center p-6 sm:p-8">
                <div className="w-16 sm:w-20 h-16 sm:h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg">
                  <Wrench className="text-white h-8 sm:h-10 w-8 sm:w-10" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-900">Cilësi e Lartë</h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  Pjesë origjinale dhe të certifikuara për automjetet tuaja me garanci të plotë
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <CardContent className="text-center p-6 sm:p-8">
                <div className="w-16 sm:w-20 h-16 sm:h-20 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg">
                  <Truck className="text-white h-8 sm:h-10 w-8 sm:w-10" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-900">Dërgim i Shpejtë</h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  Dërgojmë në të gjithë Shqipërinë me shërbim të shpejtë dhe të sigurt
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <CardContent className="text-center p-6 sm:p-8">
                <div className="w-16 sm:w-20 h-16 sm:h-20 bg-gradient-to-br from-orange-500 to-orange-700 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg">
                  <DollarSign className="text-white h-8 sm:h-10 w-8 sm:w-10" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-900">Çmime Konkurruese</h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  Çmimet më të mira në treg për pjesë cilësore me raport optimal cilësi-çmim
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Additional Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="flex items-center space-x-4 p-4 sm:p-6 bg-white rounded-lg shadow-md">
              <Shield className="h-10 sm:h-12 w-10 sm:w-12 text-blue-600 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-base sm:text-lg text-gray-900">Garanci e Plotë</h4>
                <p className="text-gray-600 text-sm sm:text-base">Të gjitha pjesët me garanci zyrtare</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-4 sm:p-6 bg-white rounded-lg shadow-md">
              <Clock className="h-10 sm:h-12 w-10 sm:w-12 text-green-600 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-base sm:text-lg text-gray-900">Shërbim 24/7</h4>
                <p className="text-gray-600 text-sm sm:text-base">Mbështetje dhe konsulencë gjatë gjithë kohës</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-4 sm:p-6 bg-white rounded-lg shadow-md">
              <Star className="h-10 sm:h-12 w-10 sm:w-12 text-orange-600 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-base sm:text-lg text-gray-900">Ekspertizë</h4>
                <p className="text-gray-600 text-sm sm:text-base">Staf i specializuar për këshillim profesional</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
            Gati për të gjetur pjesën e duhur?
          </h2>
          <p className="text-lg sm:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto opacity-90">
            Eksploroni katalogun tonë të gjerë të pjesëve të makinave ose kontaktoni për këshillim profesional
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 h-auto"
            >
              <Link href="/parts">Shfleto Pjesët</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 bg-transparent text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 h-auto"
            >
              <Link href="/contact">Na Kontaktoni</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Mobile Floating Action Buttons */}
      <MobileFAB />
    </div>
  )
}
