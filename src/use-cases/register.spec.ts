import { expect, it, describe } from 'vitest'
import { RegisterUserCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExists } from './errors/user-already-exists'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUserCase

describe('Register Use Case', () => {
  it('should be able to register', async () => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUserCase(usersRepository)

    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: 'password',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUserCase(usersRepository)

    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: 'password',
    })

    // Compara se a senha originou o hash
    const isPasswordCorrectlyHashed = await compare(
      'password',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUserCase(usersRepository)

    const email = 'johndoe@gmail.com'

    await sut.execute({
      name: 'John Doe',
      email,
      password: 'password',
    })

    await expect(() =>
      sut.execute({
        name: 'John Doe',
        email,
        password: 'password',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExists)
  })
})
