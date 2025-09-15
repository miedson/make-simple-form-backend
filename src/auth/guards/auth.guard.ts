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
import { IS_PUBLIC_KEY } from '../decorators/is-public.decorator';
import { Reflector } from '@nestjs/core';

@Injectable({ scope: Scope.REQUEST })
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    const request: Request = context.switchToHttp().getRequest();
    const authorization: string | undefined = request.headers.authorization;

    if (isPublic) {
      return true;
    }

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
