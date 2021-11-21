// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Comment from "App/Models/Comment";

export default class CommentsController {

 public async index()
 {
    return await Comment.all();
 }

 public async store({request,response,auth})
 {
   await auth.use('web').authenticate()
   const comment = new Comment()
   comment.user_id = auth.user.id
   comment.post_id = request.input('post_id');
   comment.comment = request.input('comment');
   await comment.save()

   return response.redirect('comments')

 }

 public async show({params})
 {
    return params;
 }

 public async edit({params})
 {
   return params;
 }
  public async update()
  {

  }

  public async destroy({params})
  {
    return params;
  }


}
