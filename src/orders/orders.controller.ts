import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  CacheInterceptor,
  CacheTTL,
} from '@nestjs/common';
import type { Order } from '@prisma/client';
import { LoggedInGuard } from '../guards/logged-in.guard';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@UseGuards(LoggedInGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  findAll() {
    if (process.env.NODE_ENV === 'development') {
      console.log('GET findAll orders');
    }
    return this.ordersService.findAll();
  }

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(5)
  @Get('/open')
  findOpen() {
    if (process.env.NODE_ENV === 'development') {
      console.log('GET findAll open orders');
    }
    return this.ordersService.findAllOpen();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    if (process.env.NODE_ENV === 'development') {
      console.log('GET findOne id order');
    }
    return this.ordersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}
