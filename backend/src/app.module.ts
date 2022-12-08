import { Module } from '@nestjs/common';
import { EventsModule } from './events/events.module';
import { PageModule } from './page/page.module';

@Module({
  imports: [EventsModule, PageModule],
})
export class AppModule {}
