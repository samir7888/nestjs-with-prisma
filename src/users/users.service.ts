import { HttpException, Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  createUser(data: Prisma.UserCreateInput) {
    return this.prisma.user.create({
      data: {
        ...data,
        userSetting: {
          create: {
            notificationOn: false,
            smsEnables: true,
          },
        },
      },
    });
  }

  getUsers() {
    return this.prisma.user.findMany({ include: { userSetting: true,groupPost:{
     include:{
      user:true
     }
    },post:{
      select:{
        title:true,
        description:true
      },
      
    } } });
  }

  getUserById(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        userSetting: {
          select: {
            smsEnables: true,
            notificationOn: true,
          },
        },
      },
    });
  }

  async updateUserById(id: number, data: Prisma.UserUpdateInput) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new HttpException('User not found', 404);

    const existingUsername = await this.prisma.user.findUnique({
      where: { username: data.username as string },
    });

    if (existingUsername)
      throw new HttpException('username already exits', 402);

    return this.prisma.user.update({ where: { id }, data });
  }

  async deleteUserById(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new HttpException('User not found', 404);

    return this.prisma.user.delete({ where: { id } });
  }

  async updateUserSettingById(
    userId: number,
    data: Prisma.UserSettingUpdateInput,
  ) {
    const user = await this.getUserById(userId);
    if (!user) throw new HttpException('User not found', 404);
    if (!user.userSetting) throw new HttpException('User doesnot have usersettings', 400);

    return this.prisma.userSetting.update({ where: { userId }, data });
  }
}
