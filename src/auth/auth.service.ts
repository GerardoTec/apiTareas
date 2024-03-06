import { Injectable, UnauthorizedException } from '@nestjs/common';
import {LoginAuth } from './dto/login-auth.dto';
import { ValidationUtil } from 'src/Utils/validation.util';
import { Usuarios } from 'src/usuarios/entities/usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt.payload.interface';
import { AltaUsuarioDto } from 'src/usuarios/dto/create-usuario.dto';


@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Usuarios)
        private usuariosRepository : Repository<Usuarios>,
        private readonly jwtService : JwtService
    ){}
    async login(credentials: LoginAuth):Promise<AltaUsuarioDto>{
        console.log(credentials)
            const {correo, password: passwordCurretn} = credentials;
        ValidationUtil.assertNotNull(correo,'El correo es requerido.');
        ValidationUtil.assertNotNull(passwordCurretn,'La contraseña es requerida.');

        const userLogin = await this.usuariosRepository.findOne({where:{correo}});

        if(!userLogin)
            throw new UnauthorizedException('El usuario y/o contraseña son incorrectos.')
        console.log(userLogin)
        const isPassword = await bcrypt.compare(passwordCurretn, userLogin.password);

        if(!isPassword)
        throw new UnauthorizedException('El usuario y/o contraseña son incorrectos.')

        const { password, ...userWithoutPassword } = userLogin;
        return {
            ...userWithoutPassword,
            token: this.generarToken({id:userLogin.id})
        }
        
        
    }

   private  generarToken(payload: JwtPayload){

        const token = this.jwtService.sign(payload);
        return token;
    }
}
