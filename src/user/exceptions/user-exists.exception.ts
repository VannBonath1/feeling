// exceptions/user-exists.exception.ts
import { HttpException, HttpStatus } from '@nestjs/common';

export class UserExistsException extends HttpException {
  constructor(message: string = 'Username is already taken.') {
    super(message, HttpStatus.BAD_REQUEST); // Use 400 Bad Request for user errors
  }
}
