"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
let respuesta = 100;
let mensaje = "Terminaste el juego";
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    getHello() {
        return this.appService.getHello();
    }
    holaTexto() {
        return 'Hola Texto';
    }
    holaHTML() {
        return '<h1>Hola Html</h1> <button>Click </button>';
    }
    holaJSON() {
        return '{mensaje: "Hola json"}';
    }
    badResquest() {
        throw new common_1.BadRequestException();
    }
    internalError() {
        throw new common_1.InternalServerErrorException();
    }
    setearCookieInsegura(req, res) {
        res.cookie('galletaInsegura', 'Tengo hambre');
        res.cookie('galletaSeguraYFirmada', 'Web :3', {
            secure: true,
            signed: true,
        });
        res.send('ok');
    }
    mostrarCookies(req) {
        const mensaje = {
            sinFirmar: req.cookies,
            firmadas: req.signedCookies,
        };
        return mensaje;
    }
    parametrosConsulta(queryParams, params) {
        return {
            parametrosConsulta: queryParams,
            parametrosRuta: params,
        };
    }
    parametrosCuerpo(bodyParams, cabecerasPeticion) {
        return {
            parametrosCuerpo: bodyParams,
            cabeceras: cabecerasPeticion,
        };
    }
    suma(queryParams, req, res) {
        const varUno = queryParams.valorUno;
        const varDos = queryParams.valorDos;
        let suma = Number(varUno) + Number(varDos);
        var CookieFirmada = req.signedCookies;
        var valorFirmada = CookieFirmada["Total"];
        console.log("El valor de la CookieFirmada", valorFirmada);
        if (valorFirmada != undefined) {
            let valorCookier = this.valorTotal(suma, Number(valorFirmada));
            if (valorCookier == 100) {
                res.cookie('Total', 100, {
                    signed: true,
                });
                res.send("Termino el juego");
            }
            else {
                res.cookie('Total', valorCookier, {
                    signed: true,
                });
                res.send("El juego sigue, te queda:" + respuesta.toString());
            }
        }
        else {
            let nuevovalor = 100 - suma;
            res.cookie('Total', nuevovalor, {
                signed: true,
            });
            res.send("Se creo una Cookie con valor 100 y despues de la operacion el valor de la Cookie es:" + nuevovalor);
        }
    }
    resta(req, bodyParams, res) {
        const varUno = bodyParams.valorUno;
        const varDos = bodyParams.valorDos;
        let restaR = Number(varUno) - Number(varDos);
        var CookieFirmada = req.signedCookies;
        var valorFirmada = CookieFirmada["Total"];
        console.log("El valor de la CookieFirmada", valorFirmada);
        if (valorFirmada != undefined) {
            let valorCookier = this.valorTotal(restaR, Number(valorFirmada));
            if (valorCookier == 100) {
                res.setHeader("Respuesta", restaR);
                res.cookie('Total', 100, {
                    signed: true,
                });
                res.send("Termino el juego");
            }
            else {
                res.setHeader("Respuesta", restaR);
                res.cookie('Total', valorCookier, {
                    signed: true,
                });
                res.send("El juego sigue, te queda:" + respuesta.toString());
            }
        }
        else {
            let nuevovalor = 100 - restaR;
            res.cookie('Total', nuevovalor, {
                signed: true,
            });
            res.send("Se creo una Cookie con valor 100 y despues de la operacion el valor de la Cookie es:" + nuevovalor);
        }
    }
    multiplicacion(req, params, res) {
        const varUno = params.valorUno;
        const varDos = params.valorDos;
        let multiplicacion = Number(varUno) * Number(varDos);
        var CookieFirmada = req.signedCookies;
        var valorFirmada = CookieFirmada["Total"];
        console.log("El valor de la CookieFirmada", valorFirmada);
        if (valorFirmada != undefined) {
            let valorCookier = this.valorTotal(multiplicacion, Number(valorFirmada));
            if (valorCookier == 100) {
                res.cookie('Total', 100, {
                    signed: true,
                });
                res.send("Termino el juego");
            }
            else {
                res.cookie('Total', valorCookier, {
                    signed: true,
                });
                res.send("El juego sigue, te queda:" + respuesta.toString());
            }
        }
        else {
            let nuevovalor = 100 - multiplicacion;
            res.cookie('Total', nuevovalor, {
                signed: true,
            });
            res.send("Se creo una Cookie con valor 100 y despues de la operacion el valor de la Cookie es:" + nuevovalor);
        }
    }
    division(req, cabecerasPeticion, res) {
        const varUno = cabecerasPeticion.valoruno;
        const varDos = cabecerasPeticion.valordos;
        let division = (Number(varUno) / Number(varDos));
        let valorCookier = this.valorTotal(division, respuesta);
        var CookieFirmada = req.signedCookies;
        var valorFirmada = CookieFirmada["Total"];
        console.log("El valor de la CookieFirmada", valorFirmada);
        if (valorFirmada != undefined) {
            let valorCookier = this.valorTotal(division, Number(valorFirmada));
            if (valorCookier == 100) {
                res.cookie('Total', 100, {
                    signed: true,
                });
                res.send("Termino el juego");
            }
            else {
                res.cookie('Total', valorCookier, {
                    signed: true,
                });
                res.send("El juego sigue, te queda:" + respuesta.toString());
            }
        }
        else {
            let nuevovalor = 100 - division;
            res.cookie('Total', nuevovalor, {
                signed: true,
            });
            res.send("Se creo una Cookie con valor 100 y despues de la operacion el valor de la Cookie es:" + nuevovalor);
        }
    }
    valorTotal(resultadoOperacion, valorCookieTotal) {
        respuesta = valorCookieTotal - resultadoOperacion;
        if (respuesta <= 0) {
            return respuesta = 100;
        }
        return respuesta;
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getHello", null);
__decorate([
    (0, common_1.Get)('texto'),
    (0, common_1.HttpCode)(200),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "holaTexto", null);
__decorate([
    (0, common_1.Get)('html'),
    (0, common_1.HttpCode)(201),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "holaHTML", null);
__decorate([
    (0, common_1.Get)('json'),
    (0, common_1.HttpCode)(200),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "holaJSON", null);
__decorate([
    (0, common_1.Get)('bad-request'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "badResquest", null);
__decorate([
    (0, common_1.Get)('internal-error'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "internalError", null);
__decorate([
    (0, common_1.Get)('setear-cookie-insegura'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "setearCookieInsegura", null);
__decorate([
    (0, common_1.Get)('mostrar-cookies'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "mostrarCookies", null);
__decorate([
    (0, common_1.Get)('parametros-consulta/:nombre/:apellido'),
    (0, common_1.HttpCode)(200),
    (0, common_1.Header)('Cache-Control', 'none'),
    (0, common_1.Header)('EPN', 'SISTEMAS'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "parametrosConsulta", null);
__decorate([
    (0, common_1.Post)('parametros-cuerpo'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "parametrosCuerpo", null);
__decorate([
    (0, common_1.Get)('suma'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "suma", null);
__decorate([
    (0, common_1.Post)('resta'),
    (0, common_1.HttpCode)(201),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "resta", null);
__decorate([
    (0, common_1.Put)('multiplicacion/:valorUno/:valorDos'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "multiplicacion", null);
__decorate([
    (0, common_1.Post)('division'),
    (0, common_1.HttpCode)(201),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Headers)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "division", null);
AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map