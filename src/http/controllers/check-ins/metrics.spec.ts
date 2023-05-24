import { afterAll, beforeAll, expect, it, describe } from 'vitest'
import { app } from '@/app'
import request from 'supertest'
import { createAndAuthenticate } from '@/utils/test/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'

describe('Check-in metrics (e2e)', () => {
  beforeAll(async () => {
    await app.ready() // saber se o server inicializou
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to get the count of check-ins', async () => {
    const { token } = await createAndAuthenticate(app)

    const user = await prisma.user.findFirstOrThrow()

    const gym = await prisma.gym.create({
      data: {
        description: 'Javascript gym',
        title: 'Javascript gym',
        phone: null,
        latitude: -27.2092052,
        longitude: -49.6401091,
      },
    })

    await prisma.checkIn.createMany({
      data: [
        {
          user_id: user.id,
          gym_id: gym.id,
        },

        {
          user_id: user.id,
          gym_id: gym.id,
        },
      ],
    })

    const response = await request(app.server)
      .get(`/gyms/check-ins/metrics`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.checkInsCounts).toEqual(2)
  })
})
