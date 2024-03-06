import { Controller, Get, Post, Body} from '@nestjs/common';
import { AuthService } from './auth.service';
import {LoginAuth } from './dto/login-auth.dto';
import { GetUser } from './decorators/get-user.decorator';
import { Usuarios } from 'src/usuarios/entities/usuario.entity';
import { ValidRoles } from './interfaces';
import { Auth } from './decorators/auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() credenciales: LoginAuth){
      try {
        return this.authService.login(credenciales);
    } catch (error) {
        throw new Error('Ocurrio un error al iniciar sesion.')
    }
  }

  @Get('private')
  @Auth(ValidRoles.administrador)
  privateTest(
    @GetUser() user :Usuarios
  ){
    return {
      ok:true,
      message:'token valido.',
      user
    }
  }
}
