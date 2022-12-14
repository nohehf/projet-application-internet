import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { PageService } from './page.service';

@Controller()
export class PageController {
  constructor(private readonly pageService: PageService) {}

  @Get('page/:title')
  async getTest(@Param() params): Promise<string> {
    return await this.pageService.getPage(params.title);
  }

  @Get('toc')
  async getTOC(): Promise<string> {
    return await this.pageService.getTOC();
  }

  @Post('page/:name')
  async createPage(
    @Param() params,
    @Body() body: { content: string },
  ): Promise<string> {
    return await this.pageService.createPage(params.name, body.content);
  }

  @Patch('page/:name')
  async updatePage(
    @Param() params,
    @Body() body: { content: string },
  ): Promise<string> {
    return await this.pageService.updatePage(params.name, body.content);
  }
}
