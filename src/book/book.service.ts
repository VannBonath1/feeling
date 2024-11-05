// src/books/book.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { Author } from 'src/author/author.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
  ) {}

  async createBook(createBookDto: CreateBookDto): Promise<Book> {
    const author = await this.authorRepository.findOneBy({
      id: createBookDto.authorId,
    });
    if (!author) {
      throw new Error('Author not found');
    }
    const book = this.bookRepository.create({ ...createBookDto, author });
    return this.bookRepository.save(book);
  }

  findAll(): Promise<Book[]> {
    return this.bookRepository.find({ relations: ['author'] });
  }
}
