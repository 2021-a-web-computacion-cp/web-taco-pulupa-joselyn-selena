import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): string;
    holaTexto(): string;
    holaHTML(): string;
    holaJSON(): string;
    badResquest(): void;
    internalError(): void;
    setearCookieInsegura(req: any, res: any): void;
    mostrarCookies(req: any): {
        sinFirmar: any;
        firmadas: any;
    };
    parametrosConsulta(queryParams: any, params: any): {
        parametrosConsulta: any;
        parametrosRuta: any;
    };
    parametrosCuerpo(bodyParams: any, cabecerasPeticion: any): {
        parametrosCuerpo: any;
        cabeceras: any;
    };
    suma(queryParams: any, req: any, res: any): void;
    resta(req: any, bodyParams: any, res: any): void;
    multiplicacion(req: any, params: any, res: any): void;
    division(req: any, cabecerasPeticion: any, res: any): void;
    valorTotal(resultadoOperacion: number, valorCookieTotal: number): number;
}
