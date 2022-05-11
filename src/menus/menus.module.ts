import { Module } from '@nestjs/common';
import { MenusService } from './menus.service';
import { MenusResolver } from './menus.resolver';

// Database 
import { MenusRepository } from './menus.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[ TypeOrmModule.forFeature( [
    MenusRepository,
  ])],
  providers: [MenusService, MenusResolver],
  exports: [MenusService]
})
export class MenusModule {}
