import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Scope,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { AuthPayload } from '../types/auth-payload.type';
import { ConfigService } from '@nestjs/config';

@Injectable({ scope: Scope.REQUEST })
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const request: Request = context.switchToHttp().getRequest();
    const authorization: string | undefined = request.headers.authorization;

    if (!authorization) {
      throw new UnauthorizedException('Token não fornecido');
    }

    const [, token] = authorization.split(' ');

    if (!token) {
      throw new UnauthorizedException('Token mal formatado');
    }

    try {
      const payload: AuthPayload = this.jwtService.verify(token, {
        secret: this.configService.get<string>('auth.secret'),
      });

      return !!payload;
    } catch {
      throw new UnauthorizedException('Token inválido ou expirado');
    }
  }
}
