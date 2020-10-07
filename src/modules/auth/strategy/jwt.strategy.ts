import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'

import { Injectable } from '@nestjs/common'
import { jwtConstants } from '../constants'
import { ValidationProperties } from 'src/common/jwt-validation-properties'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    public constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret
        })
    }

    /**
     * Method that can validate the user basic properties (id, email, accountType)
     * @param jwtValidationProperties stores the user basic properties
     */
    public async validate(
        jwtValidationProperties: ValidationProperties
    ): Promise<ValidationProperties> {
        const { id, email, accountType } = jwtValidationProperties
        return { id, email, accountType }
    }
}
