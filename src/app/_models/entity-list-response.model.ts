import { CommunityModel } from './community.model';
import { CountyModel } from './county.model';
import { TownModel } from './town.model';

export interface EntityListResponseModel {
  counties?: CountyModel[];
  towns?: TownModel[];
  communities?: CommunityModel[];
  townsCommunities?: Array<TownModel | CommunityModel>;
}
