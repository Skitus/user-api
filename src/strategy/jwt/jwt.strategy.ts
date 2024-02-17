import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import configuration from 'config/configuration';
import { IUser } from 'interface/apiRequest';

const jwtConfig = configuration().jwt;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConfig.secretAccessToken,
    });
  }

  async validate(payload: IUser) {
    return { userId: payload.sub, email: payload.email };
  }
}
