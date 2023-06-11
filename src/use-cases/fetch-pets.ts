import { OrgsRepository } from '@/repositories/orgs-repository'
import { FetchPetsQuery, PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'
import { CityCodeNotSpecifiedError } from './errors/city-code-not-specified-error'

interface FetchPetsByCityUseCaseRequest {
  cityCode: string
  query?: FetchPetsQuery
}

interface FetchPetsByCityUseCaseResponse {
  pets: Pet[]
}

export class FetchPetsUseCase {
  constructor(
    private orgRepository: OrgsRepository,
    private petsRepository: PetsRepository,
  ) {}

  async execute({
    cityCode,
    query,
  }: FetchPetsByCityUseCaseRequest): Promise<FetchPetsByCityUseCaseResponse> {
    if (!cityCode) {
      throw new CityCodeNotSpecifiedError()
    }

    const orgsInCity = await this.orgRepository.fetchByCityCode(cityCode)

    if (orgsInCity === null) {
      return { pets: [] }
    }

    const pets: Pet[] = []

    orgsInCity.forEach(async (org) => {
      const petsInsideOrg = await this.petsRepository.fetchByOrgId(
        org.id,
        query,
      )

      if (petsInsideOrg !== null) {
        petsInsideOrg.forEach((pet) => pets.push(pet))
      }
    })

    return { pets }
  }
}
