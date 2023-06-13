import fastify from 'fastify'
import fastifyJWT from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'
import { ZodError } from 'zod'
import { env } from './env'
import { orgsRoutes } from './http/controllers/orgs/routes'

export const app = fastify()

app.register(fastifyJWT, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
})

app.register(fastifyCookie)

app.register(orgsRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  console.log(error)

  return reply.status(500).send({ message: 'Internal server error' })
})
