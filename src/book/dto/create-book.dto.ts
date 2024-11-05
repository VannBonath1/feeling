// src/books/dto/create-book.dto.ts
export class CreateBookDto {
  title: string;
  publicationDate?: Date;
  authorId: number;
}
