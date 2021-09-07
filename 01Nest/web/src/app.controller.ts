import {BadRequestException, Controller, Get, HttpCode, InternalServerErrorException, Req, Res} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('texto')
  @HttpCode(200)
  holaTexto(): string {
    return 'Hola Texto';
  }

  @Get('html')
  @HttpCode(201)
  holaHTML(): string {
    return '<h1>Hola Html</h1> <button>Click </button>';
  }

  @Get('json')
  @HttpCode(200)
  holaJSON(): string {
    return '{mensaje: "Hola json"}';
  }

  @Get('bad-request')
  badResquest(){
    throw new BadRequestException();
  }

  @Get('internal-error')
  internalError(){
    throw new InternalServerErrorException();
  }

  @Get('setear-cookie-insegura')
  setearCookieInsegura(
    @Req() req,//Request - PETICION
    @Res() res,
  ){
    res.cookie(
        'galletaInsegura',
        'Tengo hambre',
    );

    res.cookie(
        'galletaSegura',
        'Web :3',
        {
          secure: true
        },
    );

    res.send('ok'); // return de antes
  }

  @Get('mostrar-cookies')
  mostrarCookies(@Req() req){
    const mensaje = {
      sinFirmar: req.cookies,
      firmadas: req.signedCookies
    };
    return mensaje;
  }

}
