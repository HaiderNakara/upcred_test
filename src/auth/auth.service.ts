import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';
import { Auth } from './entities/auth.entity';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth.name)
    private readonly authModel: Model<Auth>,
    private jwtService: JwtService,
  ) { }
  async signup(data: UpdateAuthDto) {
    await this.validate(data.email);
    try {
      let userId = uuidv4().toString();
      const hash = await bcrypt.hash(data.password, 10);
      const auth = new this.authModel({
        password: hash,
        userId: userId,
        email: data.email,
      });
      await auth.save();
      const payload = { userId: auth.userId };
      const acessToken = this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: '7d',
      });
      return {
        accessToken: acessToken,
      };
    } catch (error) {
      console.log(error);
      return new BadRequestException('Invalid ');
    }
  }

  async login(email: string, password: string) {
    const user = await this.authModel.findOne({ email });
    console.log(password);

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { userId: user.userId };
      const acessToken = this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: '7d',
      });
      return {
        accessToken: acessToken,
      };
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }
  async find() {
    try {
      return await this.authModel.find().exec();
    } catch (error) {
      return new BadRequestException('Invalid id');
    }
  }
  async findByUserId(id: string): Promise<Auth> {
    try {
      return await this.authModel.findOne({ userId: id });
    } catch (error) {
      throw new BadRequestException('Invalid id');
    }
  }

  async validate(email: string) {
    const temp1 = await this.authModel.findOne({
      email,
    });
    console.log(temp1);
    if (temp1) {
      throw new BadRequestException('You are already registered');
    }
  }
}

      // async update(id: string, data: any) {
      //   try {
      //     const user = await this.authModel.findOne({ _id: id });
      //     if (user) {
      //       return await this.authModel.findByIdAndUpdate(id, data);
      //     }
      //     return new BadRequestException('Invalid id');
      //   } catch (error) {
      //     return new BadRequestException('Invalid id');
      //   }
      // }
      // async delete(id: string) {
      //   try {
      //     return await this.authModel.findByIdAndRemove(id);
      //   } catch (error) {
      //     return new BadRequestException('Invalid id');
      //   }
      // }