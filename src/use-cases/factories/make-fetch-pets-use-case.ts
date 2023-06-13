import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { FetchPetsUseCase } from '../fetch-pets'

export function makeFetchPetsUseCase() {
  const orgsRepository = new PrismaOrgsRepository()
  const petsRepository = new PrismaPetsRepository()
  const fetchPetsUseCase = new FetchPetsUseCase(orgsRepository, petsRepository)

  return fetchPetsUseCase
}
