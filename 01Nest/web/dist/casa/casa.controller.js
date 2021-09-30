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
exports.CasaController = void 0;
const common_1 = require("@nestjs/common");
const casa_service_1 = require("./casa.service");
const class_validator_1 = require("class-validator");
const casa_crear_dto_1 = require("./dto/casa-crear.dto");
const json_1 = require("ts-jest/dist/utils/json");
let CasaController = class CasaController {
    constructor(casaService) {
        this.casaService = casaService;
    }
    async listaCasa(response, parametrosConsulta) {
        try {
            const respuesta = await this.casaService
                .buscarMuchos({
                skip: parametrosConsulta.skip ? +parametrosConsulta.skip : undefined,
                take: parametrosConsulta.take ? +parametrosConsulta.take : undefined,
                busqueda: parametrosConsulta.busqueda ? parametrosConsulta.busqueda : undefined,
            });
            response.render('casa/lista', {
                datos: {
                    casa: respuesta,
                    mensaje: parametrosConsulta.mensaje,
                },
            });
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error del servidor');
        }
    }
    vistaCrear(response, parametrosConsulta) {
        console.log(parametrosConsulta.mensaje + "segundo");
        response.render('casa/crear', {
            datos: {
                mensaje: parametrosConsulta.mensaje,
            },
        });
    }
    async eliminarCasa(response, parametrosRuta) {
        try {
            await this.casaService.eliminarUno(+parametrosRuta.idCasa);
            response.redirect('/casas/lista-casa' +
                '?mensaje=Se elimino la casa');
        }
        catch (error) {
            console.error(error);
            throw new common_1.InternalServerErrorException('Error');
        }
    }
    async obtenerUno(response, parametrosRuta) {
        try {
            const respuesta = await this.casaService.buscarUno(+parametrosRuta.idCasa);
            response.render('casa/actualizar', {
                datos: {
                    casa: respuesta,
                },
            });
        }
        catch (error) {
            console.error(error);
            throw new common_1.InternalServerErrorException('Error');
        }
    }
    async actualizarUno(response, parametrosRuta, parametrosCuerpo) {
        if (parametrosCuerpo.disponibilidad == "on") {
            parametrosCuerpo.disponibilidad = true;
        }
        else {
            parametrosCuerpo.disponibilidad = false;
        }
        const casa = {
            fechaCreacion: new Date(parametrosCuerpo.fechaCreacion),
            numeroCuartos: +parametrosCuerpo.numeroCuartos,
            numeroBanios: +parametrosCuerpo.numeroBanios,
            color: parametrosCuerpo.color,
            numeroPisos: +parametrosCuerpo.numeroPisos,
            precio: Number(parametrosCuerpo.precio),
            sector: parametrosCuerpo.sector,
            disponibilidad: parametrosCuerpo.disponibilidad,
        };
        const parametrosActualizar = {
            id: Number(parametrosRuta.idCasa),
            data: casa,
        };
        try {
            await this.casaService.actualizarUno(parametrosActualizar);
            response.redirect('/casas/lista-casa'
                + '?mensaje= Se actualizo la casa');
        }
        catch (error) {
            console.log({ error: error, mensaje: 'Errores en crear casa' });
            throw new common_1.InternalServerErrorException("Error del servidor");
        }
    }
    async crearCasaFormulario(response, parametrosCuerpo) {
        const casaDto = new casa_crear_dto_1.CasaCrearDto();
        casaDto.fechaCreacion = new Date(parametrosCuerpo.fechaCreacion);
        casaDto.numeroCuartos = +parametrosCuerpo.numeroCuartos;
        casaDto.numeroBanios = +parametrosCuerpo.numeroBanios;
        casaDto.color = parametrosCuerpo.color;
        casaDto.numeroPisos = +parametrosCuerpo.numeroPisos;
        casaDto.precio = Number(parametrosCuerpo.precio);
        casaDto.sector = parametrosCuerpo.sector;
        if (parametrosCuerpo.disponibilidad == "on") {
            casaDto.disponibilidad = true;
        }
        else {
            casaDto.disponibilidad = false;
        }
        try {
            const errores = await (0, class_validator_1.validate)(casaDto);
            if (errores.length > 0) {
                console.log(JSON, (0, json_1.stringify)(errores));
                throw new common_1.BadRequestException("No envía bien parametros");
            }
            else {
                return this.casaService.crearUno(casaDto);
                response.redirect('casas/lista-casa'
                    + '?mensaje= Se creo la casa en el sector '
                    + parametrosCuerpo.sector);
            }
        }
        catch (error) {
            console.error(error);
            throw new common_1.InternalServerErrorException('Error creando casa');
        }
    }
};
__decorate([
    (0, common_1.Get)('lista-casa'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CasaController.prototype, "listaCasa", null);
__decorate([
    (0, common_1.Get)('vista-crear'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], CasaController.prototype, "vistaCrear", null);
__decorate([
    (0, common_1.Post)('eliminar-casa/:idCasa'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CasaController.prototype, "eliminarCasa", null);
__decorate([
    (0, common_1.Post)(':actualizar-casa/:idCasa'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CasaController.prototype, "obtenerUno", null);
__decorate([
    (0, common_1.Post)('actualizar-casa-formulario/:idCasa'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], CasaController.prototype, "actualizarUno", null);
__decorate([
    (0, common_1.Post)('crear-casa-formulario'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CasaController.prototype, "crearCasaFormulario", null);
CasaController = __decorate([
    (0, common_1.Controller)('casas'),
    __metadata("design:paramtypes", [casa_service_1.CasaService])
], CasaController);
exports.CasaController = CasaController;
//# sourceMappingURL=casa.controller.js.map