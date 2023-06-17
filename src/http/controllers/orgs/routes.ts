import { FastifyInstance } from 'fastify'
import { authenticate } from './authenticate'
import { register } from './register'
import { createPet } from './create-pet'
import { getPetDetails } from './get-pet-details'
import { fetchPets } from './fetch-pets'
import { verifyJWT } from '@/http/middlewares/verify-jwt'

export async function orgsRoutes(app: FastifyInstance) {
  app.get('/pets/:id', getPetDetails)
  app.get('/city/:cityCode/pets', fetchPets)

  app.post('/register', register)
  app.post('/sessions', authenticate)
  app.post('/pets/create', { onRequest: [verifyJWT] }, createPet)
}
