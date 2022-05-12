import { NotFoundException } from '@nestjs/common';

import { EntityRepository, Repository } from 'typeorm';
import { Menu } from './models/menu.model';
import { MenuDto } from './dto/menu.dto';


@EntityRepository( Menu )
export class MenusRepository extends Repository< Menu > {
  async getMenus() : Promise< Menu[]> {
    const menus = await this.find();
    return menus;
  }

  async createMenu( menuDto: MenuDto) : Promise< Menu > {
    // pull information out of the menu DTO
    const { name, description, startTime, endTime } = menuDto;

    // Use TypeORM to create a menu instance
    const menu = this.create( {
      name,
      description,
      startTime,
      endTime,
    })

    // save it to the database
    await this.save( menu );
    return menu;
  }

  async getMenuById( id: string ) : Promise< Menu > {
    const menu = this.findOne( { where : { id } } );
    return menu;
  }

  async updateMenu ( id: string, menuDto: MenuDto,): Promise< Menu > {
    const { name, description, startTime, endTime } = menuDto;
    const menu = await this.getMenuById( id );

    if( !menu ) {
      throw new NotFoundException(`Menu with ID "${id}" not found`);
    }
    menu.name = name,
      menu.description = description,
      menu.startTime = startTime,
      menu.endTime = endTime,

      await this.save( menu );
    return menu;
  }

}
