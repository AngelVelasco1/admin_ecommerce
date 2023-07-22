import { Expose, Transform } from 'class-transformer';
import { IsString, IsEmail, IsPhoneNumber} from 'class-validator';

export class Suppliers {

    @Expose({ name: 'name' })
    @Transform(({ value }) => {
        if (/^[a-z A-Z]+$/.test(value))
            return value
        else
            throw { status: 200, message: 'El nombre contiene caracteres erroneos'}
    }, {toClassOnly: true})
    @IsString()
    name: string;

    @Expose({ name: 'email' })
    @Transform(({ value }) => {
        if (/^[a-z A-Z 0-9._%+-]+@[a-z A-Z 0-9.-]+\.[a-z A-Z]+$/.test(value))
        return value
        else
        throw { status: 200, message: 'La direccion contiene caracteres erroneos'}
    }, {toClassOnly: true})
    email: string;

    @Expose({ name: 'phone' })
    @Transform(({ value }) => {
        if (/^(\+\d{1,3})?[-.\s]?\(?\d{1,}\)?[-.\s]?\d{1,}[-.\s]?\d{1,}$/.test(value))
        return value
        else
        throw { status: 200, message: 'El telefono contiene parametros incorrectos'}
    }, {toClassOnly: true})
    @IsPhoneNumber()
    phone: number;

    constructor(NAM: string, EMA: string, PHO: number) {
        this.name = NAM;
        this.email = EMA;
        this.phone = PHO;
    }
}