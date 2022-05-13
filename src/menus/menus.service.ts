import { Injectable, NotFoundException } from '@nestjs/common';

import { Menu } from './models/menu.model';
import { MenuDto } from './dto/menu.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {  Repository } from 'typeorm';
import { MenusRepository } from './menus.repository';

import { ItemsRepository } from '../items/items.repository';

@Injectable()
export class MenusService {
  constructor(
    @InjectRepository( MenusRepository )
    private menusRepository: MenusRepository,
    private itemsRepository: ItemsRepository,
  ){};

  async getMenus() : Promise< Menu[]> {
    return this.menusRepository.getMenus();
  }

  async createMenu( menuDto: MenuDto) : Promise< Menu > {
    const { itemIds } = menuDto;
    const items = itemIds ? await this.itemsRepository.getItemsById( itemIds ) : [];
    return this.menusRepository.createMenu( menuDto, items );
  }

  getMenuById(
    id: string
  ) : Promise< Menu > {
    const menu = this.menusRepository.getMenuById(id);
    if( !menu ) {
      throw new NotFoundException(`Menu with ID "${id}" not found.`);
    }
    return menu;
  }

  async updateMenu(
    id: string,
    menuDto: MenuDto
  ) : Promise< Menu > {
    const { itemIds } = menuDto;
    const items = itemIds ? await this.itemsRepository.getItemsById( itemIds ) : [];
    return this.menusRepository.updateMenu( id, menuDto, items );
  }

  async deleteById( id: string ) : Promise< Menu >  {
    return this.menusRepository.deleteById(id);
  }

}
