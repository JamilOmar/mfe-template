import { Test, TestingModule } from '@nestjs/testing';
import { MFEConfigurationService } from './mfe-configuration.service';
import { MFEConfigurationRepository } from './mfe-configuration.repository';
import { CreateMFEConfigurationDto } from './dto/create-mfe-configuration-dto';
import { UpdateMFEConfigurationDto } from './dto/update-mfe-configuration-dto';
import { MFEConfiguration } from './mfe-configuration.schema';

const MFE_ALREADY_EXISTS_ERROR = 'MFE already exists';
const MFE_NOT_FOUND_ERROR = 'MFE not found';

describe('MFEConfigurationService', () => {
  let service: MFEConfigurationService;
  let repository: MFEConfigurationRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MFEConfigurationService,
        {
          provide: MFEConfigurationRepository,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<MFEConfigurationService>(MFEConfigurationService);
    repository = module.get<MFEConfigurationRepository>(
      MFEConfigurationRepository
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('create', () => {
    it('should throw an error if MFE already exists', async () => {
      jest.spyOn(service, 'exists').mockResolvedValue(true);
      const dto: CreateMFEConfigurationDto = {
        code: 'test-code',
        route: 'test-route',
        description: 'test-description',
        module: 'test-module',
        url: 'test-url',
        configuration: {},
        name: 'test-name',
        label: 'test-label',
        moduleClass: 'test-moduleClass',
      };

      await expect(service.create(dto)).rejects.toThrowError(
        MFE_ALREADY_EXISTS_ERROR
      );
    });

    it('should create a new MFE configuration if it does not exist', async () => {
      jest.spyOn(service, 'exists').mockResolvedValue(false);
      const dto: CreateMFEConfigurationDto = {
        code: 'test-code',
        route: 'test-route',
        description: 'test-description',
        module: 'test-module',
        url: 'test-url',
        configuration: {},
        name: 'test-name',
        label: 'test-label',
        moduleClass: 'test-moduleClass',
      };
      const expectedResult: MFEConfiguration = {
        _id: 'test-id',
        code: 'test-code',
        route: 'test-route',
        description: 'test-description',
        module: 'test-module',
        url: 'test-url',
        configuration: {},
        name: 'test-name',
        label: 'test-label',
        moduleClass: 'test-moduleClass',
      } as MFEConfiguration;

      jest.spyOn(repository, 'create').mockResolvedValue(expectedResult);

      const result = await service.create(dto);
      expect(result).toEqual(expectedResult);
      expect(repository.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('should return all MFE configurations', async () => {
      const expectedResult: MFEConfiguration[] = [
        {
          _id: 'test-id',
          code: 'test-code',
          route: 'test-route',
          description: 'test-description',
          module: 'test-module',
          url: 'test-url',
          configuration: {},
          name: 'test-name',
          label: 'test-label',
          moduleClass: 'test-moduleClass',
        } as MFEConfiguration,
      ];

      jest.spyOn(repository, 'findAll').mockResolvedValue(expectedResult);

      const result = await service.findAll();
      expect(result).toEqual(expectedResult);
    });
  });

  describe('update', () => {
    it('should throw an error if MFE does not exist', async () => {
      jest.spyOn(service, 'exists').mockResolvedValue(false);
      const dto: UpdateMFEConfigurationDto = {
        route: 'test-route',
        description: 'test-description',
        module: 'test-module',
        url: 'test-url',
        configuration: {},
        name: 'test-name',
        label: 'test-label',
        moduleClass: 'test-moduleClass',
      };

      await expect(service.update('test-code', dto)).rejects.toThrowError(
        MFE_NOT_FOUND_ERROR
      );
    });

    it('should update an existing MFE configuration', async () => {
      jest.spyOn(service, 'exists').mockResolvedValue(true);
      const dto: UpdateMFEConfigurationDto = {
        route: 'test-route',
        description: 'test-description',
        module: 'test-module',
        url: 'test-url',
        configuration: {},
        name: 'test-name',
        label: 'test-label',
        moduleClass: 'test-moduleClass',
      };

      jest.spyOn(repository, 'update').mockResolvedValue(undefined);

      await service.update('test-code', dto);
      expect(repository.update).toHaveBeenCalledWith('test-code', dto);
    });
  });

  describe('remove', () => {
    it('should throw an error if MFE does not exist', async () => {
      jest.spyOn(service, 'exists').mockResolvedValue(false);

      await expect(service.remove('test-code')).rejects.toThrowError(
        MFE_NOT_FOUND_ERROR
      );
    });

    it('should remove an existing MFE configuration', async () => {
      jest.spyOn(service, 'exists').mockResolvedValue(true);

      jest.spyOn(repository, 'remove').mockResolvedValue(undefined);

      await service.remove('test-code');
      expect(repository.remove).toHaveBeenCalledWith('test-code');
    });
  });

  describe('findOne', () => {
    it('should return the MFE configuration', async () => {
      const expectedResult: MFEConfiguration = {
        _id: 'test-id',
        code: 'test-code',
        route: 'test-route',
        description: 'test-description',
        module: 'test-module',
        url: 'test-url',
        configuration: {},
        name: 'test-name',
        label: 'test-label',
        moduleClass: 'test-moduleClass',
      } as MFEConfiguration;

      jest
        .spyOn(repository, 'findOne')
        .mockResolvedValue(expectedResult as any);

      const result = await service.findOne('test-code');
      expect(result).toEqual(expectedResult);
    });

    it('should return null if MFE configuration does not exist', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      const result = await service.findOne('test-code');
      expect(result).toBeNull();
    });
  });

  describe('exists', () => {
    it('should return true if MFE configuration exists', async () => {
      const expectedResult: MFEConfiguration = {
        _id: 'test-id',
        code: 'test-code',
        route: 'test-route',
        description: 'test-description',
        module: 'test-module',
        url: 'test-url',
        configuration: {},
        name: 'test-name',
        label: 'test-label',
        moduleClass: 'test-moduleClass',
      } as MFEConfiguration;

      jest
        .spyOn(repository, 'findOne')
        .mockResolvedValue(expectedResult as any);

      const result = await service.exists('test-code');
      expect(result).toBe(true);
    });

    it('should return false if MFE configuration does not exist', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      const result = await service.exists('test-code');
      expect(result).toBe(false);
    });
  });
});
