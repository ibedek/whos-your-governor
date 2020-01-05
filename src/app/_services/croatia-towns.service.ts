import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ArrayHelper } from '../_helpers/array.helper';
import { CommunityModel } from '../_models/community.model';
import { CountyModel } from '../_models/county.model';
import { EntityDetailRequestModel } from '../_models/entity-detail-request.model';
import { EntityDetailModel } from '../_models/entity-detail.model';
import { EntityListResponseModel } from '../_models/entity-list-response.model';
import { TownModel } from '../_models/town.model';

@Injectable({
  providedIn: 'root',
})
export class CroatiaTownsService {
  private entities: Observable<EntityListResponseModel> = null;

  constructor(private http: HttpClient) {
    if (!this.entities) {
      this.entities = this._getList();
    }
  }

  public getCounties(): Observable<CountyModel[]> {
    return this.entities.pipe(
      map(r => ArrayHelper.orderBy(r.counties, 'name')),
    );
  }

  public getTownsCommunities(): Observable<Array<TownModel | CommunityModel>> {
    return this.entities.pipe(
      map(r => ArrayHelper.orderBy([...r.towns, ...r.communities], 'name')),
    );
  }

  getDetails(
    params: EntityDetailRequestModel,
    v?: number,
  ): Observable<EntityDetailModel> {
    params.v = v;

    let queryParams = new HttpParams();
    Object.entries(params).forEach(([key, value]: [string, any]) => {
      if (value) {
        queryParams = queryParams.set(key, value);
      }
    });

    return this.http
      .get<EntityDetailModel>('details.php', {
        params: queryParams,
      })
      .pipe(shareReplay());
  }

  private _getList(
    entityType?: number,
    v?: number,
  ): Observable<EntityListResponseModel> {
    const queryParamBase = {
      entityType,
      v,
    };

    let queryParams = new HttpParams();
    Object.entries(queryParamBase).forEach(([key, value]: [string, any]) => {
      if (value) {
        queryParams = queryParams.set(key, value);
      }
    });

    return this.http
      .get<EntityListResponseModel>('list.php', { params: queryParams })
      .pipe(shareReplay());
  }
}
