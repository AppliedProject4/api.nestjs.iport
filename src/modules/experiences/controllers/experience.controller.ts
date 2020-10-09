import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common'

import { BasicExperienceProxy } from '../models/basic-experience.proxy'
import { CompleteExperienceProxy } from '../models/complete-experience.proxy'
import { CreateExperiencePayload } from '../models/create-experience.payload'
import { CreateExperienceProxy } from '../models/create-experience.proxy'
import { ArrayProxy } from 'src/common/array-proxy'
import { UserProxy } from 'src/modules/user/models/user.proxy'

import { ExperienceService } from '../services/experience.service'

import { RequestUserProperties } from 'src/common/jwt-validation-properties'
import { RequestUser } from 'src/decorators/user.decorator'
import { JwtAuthGuard } from 'src/guards/jwt/jwt-auth.guard'

@Controller('users/:userId/experiences')
export class ExperienceController {
    public constructor(private readonly experienceService: ExperienceService) {}

    /**
     * Method that can register some experience in the database
     * @param requestUser stores the user basic data (id, email, accountType)
     * @param createExperiencePayload stores the new data, that will be saved in the database
     */
    @UseGuards(JwtAuthGuard)
    @Post()
    public async createExperience(
        @RequestUser() requestUser: RequestUserProperties,
        @Body() createExperiencePayload: CreateExperiencePayload
    ): Promise<CreateExperienceProxy> {
        const experience = await this.experienceService.createExperience(
            requestUser.id,
            createExperiencePayload
        )
        return new CreateExperienceProxy(experience)
    }

    /**
     * Method that can return a experience from a user just with it id
     * @param id stores the experience id
     */
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    public async getExperienceById(
        @Param('id') id: string
    ): Promise<CompleteExperienceProxy> {
        const experience = await this.experienceService.getExperienceById(id)
        return new CompleteExperienceProxy(experience)
    }

    /**
     * Method that can get all the experiences from a user
     * @param userId stores the user id
     */
    @UseGuards(JwtAuthGuard)
    @Get()
    public async getExperiences(
        @Param('userId') userId: string
    ): Promise<{
        user: UserProxy
        experiences: ArrayProxy<BasicExperienceProxy>
    }> {
        const {
            user,
            experiences
        } = await this.experienceService.getExperiences(userId)
        return {
            user: new UserProxy(user),
            experiences: {
                length: experiences.length,
                array: experiences.map(
                    experience => new BasicExperienceProxy(experience)
                )
            }
        }
    }
}