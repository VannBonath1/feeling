import { Test, TestingModule } from '@nestjs/testing';
import { NoteTestService } from './note-test.service';

describe('NoteTestService', () => {
  let service: NoteTestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NoteTestService],
    }).compile();

    service = module.get<NoteTestService>(NoteTestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
