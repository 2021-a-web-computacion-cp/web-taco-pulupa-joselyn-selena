import {Module} from "@nestjs/common";
import {UsuarioService} from "./usuario.service";
import {UsuarioController} from "./usuario.controller";
import {PrismaService} from "../prisma.service";

@Module({
    //Modulos importados
    imports: [],
    //Controladores de este modulo
    controllers: [
        UsuarioController
    ],
    //Servicios de este modulo
    providers: [
        UsuarioService,
        PrismaService
    ],
    //Servicios EXPORTADOS (que se pueden usar guera de este modulo)
    exports:[
        UsuarioService
    ],
})
export class UsuarioModule{


}