import { CasaService } from "./casa.service";
export declare class CasaController {
    private casaService;
    constructor(casaService: CasaService);
    crearCasaFormulario(response: any, parametrosCuerpo: any): Promise<import(".prisma/client").CASAS>;
    inicio(response: any): void;
    eliminarCasa(response: any, parametrosRuta: any): Promise<void>;
    obtenerUno(response: any, parametrosRuta: any): Promise<void>;
    actualizarUno(response: any, parametrosRuta: any, parametrosCuerpo: any): Promise<void>;
    vistaCrear(response: any, parametrosConsulta: any): void;
    listaCasa(response: any, parametrosConsulta: any): Promise<void>;
}
