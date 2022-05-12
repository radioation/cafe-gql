import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsResolver } from './items.resolver';

// Database 
import { ItemsRepository } from './items.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[ TypeOrmModule.forFeature( [
    ItemsRepository,
  ])],
  providers: [ItemsService, ItemsResolver],
  exports: [ItemsService]
})
export class ItemsModule {}
