import { UsuarioService } from "./usuario.service";
import { Prisma } from '@prisma/client';
export declare class UsuarioController {
    private usuarioService;
    constructor(usuarioService: UsuarioService);
    crearUsuarioFormulario(response: any, parametrosCuerpo: any): Promise<void>;
    inicio(response: any): void;
    eliminarUsuario(response: any, parametrosRuta: any): Promise<void>;
    vistaCrear(response: any, parametrosConsulta: any): void;
    listaUsuarios(response: any, parametrosConsulta: any): Promise<void>;
    obtenerUno(parametrosRuta: any): Prisma.Prisma__EPN_USUARIOClient<import(".prisma/client").EPN_USUARIO>;
    crearUsuario(bodyParams: any): Prisma.Prisma__EPN_USUARIOClient<import(".prisma/client").EPN_USUARIO>;
    editarUno(parametrosRuta: any, bodyParams: any): Prisma.Prisma__EPN_USUARIOClient<import(".prisma/client").EPN_USUARIO>;
    eliminarUno(parametrosRuta: any): Prisma.Prisma__EPN_USUARIOClient<import(".prisma/client").EPN_USUARIO>;
    crearUno(bodyParams: any): Promise<import(".prisma/client").EPN_USUARIO>;
}
