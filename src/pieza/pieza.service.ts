import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Pieza } from "./entities/pieza.entity";
import { PiezaDto } from "./dto/pieza.dto";
import { handleDBExceptions } from "src/Utils/handleDBExceptions.utils";
import { InjectRepository } from "@nestjs/typeorm";
import { Archivo } from "src/archivos/entities/archivo.entity";
import { filesHandler, getPathFile } from "src/handlers/files.handler";
import { buscadorDto } from "./dto/buscador.dto";




@Injectable()
export class PiezaService{
    constructor(
        @InjectRepository(Pieza)
        private piezaRepository: Repository<Pieza>,
        @InjectRepository(Archivo)
        private readonly archivoRepository: Repository<Archivo>
    ){}

    async crearPieza(pieza: PiezaDto,files: Array<Express.Multer.File>){
        try {
            const piezaDB = await this.piezaRepository.save(pieza);

            if(files.length > 0){
                const documentsToSave = await filesHandler(piezaDB.id,files)
                  await this.archivoRepository.save(documentsToSave);
              }
              piezaDB.archivos = await this.archivoRepository.find({ where: { pieza: piezaDB } });

            return{
                message:'Se guardo la pieza correctamente.',
                piezaDB
            }
        } catch (error) {
            handleDBExceptions(error,'PiezaServices');
        }
    }

    async obtenerPiezas(): Promise<Pieza[]>{
        try {
            return this.piezaRepository.find({where:{estatus:'EN STOCK'},relations:['archivos']})
        } catch (error) {
            handleDBExceptions(error,'PiezaServices');
        }
    }

    async buscarPiezas(pieza: buscadorDto): Promise<any>{
        const {nombre,marca,modelo,anio} = pieza;
        try {
            const condiciones:{[key:string]:any} ={};

            if (nombre !== undefined && nombre !== null && nombre !=='') {
                condiciones.nombre = nombre;
              }
        
              if (marca !== undefined && marca !== null && marca !=='' ) {
                condiciones.marca = marca;
              }
        
              if (modelo !== undefined && modelo !== null && modelo !== '') {
                condiciones.modelo = modelo;
              }
        
              if (anio !== undefined && anio !== null && anio !=='') {
                condiciones.anio = anio;
              }
             condiciones.estatus = 'EN STOCK'
            const pieza = await this.piezaRepository.find({where:condiciones});
            return pieza;
        } catch (error) {
            handleDBExceptions(error,'PiezaServices');
        }
    }

    async getDocument(id: number, filename: string) {
        return await getPathFile(id, filename);
    }
}