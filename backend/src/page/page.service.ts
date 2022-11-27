import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Page } from './page.class';

@Injectable()
export class PageService {
  pages: Map<string, Page> = new Map();
  constructor() {
    this.pages = Page.getPages();
  }

  async getPage(title: string): Promise<string> {
    try {
      return await this.pages.get(title).render();
    } catch (err) {
      throw new HttpException("Cette page n'existe pas", HttpStatus.NOT_FOUND);
    }
  }

  async createPage(title: string, content: string): Promise<string> {
    const newPage = await Page.createPage(title, content);
    return await newPage.render();
  }

  //@TODO
  updatePage(): string {
    return 'Hello World!';
  }
}
