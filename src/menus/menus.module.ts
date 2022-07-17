import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MenusService } from './menus.service';
import { MenusResolver } from './menus.resolver';
import { Menu } from './models/menu.model';
import { Item } from '../items/models/item.model';

@Module({
  imports:[ TypeOrmModule.forFeature( [ Menu, Item ])],
  providers: [MenusService, MenusResolver],
  exports: [MenusService]
})
export class MenusModule {}
