import { makeFetchUserCheckInsHistoryUseCase } from '@/use-cases/factories/make-fetch-user-check-ins-history-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function history(req: FastifyRequest, reply: FastifyReply) {
  const checkInHistoryQueryBodySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })

  const { page } = checkInHistoryQueryBodySchema.parse(req.query)

  const fetchUserCheckInsHistory = makeFetchUserCheckInsHistoryUseCase()

  const { checkIns } = await fetchUserCheckInsHistory.execute({
    page,
    userId: req.user.sub,
  })

  return reply.status(200).send({
    checkIns,
  })
}
