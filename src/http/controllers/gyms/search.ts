import { makeSearchGymsUseCase } from '@/use-cases/factories/make-search-gyms-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function search(req: FastifyRequest, reply: FastifyReply) {
  const SearchBodySchema = z.object({
    q: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { q, page } = SearchBodySchema.parse(req.query)

  const createGymUseCase = makeSearchGymsUseCase()

  const { gyms } = await createGymUseCase.execute({
    query: q,
    page,
  })

  return reply.status(200).send({
    gyms,
  })
}
