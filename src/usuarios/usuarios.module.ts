import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuarios } from './entities/usuario.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [UsuariosController],
  providers: [UsuariosService],
  imports:[TypeOrmModule.forFeature([Usuarios]),AuthModule]
})
export class UsuariosModule {}
