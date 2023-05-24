import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticate(
  app: FastifyInstance,
  isAdmin = false,
) {
  await prisma.user.create({
    data: {
      name: 'Test User',
      email: 'efpyi@example.com',
      password_hash: await hash('12345678', 6),
      role: isAdmin ? 'ADMIN' : 'MEMBER',
    },
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'efpyi@example.com',
    password: '12345678',
  })

  const { token } = authResponse.body

  return {
    token,
  }
}
