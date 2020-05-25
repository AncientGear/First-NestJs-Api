import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Products } from './interfaces/products.interface';
import { CreateProductDTO } from './dto/products.dto';

@Injectable()
export class ProductsService {
    constructor(@InjectModel('products') private readonly productsModel: Model<Products>,) {}

    async getProducts(): Promise<Products[]> {
        const products = await this.productsModel.find();

        return products;
    }

    async getProduct(productId: string): Promise<Products> {
        console.log(productId);
        try{
            const product = await this.productsModel.findById(productId);
            return product;
        } catch (err) {
            console.log(err);
        }
    }

    async createdProduct(createdProductDTO: CreateProductDTO): Promise<Products> {
        const product = new this.productsModel(createdProductDTO);
        
        return await product.save();
    }

    async deleteProduct(productId: string): Promise<Products> {
        try {
            const product = await this.productsModel.findByIdAndDelete(productId);
    
            return product;
        } catch(err){
            console.log(err);
        }
    }

    async updateProduct(productId: string, createdProductDTO: CreateProductDTO): Promise<Products> {
        const product = await this.productsModel.findByIdAndUpdate(productId, createdProductDTO, { new: true});

        return product;
    }
}
