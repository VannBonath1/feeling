import { Module } from '@nestjs/common';
import { AuthorService } from './author.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from './author.entity';
import { AuthorController } from './author.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Author]), // This enables your module to access and utilize the database operations related to the User entity through dependency injection
  ],
  providers: [AuthorService],
  controllers: [AuthorController],
  exports: [TypeOrmModule], // Exporting TypeOrmModule so other modules can use AuthorRepository
})
export class AuthorModule {}
