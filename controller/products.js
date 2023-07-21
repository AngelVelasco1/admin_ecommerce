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
import { Validate, IsInt, IsDecimal, IsString, Min, Max } from 'class-validator';
export class Products {
    constructor(NAM, DESC, PRIC, STK, DIS_PER, CAT) {
        this.NAM = NAM;
        this.DESC = DESC;
        this.PRIC = PRIC;
        this.STK = STK;
        this.DIS_PER = DIS_PER;
        this.CAT = CAT;
    }
}
__decorate([
    Expose({ name: 'name' }),
    Transform(({ value }) => String(value)),
    Validate((value) => /^[a-z A-Z]+$/.test(value), {
        message: 'El nombre contiene parametros incorrectos',
    }),
    IsString(),
    __metadata("design:type", String)
], Products.prototype, "NAM", void 0);
__decorate([
    Expose({ name: 'description' }),
    Transform(({ value }) => String(value)),
    Validate((value) => /^[a-z A-Z]+$/.test(value), {
        message: 'La descripcion contiene parametros incorrectos',
    }),
    IsString(),
    __metadata("design:type", String)
], Products.prototype, "DESC", void 0);
__decorate([
    Expose({ name: 'price' }),
    Transform(({ value }) => parseFloat(value)),
    Validate((value) => typeof value === 'number' && Math.floor(value), {
        message: 'El precio tiene parametros incorrectos',
    }),
    IsDecimal(),
    __metadata("design:type", Number)
], Products.prototype, "PRIC", void 0);
__decorate([
    Expose({ name: 'stock' }),
    Transform(({ value }) => parseInt(value)),
    Validate((value) => typeof value === 'number' && Math.floor(value), {
        message: 'El stock tiene parametros incorrectos',
    }),
    IsInt(),
    __metadata("design:type", Number)
], Products.prototype, "STK", void 0);
__decorate([
    Expose({ name: 'discount_percentage' }),
    Transform(({ value }) => parseInt(value)),
    Validate((value) => typeof value === 'number' && Math.floor(value), {
        message: 'El porcentaje de descuento tiene parametros incorrectos',
    }),
    IsInt(),
    __metadata("design:type", Number)
], Products.prototype, "DIS_PER", void 0);
__decorate([
    Expose({ name: 'category' }),
    Transform(({ value }) => parseInt(value)),
    Validate((value) => typeof value === 'number' && Math.floor(value), {
        message: 'La categoria es incorrecta',
    }),
    IsInt(),
    Min(1, { message: 'La categoria debe ser mayor o igual que 1' }),
    Max(15, { message: 'La categoria debe ser menor o igual que 15' }),
    __metadata("design:type", Number)
], Products.prototype, "CAT", void 0);
//# sourceMappingURL=products.js.map