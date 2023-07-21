import { Expose, Transform } from 'class-transformer';
import { Validate, IsInt, IsDecimal, IsString, Min, Max } from 'class-validator';

export class Products {
    @Expose({ name: 'name' })
    @Transform(({ value }) => String(value))
    @Validate((value) => /^[a-z A-Z]+$/.test(value), {
        message: 'El nombre contiene parametros incorrectos',
    })
    @IsString()
    NAM: string;

    @Expose({ name: 'description' })
    @Transform(({ value }) => String(value))
    @Validate((value) => /^[a-z A-Z]+$/.test(value), {
        message: 'La descripcion contiene parametros incorrectos',
    })
    @IsString()
    DESC: string;

    @Expose({ name: 'price' })
    @Transform(({ value }) => parseFloat(value))
    @Validate((value) => typeof value === 'number' && Math.floor(value), {
        message: 'El precio tiene parametros incorrectos',
    })
    @IsDecimal()
    PRIC: number;

    @Expose({ name: 'stock' })
    @Transform(({ value }) => parseInt(value))
    @Validate((value) => typeof value === 'number' && Math.floor(value), {
        message: 'El stock tiene parametros incorrectos',
    })
    @IsInt()
    STK: number;

    @Expose({ name: 'discount_percentage' })
    @Transform(({ value }) => parseInt(value))
    @Validate((value) => typeof value === 'number' && Math.floor(value), {
        message: 'El porcentaje de descuento tiene parametros incorrectos',
    })
    @IsInt()
    DIS_PER: number;

    @Expose({ name: 'category' })
    @Transform(({ value }) => parseInt(value))
    @Validate((value) => typeof value === 'number' && Math.floor(value), {
        message: 'La categoria es incorrecta',
    })
    @IsInt()
    @Min(1, {message: 'La categoria debe ser mayor o igual que 1'})
    @Max(15, {message: 'La categoria debe ser menor o igual que 15'})
    CAT: number;

    constructor(NAM: string, DESC: string, PRIC: number, STK: number, DIS_PER: number, CAT: number) {
        this.NAM = NAM;
        this.DESC = DESC;
        this.PRIC = PRIC;
        this.STK = STK;
        this.DIS_PER = DIS_PER;
        this.CAT = CAT;
    }
}