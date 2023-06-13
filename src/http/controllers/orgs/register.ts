import { EmailAlreadyTakenError } from '@/use-cases/errors/email-already-taken-error'
import { makeRegisterUseCase } from '@/use-cases/factories/make-register-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    responsibleName: z.string(),
    name: z.string(),
    description: z.string(),
    phone: z.string(),
    address: z.string(),
    city: z.string(),
    cep: z.string(),
    state: z.string(),
    email: z.string(),
    password: z.string(),
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const orgData = registerBodySchema.parse(request.body)

  const registerUseCase = makeRegisterUseCase()

  try {
    await registerUseCase.execute(orgData)

    return reply.status(201).send()
  } catch (error) {
    if (error instanceof EmailAlreadyTakenError) {
      return reply.status(400).send({ message: error.message })
    }

    throw error
  }
}
