import { Controller } from '@nestjs/common';
import { RestrictionsService } from './restrictions.service';
import { Get, Post, Put, Delete, HttpCode, Param, Body } from '@nestjs/common';
import { Restriction } from './restriction.schema';

@Controller('restrictions')
export class RestrictionsController {
  constructor(private restrictionServive: RestrictionsService) {}

  @HttpCode(200)
  @Get('all')
  async getAllRestrictions(): Promise<IResponse> {
    try {
      const restrictions = await this.restrictionServive.findAll();

      return {
        status: 200,
        message: 'Restrictions fetched successfully',
        data: restrictions,
      };
    } catch (err) {
      return {
        status: 500,
        message: 'Internal server error',
        data: null,
        err,
      };
    }
  }

  @HttpCode(200)
  @Get(':id')
  async getOneRestrictionById(@Param('id') id: string): Promise<IResponse> {
    try {
      const restriction = await this.restrictionServive.findById(id);

      return {
        status: 200,
        message: 'Restriction fetched successfully',
        data: restriction,
      };
    } catch (err) {
      return {
        status: 500,
        message: 'Internal server error',
        data: null,
        err,
      };
    }
  }

  @HttpCode(200)
  @Post('create')
  async createRestriction(@Body() data: Restriction): Promise<IResponse> {
    try {
      const restriction = await this.restrictionServive.create(data);

      return {
        status: 200,
        message: 'Restriction created successfully',
        data: restriction,
      };
    } catch (err) {
      return {
        status: 500,
        message: 'Internal server error',
        data: null,
        err,
      };
    }
  }

  @HttpCode(200)
  @Put(':id')
  async updateRestriction(
    @Param('id') id: string,
    @Body() data: Partial<Restriction>,
  ): Promise<IResponse> {
    try {
      const restriction = await this.restrictionServive.update(id, data);

      return {
        status: 200,
        message: 'Restriction updated successfully',
        data: restriction,
      };
    } catch (err) {
      return {
        status: 500,
        message: 'Internal server error',
        data: null,
        err,
      };
    }
  }

  @HttpCode(200)
  @Delete(':id')
  async deleteRestriction(@Param('id') id: string): Promise<IResponse> {
    try {
      const restriction = await this.restrictionServive.delete(id);

      return {
        status: 200,
        message: 'Restriction deleted successfully',
        data: restriction,
      };
    } catch (err) {
      return {
        status: 500,
        message: 'Internal server error',
        data: null,
        err,
      };
    }
  }
}
