import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreatePostDto } from 'src/users/dtos/CreatePost.dto';
import { PostService } from './post.service';
import { CreateGroupPostDto } from 'src/users/dtos/CreateGroupPost.dto';

@Controller('posts')
export class PostController {
  constructor(private postservice: PostService) {}

@Get()
getPosts(){
    return this.postservice.getAllPosts(); 
}
@Get('/group')
getAllGroupPosts(){
    return this.postservice.getAllGroupPosts(); 
}

  @Post()
  @UsePipes(ValidationPipe)
  createPost(@Body() { userId, ...createPostData }: CreatePostDto) {
    return this.postservice.createPost(userId, createPostData);
  }

  @Post('group')
  @UsePipes(ValidationPipe)
  createGroupPost(@Body() { userIds, ...createPostData }: CreateGroupPostDto) {
    return this.postservice.createGroupPost(userIds, createPostData);
  } 
}



