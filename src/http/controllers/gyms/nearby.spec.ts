import { afterAll, beforeAll, expect, it, describe } from 'vitest'
import { app } from '@/app'
import request from 'supertest'
import { createAndAuthenticate } from '@/utils/test/create-and-authenticate-user'

describe('Nearby Gyms (e2e)', () => {
  beforeAll(async () => {
    await app.ready() // saber se o server inicializou
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to list nearby gyms', async () => {
    const { token } = await createAndAuthenticate(app, true)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        description: 'Javascript gyms',
        title: 'Javascript gyms',
        phone: null,
        latitude: -27.2092052,
        longitude: -49.6401091,
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        description: 'Typescript gyms',
        title: 'Typescript gyms',
        phone: null,
        latitude: -27.2092052,
        longitude: -48.223189,
      })

    const response = await request(app.server)
      .get('/gyms/nearby')
      .query({
        latitude: -27.2092052,
        longitude: -49.6401091,
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.status).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'Javascript gyms',
      }),
    ])
  })
})
