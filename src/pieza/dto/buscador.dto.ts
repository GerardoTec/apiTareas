import { Optional } from "@nestjs/common";

export class buscadorDto{
    @Optional()
    nombre?:string;
    marca?:string;
    modelo?:string;
    anio?:string;
}