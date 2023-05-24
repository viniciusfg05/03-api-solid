import fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from './env'
import fastifyJwt from '@fastify/jwt'
import { usersRoutes } from './http/controllers/users/routes'
import { gymsRoutes } from './http/controllers/gyms/routes'
import { checkInsRoutes } from './http/controllers/check-ins/routes'
import fastifyCookie from '@fastify/cookie'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
})

app.register(usersRoutes)

app.register(fastifyCookie)

app.register(gymsRoutes)

app.register(checkInsRoutes)

app.setErrorHandler((errors, request, reply) => {
  if (errors instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error.',
      issues: errors.format(),
    })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(errors)
  } else {
    // TODO: Ultilizar um ferramenta de error Datadog, newRelic etc
  }

  return reply.status(500).send({
    message: 'Internal server error.',
  })
})
