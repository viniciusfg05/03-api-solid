import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { GetUserMetricsUseCase } from '../get-user-metrics'

export function makeGetUSerMetricsUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const userCase = new GetUserMetricsUseCase(checkInsRepository)

  return userCase
}
