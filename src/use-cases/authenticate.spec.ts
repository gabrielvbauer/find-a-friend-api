import { OrgsRepository } from '@/repositories/orgs-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { AuthenticateUseCase } from './authenticate'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let orgsRepository: OrgsRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(async () => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new AuthenticateUseCase(orgsRepository)
  })

  it('should be able to authenticate', async () => {
    await orgsRepository.create({
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
      latitude: 37.773972,
      longitude: -122.431297,
    })

    const { org } = await sut.execute({
      email: 'john@example.com',
      password: '123456',
    })

    expect(org).toEqual(
      expect.objectContaining({
        id: expect.any(String),
      }),
    )
  })

  it('should not be able to authenticate if email is wrong', async () => {
    await orgsRepository.create({
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
      latitude: 37.773972,
      longitude: -122.431297,
    })

    await expect(() =>
      sut.execute({
        email: 'john.doe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate if password is wrong', async () => {
    await orgsRepository.create({
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
      latitude: 37.773972,
      longitude: -122.431297,
    })

    await expect(() =>
      sut.execute({
        email: 'john@example.com',
        password: '1234567',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
