import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { AuthorModule } from 'src/author/author.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Book]),
    AuthorModule, // Import AuthorModule here// This enables your module to access and utilize the database operations related to the User entity through dependency injection
  ],
  providers: [BookService],
  controllers: [BookController],
  exports: [BookService], // Export UserService for use in other modulesd
})
export class BookModule {}
