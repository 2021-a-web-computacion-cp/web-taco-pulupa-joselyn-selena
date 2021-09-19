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

    @Get('lista-usuarios')
    listaUsuarios(@Res() response){
        response.render('inicio')
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