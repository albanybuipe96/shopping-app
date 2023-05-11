import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from './schemas/order.schema';
import { CreateOrderRequest } from './dtos/create-order-request.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async createOrder(@Body() request: CreateOrderRequest): Promise<Order> {
    return this.ordersService.createOrder(request)
  }

  @Get()
  async getOrders() {
    return this.ordersService.getOrders()
  }
}
