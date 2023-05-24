import { makeGetUSerMetricsUseCase } from '@/use-cases/factories/make-get-user-metrics-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function metrics(req: FastifyRequest, reply: FastifyReply) {
  const getUSerMetricsUseCase = makeGetUSerMetricsUseCase()

  const { checkInsCounts } = await getUSerMetricsUseCase.execute({
    userId: req.user.sub,
  })

  return reply.status(200).send({
    checkInsCounts,
  })
}
