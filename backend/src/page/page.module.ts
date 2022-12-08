import { Module } from '@nestjs/common';
import { EventsModule } from 'src/events/events.module';
import { PageController } from './page.controller';
import { PageService } from './page.service';

@Module({
  controllers: [PageController],
  providers: [PageService],
  imports: [EventsModule],
})
export class PageModule {}
