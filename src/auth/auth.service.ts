import { Injectable } from '@nestjs/common';
import { SigninDto } from './dto/auth.dto';

@Injectable()
export class AuthService {

  // sign in user
  async signin(signInDto: SigninDto) {
    return signInDto;
  }


}
