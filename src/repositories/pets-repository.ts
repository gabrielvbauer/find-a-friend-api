import { Pet, Prisma } from '@prisma/client'

export interface FetchPetsQuery {
  age?: string
  energy?: string
  dependency?: string
  ambient?: string
  port?: string
  type?: string
}

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  fetchByOrgId(orgId: string, query?: FetchPetsQuery): Promise<Pet[] | null>
  findById(id: string): Promise<Pet | null>
}
