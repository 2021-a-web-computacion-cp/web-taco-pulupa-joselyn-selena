import {Module} from "@nestjs/common";
import {PrismaService} from "../prisma.service";
import {CasaController} from "./casa.controller";
import {CasaService} from "./casa.service";

@Module({
    //Modulos importados
    imports: [],
    //Controladores de este modulo
    controllers: [
        CasaController
    ],
    //Servicios de este modulo
    providers: [
        CasaService,
        PrismaService
    ],
    //Servicios EXPORTADOS (que se pueden usar guera de este modulo)
    exports:[
        CasaService
    ],
})

export class CasaModule{}