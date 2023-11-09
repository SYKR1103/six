import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { HttpException, HttpStatus} from '@nestjs/common';

@Injectable()
export class ProductService {

 constructor(
    @InjectRepository(Product)
    private productRepo : Repository<Product>
 ) {}

  async createProduct(product : CreateProductDto) {
    const newproduct = await this.productRepo.create(product)
    await this.productRepo.save(newproduct)
    return newproduct
  }

  async getProducts() {
    return this.productRepo.find()
  }

  async getProductById(id : string) {
    const foundproduct = await this.productRepo.findOneBy({id})
    if (foundproduct) {foundproduct}
    throw new HttpException("not found", HttpStatus.NOT_FOUND)
  }

  async updateProductById(id : string, product : CreateProductDto) {
    await this.productRepo.update(id, product)
    const updateditem = await this.productRepo.findOneBy({id})
    if (updateditem) {return updateditem}
    throw new HttpException("not found", HttpStatus.NOT_FOUND)
  }

  async deleteProductById(id : string) {
    const deleteresponse = await this.productRepo.delete(id)
    console.log("ddone", deleteresponse)

    if (!deleteresponse.affected) {
      throw new HttpException("product not found", HttpStatus.NOT_FOUND)
    }
    return "deleted"
}

}