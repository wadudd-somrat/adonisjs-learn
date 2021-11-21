// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import View from '@ioc:Adonis/Core/View'
import Application from '@ioc:Adonis/Core/Application'
import Drive from '@ioc:Adonis/Core/Drive'
import Post from "App/Models/Post";


export default class PostsController {

  public async index({auth}) {
    await auth.use('web').authenticate()
    const getPosts = await Post.query().where('create_by',auth.user.id).preload("comment")


   /* const getPosts = await Database
      .from('posts')*/
    return View.render('post/index', {getPosts})

  }

  public async create() {

    return View.render('post/create')

  }

  public async store({request, response,auth}) {
    await auth.use('web').authenticate()
    const postImage = request.file('image_url', {
      size: '2mb',
      extnames: ['jpg', 'png'],
    })


    let date_ob = new Date();

    if (!postImage) {
      return
    }

    if (!postImage.isValid) {
      return postImage.errors
    }

    if (postImage) {
      await postImage.move(Application.publicPath('postImage'), {
        name: ("0" + date_ob.getDate()).slice(-2)+("0" + (date_ob.getMonth() + 1)).slice(-2)+date_ob.getFullYear()+date_ob.getHours()+date_ob.getMinutes()+date_ob.getSeconds()+date_ob.getMilliseconds()+'.'+postImage.extname,
        overwrite: true, // overwrite in case of conflict
      })
    }

    await Database
      .table('posts')
      .insert({title: request.input('title'), details: request.input('details'),image :await Drive.getUrl('postImage')+'/'+postImage.fileName,'create_by':auth.user.id})

    return response.redirect('posts')

  }

  public async show({params}) {

    const postData = await Database
      .from('posts')
      .where('id', params.id)
      .first()
    return View.render('post/show', {postData})

  }

  public async edit({params}) {

    const postData = await Database
      .from('posts')
      .where('id', params.id)
      .first()
    return View.render('post/edit', {postData})
  }

  public async update({request, response, params}) {
    await Database
      .from('posts')
      .where('id', params.id)
      .update({title: request.input('title'), details: request.input('details')})

    return response.redirect().toPath('/posts');

  }

  public async destroy({params, response}) {

    await Database
      .from('posts')
      .where('id', params.id)
      .delete()

    return response.redirect().toPath('/posts');

  }


  public async allPostWithComment()
  {
    const getPosts = await Database
      .from('posts')
    return View.render('postComment/index', {getPosts})
  }


}
