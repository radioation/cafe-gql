import { Injectable, NotFoundException } from '@nestjs/common';

import { Item } from './models/item.model';
import { ItemDto } from './dto/item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {  Repository } from 'typeorm';


@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository( Item )
    private itemsRepository: Repository<Item>,
  ){};

  async getItems() : Promise< Item[]> {
    return this.itemsRepository.find();
  }

  async getItemById(
    id: string
  ) : Promise< Item > {

    const query = this.itemsRepository.createQueryBuilder('item');
    query.where( { id } );
    const item = await query.getOne();
    if( !item ) {
      throw new NotFoundException(`Item with ID "${id}" not found.`);
    }
    return item;
  }


  async create( itemDto: ItemDto) : Promise< Item > {
    const { name, description, price } = itemDto;

    const item = this.itemsRepository.create( {
      name,
      description,
      price,
    })

    await this.itemsRepository.save( item );
    return item;
  }

  async updateItem(
    id: string,
    itemDto: ItemDto
  ) : Promise< Item > {

    const { name, description, price } = itemDto;
    const item = await this.getItemById( id );

    if( !item ) {
      throw new NotFoundException(`Item with ID "${id}" not found`);
    }
    item.name = name
    item.description = description
    item.price = price

    await this.itemsRepository.save( item );

    return item;

  }

  async deleteItemById( id: string ) : Promise< Item >  {
    const item = await this.getItemById( id );
    if( !item ) {
      throw new NotFoundException(`Item with ID "${id}" not found.`);
    }
    this.itemsRepository.delete( { id } );
    return item;
  }

}
