import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  create(createOrderDto: CreateOrderDto) {
    return 'This action adds a new order';
  }

  findAll() {
    // `This action returns all orders`;
    return this.prisma.order.findMany({
      include: {
        lineItemPackages: {
          include: {
            tag: true,
            uom: true,
            item: {
              include: {
                itemType: {
                  include: {
                    uomDefault: {},
                  },
                },
                strain: true,
              },
            },
            labTests: {
              include: {
                labTest: {
                  select: {
                    thcTotalPercent: true,
                    cbdPercent: true,
                    terpenePercent: true,
                    overallPassed: true,
                    totalCannabinoidsPercent: true,
                    batchCode: true,
                    testIdCode: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
