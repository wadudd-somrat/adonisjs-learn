/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async ({view }) => {
  return view.render('welcome')
})
Route.get('/login', async ({view }) => {
  return view.render('welcome')
})
Route.get('/reg',async ({ view }) => {
  return view.render('reg')
}).as('reg')
Route.resource('/comments','CommentsController')


Route.get('/post-comment', 'PostsController.allPostWithComment').as('post.comment')
Route.post('/signup', 'UsersController.registration').as('signup')
Route.post('/login-check','UsersController.loginCheck').as('loginCheck')
Route.group(() => {
  Route.resource('/posts','PostsController')
  Route.get('/logout', 'UsersController.logout').as('logout')
}).middleware('auth')








//Route.post('/posts/:id/update','PostsController.update')
//Route.post('/posts/:id/destroy','PostsController.destroy')
