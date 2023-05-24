import { afterAll, beforeAll, expect, it, describe } from 'vitest'
import { app } from '@/app'
import request from 'supertest'
import { createAndAuthenticate } from '@/utils/test/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'

describe('Validate Check-ins (e2e)', () => {
  beforeAll(async () => {
    await app.ready() // saber se o server inicializou
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to validate a check-ins', async () => {
    const { token } = await createAndAuthenticate(app, true)

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

    let checkIn = await prisma.checkIn.create({
      data: {
        user_id: user.id,
        gym_id: gym.id,
      },
    })

    const response = await request(app.server)
      .patch(`/gyms/${checkIn.id}/validate`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(204)

    checkIn = await prisma.checkIn.findUniqueOrThrow({
      where: {
        id: checkIn.id,
      },
    })

    expect(checkIn.validated_at).toEqual(expect.any(Date))
  })
})
