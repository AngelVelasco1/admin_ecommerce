import { Expose, Transform } from 'class-transformer';
import { Matches, IsInt, IsDecimal, IsString, Min, Max} from 'class-validator';

export class Products {
    @Expose({ name: 'name' })
    @Transform(({ value }) => value)
    @Transform(({ value }) => {
        if (/^[a-z A-Z]+$/.test(value))
            return value
        else
            throw { status: 200, message: 'El nombre contiene caracteres erroneos'}
    }, {toClassOnly: true})
    @IsString()
    name: string;

    @Expose({ name: 'description' })
    @Transform(({ value }) => {
        if (/^[a-z A-Z]+$/.test(value))
            return value
        else
            throw { status: 200, message: 'La descripcion contiene caracteres erroneos'}
    }, {toClassOnly: true})
    @IsString()
    description: string;

    @Expose({ name: 'price' })
    @Transform(({ value }) => {
        if (Math.floor(value) && typeof value == 'number')
            return Math.floor(value)
        else
            throw { status: 200, message: 'El precio contiene parametros incorrectos'}
    }, {toClassOnly: true})
    @IsInt({message: "El precio debe ser decimal"})
    price: number;

    @Expose({ name: 'stock' })
    @Transform(({ value }) => {
        if (Math.floor(value) && typeof value == 'number')
            return Math.floor(value)
        else
            throw { status: 200, message: 'El stock contiene parametros incorrectos'}
    }, {toClassOnly: true})    @IsInt({message: "El stock debe ser un numero"})
    stock: number;

    @Expose({ name: 'discount_percentage' })
    @Transform(({ value }) => {
        if (Math.floor(value) && typeof value == 'number')
            return Math.floor(value)
        else
            throw { status: 200, message: 'El porcentaje de descuento contiene parametros incorrectos'}
    }, {toClassOnly: true})    @IsInt({message: "El stock debe ser un numero"})
    discount_percentage: number;

    @Expose({ name: 'category' })
    @Transform(({ value }) => {
        if (Math.floor(value) && typeof value == 'number')
            return Math.floor(value)
        else
            throw { status: 200, message: 'La categoria contiene parametros incorrectos'}
    }, {toClassOnly: true})    
    @IsInt()
    @Min(1, {message: 'La categoria debe ser mayor o igual que 1'})
    @Max(15, {message: 'La categoria debe ser menor o igual que 15'})
    category: number;

    constructor(NAM: string, DESC: string, PRIC: number, STK: number, DIS_PER: number, CAT: number) {
        this.name = NAM;
        this.description = DESC;
        this.price = PRIC;
        this.stock = STK;
        this.discount_percentage = DIS_PER;
        this.category = CAT;
    }
}