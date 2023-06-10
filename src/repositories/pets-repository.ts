import { Pet, Prisma } from '@prisma/client'

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  fetchByOrgId(orgId: string): Promise<Pet[] | null>
}
