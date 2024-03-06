import {Controller,Body,Post, BadRequestException,Get, UploadedFiles, UseInterceptors, Res, Param} from '@nestjs/common';
import { PiezaDto } from './dto/pieza.dto';
import { PiezaService } from './pieza.service';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { buscadorDto } from './dto/buscador.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ValidRoles } from 'src/auth/interfaces';
const mime = require('mime');


@Controller('piezas')
export class PiezasController{
    constructor(private piezasService:PiezaService){}

    @Post('agregar/nueva')
    @Auth(ValidRoles.administrador)
    @UseInterceptors(AnyFilesInterceptor())
    async agregarPieza(@Body() pieza: PiezaDto, @UploadedFiles() files: Array<Express.Multer.File>){
        try {
            if(pieza){
                return this.piezasService.crearPieza(pieza,files);
            }
        } catch (error) {
            throw new BadRequestException('Ocurrio un error al guardar la pieza.')
        }
    }

    @Get('obtener/piezas')
    async obtenerPiezas(){
        try {
            return this.piezasService.obtenerPiezas();
        } catch (error) {
            throw new BadRequestException('Ocurrio un error al obtener el listado de las piezas.')
        }
    }
    @Post('busqueda')
    async buscarPieza(@Body() pieza: buscadorDto){
        try {
            return this.piezasService.buscarPiezas(pieza);
        } catch (error) {
            throw new Error('ocurrio un error al buscar la pieza')
        }
    }

    @Get('/:id/:filename')
    async findById(
        @Param('id') idProspecto: number,
        @Param('filename') filename: string,
        @Res() response
    ) {
        console.log(idProspecto,filename)
        const pathFile = await this.piezasService.getDocument(idProspecto, filename);
        const type = mime.lookup(pathFile);
        if (!response.getHeader('content-type')) response.setHeader('Content-Type', type);
        response.sendFile(pathFile);
    }
}
