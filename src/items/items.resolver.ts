import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";

import { Item } from "./models/item.model";
import { ItemDto } from './dto/item.dto';

import { ItemsService } from "./items.service";

@Resolver((of) => Item)
export class ItemsResolver {
  constructor(private readonly itemsService: ItemsService) {}

  @Query((returns) => [Item])
  async items(): Promise<Item[]> {
    return await this.itemsService.getItems();
  }

  @Mutation( returns => Item )
  async createItem( @Args('item') item: ItemDto ) : Promise< Item> {
    return await this.itemsService.createItem( item );
  }

  @Query( returns => Item )
  async item(@Args('id') id: string) : Promise< Item > {
    return await this.itemsService.getItemById( id );
  }

  @Mutation( returns => Item )
  async updateItem(@Args('id') id: string, @Args('item') item: ItemDto) {
    return this.itemsService.updateItem( id, item );
  }

  @Mutation( returns => Item )
  async deleteById(@Args('id') id: string ) : Promise < Item > {
    return this.itemsService.deleteById( id );
  }

}
