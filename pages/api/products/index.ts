import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      const products = await prisma.product.findMany({ orderBy: { id: 'desc' } })
      return res.status(200).json(products)
    }

    if (req.method === 'POST') {
      const { sku, name, description, price, cost, stock } = req.body
      if (!sku || !name || price == null) {
        return res.status(400).json({ error: 'sku, name and price are required' })
      }

      const product = await prisma.product.create({
        data: {
          sku,
          name,
          description: description ?? null,
          price: Number(price),
          cost: cost != null ? Number(cost) : null,
          stock: Number(stock ?? 0)
        }
      })

      return res.status(201).json(product)
    }

    res.setHeader('Allow', ['GET', 'POST'])
    return res.status(405).end(`Method ${req.method} Not Allowed`)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Server error' })
  }
}
