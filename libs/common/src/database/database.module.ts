import { Module } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { MongooseModule } from "@nestjs/mongoose"
import { URIs } from "../constants/uris.constant"

@Module({
    imports: [
        MongooseModule.forRootAsync({
            useFactory: (configService: ConfigService) => ({
                uri: configService.get<string>(URIs.MONGODB_URI),
            }),
            inject: [ConfigService]
        })
    ]
})
export class DatabaseModule {}