import { expect, it, describe } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CreateGymUseCase } from './create-gym'

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Register Use Case', () => {
  it('should be able to register', async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymsRepository)

    const { gym } = await sut.execute({
      description: 'Description test',
      title: 'title test',
      phone: null,
      latitude: -27.2092052,
      longitude: -49.6401091,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
