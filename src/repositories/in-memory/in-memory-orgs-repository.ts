import { Prisma, Org, Role } from '@prisma/client'
import { OrgsRepository } from '../orgs-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryOrgsRepository implements OrgsRepository {
  public items: Org[] = []

  async create(data: Prisma.OrgCreateInput): Promise<Org> {
    const org = {
      id: randomUUID(),
      responsible_name: data.responsible_name,
      name: data.name,
      description: data.description,
      phone: data.phone,
      street_address: data.street_address,
      city: data.city,
      cep: data.cep,
      state: data.state,
      email: data.email,
      password_hash: data.password_hash,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
      created_at: new Date(),
      role: Role.ORG,
    }

    this.items.push(org)

    return org
  }

  async findByEmail(email: string): Promise<Org | null> {
    const org = this.items.find((org) => org.email === email)

    if (!org) {
      return null
    }

    return org
  }

  async findById(id: string): Promise<Org | null> {
    const org = this.items.find((org) => org.id === id)

    if (!org) {
      return null
    }

    return org
  }

  async fetchByCityCode(cityCode: string): Promise<Org[] | null> {
    const orgs = this.items.filter((org) => org.cep === cityCode)

    if (orgs.length === 0) {
      return null
    }

    return orgs
  }
}
