import { Prisma, Pet } from '@prisma/client'
import { FetchPetsQuery, PetsRepository } from '../pets-repository'
import { prisma } from '@/lib/prisma'

export class PrismaPetsRepository implements PetsRepository {
  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }

  async fetchByOrgId(
    orgId: string,
    query?: FetchPetsQuery | undefined,
  ): Promise<Pet[]> {
    const pets = await prisma.pet.findMany({
      where: {
        org_id: orgId,
        age: query?.age,
        energy: query?.energy,
        dependency: query?.dependency,
        ambient: query?.ambient,
        port: query?.port,
        type: query?.type,
      },
    })

    return pets
  }

  async findById(id: string): Promise<Pet | null> {
    const pet = await prisma.pet.findUnique({ where: { id } })

    return pet
  }
}
