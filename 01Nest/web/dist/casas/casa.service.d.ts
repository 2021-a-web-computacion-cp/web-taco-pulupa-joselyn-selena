import { PrismaService } from "../prisma.service";
import { Prisma } from "@prisma/client";
export declare class CasaService {
    private prisma;
    constructor(prisma: PrismaService);
    buscarMuchos(parametrosBusqueda: {
        skip?: number;
        take?: number;
        busqueda?: string;
    }): import(".prisma/client").PrismaPromise<import(".prisma/client").CASAS[]>;
    buscarUno(id: number): Prisma.Prisma__CASASClient<import(".prisma/client").CASAS>;
    crearUno(casa: Prisma.CASASCreateInput): Prisma.Prisma__CASASClient<import(".prisma/client").CASAS>;
    actualizarUno(parametrosActualizar: {
        id: number;
        data: Prisma.CASASUpdateInput;
    }): Prisma.Prisma__CASASClient<import(".prisma/client").CASAS>;
    eliminarUno(id: number): Prisma.Prisma__CASASClient<import(".prisma/client").CASAS>;
}
