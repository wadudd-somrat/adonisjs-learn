import { DateTime } from 'luxon'
import {BaseModel, column} from '@ioc:Adonis/Lucid/Orm'

export default class Comment extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  /*public static table = 'comments'

  public static primaryKey = 'id'*/



  @column()
  public comment: string

  @column()
  public post_id:number

  @column()
  public user_id:number


}
