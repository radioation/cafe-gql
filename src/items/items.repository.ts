import { NotFoundException } from '@nestjs/common';
import { EntityRepository, Repository, In } from 'typeorm';
import { Item } from './models/item.model';
import { ItemDto } from './dto/item.dto';


@EntityRepository( Item )
export class ItemsRepository extends Repository< Item > {
  async getItems() : Promise< Item[]> {
    const items = await this.find({ relations: ['menus'] } );
    return items;
  }
  async createItem( itemDto: ItemDto) : Promise< Item > {
    const { name, description, price } = itemDto;

    const item = this.create({
      name,
      description,
      price,
    })

    await this.save( item );
    return item;
  }

  async getItemById( id: string ) : Promise< Item > {
    const item = this.findOne( { where : { id }, relations: ['menus']  } );
    return item;
  }

  async getItemsById( ids: string[] ) : Promise< Item[] > {
    const items = await this.find( { where: { id: In(ids) }, relations: ['menus'] } );
    return items;
  }

  async updateItem ( id: string, itemDto: ItemDto,): Promise< Item > {
    const { name, description, price } = itemDto;
    const item = await this.getItemById( id );

    if( !item ) {
      throw new NotFoundException(`Item with ID "${id}" not found`);
    }
    item.name = name,
      item.description = description,
      item.price = price,

      await this.save( item );
    return item;
  }
  async deleteById( id: string ) : Promise< Item >  {
    const item = await this.getItemById( id );
    if( !item ) {
      throw new NotFoundException(`Item with ID "${id}" not found.`);
    }
    this.delete( { id } );
    return item;
  }

}
