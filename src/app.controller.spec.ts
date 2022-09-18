import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  const mockUser =
  {
    _id: '1',
    name: 'test',
    email: 'this@gmail.com',
    phone: '123456789',
    address: 'test',
    description: 'test',
  }
  const contact = {
    name: 'test',
    email: 'this@gmail.com',
    phone: '123456789',
    address: 'test',
    description: 'test',
  }
  const mockAppService = {
    getHello: jest.fn(() => 'Hello World!'),
    getContacts: jest.fn((page: number, search: string) => {
      return [
        mockUser
      ];
    }),
    getContact: jest.fn((name: string, search: string) => {
      return mockUser
    }),
    addContact: jest.fn((contact: any) => {
      return mockUser;
    }),
    updateContact: jest.fn((_id: string, contact: any) => {
      return mockUser
    }),
    deleteContact: jest.fn((_id: string) => {
      return mockUser;
    }),
  }
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).overrideProvider(AppService).useValue(mockAppService).compile();

    appController = app.get<AppController>(AppController);
  });
  it('should be defined', () => {
    expect(appController).toBeDefined();
  });
  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });

});
