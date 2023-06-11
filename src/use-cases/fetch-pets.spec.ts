import { describe, it, beforeEach, expect } from 'vitest'
import { FetchPetsUseCase } from './fetch-pets'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { Prisma } from '@prisma/client'
import { CityCodeNotSpecifiedError } from './errors/city-code-not-specified-error'

let orgsRepository: InMemoryOrgsRepository
let petsRepository: InMemoryPetsRepository
let sut: FetchPetsUseCase

describe('Fetch Pets By City Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository()
    sut = new FetchPetsUseCase(orgsRepository, petsRepository)
  })

  it('should be able to fetch pets for adoption in city', async () => {
    orgsRepository.items.push({
      id: 'city',
      cep: '98700000',
      responsible_name: '',
      name: '',
      description: '',
      phone: '',
      street_address: '',
      city: '',
      state: '',
      email: '',
      password_hash: '',
      latitude: new Prisma.Decimal(0),
      longitude: new Prisma.Decimal(0),
      created_at: new Date(),
      role: 'ORG',
    })

    orgsRepository.items.push({
      id: 'city2',
      cep: '98700000',
      responsible_name: '',
      name: '',
      description: '',
      phone: '',
      street_address: '',
      city: '',
      state: '',
      email: '',
      password_hash: '',
      latitude: new Prisma.Decimal(0),
      longitude: new Prisma.Decimal(0),
      created_at: new Date(),
      role: 'ORG',
    })

    orgsRepository.items.push({
      id: 'far',
      cep: '12345678',
      responsible_name: '',
      name: '',
      description: '',
      phone: '',
      street_address: '',
      city: '',
      state: '',
      email: '',
      password_hash: '',
      latitude: new Prisma.Decimal(0),
      longitude: new Prisma.Decimal(0),
      created_at: new Date(),
      role: 'ORG',
    })

    petsRepository.items.push({
      id: '123',
      name: 'pet 1',
      org_id: 'city',
      bio: '',
      type: 'CAT',
      age: 'CUB',
      port: 'SMALL',
      energy: 'MEDIUM',
      dependency: 'SMALL',
      ambient: 'SMALL',
      adoption_requirements: [''],
      pictures: [''],
    })

    await petsRepository.items.push({
      id: '456',
      name: 'pet 2',
      org_id: 'far',
      bio: '',
      type: 'CAT',
      age: 'CUB',
      port: 'SMALL',
      energy: 'MEDIUM',
      dependency: 'SMALL',
      ambient: 'SMALL',
      adoption_requirements: [''],
      pictures: [''],
    })

    await petsRepository.items.push({
      id: '789',
      name: 'pet 3',
      org_id: 'far',
      bio: '',
      type: 'CAT',
      age: 'CUB',
      port: 'SMALL',
      energy: 'MEDIUM',
      dependency: 'SMALL',
      ambient: 'SMALL',
      adoption_requirements: [''],
      pictures: [''],
    })

    await petsRepository.items.push({
      id: '101',
      name: 'pet 4',
      org_id: 'city',
      bio: '',
      type: 'CAT',
      age: 'CUB',
      port: 'SMALL',
      energy: 'MEDIUM',
      dependency: 'SMALL',
      ambient: 'SMALL',
      adoption_requirements: [''],
      pictures: [''],
    })

    await petsRepository.items.push({
      id: '102',
      name: 'pet 5',
      org_id: 'city2',
      bio: '',
      type: 'CAT',
      age: 'CUB',
      port: 'SMALL',
      energy: 'MEDIUM',
      dependency: 'SMALL',
      ambient: 'SMALL',
      adoption_requirements: [''],
      pictures: [''],
    })

    const { pets } = await sut.execute({ cityCode: '98700000' })

    expect(pets).toHaveLength(3)
    expect(pets).toEqual(
      expect.objectContaining([
        expect.objectContaining({ name: 'pet 1' }),
        expect.objectContaining({ name: 'pet 4' }),
        expect.objectContaining({ name: 'pet 5' }),
      ]),
    )
  })

  it('should return empty array if org has no pets available', async () => {
    orgsRepository.items.push({
      id: 'city',
      cep: '98700000',
      responsible_name: '',
      name: '',
      description: '',
      phone: '',
      street_address: '',
      city: '',
      state: '',
      email: '',
      password_hash: '',
      latitude: new Prisma.Decimal(0),
      longitude: new Prisma.Decimal(0),
      created_at: new Date(),
      role: 'ORG',
    })

    const { pets } = await sut.execute({ cityCode: '98700000' })

    expect(pets).toHaveLength(0)
    expect(pets).toEqual(expect.objectContaining([]))
  })

  it('should not fetch pets in city if the city code is not specified', async () => {
    await expect(() =>
      sut.execute({ cityCode: undefined! }),
    ).rejects.toBeInstanceOf(CityCodeNotSpecifiedError)
  })

  it('should be able to fetch by applying filters', async () => {
    orgsRepository.items.push({
      id: 'org1',
      cep: '98700000',
      responsible_name: '',
      name: '',
      description: '',
      phone: '',
      street_address: '',
      city: '',
      state: '',
      email: '',
      password_hash: '',
      latitude: new Prisma.Decimal(0),
      longitude: new Prisma.Decimal(0),
      created_at: new Date(),
      role: 'ORG',
    })

    petsRepository.items.push({
      id: '123',
      name: 'pet 1',
      org_id: 'org1',
      bio: '',
      type: 'CAT',
      age: 'ADULT',
      port: 'SMALL',
      energy: 'MEDIUM',
      dependency: 'SMALL',
      ambient: 'SMALL',
      adoption_requirements: [''],
      pictures: [''],
    })

    petsRepository.items.push({
      id: '456',
      name: 'pet 2',
      org_id: 'org1',
      bio: '',
      type: 'CAT',
      age: 'CUB',
      port: 'MEDIUM',
      energy: 'LOW',
      dependency: 'HIGH',
      ambient: 'MEDIUM',
      adoption_requirements: [''],
      pictures: [''],
    })

    petsRepository.items.push({
      id: '789',
      name: 'pet 3',
      org_id: 'org1',
      bio: '',
      type: 'DOG',
      age: 'CUB',
      port: 'SMALL',
      energy: 'MEDIUM',
      dependency: 'HIGH',
      ambient: 'SMALL',
      adoption_requirements: [''],
      pictures: [''],
    })

    const { pets } = await sut.execute({
      cityCode: '98700000',
      query: {
        age: 'CUB',
        energy: 'MEDIUM',
      },
    })

    expect(pets).toHaveLength(1)
  })
})
