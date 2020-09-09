import {
    Controller,
    Post,
    Get,
    UseGuards,
    Query,
    Body,
    Param
} from '@nestjs/common';

import { CategoryService } from '../services/category.service';

import { BaseArrayProxy } from 'src/common/base-array-proxy';

import { CategoryPayload } from '../models/category.payload';
import { CategoryProxy } from '../models/category.proxy';

import { JwtAuthGuard } from 'src/guards/jwt/jwt-auth.guard';

@Controller('categories')
export class CategoryController {

    constructor(
        private readonly categoryService: CategoryService
    ) { }

    /**
     * Method that can add categories in the database
     * @param categoryPayload The informations about the category
     */
    @Post()
    async create(@Body() categoryPayload: CategoryPayload): Promise<CategoryProxy> {
        return await this.categoryService.create(categoryPayload)
    }

    /**
     * Method that can return just one category
     * @param id indicates which category must be returned
     */
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getUniqueCategory(@Param('id') id: string): Promise<CategoryProxy> {
        return await this.categoryService.getUniqueCategory(id)
    }

    /**
     * Method that return all categories, divide them in pages
     * @param page indicates which page must be loaded
     */
    @UseGuards(JwtAuthGuard)
    @Get()
    async getCategories(@Query('page') page: number): Promise<BaseArrayProxy<CategoryProxy>> {
        return await this.categoryService.getCategories(page)
    }

}
