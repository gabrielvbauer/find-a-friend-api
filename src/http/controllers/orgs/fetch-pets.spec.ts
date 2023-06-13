import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import request from 'supertest'
import { randomUUID } from 'node:crypto'
import { afterAll, beforeAll, describe, it, expect } from 'vitest'

describe('Fetch Pets (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to fetch pets from city', async () => {
    const org1 = await prisma.org.create({
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
        email: 'Vinnie.Kuhic13@yahoo.com',
        password_hash: await hash('123456', 6),
        latitude: 13.9563,
        longitude: -116.826,
      },
    })

    const org2 = await prisma.org.create({
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
        email: 'Vinnie.Kuhic12@yahoo.com',
        password_hash: await hash('123456', 6),
        latitude: 13.9563,
        longitude: -116.826,
      },
    })

    for (let i = 0; i < 2; i++) {
      await prisma.pet.create({
        data: {
          name: `pet ${i}`,
          bio: 'pet bio',
          type: 'DOG',
          age: 'CUB',
          ambient: 'SMALL',
          dependency: 'SMALL',
          energy: 'LOW',
          port: 'SMALL',
          pictures: ['image.com', 'image2.com'],
          adoption_requirements: ['req 1', 'req 2'],
          org_id: org1.id,
        },
      })
    }

    for (let i = 0; i < 2; i++) {
      await prisma.pet.create({
        data: {
          name: `pet ${i}`,
          bio: 'pet bio',
          type: 'DOG',
          age: 'CUB',
          ambient: 'SMALL',
          dependency: 'SMALL',
          energy: 'LOW',
          port: 'SMALL',
          pictures: ['image.com', 'image2.com'],
          adoption_requirements: ['req 1', 'req 2'],
          org_id: org2.id,
        },
      })
    }

    const response = await request(app.server).get('/city/03779-1632/pets')

    expect(response.status).toEqual(200)
    expect(response.body.pets).toHaveLength(4)
  })
})
