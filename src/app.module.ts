import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { PostService } from './post/post.service';
import { PostModule } from './post/post.module';

@Module({
  imports: [UsersModule, PrismaModule, PostModule],
  controllers: [],
  providers: [PostService],
})
export class AppModule {}
