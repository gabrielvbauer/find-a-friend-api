import { OrgsRepository } from '@/repositories/orgs-repository'
import { Org } from '@prisma/client'
import { hash } from 'bcryptjs'
import { EmailAlreadyTakenError } from './errors/email-already-taken-error'

interface RegisterUseCaseRequest {
  responsibleName: string
  name: string
  description: string
  phone: string
  address: string
  city: string
  cep: string
  state: string
  email: string
  password: string
  latitude: number
  longitude: number
}

interface RegisterUseCaseResponse {
  org: Org
}

export class RegisterUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute(
    data: RegisterUseCaseRequest,
  ): Promise<RegisterUseCaseResponse> {
    const orgAlreadyExists = await this.orgsRepository.findByEmail(data.email)

    if (orgAlreadyExists) {
      throw new EmailAlreadyTakenError()
    }

    const password_hash = await hash(data.password, 6)

    const org = await this.orgsRepository.create({
      responsible_name: data.responsibleName,
      name: data.name,
      description: data.description,
      phone: data.phone,
      street_address: data.address,
      city: data.city,
      cep: data.cep,
      state: data.state,
      latitude: data.latitude,
      longitude: data.longitude,
      email: data.email,
      password_hash,
    })

    return { org }
  }
}
