import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { handleDBExceptions } from "src/Utils/handleDBExceptions.utils";
import { InjectRepository } from "@nestjs/typeorm";
import { UserTask } from "./entities/userTask.entity";
import { UserDto } from "./dto/UserDto";
import { encriptarContraseña } from "src/Utils/usuarios.utils";




@Injectable()
export class UserTaskService{
    constructor(
        @InjectRepository(UserTask)
        private userTaskRepository: Repository<UserTask>,    
    ){}

    async addUser(body:UserDto){
        try {
            const user = this.userTaskRepository.create({
                nombre: body.nombre,
                apellidoPaterno: body.apellidoPaterno,
                apellidoMaterno: body.apellidoMaterno,
                correo: body.correo,
                password:body.password,
                telefono: body.telefono,
                role:body.role
            });

            const passwordBcrypt = await encriptarContraseña(user.password);
             user.password = passwordBcrypt;
             
            const userBD = await this.userTaskRepository.save(user);
            return userBD;
        } catch (error) {
            handleDBExceptions(error,'usuarioService');
        }
        
    }

}