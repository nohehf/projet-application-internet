import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EventsGateway } from 'src/events/events.gateway';
import { Page } from './page.class';

@Injectable()
export class PageService {
  pages: Map<string, Page> = new Map();
  constructor(private readonly eventsGateway: EventsGateway) {
    this.pages = Page.getPages();
  }

  async getPage(title: string): Promise<string> {
    try {
      const { content, summary } = await this.pages.get(title).render();
      return JSON.stringify({
        statusCode: 200,
        content,
        summary,
      });
    } catch (err) {
      throw new HttpException("Cette page n'existe pas", HttpStatus.NOT_FOUND);
    }
  }

  async createPage(title: string, content: string): Promise<string> {
    const newPage = await Page.createPage(title, content);
    this.pages = Page.getPages();
    this.eventsGateway.broadcast('pageCreated', { title });
    return await JSON.stringify(newPage.render());
  }

  async updatePage(title: string, content: string): Promise<string> {
    const page = await this.pages.get(title);
    await page.update(content);
    this.eventsGateway.broadcast('pageUpdated', { title });
    return await JSON.stringify(page.render());
  }

  async getTOC(): Promise<string> {
    let toc = '## Available articles  \n';
    Array.from(this.pages.keys()).forEach((key) => {
      toc += `* [${key}](/${key})  \n`;
    });
    console.log(toc);
    return toc;
  }
}
