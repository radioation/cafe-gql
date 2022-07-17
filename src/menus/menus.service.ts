import { Injectable, NotFoundException } from '@nestjs/common';

import { Menu } from './models/menu.model';
import { Item } from '../items/models/item.model';
import { MenuDto } from './dto/menu.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';


@Injectable()
export class MenusService {
  constructor(
    @InjectRepository( Menu )
    private menusRepository: Repository<Menu>,
    @InjectRepository( Item )
    private itemsRepository: Repository<Item>,
  ){};

  async getItemsById( ids: string[] ) : Promise< Item[] > {
    const items = await this.itemsRepository.find( { where: { id: In( ids ) }, relations: ['menus'] } );
    return items;
  } 

  async getMenus() : Promise< Menu[]> {
    return this.menusRepository.find( { relations: ['items'] } );
  }

  async getMenuById(
    id: string
  ) : Promise< Menu > {

    const menu = this.menusRepository.findOne( { where:{ id },  relations: ['items'] } );
    if( !menu ) {
      throw new NotFoundException(`Menu with ID "${id}" not found.`);
    }
    return menu;
  }

 
  async create( menuDto: MenuDto) : Promise< Menu > {
    const { name, description, startTime, endTime, itemIds } = menuDto;

    const items = itemIds ? await this.getItemsById( itemIds ) : [];

    const menu = this.menusRepository.create( {
      name,
      description,
      startTime,
      endTime,
      items,
    })

    await this.menusRepository.save( menu );
    return menu;
  }

  async updateMenu(
    id: string,
    menuDto: MenuDto
  ) : Promise< Menu > {

    const { name, description, startTime, endTime, itemIds } = menuDto;
    const items = itemIds ? await this.getItemsById( itemIds ) : [];
    const menu = await this.getMenuById( id );

    if( !menu ) {
      throw new NotFoundException(`Menu with ID "${id}" not found`);
    }
    menu.name = name
    menu.description = description
    menu.startTime = startTime
    menu.endTime = endTime
    menu.items = items 

    await this.menusRepository.save( menu );

    return menu;

  }

  async deleteMenuById( id: string ) : Promise< Menu >  {
    const menu = await this.getMenuById( id );
    if( !menu ) {
      throw new NotFoundException(`Menu with ID "${id}" not found.`);
    }
    this.menusRepository.delete( { id } );
    return menu;
  }

}
