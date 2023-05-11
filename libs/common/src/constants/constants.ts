
export class Constants {
    static readonly MONGODB_URI: string = 'MONGODB_URI'
    static readonly RABBIT_MQ_URI: string = 'RABBIT_MQ_URI'

    // orders
    static readonly ORDERS_PORT: string = 'PORT'
    static readonly ORDERS_ENV: string = './apps/orders/.env'

    // billing
    static readonly BILLING_PORT: string = 'PORT'
    static readonly BILLING_ENV: string = './apps/billing/.env'
    static readonly RABBIT_MQ_BILLING_QUEUE: string = 'RABBIT_MQ_BILLING_QUEUE'
    
    // auth
    static readonly AUTH_PORT: string = 'PORT'
    static readonly AUTH_ENV: string = './apps/auth/.env'
    static readonly RABBIT_MQ_AUTH_QUEUE: string = 'RABBIT_MQ_AUTH_QUEUE'
    
}