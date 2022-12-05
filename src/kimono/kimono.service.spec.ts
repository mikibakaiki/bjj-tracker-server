import { Test, TestingModule } from '@nestjs/testing';
import { KimonoService } from './kimono.service';

describe('KimonoService', () => {
  let service: KimonoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KimonoService],
    }).compile();

    service = module.get<KimonoService>(KimonoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
