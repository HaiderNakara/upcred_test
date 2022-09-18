import { JwtService } from '@nestjs/jwt';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { Auth } from './entities/auth.entity';

describe('AuthService', () => {
  let service: AuthService;
  const mockAuthRepository = {
    findOne: jest.fn(
      (email: string) =>
        new Promise((resolve, reject) => {
          resolve({
            email: email,
            password: '123456',
            userId: '123456',
          });
        }),
    ),
    save: jest.fn(
      (data: any) =>
        new Promise((resolve, reject) => {
          resolve({
            email: data.email,
            password: data.password,
            userId: '123456',
          });
        }),
    ),
  };

  const mockJwtService = {
    sign: jest.fn(
      (data: any) =>
        new Promise((resolve, reject) => {
          resolve('123456');
        }
        ),
    ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService,
        JwtService,
        {
          provide: getModelToken(Auth.name),
          useValue: mockAuthRepository,
        },
        {
          provide: 'JwtService',
          useValue: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should create a new user', async () => {
    const result = await service.signup({
      email: 'email1123@gmail.com',
      password: '12345678',
    });
    expect(result).toEqual({
      accessToken: expect.any(String),
    });
  });
  // it('should login a user', async () => {
  //   const result = await service.login("email1@gmail.com", "123456");
  //   expect(result).toEqual({
  //     accessToken: expect.any(String),
  //   });
  // }
  // );
});
