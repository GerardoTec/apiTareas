import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PiezasController } from './pieza.controller';
import { PiezaService } from './pieza.service';
import { Pieza } from './entities/pieza.entity';
import { Archivo } from 'src/archivos/entities/archivo.entity';
import { AuthModule } from 'src/auth/auth.module';


@Module({
  controllers: [PiezasController],
  providers: [PiezaService],
  imports:[TypeOrmModule.forFeature([Pieza,Archivo]), AuthModule]
})
export class PiezasModule {}
