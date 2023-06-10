import { OrgsRepository } from '@/repositories/orgs-repository'
import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'
import { OrganizationNotFoundError } from './errors/organization-not-found-error'

interface CreatePetUseCaseRequest {
  name: string
  bio: string
  type: 'DOG' | 'CAT'
  age: 'CUB' | 'ADULT' | 'ELDER'
  ambient: 'SMALL' | 'MEDIUM' | 'BIG'
  dependency: 'SMALL' | 'MEDIUM' | 'HIGH'
  energy: 'LOW' | 'MEDIUM' | 'HIGH'
  port: 'SMALL' | 'MEDIUM' | 'BIG'
  pictures: string[]
  adoption_requirements: string[]
  org_id: string
}

interface CreatePetUseCaseResponse {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository,
  ) {}

  async execute(
    data: CreatePetUseCaseRequest,
  ): Promise<CreatePetUseCaseResponse> {
    const org = await this.orgsRepository.findById(data.org_id)

    if (!org) {
      throw new OrganizationNotFoundError()
    }

    const pet = await this.petsRepository.create(data)

    return { pet }
  }
}
