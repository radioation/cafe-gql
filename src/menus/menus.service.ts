import { Injectable, NotFoundException } from "@nestjs/common";

import { Menu } from "./models/menu.model";

import { Item } from '../items/models/item.model';

import { MenuDto } from "./dto/menu.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";

@Injectable()
export class MenusService {

  constructor(
    @InjectRepository(Menu)
    private menusRepository: Repository< Menu >,
    @InjectRepository(Item)
    private itemsRepository: Repository< Item >,

  ) {}

  async getItemsById( ids: string[] ) : Promise< Item[] > {
    const items = await this.itemsRepository.find( { where: { id: In( ids ) }, relations: ['menus'] } );
    return items;
  }

  async getMenus() : Promise< Menu[]> {
    return this.menusRepository.find( { relations: ['items'] });
  }


  async createMenu( menuDto: MenuDto) : Promise< Menu > {
    // pull information out of the menu DTO
    const { name, description, startTime, endTime, itemIds } = menuDto;

    // handle any items
    const items = itemIds ? await this.getItemsById( itemIds ) : [];

    // Use TypeORM to create a menu instance
    const menu = this.menusRepository.create( {
      name,
      description,
      startTime,
      endTime,
      items,
    })
    return this.menusRepository.save(menu);
  }

  getMenuById(
    id: string
  ) : Promise< Menu > {
    const menu = this.menusRepository.findOne( { where : { id }, relations: ['items'] } );

    if( !menu ) {
      throw new NotFoundException(`Menu with ID "${id}" not found.`);
    }
    return menu;
  }

  async updateMenu(
    id: string,
    menuDto: MenuDto
  ) : Promise< Menu > {
    // get the menu data from the DTO
    const { name, description, startTime, endTime, itemIds } = menuDto;
    // get items
    const items = itemIds ? await this.getItemsById( itemIds ) : [];

    // Check if the menu exits.
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

  async deleteById( id: string ) : Promise< Menu >  {
    const menu = await this.getMenuById( id );
    if( !menu ) {
      throw new NotFoundException(`Menu with ID "${id}" not found.`);
    }
    this.menusRepository.delete( { id } );
    return menu;    
  }


}
