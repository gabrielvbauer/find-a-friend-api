import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterUseCase } from './register'
import { Decimal } from '@prisma/client/runtime/library'
import { EmailAlreadyTakenError } from './errors/email-already-taken-error'
import { hash } from 'bcryptjs'

let orgsRepository: InMemoryOrgsRepository
let sut: RegisterUseCase

describe('Register use case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new RegisterUseCase(orgsRepository)
  })

  it('should be able to register', async () => {
    const { org } = await sut.execute({
      responsibleName: 'John Doe',
      name: 'Pet Org',
      description: 'Some description',
      phone: '999999999',
      address: '123 Main Street',
      city: 'San Francisco',
      cep: '123456789',
      state: 'CA',
      email: 'john@example.com',
      password: '123456',
      latitude: 37.773972,
      longitude: -122.431297,
    })

    expect(org).toEqual(
      expect.objectContaining({
        id: expect.any(String),
      }),
    )
  })

  it('should not be able to register if email is already taken', async () => {
    await orgsRepository.items.push({
      id: '123',
      responsible_name: 'John Doe',
      name: 'Pet Org',
      description: 'Some description',
      phone: '999999999',
      street_address: '123 Main Street',
      city: 'San Francisco',
      cep: '123456789',
      state: 'CA',
      email: 'john@example.com',
      password_hash: await hash('123456', 6),
      latitude: new Decimal(37.773972),
      longitude: new Decimal(-122.431297),
      created_at: new Date(),
      role: 'ORG',
    })

    await expect(() =>
      sut.execute({
        responsibleName: 'John Doe',
        name: 'Pet Org',
        description: 'Some description',
        phone: '999999999',
        address: '123 Main Street',
        city: 'San Francisco',
        cep: '123456789',
        state: 'CA',
        email: 'john@example.com',
        password: '123456',
        latitude: 37.773972,
        longitude: -122.431297,
      }),
    ).rejects.toBeInstanceOf(EmailAlreadyTakenError)
  })
})
