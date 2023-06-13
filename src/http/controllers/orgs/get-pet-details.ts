import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeGetPetsDetailsUseCase } from '@/use-cases/factories/make-get-pet-details-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getPetDetails(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getPetDetailsParamsSchema = z.object({
    id: z.string(),
  })

  const { id } = getPetDetailsParamsSchema.parse(request.params)

  const getPetDetailsUseCase = makeGetPetsDetailsUseCase()

  try {
    const { pet } = await getPetDetailsUseCase.execute({
      id,
    })

    return reply.status(200).send({ pet })
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }

    throw error
  }
}
