import { verifyJWT } from '@/http/middlewares/veryfy-jwt'
import { FastifyInstance } from 'fastify'
import { create } from './create'
import { validate } from './validate'
import { metrics } from './metrics'
import { history } from './history'
import { verifyUserRole } from '@/http/middlewares/verify-use-role'

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/gyms/check-ins/history', history)
  app.get('/gyms/check-ins/metrics', metrics)

  app.post('/gyms/:gymId/check-ins', create)
  app.patch(
    '/gyms/:checkInId/validate',
    { onRequest: [verifyUserRole('ADMIN')] },
    validate,
  )
}
