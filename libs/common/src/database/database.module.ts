import { Module } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { MongooseModule } from "@nestjs/mongoose"
import { Constants } from "../constants/constants"

@Module({
    imports: [
        MongooseModule.forRootAsync({
            useFactory: (configService: ConfigService) => ({
                uri: configService.get<string>(Constants.MONGODB_URI),
            }),
            inject: [ConfigService]
        })
    ]
})
export class DatabaseModule {}