import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    InternalServerErrorException,
    Param,
    Post,
    Put,
    Query,
    Res
} from "@nestjs/common";
import {CasaService} from "./casa.service";
import {Prisma} from "@prisma/client";
import {UsuarioCrearDto} from "../usuario/dto/usuario-crear.dto";
import {validate} from "class-validator";
import {CasaCrearDto} from "./dto/casa-crear.dto";
import {stringify} from "ts-jest/dist/utils/json";

@Controller('casas')
export class CasaController{
    constructor(
        //Inyeccion de dependencias
        private casaService: CasaService
    ) {
    }

    @Get('lista-casa')
    async listaCasa(
        @Res() response,
        @Query() parametrosConsulta,
    ){
        try {
            //validar parametros de consulta con un DTO
            const respuesta = await this.casaService
                .buscarMuchos( {
                    skip: parametrosConsulta.skip ? +parametrosConsulta.skip: undefined,
                    take: parametrosConsulta.take ? +parametrosConsulta.take: undefined,
                    busqueda: parametrosConsulta.busqueda ? parametrosConsulta.busqueda: undefined,
                });
            // console.log(respuesta)
            response.render('casa/lista',{
                datos:{
                    casa: respuesta,
                    mensaje: parametrosConsulta.mensaje,
                },
            });

        }catch (error) {
            throw  new InternalServerErrorException('Error del servidor')

        }

    }

    @Get('vista-crear')
    vistaCrear(@Res() response, @Query() parametrosConsulta,){
        console.log(parametrosConsulta.mensaje+"segundo")
        response.render('casa/crear',{
            datos:{
                mensaje: parametrosConsulta.mensaje,
            },
        });
    }

    @Post('eliminar-casa/:idCasa')
    async eliminarCasa(
        @Res() response,
        @Param() parametrosRuta){
        try {
            await this.casaService.eliminarUno(+parametrosRuta.idCasa)
            response.redirect(
                '/casas/lista-casa'+
                '?mensaje=Se elimino la casa',
            );
        }catch (error){
            console.error(error);
            throw new InternalServerErrorException('Error')
        }
    }

    @Post(':actualizar-casa/:idCasa')
    async obtenerUno(@Res() response,  @Param() parametrosRuta) {
        try {
            const respuesta = await this.casaService.buscarUno(+parametrosRuta.idCasa);
            response.render('casa/actualizar', {
                datos: {
                    casa: respuesta,
                },

            });

        } catch (error) {
            console.error(error)
            throw new InternalServerErrorException('Error')
        }
    }

    @Post('actualizar-casa-formulario/:idCasa')
    async actualizarUno(@Res() response,  @Param() parametrosRuta, @Body() parametrosCuerpo) {
        if(parametrosCuerpo.disponibilidad == "on"){
            parametrosCuerpo.disponibilidad = true
        }else {
            parametrosCuerpo.disponibilidad = false
        }
        const casa:Prisma.CASASUpdateInput = {
            fechaCreacion: new Date(parametrosCuerpo.fechaCreacion),
            numeroCuartos: +parametrosCuerpo.numeroCuartos,
            numeroBanios:  +parametrosCuerpo.numeroBanios,
            color:  parametrosCuerpo.color,
            numeroPisos:  +parametrosCuerpo.numeroPisos,
            precio:  Number(parametrosCuerpo.precio),
            sector: parametrosCuerpo.sector,
            disponibilidad: parametrosCuerpo.disponibilidad,
        }
        const parametrosActualizar = {
            id: Number(parametrosRuta.idCasa),
            data: casa,
        };
        try {
            await this.casaService.actualizarUno(parametrosActualizar);
            response.redirect('/casas/lista-casa'
                + '?mensaje= Se actualizo la casa');
        } catch (error) {
            console.log({error: error, mensaje: 'Errores en crear casa'});
            throw new InternalServerErrorException("Error del servidor");
        }

    }

    @Post('crear-casa-formulario')
    async crearCasaFormulario(
        @Res() response,
        @Body() parametrosCuerpo,
    ){
        const casaDto = new CasaCrearDto()
        casaDto.fechaCreacion = new Date (parametrosCuerpo.fechaCreacion);
        casaDto.numeroCuartos = +parametrosCuerpo.numeroCuartos;
        casaDto.numeroBanios = +parametrosCuerpo.numeroBanios;
        casaDto.color = parametrosCuerpo.color;
        casaDto.numeroPisos = +parametrosCuerpo.numeroPisos;
        casaDto.precio = Number(parametrosCuerpo.precio);

        casaDto.sector = parametrosCuerpo.sector;
        if(parametrosCuerpo.disponibilidad == "on"){
            casaDto.disponibilidad = true
        }else {
            casaDto.disponibilidad = false
        }

        try {
            const errores = await validate(casaDto)
            if(errores.length > 0){
                console.log(JSON,stringify(errores));
                throw new BadRequestException("No envía bien parametros");
            }else{
                return this.casaService.crearUno(casaDto);
                response.redirect('casas/lista-casa'
                    + '?mensaje= Se creo la casa en el sector '
                    + parametrosCuerpo.sector,);
            }
        }catch (error){
            console.error(error);
            throw new InternalServerErrorException('Error creando casa');
        }
    }

}