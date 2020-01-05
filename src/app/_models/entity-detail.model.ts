import { EntityModel } from './entity.model';

export interface EntityDetailModel extends EntityModel {
  countyID?: number;
  countyName?: string;
  address: string;
  zipCode: number;
  phone: string;
  fax: string;
  email: string;
  web: string;
  governor: string;
  viceGovernor: string;
  viceGovernor2: string;
  viceNationalMinority: string;
  representativeBodyPresident: string;
}
