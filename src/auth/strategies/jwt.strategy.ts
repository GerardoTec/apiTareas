import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayload } from "../interfaces/jwt.payload.interface";
import { Usuarios } from "src/usuarios/entities/usuario.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { UserTask } from "src/usersTasks/entities/userTask.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){

    constructor(
        @InjectRepository(UserTask)
        private readonly usuarioRepository: Repository<UserTask>,
         configService: ConfigService
    ){
        super({            
            secretOrKey:configService.get('SECRET_KEY'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }

    async validate(payload: JwtPayload):Promise<UserTask>{
        const { id } = payload;

        const user = this.usuarioRepository.findOneBy({id})

        if(!user)
        throw new UnauthorizedException('Token no valido.')

        if((await user).estatus !== "ACTIVO"){
            throw new UnauthorizedException('Usuario inactivo, llame al administrador.')
        }

        return user;
    }
}