import { EventModel } from '@app/common/events/event-model';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class BillingService {
  
  private readonly logger = new Logger(BillingService.name)

  getHello(): string {
    return 'Hello World!';
  }

  bill(model: EventModel) {
    this.logger.log('Billing', model)
  }

  logBills(model: { event: string; data: {}; }) {
    this.logger.log('Billed Commodities', model)
  }


}
