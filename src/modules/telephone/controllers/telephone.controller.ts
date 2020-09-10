import { Controller, Post, UseGuards, Body } from "@nestjs/common";

import { BaseArrayProxy } from "src/common/base-array-proxy";

import { TelephoneProxy } from "../models/telephone.proxy";
import { TelephoneService } from "../services/telephone.service";
import { JwtAuthGuard } from "src/guards/jwt/jwt-auth.guard";
import { TelephonePayload } from "../models/telephone.payload";

@Controller('users/telephones')
export class TelephoneController {

    constructor(
        private readonly telephoneService: TelephoneService,
    ) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    async registerTelephones(@Body() telephonePayload: TelephonePayload): Promise<BaseArrayProxy<TelephoneProxy>> {
        return await this.telephoneService.registerTelephones(telephonePayload)
    }

}
