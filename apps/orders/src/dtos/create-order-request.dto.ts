import { CustomPayload } from "@app/common"
import { IsNotEmpty, IsPhoneNumber, IsPositive, IsString } from "class-validator"

export class CreateOrderRequest implements CustomPayload {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsPositive()
    price: number

    @IsPhoneNumber()
    phone: string
}