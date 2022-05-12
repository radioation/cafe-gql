import { Module } from '@nestjs/common';
import { MenusService } from './menus.service';
import { MenusResolver } from './menus.resolver';

// Items Repository
import { ItemsRepository } from '../items/items.repository';

// Database 
import { MenusRepository } from './menus.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[ TypeOrmModule.forFeature( [
    MenusRepository,
    ItemsRepository,
  ])],
  providers: [MenusService, MenusResolver],
  exports: [MenusService]
})
export class MenusModule {}
