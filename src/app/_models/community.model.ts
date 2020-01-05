import { EntityModel } from './entity.model';

export interface CommunityModel extends EntityModel {
  countyID: number;
  countyName: string;
}
