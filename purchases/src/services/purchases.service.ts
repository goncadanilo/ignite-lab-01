import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';

interface CreatePurchaseParams {
  customerId: string;
  productId: string;
}

@Injectable()
export class PurchasesService {
  constructor(private prisma: PrismaService) {}

  listAllPurchases() {
    return this.prisma.purchases.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  listAllPurchasesByCustomerId(customerId: string) {
    return this.prisma.purchases.findMany({
      where: { customerId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async createPurchase({ customerId, productId }: CreatePurchaseParams) {
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new Error('Product not found.');
    }

    return this.prisma.purchases.create({
      data: { customerId, productId },
    });
  }
}
