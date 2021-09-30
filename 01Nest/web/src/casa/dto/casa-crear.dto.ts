import {IsBoolean, IsDate, IsIn, IsNotEmpty, IsNumber, IsString, MaxLength, Min, MinLength} from "class-validator";

export class CasaCrearDto{

    @IsNotEmpty()
    @IsDate()
    fechaCreacion: Date;

    @IsNotEmpty()
    numeroCuartos: number;

    @IsNotEmpty()
    numeroBanios: number

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(15)
    color: string;

    @IsNotEmpty()
    numeroPisos: number;

    @IsNotEmpty()
    precio: number;

    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(30)
    sector: string;

    @IsNotEmpty()
    @IsBoolean()
    @IsIn([true,false])
    disponibilidad: boolean;
}