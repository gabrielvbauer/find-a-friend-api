import { OrganizationNotFoundError } from '@/use-cases/errors/organization-not-found-error'
import { makeCreatePetUseCase } from '@/use-cases/factories/make-create-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function createPet(request: FastifyRequest, reply: FastifyReply) {
  const createPetRequestSchema = z.object({
    name: z.string(),
    bio: z.string(),
    type: z.enum(['CAT', 'DOG']),
    age: z.enum(['CUB', 'ADULT', 'ELDER']),
    ambient: z.enum(['SMALL', 'MEDIUM', 'BIG']),
    dependency: z.enum(['SMALL', 'MEDIUM', 'HIGH']),
    energy: z.enum(['LOW', 'MEDIUM', 'HIGH']),
    port: z.enum(['SMALL', 'MEDIUM', 'BIG']),
    pictures: z.array(z.string()),
    adoption_requirements: z.array(z.string()),
    org_id: z.string(),
  })

  const petData = createPetRequestSchema.parse(request.body)

  const createPetUseCase = makeCreatePetUseCase()

  try {
    const { pet } = await createPetUseCase.execute(petData)

    return reply.status(201).send({ pet })
  } catch (error) {
    if (error instanceof OrganizationNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }

    throw error
  }
}
