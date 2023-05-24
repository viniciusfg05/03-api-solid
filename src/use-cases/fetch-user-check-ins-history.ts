import { CheckIn } from '@prisma/client'
import { CheckInsRepository } from '@/repositories/check-ins-repository'

interface FetchUserCheckInsHistoryUseRequest {
  userId: string
  page: number
}

interface FetchUserCheckInsHistoryUseResponse {
  checkIns: CheckIn[]
}

export class FetchUserCheckInsHistoryUseCaseRequestUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
    page,
  }: FetchUserCheckInsHistoryUseRequest): Promise<FetchUserCheckInsHistoryUseResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(
      userId,
      page,
    )

    return {
      checkIns,
    }
  }
}
