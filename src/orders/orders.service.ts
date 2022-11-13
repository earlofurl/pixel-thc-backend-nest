import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'nestjs-prisma';
import { Order } from '@prisma/client';

@Injectable()
export class OrdersService {
  constructor(
    private prisma: PrismaService,
    @Inject(CACHE_MANAGER) private cacheService: Cache,
  ) {}

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

  async findOne(id: string): Promise<Order> {
    // `This action returns a #${id} order`;
    const cachedData = await this.cacheService.get<Order>(id);
    if (cachedData) {
      console.log(`Getting data from cache!`);
      console.log(cachedData);
      return cachedData;
    }

    // if not, call API and set the cache:
    const data = await this.prisma.order.findUnique({
      where: { id: id },
    });
    await this.cacheService.set(id.toString(), data);
    console.log(data);
    return data;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
