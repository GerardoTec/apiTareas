import {Controller,Body,Post, BadRequestException} from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { AltaUsuarioDto } from './dto/create-usuario.dto';
import { UpDatePassword } from './dto/UpdatePassword.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';


@Controller('usuarios')
export class UsuariosController{
    constructor(private usuariosServicear:UsuariosService){}

    @Post('guardar')
    @Auth()
    async saveNewUser(@Body() user: AltaUsuarioDto){
        try {
            if(user){
                return this.usuariosServicear.saveUser(user);
            }
        } catch (error) {
            if(error instanceof BadRequestException){
                throw error
            }else{
                throw new Error('Ocurrio un error al guardar el usuario.')
            }
        }
    }

    @Post('generar/temporal')
    async generarPasswordTemporal(@Body() email: AltaUsuarioDto){
        const {correo} = email;
        try {
            if(correo){
              return this.usuariosServicear.enviarCorreoTemporal(correo);
            }
        } catch (error) {
            throw new Error('Ocurrio un error al al enviar el correo.')
        }
    }

    @Post('/upDatePassword')
    async updatePasswordUser(@Body() credentials: UpDatePassword){
        try {
                return this.usuariosServicear.upDatePasswordTemporal(credentials)
            
        } catch (error) {
            throw new Error('Ocurrio un error al actualizar la contraseña.')
        }
    }


}