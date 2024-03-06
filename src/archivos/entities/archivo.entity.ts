import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Pieza } from 'src/pieza/entities/pieza.entity';

@Entity({name:'archivos'})
export class Archivo {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ default:'', name: 'nombre' })
  nombre: string;
  
  @Column({default:'', name: 'fileUrl'})
  fileUrl: string;

  @Column({ name: 'idPieza' })
  idPieza: number;

  @ManyToOne(() => Pieza, pieza => pieza.archivos)
  @JoinColumn({ name: 'idPieza' })
  pieza?: Pieza;
}