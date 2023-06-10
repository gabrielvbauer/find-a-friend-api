import { describe, it, beforeEach, expect } from 'vitest'
import { CreatePetUseCase } from './create-pet'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { OrganizationNotFoundError } from './errors/organization-not-found-error'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let sut: CreatePetUseCase

describe('Create Pet Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    orgsRepository = new InMemoryOrgsRepository()
    sut = new CreatePetUseCase(petsRepository, orgsRepository)
  })

  it('should be able to create a pet', async () => {
    await orgsRepository.items.push({
      id: '123',
      responsible_name: '',
      name: '',
      description: '',
      phone: '',
      street_address: '',
      city: '',
      cep: '',
      state: '',
      email: '',
      password_hash: '',
      latitude: new Decimal(37.773972),
      longitude: new Decimal(-122.431297),
      created_at: new Date(),
      role: 'ORG',
    })

    const { pet } = await sut.execute({
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
      org_id: '123',
    })

    expect(pet).toEqual(
      expect.objectContaining({
        id: expect.any(String),
      }),
    )
  })

  it('should not be able to create a pet if organization does not exists', async () => {
    await expect(() =>
      sut.execute({
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
        org_id: '123',
      }),
    ).rejects.toBeInstanceOf(OrganizationNotFoundError)
  })
})
