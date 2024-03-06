import { Module } from '@nestjs/common';
import { ArchivosController } from './archivos.controller';
import { ArchivosService } from './archivos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Archivo } from './entities/archivo.entity';

@Module({
  controllers: [ArchivosController],
  providers:[ArchivosService],
  imports:[TypeOrmModule.forFeature([Archivo])]
})
export class ArchivosModule {}
