import { Injectable } from "@nestjs/common";

import { Menu } from "./models/menu.model";
import { MenuDto } from "./dto/menu.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class MenusService {

  constructor(
    @InjectRepository(Menu)
    private menusRepository: Repository< Menu >,

  ) {}

  async getMenus() : Promise< Menu[]> {
	  return this.menusRepository.find();
  }

}
