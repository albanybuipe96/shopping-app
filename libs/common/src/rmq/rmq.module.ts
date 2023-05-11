import { DynamicModule, Module } from "@nestjs/common";
import { RmqService } from "./rmq.service";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { ConfigService } from "@nestjs/config";
import { Constants } from "../constants/constants";

interface RqmqModuleOptions {
    name: string
}

@Module({
    exports: [RmqService],
    providers: [RmqService]
})
export class RmqModule {
    static register({ name }: RqmqModuleOptions): DynamicModule {
        return {
            module: RmqModule,
            imports: [
                ClientsModule.registerAsync([
                    {
                        name,
                        useFactory: (configService: ConfigService) => ({
                            transport: Transport.RMQ,
                            options: {
                                urls: [configService.get<string>(Constants.RABBIT_MQ_URI)],
                                queue: configService.get<string>(`${Constants.RABBIT_MQ_PREFIX}${name}_QUEUE`)
                            }
                        }),
                    }
                ])
            ]
        }
    }
}

// TODO: 47:24 continue from here