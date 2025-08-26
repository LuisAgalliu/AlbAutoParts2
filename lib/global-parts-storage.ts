// Global in-memory storage that persists across API requests
export interface Part {
  id: string
  name: string
  description: string
  price: number
  image: string
  inStock: boolean
  category?: string
  brand?: string
  createdAt?: string
}

// Use a global variable to store parts data
declare global {
  var partsData: Part[] | undefined
}

export function getGlobalPartsData(): Part[] {
  if (!global.partsData) {
    global.partsData = [
      {
        id: "1",
        name: "Filtër Vaji BMW",
        description:
          "Filtër vaji cilësor për BMW seri 3 dhe 5. Garanton filtrimin optimal të vajit dhe mbrojtjen e motorit.",
        price: 2500,
        category: "Filtra",
        brand: "BMW",
        inStock: true,
        image: "/bmw-oil-filter.png",
        createdAt: "2024-01-01T00:00:00.000Z",
      },
      {
        id: "2",
        name: "Disk Freni Mercedes",
        description: "Disk freni i përparmë për Mercedes-Benz C-Class. Cilësi e lartë dhe performancë e shkëlqyer.",
        price: 8500,
        category: "Frena",
        brand: "Mercedes",
        inStock: true,
        image: "/mercedes-brake-disc.png",
        createdAt: "2024-01-01T00:00:00.000Z",
      },
      {
        id: "3",
        name: "Amortizator Audi",
        description: "Amortizator i pasëm për Audi A4. Siguron komfort dhe stabilitet gjatë vozitjes.",
        price: 12000,
        category: "Pezullim",
        brand: "Audi",
        inStock: false,
        image: "/audi-shock-absorber.png",
        createdAt: "2024-01-01T00:00:00.000Z",
      },
      {
        id: "4",
        name: "Bateri Volkswagen",
        description: "Bateri 12V për Volkswagen Golf dhe Passat. Kapacitet i lartë dhe jetëgjatësi e garantuar.",
        price: 15000,
        category: "Elektrike",
        brand: "Volkswagen",
        inStock: true,
        image: "/car-battery-volkswagen.png",
        createdAt: "2024-01-01T00:00:00.000Z",
      },
      {
        id: "5",
        name: "Gomë Dimërore Michelin",
        description: "Gomë dimërore Michelin 205/55R16. Aderencë e shkëlqyer në dëborë dhe akull.",
        price: 18000,
        category: "Goma",
        brand: "Michelin",
        inStock: true,
        image: "/michelin-winter-tire.png",
        createdAt: "2024-01-01T00:00:00.000Z",
      },
      {
        id: "6",
        name: "Radiator Ford",
        description: "Radiator ftohje për Ford Focus dhe Fiesta. Sistem ftohje efikas dhe i qëndrueshëm.",
        price: 22000,
        category: "Ftohje",
        brand: "Ford",
        inStock: true,
        image: "/ford-radiator-cooling-system.png",
        createdAt: "2024-01-01T00:00:00.000Z",
      },
    ]
  }
  return global.partsData
}

export function setGlobalPartsData(data: Part[]) {
  global.partsData = data
}
