import { app } from '@/app'
import request from 'supertest'
import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { randomUUID } from 'crypto'

describe('Create Pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a new pet', async () => {
    const org = await prisma.org.create({
      data: {
        id: randomUUID(),
        responsible_name: 'Elias Corwin',
        name: 'Schmidt LLC',
        description: 'veritatis est temporibus',
        phone: '(549) 580-5443',
        street_address: '9401 Selmer Hills',
        city: 'Chino Hills',
        cep: '03779-1632',
        state: 'Rhode Island',
        email: 'Vinnie.Kuhic34@yahoo.com',
        password_hash: await hash('123456', 6),
        latitude: 13.9563,
        longitude: -116.826,
      },
    })

    const response = await request(app.server)
      .post('/pets/create')
      .send({
        name: 'pet 1',
        bio: 'pet bio',
        type: 'DOG',
        age: 'CUB',
        ambient: 'SMALL',
        dependency: 'SMALL',
        energy: 'LOW',
        port: 'SMALL',
        pictures: ['image.com', 'image2.com'],
        adoption_requirements: ['req 1', 'req 2'],
        org_id: org.id,
      })

    expect(response.statusCode).toEqual(201)
    expect(response.body).toEqual(
      expect.objectContaining({
        pet: expect.objectContaining({
          id: expect.any(String),
          name: 'pet 1',
        }),
      }),
    )
  })

  it('should throw error if organization does not exists', async () => {
    const response = await request(app.server)
      .post('/pets/create')
      .send({
        name: 'pet 1',
        bio: 'pet bio',
        type: 'DOG',
        age: 'CUB',
        ambient: 'SMALL',
        dependency: 'SMALL',
        energy: 'LOW',
        port: 'SMALL',
        pictures: ['image.com', 'image2.com'],
        adoption_requirements: ['req 1', 'req 2'],
        org_id: 'inexistent-org-id',
      })

    expect(response.statusCode).toEqual(404)
    expect(response.body).toEqual(
      expect.objectContaining({
        message: 'Organization not found.',
      }),
    )
  })
})
