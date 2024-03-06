import { PartialType } from "@nestjs/mapped-types";
import { Pieza } from "../entities/pieza.entity";


export class PiezaDto extends PartialType(Pieza){}