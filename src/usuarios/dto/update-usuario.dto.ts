import { PartialType } from '@nestjs/mapped-types';
import { AltaUsuarioDto } from './create-usuario.dto';

export class UpdateUsuarioDto extends PartialType(AltaUsuarioDto) {}
