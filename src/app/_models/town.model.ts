import { EntityModel } from './entity.model';

export interface TownModel extends EntityModel {
  countyID: number;
  countyName: string;
}
