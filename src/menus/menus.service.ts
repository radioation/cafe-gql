import { Injectable } from '@nestjs/common';

import { Menu } from './models/menu.model';
import { MenuDto } from './dto/menu.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {  Repository } from 'typeorm';
import { MenusRepository } from './menus.repository';

@Injectable()
export class MenusService {
  constructor(
    @InjectRepository( MenusRepository )
    private menusRepository: MenusRepository,
  ){};

  async getMenus() : Promise< Menu[]> {
    return this.menusRepository.getMenus();
  }
}
