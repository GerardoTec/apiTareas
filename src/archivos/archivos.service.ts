import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Archivo } from './entities/archivo.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ArchivosService {
    constructor(
        @InjectRepository(Archivo)
        private readonly archivoRepository: Repository<Archivo>
    ){}

    
}
