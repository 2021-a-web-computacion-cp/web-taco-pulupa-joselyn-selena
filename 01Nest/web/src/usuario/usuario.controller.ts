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
    Query, Res
} from "@nestjs/common";
import {UsuarioService} from "./usuario.service";
import {Prisma} from '@prisma/client';
import {UsuarioCrearDto} from "./dto/usuario-crear.dto";
import {validate} from "class-validator";

//Http://localhost:3000/usuario
@Controller('usuario')
export class UsuarioController{
    constructor(
        //Inyeccion de dependencias
        private usuarioService: UsuarioService
    ) {
    }

    @Post('crear-usuario-formulario')
    async crearUsuarioFormulario(
        @Res() response,
        @Body() parametrosCuerpo,
    ){
        try {
            const respuestaUsuario = await this.usuarioService.crearUno({
                nombre: parametrosCuerpo.nombre,
                apellido: parametrosCuerpo.apellido,
            });
            response.redirect('/usuario/vista-crear' +
            '?mensaje= Se creo el usuario'+
            parametrosCuerpo.nombre,);
        }catch (error){
            console.error(error);
            throw new InternalServerErrorException('Error creando usuario');
        }
    }

    @Get('inicio')
    inicio(@Res() response){
        response.render('inicio')
    }

    @Post('eliminar-usuario/:idUsuario')
    async eliminarUsuario(
        @Res() response,
        @Param() parametrosRuta){
        try {
            await this.usuarioService.eliminarUno(+parametrosRuta.idUsuario)
            response.redirect(
                'usuario/lista-usuario'+
                '?mensaje=Se elimino al usuario',
            );
        }catch (error){
            console.error(error);
            throw new InternalServerErrorException('Error')
        }
    }

    @Get('vista-crear')
    vistaCrear(@Res() response, @Query() parametrosConsulta,){
        response.render('usuario/crear',{
            datos:{
                mensaje: parametrosConsulta.mensaje,
            },
        });
    }

    @Get('lista-usuarios')
    async listaUsuarios(
        @Res() response,
        @Query() parametrosConsulta,
    ){
        try {
            //validar parametros de consulta con un DTO
            const respuesta = await this.usuarioService
                .buscarMuchos( {
                    skip: parametrosConsulta.skip ? +parametrosConsulta.skip: undefined,
                    take: parametrosConsulta.take ? +parametrosConsulta.take: undefined,
                    busqueda: parametrosConsulta.busqueda ? parametrosConsulta.busqueda: undefined,
            });
           // console.log(respuesta)
            response.render('usuario/lista',{
                datos:{
                    usuarios: respuesta,
                    mensaje: parametrosConsulta.mensaje,
                },
                });

        }catch (error) {
        throw  new InternalServerErrorException('Error del servidor')

        }

    }

    @Get(':idUsuario')
    obtenerUno(@Param() parametrosRuta){
        return this.usuarioService.buscarUno(+parametrosRuta.idUsuario)
    }

    @Post('crear')
    crearUsuario(@Body() bodyParams,){
        const nombre = bodyParams.nombre;
        const apellido = bodyParams.apellido;
        return this.usuarioService.crearUno({apellido:apellido,nombre:nombre})
    }

    @Put('editar/:idUsuario')
    editarUno(@Param() parametrosRuta,@Body() bodyParams,){

        id: Number(parametrosRuta.idUsuario);

        const data: Prisma.EPN_USUARIOUpdateInput = {
            apellido: bodyParams.apellido,
            nombre: bodyParams.nombre,
        };

        const parametrosActualizar = {
            id: Number(parametrosRuta.idUsuario),
            data: data,
        };

        return this.usuarioService.actualizarUno(parametrosActualizar)
    }

    @Delete('eliminar/:idUsuario')
    eliminarUno(@Param() parametrosRuta){
        return this.usuarioService.eliminarUno(+parametrosRuta.idUsuario);
    }

    @Post()
    async crearUno(@Body() bodyParams,) {
        const usuariocrearDto = new UsuarioCrearDto();
        usuariocrearDto.nombre = bodyParams.nombre;
        usuariocrearDto.apellido = bodyParams.apellido;
        usuariocrearDto.fechaCreacion = bodyParams.fechaCreacion;

        try {
            const errores = await validate(usuariocrearDto);
            if (errores.length > 0) {
                throw new BadRequestException('No envia bien parametros');
            } else {
                return this.usuarioService.crearUno(usuariocrearDto);
            }
        } catch (error) {
            console.error({error: error, mensaje: 'Errores en crear usuario'});
            throw new InternalServerErrorException('Error servidor');
        }

    }

}