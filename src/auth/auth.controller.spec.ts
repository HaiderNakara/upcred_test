import { Test, TestingModule } from "@nestjs/testing";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

describe("AuthController", () => {
  let authController: AuthController;
  const mockAuthService = {
    signup: jest.fn(
      (dto: any) => {
        return { accessToken: "test" };
      }
    ),
    login: jest.fn(
      (dto: any) => {
        return { accessToken: "test" };
      }
    ),
  };
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    })
      .overrideProvider(AuthService)
      .useValue(mockAuthService)
      .compile();

    authController = app.get<AuthController>(AuthController);
  });
  it('should be defined', () => {
    expect(authController).toBeDefined();
  });
  describe('signup', () => {
    it('should return a accessToken', async () => {
      const user = {
        email: 'this@gmail.com',
        password: '123456@#',
      }
      expect(await authController.signup(user)).toEqual({
        accessToken: expect.any(String),
      })
    });
  });
  describe('login', () => {
    it('should return a accessToken', async () => {
      const user = {
        email: 'this@gmail.com',
        password: '123456@#',
      }
      expect(await authController.login(user)).toEqual({
        accessToken: expect.any(String),
      })
    });
  });
});
