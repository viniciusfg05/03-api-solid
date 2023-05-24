import { afterAll, beforeAll, expect, it, describe } from 'vitest'
import { app } from '@/app'
import request from 'supertest'

describe('Authenticate (e2e)', () => {
  beforeAll(async () => {
    await app.ready() // saber se o server inicializou
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to authenticate', async () => {
    await request(app.server).post('/users').send({
      email: 'efpyi@example.com',
      password: '12345678',
      name: 'Test User',
    })

    const response = await request(app.server).post('/sessions').send({
      email: 'efpyi@example.com',
      password: '12345678',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })
})
