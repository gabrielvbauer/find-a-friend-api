import { makeFetchPetsUseCase } from '@/use-cases/factories/make-fetch-pets-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function fetchPets(request: FastifyRequest, reply: FastifyReply) {
  const fetchPetsParamsSchema = z.object({
    cityCode: z.string(),
  })

  const { cityCode } = fetchPetsParamsSchema.parse(request.params)

  const fetchPetsUseCase = makeFetchPetsUseCase()

  try {
    const { pets } = await fetchPetsUseCase.execute({
      cityCode,
    })

    return reply.status(200).send({ pets })
  } catch (error) {
    console.log(error)
    return reply.status(500).send()
  }
}
