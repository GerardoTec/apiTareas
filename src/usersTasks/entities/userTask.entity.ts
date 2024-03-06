import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity({name:'users'})
export class UserTask {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({nullable:false})
    nombre : string;

    @Column({nullable:false})
    apellidoPaterno:string;
    
    @Column({nullable:false})
    apellidoMaterno:string;

    @Column({nullable:false, unique:true})
    
    correo:string;

    @Column({nullable:false})
    telefono:string;
    
    @Column({default:'', nullable:false})
    password:string;

    @Column({nullable:false})
    role:string;

    @Column({default: 'ACTIVO'})
    estatus:string;

 
}