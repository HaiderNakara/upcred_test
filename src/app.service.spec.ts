import { getModelToken } from "@nestjs/mongoose";
import { Test, TestingModule } from "@nestjs/testing";
import { AppService } from "./app.service";
import { Contact } from "./entities/app.entity";

describe("AppService", () => {
  let service: AppService;
  const mockUser =
  {
    _id: "1",
    name: "test",
    email: "",
    phone: "123456789",
    address: "test",
    description: "test",
  }

  const mockAppRepository = {
    find: jest.fn().mockImplementation((page: number, search: string) => ({
      skip: jest.fn().mockImplementation((page: number) => ({
        limit: jest.fn().mockImplementation((limit: number) => ({
          exec: jest.fn().mockImplementation(() => [mockUser])
        }))
      }))
    })),
    findOne: jest.fn().mockImplementationOnce((name: string) => (
      {
        exec: jest.fn().mockResolvedValueOnce(() => {
          return mockUser
        })
      }
    )),
    save: jest.fn().mockImplementation((contact: any) => {
      return mockUser;
    }),
    update: jest.fn().mockImplementation((name: string, contact: any) => {
      return mockUser
    }),
    delete: jest.fn().mockImplementation((name: string) => {
      return mockUser;
    }),
    findById: jest.fn().mockImplementation((id: string) => {
      return mockUser;
    }).mockReturnThis(),
    exec: jest.fn().mockImplementation(() => {
      return mockUser
    }),
    skip: jest.fn().mockImplementation((page: number) => {
      return [
        mockUser
      ]
    }),
    findByIdAndUpdate: jest.fn().mockImplementation((id: string, contact: any) => {
      return mockUser;
    }),
    findByIdAndDelete: jest.fn().mockImplementation((id: string) => {
      return mockUser;
    }),


  };


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppService,
        {
          provide: getModelToken(Contact.name),
          useValue: mockAppRepository,
        }
      ],
    }).compile();

    service = module.get<AppService>(AppService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
  it("should return an array of contacts", async () => {
    expect(await service.getContacts(1, "ol")).toEqual(
      [
        {
          _id: expect.any(String),
          name: expect.any(String),
          email: expect.any(String),
          phone: expect.any(String),
          address: expect.any(String),
          description: expect.any(String),
        },
      ]
    );
  }
  );
  it("should return a contact", async () => {
    expect(await service.getContact("1")).toEqual(
      {
        _id: expect.any(String),
        name: expect.any(String),
        email: expect.any(String),
        phone: expect.any(String),
        address: expect.any(String),
        description: expect.any(String),
      }
    );
  }
  );
  it("should return a contact", async () => {
    expect(await service.addContact({
      name: "test",
      email: "",
      phone: "123456789",
      address: "test",
      description: "test",
    })).toEqual(
      {
        _id: expect.any(String),
        name: expect.any(String),
        email: expect.any(String),
        phone: expect.any(String),
        address: expect.any(String),
        description: expect.any(String),
      }
    );
  }
  );
  it("should return a contact", async () => {
    expect(await service.updateContact("1", {
      name: "test",
      email: "",
      phone: "123456789",
      address: "test",
      description: "test",
    })).toEqual(
      {
        _id: expect.any(String),
        name: expect.any(String),
        email: expect.any(String),
        phone: expect.any(String),
        address: expect.any(String),
        description: expect.any(String),
      }
    );
  }
  );
  it("should return a contact", async () => {
    expect(await service.deleteContact("1")).toEqual(
      {
        _id: expect.any(String),
        name: expect.any(String),
        email: expect.any(String),
        phone: expect.any(String),
        address: expect.any(String),
        description: expect.any(String),
      }
    );
  }
  );

});