import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { UserTestModule } from 'src/user-test/user-test.module';
import { NoteTestModule } from 'src/note-test/note-test.module';

@Module({
  imports: [
    UserTestModule,
    NoteTestModule,
    UserModule, // Assuming you have a user module
    PassportModule,
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: 'admin',
        signOptions: { expiresIn: '1h' },
      }),
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
