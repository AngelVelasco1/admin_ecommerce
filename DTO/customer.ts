import { Expose, Transform } from 'class-transformer';
import { IsString, IsEmail, IsInt} from 'class-validator';

export class Customer {

    @Expose({ name: 'name' })
    @Transform(({ value }) => {
        if (/^[a-z A-Z]+$/.test(value))
            return value
        else
            throw { status: 200, message: 'El nombre contiene caracteres erroneos'}
    }, {toClassOnly: true})
    @IsString()
    name: string;

    @Expose({ name: 'address' })
    @Transform(({ value }) => {
        if (/^[\w\s.,-\/#]+$/i.test(value))
        return value
        else
        throw { status: 200, message: 'La direccion contiene parametros incorrectos'}
    }, {toClassOnly: true})
    @IsInt()
    address: number;

    @Expose({ name: 'email' })
    @Transform(({ value }) => {
        if (/^[a-z A-Z 0-9._%+-]+@[a-z A-Z 0-9.-]+\.[a-z A-Z]+$/.test(value))
        return value
        else
        throw { status: 200, message: 'La direccion contiene caracteres erroneos'}
    }, {toClassOnly: true})
    @IsEmail()
    email: string;

    constructor(NAM: string, ADR: number, EMA: string) {
        this.name = NAM;
        this.address = ADR;
        this.email = EMA;
    }
}