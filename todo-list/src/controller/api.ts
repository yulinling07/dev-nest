import {
  Inject,
  Controller,
  Post,
  Get,
  Provide,
  Query,
} from '@midwayjs/decorator';
import { Context } from 'egg';
import { IGetUserResponse } from '../interface';
import { UserService } from '../service/user';

export const todoList = [];

@Provide()
@Controller('/api')
export class APIController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Post('/get_user')
  async getUser(@Query() uid: string): Promise<IGetUserResponse> {
    const user = await this.userService.getUser({ uid });
    return { success: true, message: 'OK', data: user };
  }

  @Post('/todo')
  async addTodo() {
    const { text } = this.ctx.request.body;
    todoList.push(text);
    this.ctx.redirect('/');
    return 'ok';
  }

  @Get('/todo')
  async getTodo() {
    return todoList;
  }
}
