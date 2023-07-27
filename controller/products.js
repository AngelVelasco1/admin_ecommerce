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
import { IsInt, IsDecimal, IsString, Min, Max } from 'class-validator';
export class Products {
    constructor(NAM, DESC, PRIC, STK, DIS_PER, CAT) {
        this.name = NAM;
        this.description = DESC;
        this.price = PRIC;
        this.stock = STK;
        this.discount_percentage = DIS_PER;
        this.category = CAT;
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
], Products.prototype, "name", void 0);
__decorate([
    Expose({ name: 'description' }),
    Transform(({ value }) => {
        if (/^[a-zA-Z.,\s]+$/.test(value))
            return value;
        else
            throw { status: 200, message: 'La descripcion contiene caracteres erroneos' };
    }, { toClassOnly: true }),
    IsString(),
    __metadata("design:type", String)
], Products.prototype, "description", void 0);
__decorate([
    Expose({ name: 'price' }),
    Transform(({ value }) => {
        if (typeof value === 'number')
            return value;
        else
            throw { status: 200, message: 'El precio contiene parametros incorrectos' };
    }, { toClassOnly: true }),
    IsDecimal({ decimal_digits: '1, 2' }),
    __metadata("design:type", Number)
], Products.prototype, "price", void 0);
__decorate([
    Expose({ name: 'stock' }),
    Transform(({ value }) => {
        if (Math.floor(value) && typeof value == 'number')
            return Math.floor(value);
        else
            throw { status: 200, message: 'El stock contiene parametros incorrectos' };
    }, { toClassOnly: true }),
    IsInt(),
    __metadata("design:type", Number)
], Products.prototype, "stock", void 0);
__decorate([
    Expose({ name: 'discount_percentage' }),
    Transform(({ value }) => {
        if (Math.floor(value) && typeof value == 'number')
            return Math.floor(value);
        else
            throw { status: 200, message: 'El porcentaje de descuento contiene parametros incorrectos' };
    }, { toClassOnly: true }),
    IsInt(),
    __metadata("design:type", Number)
], Products.prototype, "discount_percentage", void 0);
__decorate([
    Expose({ name: 'category' }),
    Transform(({ value }) => {
        if (Math.floor(value) && typeof value == 'number')
            return Math.floor(value);
        else
            throw { status: 200, message: 'La categoria contiene parametros incorrectos' };
    }, { toClassOnly: true }),
    IsInt(),
    Min(1, { message: 'La categoria debe ser mayor o igual que 1' }),
    Max(15, { message: 'La categoria debe ser menor o igual que 15' }),
    __metadata("design:type", Number)
], Products.prototype, "category", void 0);
//# sourceMappingURL=products.js.map