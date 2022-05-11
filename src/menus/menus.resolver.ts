import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import { Menu } from './models/menu.model';
import { MenusService } from './menus.service';

@Resolver(of => Menu )
export class MenusResolver {
  constructor( private readonly menusService: MenusService ) {}

  @Query( returns => [Menu] )
  async menus(): Promise<Menu[]> {
    return await this.menusService.getMenus();
  }
}

