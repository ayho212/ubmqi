import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query
    const productId = Number(id)
    if (Number.isNaN(productId)) return res.status(400).json({ error: 'Invalid id' })

    if (req.method === 'GET') {
      const product = await prisma.product.findUnique({ where: { id: productId } })
      if (!product) return res.status(404).json({ error: 'Product not found' })
      return res.status(200).json(product)
    }

    if (req.method === 'PUT') {
      const { sku, name, description, price, cost, stock } = req.body
      const updated = await prisma.product.update({
        where: { id: productId },
        data: {
          sku,
          name,
          description: description ?? null,
          price: price != null ? Number(price) : undefined,
          cost: cost != null ? Number(cost) : undefined,
          stock: stock != null ? Number(stock) : undefined
        }
      })
      return res.status(200).json(updated)
    }

    if (req.method === 'DELETE') {
      await prisma.product.delete({ where: { id: productId } })
      return res.status(204).end()
    }

    res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
    return res.status(405).end(`Method ${req.method} Not Allowed`)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Server error' })
  }
}
