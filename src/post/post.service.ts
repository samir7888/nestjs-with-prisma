import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  createPost(userId, data: Prisma.PostCreateWithoutUserInput) {
    return this.prisma.post.create({
      data: {
        ...data,
        userId,
      },
    });
  }

  createGroupPost(
    userId: number[],
    data: Prisma.GroupPostCreateWithoutUsersInput,
  ) {
    return this.prisma.groupPost.create({
      data: {
        ...data,
        users: {
          create: userId.map((userId) => ({ userId })),
        },
      },
    });
  }

  getAllPosts(){
    return this.prisma.post.findMany({
        include:{
            user:true
        }
    });
  }

  deletePostById(id:number){
    return this.prisma.post.delete({where:{id}})
  }
  getAllGroupPosts(){
    return this.prisma.groupPost.findMany({
        include:{
            users:true
        }
    });
  }
}
