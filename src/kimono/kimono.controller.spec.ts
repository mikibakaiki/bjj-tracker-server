import { Test, TestingModule } from '@nestjs/testing';
import { KimonoController } from './kimono.controller';

describe('KimonoController', () => {
  let controller: KimonoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KimonoController],
    }).compile();

    controller = module.get<KimonoController>(KimonoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
