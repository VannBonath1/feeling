import { Test, TestingModule } from '@nestjs/testing';
import { NoteTestController } from './note-test.controller';

describe('NoteTestController', () => {
  let controller: NoteTestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NoteTestController],
    }).compile();

    controller = module.get<NoteTestController>(NoteTestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
