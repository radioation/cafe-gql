import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ItemsService } from './items.service';
import { ItemsResolver } from './items.resolver';
import { Item } from './models/item.model';

@Module({
  imports:[ TypeOrmModule.forFeature( [ Item ])],
  providers: [ItemsService, ItemsResolver]
})
export class ItemsModule {}
