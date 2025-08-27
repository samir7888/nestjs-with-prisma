import { HttpException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dtos/auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private authservice: JwtService,
  ) {}

  async validateUser({ username, password }: LoginDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { username },
    });

    if (!existingUser) {
      return null;
    }

    // Compare the provided password with the hashed password
    const passwordMatched = await bcrypt.compare(
      password,
      existingUser.password,
    );

    if (!passwordMatched) {
      return null;
    }

    // Remove password from user data before creating JWT
    const { password: userPassword, ...userData } = existingUser;

    return { access_token: this.authservice.sign(userData) };
  }
}
