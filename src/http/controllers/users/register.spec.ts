import { afterAll, beforeAll, expect, it, describe } from 'vitest'
import { app } from '@/app'
import request from 'supertest'

describe('Register (e2e)', () => {
  beforeAll(async () => {
    await app.ready() // saber se o server inicializou
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to register', async () => {
    const response = await request(app.server).post('/users').send({
      email: 'efpyi@example.com',
      password: '12345678',
      name: 'Test User',
    })

    expect(response.statusCode).toEqual(201)
  })
})
