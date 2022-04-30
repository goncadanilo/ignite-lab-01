import { Query, Resolver } from '@nestjs/graphql';
import { ProductsService } from '../../../services/products.service';
import { Product } from '../model/product';

@Resolver()
export class ProductsResolver {
  constructor(private productsServices: ProductsService) {}

  @Query(() => [Product])
  products() {
    return this.productsServices.listAllProducts();
  }
}
