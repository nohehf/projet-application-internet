import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PageService } from './page.service';

@Controller()
export class PageController {
  constructor(private readonly pageService: PageService) {}

  @Get(':title')
  async getTest(@Param() params): Promise<string> {
    return await this.pageService.getPage(params.title);
  }

  @Post(':name')
  async createPage(
    @Param() params,
    @Body() body: { content: string },
  ): Promise<string> {
    return await this.pageService.createPage(params.name, body.content);
  }
}
