import { EntityRepository, Repository } from 'typeorm';
import { Menu } from './models/menu.model';
import { MenuDto } from './dto/menu.dto';


@EntityRepository( Menu )
export class MenusRepository extends Repository< Menu > {
  async getMenus() : Promise< Menu[]> {
    const query = this.createQueryBuilder( 'menu' );
    const menus = await query.getMany();
    return menus;
  }

}
