import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { describe, it, beforeEach, expect } from 'vitest'
import { GetPetDetailsUseCase } from './get-pet-details'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let petsRepository: InMemoryPetsRepository
let sut: GetPetDetailsUseCase

describe('Get Pet Details Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new GetPetDetailsUseCase(petsRepository)
  })

  it('should be able to get a specific pet details', async () => {
    petsRepository.items.push({
      id: '123',
      name: '',
      bio: '',
      type: 'CAT',
      age: 'CUB',
      port: 'SMALL',
      energy: 'MEDIUM',
      dependency: 'SMALL',
      ambient: 'SMALL',
      adoption_requirements: [],
      pictures: [],
      org_id: '',
    })

    const { pet } = await sut.execute({ id: '123' })

    expect(pet).toEqual(
      expect.objectContaining({
        id: '123',
      }),
    )
  })

  it('should throw an error if id does not exist', async () => {
    await expect(() => sut.execute({ id: '456' })).rejects.toBeInstanceOf(
      ResourceNotFoundError,
    )
  })
})
