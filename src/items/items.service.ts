import { Injectable, NotFoundException } from '@nestjs/common';

import { Item } from './models/item.model';
import { ItemDto } from './dto/item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private itemsRepository: Repository< Item >,

  ) {}

  async getItems() : Promise< Item[]> {
    return this.itemsRepository.find( { relations: ['menus'] } );
  }


  async createItem( itemDto: ItemDto) : Promise< Item > {
    // pull information out of the item DTO
    const { name, description, price } = itemDto;

    // Use TypeORM to create a item instance
    const item = this.itemsRepository.create( {
      name,
      description,
      price,
    })
    return this.itemsRepository.save(item);
  }

  getItemById(
    id: string
  ) : Promise< Item > {
    const item = this.itemsRepository.findOne( { where : { id  }, relations: ['menus'] } );

    if( !item ) {
      throw new NotFoundException(`Item with ID "${id}" not found.`);
    }
    return item;
  }

  async updateItem(
    id: string,
    itemDto: ItemDto
  ) : Promise< Item > {
    // get the item data from the DTO
    const { name, description, price } = itemDto;
    // Check if the item exits.
    const item = await this.getItemById( id );
    if( !item ) {
      throw new NotFoundException(`Item with ID "${id}" not found`);
    }
    item.name = name,
      item.description = description,
      item.price = price,

      await this.itemsRepository.save( item );

    return item;

  }

  async deleteById( id: string ) : Promise< Item >  {
    const item = await this.getItemById( id );
    if( !item ) {
      throw new NotFoundException(`Item with ID "${id}" not found.`);
    }
    this.itemsRepository.delete( { id } );
    return item;    
  }


}
