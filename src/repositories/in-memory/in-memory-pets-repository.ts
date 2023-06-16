import { Pet, Prisma } from '@prisma/client'
import { FetchPetsQuery, PetsRepository } from '../pets-repository'
import { randomUUID } from 'crypto'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const picturesArray = data.pictures?.toString().split(',')!
    const adoptionRequirementsArray = data.adoption_requirements
      ?.toString()
      .split(',')!

    const pet = {
      id: randomUUID(),
      name: data.name,
      bio: data.bio,
      type: data.type,
      age: data.age,
      ambient: data.ambient,
      dependency: data.dependency,
      energy: data.energy,
      port: data.port,
      pictures: picturesArray,
      adoption_requirements: adoptionRequirementsArray,
      org_id: data.org_id,
    }

    this.items.push(pet)

    return pet
  }

  async fetchByOrgId(orgId: string, query?: FetchPetsQuery): Promise<Pet[]> {
    let pets = this.items.filter((pet) => pet.org_id === orgId)

    if (query) {
      pets = pets.filter((pet) => {
        const matchAge = !query.age || pet.age === query.age
        const matchAmbient = !query.ambient || pet.ambient === query.ambient
        const matchDependecy =
          !query.dependency || pet.dependency === query.dependency
        const matchEnergy = !query.energy || pet.energy === query.energy
        const matchPort = !query.port || pet.port === query.port
        const matchType = !query.type || pet.type === query.type

        return (
          matchAge &&
          matchAmbient &&
          matchDependecy &&
          matchEnergy &&
          matchPort &&
          matchType
        )
      })
    }

    return pets
  }

  async findById(id: string): Promise<Pet | null> {
    const pet = this.items.find((item) => item.id === id)

    if (!pet) {
      return null
    }

    return pet
  }
}
