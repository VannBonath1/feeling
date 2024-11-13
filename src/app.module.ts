import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';
import { DataSource } from 'typeorm';
import { Note } from './note/note.entity';
import { NoteModule } from './note/note.module';
import { AuthModule } from './auth/auth.module';
import { AuthorModule } from './author/author.module';
import { BookModule } from './book/book.module';
import { Author } from './author/author.entity';
import { Book } from './book/book.entity';
import { UserTestModule } from './user-test/user-test.module';
import { NoteTestModule } from './note-test/note-test.module';
import { UserTest } from './user-test/user-test.entity';
import { NoteTest } from './note-test/note-test.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'postgres',
      entities: [User, Note, Author, Book, UserTest, NoteTest], // Add your entities here
      synchronize: true, // Should be false in production
    }),
    TypeOrmModule.forFeature([UserTest, NoteTest, AuthModule]),
    UserModule,
    NoteModule,
    AuthModule,
    AuthorModule,
    BookModule,
    UserTestModule,
    NoteTestModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})

// code below just to show connect successfully when connected to postgresql success
export class AppModule implements OnModuleInit {
  constructor(private dataSource: DataSource) {}

  async onModuleInit() {
    try {
      // Check if connection is established
      if (this.dataSource.isInitialized) {
        console.log('✅ Database connection established successfully!');
      } else {
        console.error('❌ Failed to connect to the database.');
      }
    } catch (error) {
      console.error('❌ Error during database connection:', error);
    }
  }
}
