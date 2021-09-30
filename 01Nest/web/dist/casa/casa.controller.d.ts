import { CasaService } from "./casa.service";
export declare class CasaController {
    private casaService;
    constructor(casaService: CasaService);
    listaCasa(response: any, parametrosConsulta: any): Promise<void>;
    vistaCrear(response: any, parametrosConsulta: any): void;
    eliminarCasa(response: any, parametrosRuta: any): Promise<void>;
    obtenerUno(response: any, parametrosRuta: any): Promise<void>;
    actualizarUno(response: any, parametrosRuta: any, parametrosCuerpo: any): Promise<void>;
    crearCasaFormulario(response: any, parametrosCuerpo: any): Promise<import(".prisma/client").CASAS>;
}
