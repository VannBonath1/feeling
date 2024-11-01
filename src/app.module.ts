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

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'postgres',
      entities: [User, Note], // Add your entities here
      synchronize: true, // Should be false in production
    }),
    UserModule,
    NoteModule,
    AuthModule, // Register entity with TypeORM
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
