import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthService } from '../services/auth.service';
import { AuthDto } from '../dto/auth.dto';

@ApiTags('Autenticação')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Autenticação' })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() { username, password }: AuthDto) {
    return this.authService.signIn(username, password);
  }
}
