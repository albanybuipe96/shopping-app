import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { CreateOrderRequest } from './dtos/create-order-request.dto';
import { Order } from './schemas/order.schema';

@Injectable()
export class OrdersService {

  constructor(private readonly ordersRepository: OrdersRepository) {}

  async createOrder(request: CreateOrderRequest): Promise<Order> {
    return this.ordersRepository.create(request)
  }

  async getOrders() {
    return this.ordersRepository.find({})
  }
}
