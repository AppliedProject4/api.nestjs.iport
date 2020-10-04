import {
    Controller,
    Post,
    Body,
    Request,
    UseGuards,
    HttpCode
} from "@nestjs/common";

import { AuthService } from "../services/auth.service";
import { RegisterPayload } from "../models/register.payload";
import { LocalAuthGuard } from "../../../guards/local/local-auth.guard";
import { LoginProxy } from "../models/login.proxy";
import { RegisterProxy } from "../models/register.proxy";

@Controller('users')
export class AuthController {

    constructor(private authService: AuthService) { }

    /**
     * Method that register the user in the database
    * It is responsible for encrypting the password before send it to the database
    * Before return the new created user is changes the password to 'undefined'
     * @param registerPayload stores the data that will be used to create a new user
     */
    @Post()
    async register(@Body() registerPayload: RegisterPayload): Promise<RegisterProxy> {
        return await this.authService.register(registerPayload)
    }

    /**
     * Method that create a jwt (Json Web Token)
     * @param credentials stores the data that will be used to crete the jwt
     */
    @UseGuards(LocalAuthGuard)
    @Post('/login')
    @HttpCode(200)
    async login(@Request() credentials: any): Promise<LoginProxy> {
        return this.authService.login(credentials.user)
    }

}
