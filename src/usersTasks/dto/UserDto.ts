import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class UserDto {
    @IsNotEmpty({message:'El nombre es requerido.'})
    nombre:string;
    @IsNotEmpty({message:'El Apellido paterno es requerido.'})
    apellidoPaterno:string;
    apellidoMaterno:string;
    @IsNotEmpty({message:'El Correo  es requerido.'})
    @IsEmail({},{message:'El campo no es un correo valido.'})
    correo:string;
    @IsNotEmpty({message:'La contraseña  es requerida.'})
    password:string;
    @IsNotEmpty({message:'El teléfono es requerido.'})
    @MinLength(10,{message:'El teléfono debe tener minimo y maximo 10 caracteres'})
    @MaxLength(10,{message:'El teléfono debe tener minimo y maximo 10 caracteres'})
    telefono:string;
    role:string;
    token:string
}