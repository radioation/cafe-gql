import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenusService } from './menus.service';
import { MenusResolver } from './menus.resolver';
import { Menu } from './models/menu.model';


@Module({
	imports: [TypeOrmModule.forFeature([Menu])],
  providers: [MenusService, MenusResolver]
})
export class MenusModule {}
