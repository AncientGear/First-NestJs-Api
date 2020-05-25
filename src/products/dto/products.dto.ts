export class CreateProductDTO {
    readonly name: string;
    readonly description: string;
    readonly imgUrl: string;
    readonly price: number;
    readonly createdAt: Date;
}