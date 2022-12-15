import { existsSync, readdirSync, readFileSync } from 'fs';
import { writeFile } from 'fs/promises';

const pagesDir = '../pages/';

export class Page {
  title: string;
  path: string;

  constructor(title: string) {
    this.title = title;
    this.path = pagesDir + title + '.md';
  }

  async render(): Promise<{ content: string; summary: any }> {
    const content = await readFileSync(this.path, 'utf8');
    const summary = await this.getSummary(content);
    return { content, summary };
  }

  async update(content) {
    if (!Page.pageExists(this.title)) {
      throw new Error('Page does not exist');
    }
    await writeFile(this.path, content).catch((err) => {
      throw new Error(err);
    });
  }

  private async getSummary(content: string) {
    // match this regex: ^#{1,2} (.*) and capture each occurence
    const regex = /^#{1,2}(.*)/gm;
    const matches = content.match(regex);
    const localRegex = /^(#{1,2})(.*)/;
    const summary = matches.map((match, index) => {
      const localMatches = match.match(localRegex);
      const level = localMatches[1].length;
      const title = localMatches[2].trim();
      return { level, title };
    });

    return summary;
  }

  static getPages(): Map<string, Page> {
    const pages: Map<string, Page> = new Map();
    readdirSync(pagesDir).forEach((file) => {
      if (file.endsWith('.md')) {
        pages.set(file.replace('.md', ''), new Page(file.replace('.md', '')));
      }
    });
    return pages;
  }

  static pageExists(title: string): boolean {
    return existsSync(pagesDir + title + '.md');
  }

  static async createPage(title: string, content: string): Promise<Page> {
    if (Page.pageExists(title)) {
      throw new Error('Page already exists');
    }
    const pagePath = pagesDir + title + '.md';
    await writeFile(pagePath, content).catch((err) => {
      throw new Error(err);
    });

    return new Page(title);
  }
}
