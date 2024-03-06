import {IsNotEmpty } from "class-validator";

export class TaskDto {
    @IsNotEmpty({message:"El nombre de la tarea es requerido."})
   nombre: string
   @IsNotEmpty({message:"La descripcion de la tarea es requerida."})
   descripcion:string
   @IsNotEmpty({message:"La prioridad de la tarea es requerida."})
   prioridad:string
   estatus:string
   @IsNotEmpty({message:"El id del usuario es requerido."})
   userId:number
}