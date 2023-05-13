import { Controller, Get } from '@nestjs/common';
import { BillingService } from './billing.service';
import { GetOrdersEvent, OrderCreatedEvent, RmqService } from '@app/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { CreateOrderRequest } from 'apps/orders/src/dtos/create-order-request.dto';

@Controller()
export class BillingController {
  constructor(private readonly billingService: BillingService, private readonly rmqService: RmqService) {}

  @Get()
  getHello(): string {
    return this.billingService.getHello();
  }

  @EventPattern(OrderCreatedEvent)
  async handleOrderCreated(@Payload() data: CreateOrderRequest, @Ctx() context: RmqContext) {
    this.billingService.bill({ event: OrderCreatedEvent, data })
    this.rmqService.ack(context)
  }

  @EventPattern(GetOrdersEvent)
  async handleGetOrders(@Payload() data: any[], @Ctx() context: RmqContext) {
    this.billingService.logBills({ event: GetOrdersEvent, data })
    this.rmqService.ack(context)
  }

}
