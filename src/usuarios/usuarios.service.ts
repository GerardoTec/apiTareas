import {Injectable, InternalServerErrorException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as nodemailer from 'nodemailer';
import { correoConfig } from 'Configurations/CorreoConfig';
import { construirHtmlCorreo, encriptarContraseña, generatePassword } from 'src/Utils/usuarios.utils';
import { UpDatePassword } from 'src/usuarios/dto/UpdatePassword.dto';
import * as bcrypt from 'bcryptjs';
import { ValidationUtil } from 'src/Utils/validation.util';
import { Usuarios } from './entities/usuario.entity';
import { handleDBExceptions } from 'src/Utils/handleDBExceptions.utils';


@Injectable()

export class UsuariosService{
    private transporter;
    constructor(
        @InjectRepository(Usuarios)
        private usuariosRepository : Repository<Usuarios>
    ){
        this.transporter = nodemailer.createTransport(correoConfig);
    }

    async saveUser(body:any){
        try {
            const user = this.usuariosRepository.create({
                nombre: body.nombre,
                apellidoPaterno: body.apellidoPaterno,
                apellidoMaterno: body.apellidoMaterno,
                correo: body.correo,
                telefono: body.telefono,
                role:body.role
            });
    
            const userBD = await this.usuariosRepository.save(user);
            return userBD;
        } catch (error) {
            handleDBExceptions(error,'usuarioService');
        }
        
    }


    async enviarCorreoTemporal(correo:string){

        try {
            const userBD = await this.usuariosRepository.findOne({where:{correo}});
            const {nombre} = userBD;
            const password = generatePassword(10);
            const htmlToSend = construirHtmlCorreo(nombre,password);
    
            const mailOptions = {
                from: 'apiyonkes@gmail.com',
                to: correo,
                subject: 'Contraseña temporal.',
                html:htmlToSend
            }
            
            const hashedPassword = await encriptarContraseña(password);
            userBD.password = hashedPassword;
            userBD.passwordType = 'TEMPORAL'
    
           await this.usuariosRepository.save(userBD);
    
            await this.transporter.sendMail(mailOptions);
    
           return {
            message:'Correo enviado exitosamente.',
            userBD
           }
        } catch (error) {
            handleDBExceptions(error,'usuarioService')
        }
       
    }

    async upDatePasswordTemporal (credentials: UpDatePassword){
        const {correo, passwordCurrent, newPassword} = credentials
            
       ValidationUtil.assertNotNull(correo,'El correo es requerido.');
       ValidationUtil.assertNotNull(passwordCurrent,'La contraseña actual es requerida.');
       ValidationUtil.assertNotNull(newPassword,'La nueva contraseña  es requerida.');

        const userDB = await this.usuariosRepository.findOne({where:{correo}})

        if(userDB){

            const isPassword = await bcrypt.compare(passwordCurrent, userDB.password);

            if(isPassword){
                const newPasswordToDB = await encriptarContraseña(newPassword);
                userDB.passwordType = 'PERMANENTE';
                userDB.password = newPasswordToDB;

                await this.usuariosRepository.save(userDB);
                return{
                  message:  'Contraseña actualizada exitosamente.',
                  userDB
                }
            }
        }
    }

    


}