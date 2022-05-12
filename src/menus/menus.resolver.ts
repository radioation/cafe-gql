import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import { Menu } from './models/menu.model';
import { MenusService } from './menus.service';

import { MenuDto } from './dto/menu.dto';


@Resolver(of => Menu )
export class MenusResolver {
  constructor( private readonly menusService: MenusService ) {}

  @Query( returns => [Menu] )
  async menus(): Promise<Menu[]> {
    return await this.menusService.getMenus();
  }

  @Mutation( returns => Menu )
  async createMenu( @Args('menu') menu: MenuDto ) : Promise< Menu> {
    return await this.menusService.createMenu( menu );
  }

  @Query( returns => Menu )
  async menu(@Args('id') id: string) : Promise< Menu > {
    return await this.menusService.getMenuById( id );
  }

}

