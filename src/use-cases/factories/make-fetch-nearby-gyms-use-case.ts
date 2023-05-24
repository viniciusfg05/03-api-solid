import { FetchNearbyGymsUseCase } from '../fetch-nearby-gyms'
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'

export function makeFetchNearbyGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository()
  const userCase = new FetchNearbyGymsUseCase(gymsRepository)

  return userCase
}
