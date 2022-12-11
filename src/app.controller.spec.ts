import { JwtService } from '@nestjs/jwt';
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
  const mockJwtService = {
    sign: jest.fn((payload: any) => {
      return '123456';
    }),
    verify: jest.fn((token: string) => {
      return {
        _id: '1',
        name: 'test',
        email: ''
      }
    })
  }
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      // JwtService,

      controllers: [AppController],
      providers: [AppService,

      ],
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
  describe('getContacts', () => {
    it('should return a list of contacts', async () => {
      expect(await appController.getContacts(1, '')).toEqual([
        {
          _id: expect.any(String),
          name: expect.any(String),
          email: expect.any(String),
          phone: expect.any(String),
          address: expect.any(String),
          description: expect.any(String),
        },
      ]);
    });
  });
  describe('getContact', () => {
    it('should return a contact', async () => {
      expect(await appController.getContact('1')).toEqual({
        _id: expect.any(String),
        name: expect.any(String),
        email: expect.any(String),
        phone: expect.any(String),
        address: expect.any(String),
        description: expect.any(String),
      });
    });
  }
  );
  describe('addContact', () => {
    it('should return a contact', async () => {

      expect(await appController.addContact(contact)).toEqual({
        _id: expect.any(String),
        name: expect.any(String),
        email: expect.any(String),
        phone: expect.any(String),
        address: expect.any(String),
        description: expect.any(String),
      });

    });
  });
  describe('updateContact', () => {
    it('should return a contact', async () => {

      expect(await appController.updateContact('1', contact)).toEqual({
        _id: expect.any(String),
        name: expect.any(String),
        email: expect.any(String),
        phone: expect.any(String),
        address: expect.any(String),
        description: expect.any(String),
      });
    });
  });
  describe('deleteContact', () => {
    it('should return a contact', async () => {
      expect(await appController.deleteContact('1')).toEqual({
        _id: expect.any(String),
        name: expect.any(String),
        email: expect.any(String),
        phone: expect.any(String),
        address: expect.any(String),
        description: expect.any(String),
      });
    });
  }
  );
});
