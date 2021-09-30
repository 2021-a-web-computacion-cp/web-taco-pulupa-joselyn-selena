import {Injectable} from "@nestjs/common";
import {PrismaService} from "../prisma.service";
import {Prisma} from "@prisma/client";

@Injectable()
export class CasaService{
    constructor(
        //Inyectar dependencias
        private prisma: PrismaService,
    ) {
    }

    buscarMuchos(parametrosBusqueda: {
        skip?: number;
        take?: number;
        busqueda?: string;
    }) {
        const or = parametrosBusqueda.busqueda? {
            OR: [
                { sector: { contains: parametrosBusqueda.busqueda } },
                { color: { contains: parametrosBusqueda.busqueda } },
            ], } : {};

        return this.prisma.cASAS.findMany({
            where: or,
            take: Number(parametrosBusqueda.take) || undefined,
            skip: Number(parametrosBusqueda.skip) || undefined,
        });
    }


    buscarUno(id: number){
        return this.prisma.cASAS.findUnique({
            where: {
                id: id,
            },
        });
    }

    crearUno(casa: Prisma.CASASCreateInput){
        return this.prisma.cASAS.create({
            data: casa,
        });
    }

    actualizarUno(parametrosActualizar: {
        id: number;
        data: Prisma.CASASUpdateInput;
    }) {
        return this.prisma.cASAS.update({
            data: parametrosActualizar.data,
            where: {
                id: parametrosActualizar.id,
            },
        });
    }

    eliminarUno(id: number) {
        return this.prisma.cASAS.delete({
            where: { id: id },
        });
    }

}