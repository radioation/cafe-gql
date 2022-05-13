import { NotFoundException } from '@nestjs/common';

import { EntityRepository, Repository } from 'typeorm';
import { Menu } from './models/menu.model';
import { MenuDto } from './dto/menu.dto';



import { Item } from '../items/models/item.model';


@EntityRepository( Menu )
export class MenusRepository extends Repository< Menu > {
  async getMenus() : Promise< Menu[]> {
    const menus = await this.find( { relations: ['items'] });
    return menus;
  }

  async createMenu( menuDto: MenuDto, items: Item[]) : Promise< Menu > {
    // pull information out of the menu DTO
    const { name, description, startTime, endTime } = menuDto;

    // Use TypeORM to create a menu instance
    const menu = this.create( {
      name,
      description,
      startTime,
      endTime,
      items
    })

    // save it to the database
    await this.save( menu );
    return menu;
  }

  async getMenuById( id: string ) : Promise< Menu > {
    const menu = this.findOne( { where : { id }, relations: ['items'] } );
    if( !menu ) {
      throw new NotFoundException(`Menu with ID "${id}" not found.`);
    }
    return menu;
  }

  async updateMenu ( id: string, menuDto: MenuDto, items: Item[]): Promise< Menu > {
    const { name, description, startTime, endTime } = menuDto;
    const menu = await this.getMenuById( id );

    menu.name = name;
    menu.description = description;
    menu.startTime = startTime;
    menu.endTime = endTime;
    menu.items = items;

    await this.save( menu );
    return menu;
  }

  async deleteById( id: string ) : Promise< Menu >  {
    const menu = await this.getMenuById( id );
    this.delete( { id } );
    return menu;
  }

}
