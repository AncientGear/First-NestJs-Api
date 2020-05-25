import { Controller, Get, Post, Put, Delete, Res, HttpStatus, Body, Param, NotFoundException } from '@nestjs/common';
import { CreateProductDTO } from './dto/products.dto';

import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {

    constructor(private productService: ProductsService) {}

    @Post('/create')
    async createProduct(@Res() res, @Body() createProductDTO: CreateProductDTO) {
        const product = await this.productService.createdProduct(createProductDTO);
        console.log(product);
        
        return res.status(HttpStatus.OK).send({
            message: 'Received',
            product
        });
    }

    @Get('/getProducts')
    async getProducts(@Res() res) {
        const products = await this.productService.getProducts();

        return res.status(HttpStatus.OK).send({
            status: true,
            products
        })
    }

    @Get('/getProduct/:id')
    async getProductById(@Res() res, @Param('id') productId) {
        console.log(productId);
        
        const product = await this.productService.getProduct(productId);
        console.log(product);
        
        if(!product) {
            throw new NotFoundException('Product does not exists');
        }

        return res.status(HttpStatus.OK).send({
            status: true,
            product
        })
    }

    @Delete('/deleteProduct/:id')
    async deleteProduct(@Res() res, @Param('id') productId) {
        const product = await this.productService.deleteProduct(productId);

        if(!product) throw new NotFoundException('Product does not found');

        return res.status(HttpStatus.OK).send({
            status: true,
            message: 'Product deleted succesfully',
            product
        })
    }

    
}
