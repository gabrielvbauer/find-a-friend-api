import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Register (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register', async () => {
    const { statusCode } = await request(app.server).post('/register').send({
      responsibleName: 'Elias Corwin',
      name: 'Schmidt LLC',
      description: 'veritatis est temporibus',
      phone: '(549) 580-5443',
      address: '9401 Selmer Hills',
      city: 'Chino Hills',
      cep: '03779-1632',
      state: 'Rhode Island',
      email: 'Vinnie.Kuhic34@yahoo.com',
      password: 'QDw5I81cUlzl_wi',
      latitude: 13.9563,
      longitude: -116.826,
    })

    expect(statusCode).toEqual(201)
  })
})
