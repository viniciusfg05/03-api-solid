import { afterAll, beforeAll, expect, it, describe } from 'vitest'
import { app } from '@/app'
import request from 'supertest'
import { createAndAuthenticate } from '@/utils/test/create-and-authenticate-user'

describe('Create Gym (e2e)', () => {
  beforeAll(async () => {
    await app.ready() // saber se o server inicializou
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to create a gym', async () => {
    const { token } = await createAndAuthenticate(app, true)

    const response = await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        description: 'Description test',
        title: 'title test',
        phone: null,
        latitude: -27.2092052,
        longitude: -49.6401091,
      })

    expect(response.statusCode).toEqual(201)
  })
})
