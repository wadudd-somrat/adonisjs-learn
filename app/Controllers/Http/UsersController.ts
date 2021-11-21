// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'


import Database from "@ioc:Adonis/Lucid/Database";
import Hash from '@ioc:Adonis/Core/Hash'

export default class UsersController {

  public async loginCheck({ auth, request, response })
  {
    const email = request.input('user_id')
    const password = request.input('password')
    //await Hash.verify(hashedValue, plainTextValue)
    try {
      await auth.use('web').attempt(email, password)
      response.redirect('/posts')
    } catch {
     //return  response.redirect().back().send(status)
     // return response.badRequest({ error: 'Invalid login credentials' }).back()
      return response.redirect().withQs('Invalid credentials').back()
    }
  }

  public async registration({request}) {

    try {
      // save user to database
      await Database
        .table('users').insert({
        name: request.input('name'),
        password: await Hash.make(request.input('password')),
        email: request.input('email')
      })
      return 'ok'

    } catch (error) {
      return error
    }

  }
  public async logout({ auth, response }) {
    await auth.use('web').logout()
    response.redirect('/')
  }

}
