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
exports.UsuarioController = void 0;
const common_1 = require("@nestjs/common");
const usuario_service_1 = require("./usuario.service");
const usuario_crear_dto_1 = require("./dto/usuario-crear.dto");
const class_validator_1 = require("class-validator");
let UsuarioController = class UsuarioController {
    constructor(usuarioService) {
        this.usuarioService = usuarioService;
    }
    listaUsuarios(response) {
        response.render('inicio');
    }
    obtenerUno(parametrosRuta) {
        return this.usuarioService.buscarUno(+parametrosRuta.idUsuario);
    }
    crearUsuario(bodyParams) {
        const nombre = bodyParams.nombre;
        const apellido = bodyParams.apellido;
        return this.usuarioService.crearUno({ apellido: apellido, nombre: nombre });
    }
    editarUno(parametrosRuta, bodyParams) {
        id: Number(parametrosRuta.idUsuario);
        const data = {
            apellido: bodyParams.apellido,
            nombre: bodyParams.nombre,
        };
        const parametrosActualizar = {
            id: Number(parametrosRuta.idUsuario),
            data: data,
        };
        return this.usuarioService.actualizarUno(parametrosActualizar);
    }
    eliminarUno(parametrosRuta) {
        return this.usuarioService.eliminarUno(+parametrosRuta.idUsuario);
    }
    async crearUno(bodyParams) {
        const usuariocrearDto = new usuario_crear_dto_1.UsuarioCrearDto();
        usuariocrearDto.nombre = bodyParams.nombre;
        usuariocrearDto.apellido = bodyParams.apellido;
        usuariocrearDto.fechaCreacion = bodyParams.fechaCreacion;
        try {
            const errores = await (0, class_validator_1.validate)(usuariocrearDto);
            if (errores.length > 0) {
                throw new common_1.BadRequestException('No envia bien parametros');
            }
            else {
                return this.usuarioService.crearUno(usuariocrearDto);
            }
        }
        catch (error) {
            console.error({ error: error, mensaje: 'Errores en crear usuario' });
            throw new common_1.InternalServerErrorException('Error servidor');
        }
    }
};
__decorate([
    (0, common_1.Get)('lista-usuarios'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsuarioController.prototype, "listaUsuarios", null);
__decorate([
    (0, common_1.Get)(':idUsuario'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsuarioController.prototype, "obtenerUno", null);
__decorate([
    (0, common_1.Post)('crear'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsuarioController.prototype, "crearUsuario", null);
__decorate([
    (0, common_1.Put)('editar/:idUsuario'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UsuarioController.prototype, "editarUno", null);
__decorate([
    (0, common_1.Delete)('eliminar/:idUsuario'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsuarioController.prototype, "eliminarUno", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "crearUno", null);
UsuarioController = __decorate([
    (0, common_1.Controller)('usuario'),
    __metadata("design:paramtypes", [usuario_service_1.UsuarioService])
], UsuarioController);
exports.UsuarioController = UsuarioController;
//# sourceMappingURL=usuario.controller.js.map