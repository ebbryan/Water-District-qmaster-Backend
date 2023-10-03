import {
  ForbiddenException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CounterPersonnelService } from 'src/counter-personnel/counter-personnel.service';
import { compare } from 'bcrypt';
import jwtConfig from 'src/config/jwt.config';

@Injectable()
export class AuthService {
  constructor(
    private counterPersonnelService: CounterPersonnelService,
    private jwtService: JwtService,
  ) {}

  async signIn(username, password) {
    const user = await this.counterPersonnelService.findOneBy(username);
    if (!user || !(await compare(password, user.password))) {
      throw new UnauthorizedException();
    }
    if (user.isActive === false) {
      throw new ForbiddenException(
        'Your account is not active. Please contact the administrator for further details.',
      );
    }
    const payload = {
      transactionType: user.transactionType
        ? {
            id: user.transactionType.id,
            name: user.transactionType.name, // or any other property of the TransactionType entity
          }
        : null,
      sub: user.id,
    };
    return {
      accessToken: await this.jwtService.signAsync(payload),
      transactionType: user.transactionType
        ? {
            id: user.transactionType.id,
            name: user.transactionType.name, // or any other property of the TransactionType entity
          }
        : null,
      sub: user.id,
    };
  }
}
