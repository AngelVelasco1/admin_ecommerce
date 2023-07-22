var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Expose, Transform } from 'class-transformer';
import { IsString, IsEmail, IsPhoneNumber } from 'class-validator';
export class Suppliers {
    constructor(NAM, EMA, PHO) {
        this.name = NAM;
        this.email = EMA;
        this.phone = PHO;
    }
}
__decorate([
    Expose({ name: 'name' }),
    Transform(({ value }) => {
        if (/^[a-z A-Z]+$/.test(value))
            return value;
        else
            throw { status: 200, message: 'El nombre contiene caracteres erroneos' };
    }, { toClassOnly: true }),
    IsString(),
    __metadata("design:type", String)
], Suppliers.prototype, "name", void 0);
__decorate([
    Expose({ name: 'email' }),
    IsEmail({}, { message: 'El campo debe ser una dirección de correo electrónico válida' }),
    Transform(({ value }) => {
        if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value))
            return value;
        else
            throw { status: 200, message: 'La direccion contiene caracteres erroneos' };
    }, { toClassOnly: true }),
    __metadata("design:type", String)
], Suppliers.prototype, "email", void 0);
__decorate([
    Expose({ name: 'phone' }),
    IsPhoneNumber(),
    Transform(({ value }) => {
        if (/^(\+\d{1,3})?[-.\s]?\(?\d{1,}\)?[-.\s]?\d{1,}[-.\s]?\d{1,}$/.test(value))
            return value;
        else
            throw { status: 200, message: 'El telefono contiene parametros incorrectos' };
    }, { toClassOnly: true }),
    __metadata("design:type", Number)
], Suppliers.prototype, "phone", void 0);
//# sourceMappingURL=suppliers.js.map