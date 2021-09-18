import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {PrismaService} from "./prisma.service";
import {UsuarioModule} from "./usuario/usuario.module";

//Decoradores: Son funciones que le ayudan a hacer algo extra al codigo
@Module({
  //Modulos importados
  imports: [
      UsuarioModule
  ],
  //Controladores de este modulo
  controllers: [AppController],
  //Servicios de este modulo
  providers: [
      AppService,
      PrismaService,
  ],
  //Servicios EXPORTADOS (que se pueden usar guera de este modulo)
  exports:[
      AppService
  ],
})
export class AppModule {}
