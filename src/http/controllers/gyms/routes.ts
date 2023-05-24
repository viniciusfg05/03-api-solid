import { verifyJWT } from '@/http/middlewares/veryfy-jwt'
import { FastifyInstance } from 'fastify'
import { search } from './search'
import { create } from './create'
import { nearby } from './nearby'
import { verifyUserRole } from '@/http/middlewares/verify-use-role'

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/gyms/search', search)
  app.get('/gyms/nearby', nearby)
  app.post('/gyms', { onRequest: [verifyUserRole('ADMIN')] }, create)
}
