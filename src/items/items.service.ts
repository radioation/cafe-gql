import { Injectable, NotFoundException } from '@nestjs/common';

import { Item } from './models/item.model';
import { ItemDto } from './dto/item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ItemsRepository } from './items.repository';


@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository( ItemsRepository )
    private itemsRepository: ItemsRepository,
  ){};

  async getItems() : Promise< Item[]> {
    return this.itemsRepository.getItems();
  }
  async create( itemDto: ItemDto) : Promise< Item > {
    return this.itemsRepository.createItem( itemDto );
  }

  async getItemById(
    id: string
  ) : Promise< Item > {
    const item = this.itemsRepository.getItemById(id);
    if( !item ) {
      throw new NotFoundException(`Item with ID "${id}" not found.`);
    }
    return item;
  }

  async updateItem(
    id: string,
    itemDto: ItemDto
  ) : Promise< Item > {
    return this.itemsRepository.updateItem( id, itemDto );

  }

  async deleteById( id: string ) : Promise< Item >  {
    return this.itemsRepository.deleteById(id);
  }

}
