import { Pet, Prisma } from '@prisma/client'
import { PetsRepository } from '../pets-repository'
import { randomUUID } from 'crypto'

export class InMemoryPetsRepository implements PetsRepository {
  private items: Pet[] = []

  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const picturesArray = data.pictures
      ? data.pictures?.toString().split(',')
      : ['']
    const adoptionRequirementsArray = data.adoption_requirements
      ? data.adoption_requirements?.toString().split(',')
      : ['']

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
}
