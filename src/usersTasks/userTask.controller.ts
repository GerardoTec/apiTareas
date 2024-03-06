import {Controller,Body,Post, BadRequestException,Get, UploadedFiles, UseInterceptors, Res, Param} from '@nestjs/common';
import { UserDto } from './dto/UserDto';
import { UserTaskService } from './userTasks.service';



@Controller('users')
export class UserTaskController{
    constructor(private userTaskService:UserTaskService){}

    @Post("add/user")
    async addUser(@Body() user: UserDto){
        try {
            if(user){
                return this.userTaskService.addUser(user);
            } 
        } catch (error) {
            throw new BadRequestException('Ocurrio un error al guardar al usuario.')   
        }
    }


}
