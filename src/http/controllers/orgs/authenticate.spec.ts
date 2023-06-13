import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Authenticate (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate', async () => {
    await prisma.org.create({
      data: {
        responsible_name: 'Elias Corwin',
        name: 'Schmidt LLC',
        description: 'veritatis est temporibus',
        phone: '(549) 580-5443',
        street_address: '9401 Selmer Hills',
        city: 'Chino Hills',
        cep: '03779-1632',
        state: 'Rhode Island',
        email: 'johndoe@example.com',
        password_hash: await hash('123456', 6),
        latitude: 13.9563,
        longitude: -116.826,
      },
    })

    const response = await request(app.server).post('/sessions').send({
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual(
      expect.objectContaining({
        accessToken: expect.any(String),
      }),
    )
  })
})
