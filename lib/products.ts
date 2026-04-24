export interface Product {
  id: number
  name: string
  type: string
  image: string
  description?: string
  category?: string
  material?: string
  size?: string
  gallery?: string[]
}

export const products: Product[] = [
]

export function getProductById(id: number) {
  return products.find((p) => p.id === id)
}

export function getRelatedProducts(id: number, limit = 4) {
  return products.filter((p) => p.id !== id).slice(0, limit)
}
