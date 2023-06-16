import { makeFetchPetsUseCase } from '@/use-cases/factories/make-fetch-pets-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function fetchPets(request: FastifyRequest, reply: FastifyReply) {
  const fetchPetsParamsSchema = z.object({
    cityCode: z.string(),
  })

  const fetchPetsQuerySchema = z.object({
    age: z.string().optional(),
    energy: z.string().optional(),
    ambient: z.string().optional(),
    dependency: z.string().optional(),
    port: z.string().optional(),
    type: z.string().optional(),
  })

  const { cityCode } = fetchPetsParamsSchema.parse(request.params)
  const query = fetchPetsQuerySchema.parse(request.query)

  const fetchPetsUseCase = makeFetchPetsUseCase()

  try {
    const { pets } = await fetchPetsUseCase.execute({
      cityCode,
      query,
    })

    return reply.status(200).send({ pets })
  } catch (error) {
    console.log(error)
    return reply.status(500).send()
  }
}
