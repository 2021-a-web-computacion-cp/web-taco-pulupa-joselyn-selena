import {
  BadRequestException, Body,
  Controller,
  Get,
  Header,
  Headers,
  HttpCode,
  InternalServerErrorException, Param, Post, Put, Query,
  Req,
  Res
} from '@nestjs/common';
import { AppService } from './app.service';
let respuesta = 100
let mensaje = "Terminaste el juego"

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  //
  // @Get('texto')
  // @HttpCode(200)
  // holaTexto(): string {
  //   return 'Hola Texto';
  // }
  //
  // @Get('html')
  // @HttpCode(201)
  // holaHTML(): string {
  //   return '<h1>Hola Html</h1> <button>Click </button>';
  // }
  //
  // @Get('json')
  // @HttpCode(200)
  // holaJSON(): string {
  //   return '{mensaje: "Hola json"}';
  // }
  //
  // @Get('bad-request')
  // badResquest(){
  //   throw new BadRequestException();
  // }
  //
  // @Get('internal-error')
  // internalError(){
  //   throw new InternalServerErrorException();
  // }
  //
  // @Get('setear-cookie-insegura')
  // setearCookieInsegura(
  //   @Req() req,//Request - PETICION
  //   @Res() res,
  // ){
  //   res.cookie(
  //       'galletaInsegura',
  //       'Tengo hambre',
  //   );
  //
  //   res.cookie(
  //       'galletaSeguraYFirmada', // nombre
  //       'Web :3', // valor
  //       {
  //         secure: true, // solo se transfiera por canales confiables https
  //         signed: true, // Encriptacion
  //       },
  //   );
  //   res.send('ok'); // return de antes
  // }
  //
  // @Get('mostrar-cookies')
  // mostrarCookies(@Req() req) {
  //   const mensaje = {
  //     sinFirmar: req.cookies,
  //     firmadas: req.signedCookies,
  //   };
  //   // req.signedCookies.total
  //   return mensaje;
  // }
  //
  // @Get('parametros-consulta/:nombre/:apellido')
  // @HttpCode(200)
  // @Header('Cache-Control', 'none') // Cabeceras de respuesta (response headers)
  // @Header('EPN', 'SISTEMAS') // Cabeceras de respuesta (response headers)
  // parametrosConsulta(
  //     @Query() queryParams,
  //     @Param() params,
  // ) {
  //   return {
  //     parametrosConsulta: queryParams,
  //     parametrosRuta: params,
  //   };
  // }
  //
  // @Post('parametros-cuerpo') // 201
  // @HttpCode(200)
  // parametrosCuerpo(
  //     @Body() bodyParams,
  //     @Headers() cabecerasPeticion,
  // ) {
  //   return {
  //     parametrosCuerpo: bodyParams,
  //     cabeceras: cabecerasPeticion,
  //   };
  // }
  //
  // @Get('suma')
  // @HttpCode(200)
  // suma(
  //     @Query() queryParams,
  //     @Req() req,
  //     @Res() res,
  // ){
  //   const varUno = queryParams.valorUno;
  //   const varDos = queryParams.valorDos;
  //
  //   let suma:number = Number(varUno) + Number(varDos);
  //
  //   var CookieFirmada = req.signedCookies
  //   var valorFirmada = CookieFirmada["Total"];
  //   console.log("El valor de la CookieFirmada",valorFirmada)
  //
  //   if(valorFirmada != undefined){
  //     let valorCookier =  this.valorTotal(suma,Number(valorFirmada))
  //     if (valorCookier == 100){
  //       res.cookie(
  //           'Total', // nombre
  //           100, // valor
  //           {
  //             signed: true, // Encriptacion
  //           },
  //       );
  //       res.send("Termino el juego")
  //     }else {
  //       res.cookie(
  //           'Total', // nombre
  //           valorCookier, // valor
  //           {
  //             signed: true, // Encriptacion
  //           },
  //       );
  //       res.send("El juego sigue, te queda:"+respuesta.toString())
  //     }
  //   }else {
  //     let nuevovalor = 100 - suma
  //     res.cookie(
  //         'Total', // nombre
  //         nuevovalor, // valor
  //         {
  //           signed: true, // Encriptacion
  //         },
  //     );
  //
  //     res.send("Se creo una Cookie con valor 100 y despues de la operacion el valor de la Cookie es:"+nuevovalor)
  //   }
  //
  // }
  //
  // @Post('resta')
  // @HttpCode(201)
  // resta(
  //     @Req() req,
  //     @Body() bodyParams,
  //     @Res() res,
  // ){
  //   const varUno = bodyParams.valorUno;
  //   const varDos = bodyParams.valorDos;
  //
  //   let restaR:number = Number(varUno) - Number(varDos);
  //
  //   var CookieFirmada = req.signedCookies
  //   var valorFirmada = CookieFirmada["Total"];
  //   console.log("El valor de la CookieFirmada",valorFirmada)
  //
  //   if(valorFirmada != undefined){
  //     let valorCookier =  this.valorTotal(restaR,Number(valorFirmada))
  //     if (valorCookier == 100){
  //       res.setHeader("Respuesta",restaR)
  //       res.cookie(
  //           'Total', // nombre
  //           100, // valor
  //           {
  //             signed: true, // Encriptacion
  //           },
  //       );
  //       res.send("Termino el juego")
  //     }else {
  //       res.setHeader("Respuesta",restaR)
  //       res.cookie(
  //           'Total', // nombre
  //           valorCookier, // valor
  //           {
  //             signed: true, // Encriptacion
  //           },
  //       );
  //       res.send("El juego sigue, te queda:"+respuesta.toString())
  //     }
  //   }else {
  //     let nuevovalor = 100 - restaR
  //     res.cookie(
  //         'Total', // nombre
  //         nuevovalor, // valor
  //         {
  //           signed: true, // Encriptacion
  //         },
  //     );
  //
  //     res.send("Se creo una Cookie con valor 100 y despues de la operacion el valor de la Cookie es:"+nuevovalor)
  //   }
  //
  // }
  //
  // @Put('multiplicacion/:valorUno/:valorDos')
  // @HttpCode(200)
  // multiplicacion(
  //     @Req() req,
  //     @Param() params,
  //     @Res() res,
  // ){
  //   const varUno = params.valorUno;
  //   const varDos = params.valorDos;
  //
  //   let multiplicacion:number = Number(varUno) * Number(varDos);
  //
  //   var CookieFirmada = req.signedCookies
  //   var valorFirmada = CookieFirmada["Total"];
  //   console.log("El valor de la CookieFirmada",valorFirmada)
  //
  //   if(valorFirmada != undefined){
  //     let valorCookier =  this.valorTotal(multiplicacion,Number(valorFirmada))
  //     if (valorCookier == 100){
  //       res.cookie(
  //           'Total', // nombre
  //           100, // valor
  //           {
  //             signed: true, // Encriptacion
  //           },
  //       );
  //       res.send("Termino el juego")
  //     }else {
  //       res.cookie(
  //           'Total', // nombre
  //           valorCookier, // valor
  //           {
  //             signed: true, // Encriptacion
  //           },
  //       );
  //       res.send("El juego sigue, te queda:"+respuesta.toString())
  //     }
  //   }else {
  //     let nuevovalor = 100 - multiplicacion
  //     res.cookie(
  //         'Total', // nombre
  //         nuevovalor, // valor
  //         {
  //           signed: true, // Encriptacion
  //         },
  //     );
  //
  //     res.send("Se creo una Cookie con valor 100 y despues de la operacion el valor de la Cookie es:"+nuevovalor)
  //   }
  //
  // }
  //
  // @Post('division')
  // @HttpCode(201)
  // division(
  //     @Req() req,
  //     @Headers() cabecerasPeticion,
  //     @Res() res,
  // ){
  //   const varUno = cabecerasPeticion.valoruno;
  //   const varDos = cabecerasPeticion.valordos;
  //
  //   let division = (Number(varUno) / Number(varDos));
  //   let valorCookier =  this.valorTotal(division,respuesta)
  //
  //   var CookieFirmada = req.signedCookies
  //   var valorFirmada = CookieFirmada["Total"];
  //   console.log("El valor de la CookieFirmada",valorFirmada)
  //
  //   if(valorFirmada != undefined){
  //     let valorCookier =  this.valorTotal(division,Number(valorFirmada))
  //     if (valorCookier == 100){
  //       res.cookie(
  //           'Total', // nombre
  //           100, // valor
  //           {
  //             signed: true, // Encriptacion
  //           },
  //       );
  //       res.send("Termino el juego")
  //     }else {
  //       res.cookie(
  //           'Total', // nombre
  //           valorCookier, // valor
  //           {
  //             signed: true, // Encriptacion
  //           },
  //       );
  //       res.send("El juego sigue, te queda:"+respuesta.toString())
  //     }
  //   }else {
  //     let nuevovalor = 100 - division
  //     res.cookie(
  //         'Total', // nombre
  //         nuevovalor, // valor
  //         {
  //           signed: true, // Encriptacion
  //         },
  //     );
  //
  //     res.send("Se creo una Cookie con valor 100 y despues de la operacion el valor de la Cookie es:"+nuevovalor)
  //   }
  //
  // }
  //
  // public valorTotal(resultadoOperacion: number, valorCookieTotal: number):number {
  //   respuesta = valorCookieTotal - resultadoOperacion
  //   if(respuesta <=0){
  //     return respuesta=100
  //   }
  //   return respuesta
  // }
}