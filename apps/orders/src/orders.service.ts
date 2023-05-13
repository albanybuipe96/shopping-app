import { Inject, Injectable, Logger } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { CreateOrderRequest } from './dtos/create-order-request.dto';
import { Order } from './schemas/order.schema';
import { lastValueFrom } from 'rxjs';
import { BILLING_SERVICE, GetOrdersEvent, OrderCreatedEvent } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRepository: OrdersRepository, @Inject(BILLING_SERVICE) private billingClient: ClientProxy) {}

  async createOrder(request: CreateOrderRequest): Promise<Order> {
    const session = await this.ordersRepository.startTransaction()
    try {
      const order = await this.ordersRepository.create(request)
      await lastValueFrom(
        this.billingClient.emit(OrderCreatedEvent, {
          request,
        }),
      )
      
      await session.commitTransaction()
      return order
    } catch (err) {
      await session.abortTransaction()
      throw err
    }
  }

  async getOrders() {
    const session = await this.ordersRepository.startTransaction()
    try {
      const orders = await this.ordersRepository.find({})
      await lastValueFrom(
        this.billingClient.emit(GetOrdersEvent, {
          orders,
        }),
      )
      
      await session.commitTransaction()
      return orders
    } catch (err) {
      await session.abortTransaction()
      throw err
    }
  }
}
