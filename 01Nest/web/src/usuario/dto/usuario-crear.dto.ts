import {IsEmpty, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength} from "class-validator";

export class UsuarioCrearDto{
    @IsEmpty()//vacio
    fechaCreacion: string;

    @IsNotEmpty()//requerido
    @IsString()
    @MinLength(3)
    @MaxLength(10)
    apellido: string;

    @IsOptional() //opcional
    @IsString()
    @MinLength(3)
    @MaxLength(10)
    nombre
}