import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TagsModule } from './tags/tags.module';
import { PrismaModule } from './prisma/prisma.module';
import { BooksModule } from './books/books.module';

@Module({
  imports: [TagsModule, PrismaModule, BooksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
