import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthService } from '../services/auth.service';
import { AuthDto } from '../dto/auth.dto';
import { Public } from '../decorators/is-public.decorator';

@ApiTags('Autenticação')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Autenticação' })
  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login')
  signIn(@Body() { email, password }: AuthDto) {
    return this.authService.signIn(email, password);
  }
}
