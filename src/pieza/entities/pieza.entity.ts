import { Archivo } from 'src/archivos/entities/archivo.entity';
import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';

@Entity({name:'pieza'})
export class Pieza {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({default:'',nullable:false})
    nombre : string;

    @Column({default:'',nullable:false})
    marca:string;
    
    @Column({default:'',nullable:false})
    modelo:string;

    @Column({default:'',nullable:false})
    anio:string;

    @Column({default:'',nullable:false})
    descripcion:string;

    @Column({default:0, nullable:false})
    precio:number;

    
    @Column({default:'EN STOCK', nullable:false})
    estatus:string;

    @OneToMany(type => Archivo, archivo => archivo.pieza)
    archivos: Archivo[];
 
}