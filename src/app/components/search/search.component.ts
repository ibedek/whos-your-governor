import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
import { CommunityModel } from 'src/app/_models/community.model';
import { CountyModel } from 'src/app/_models/county.model';
import { EntityDetailRequestModel } from 'src/app/_models/entity-detail-request.model';
import { TownModel } from 'src/app/_models/town.model';
import { CroatiaTownsService } from 'src/app/_services/croatia-towns.service';

@Component({
  selector: 'app-search',
  styleUrls: ['search.component.scss'],
  templateUrl: 'search.component.html',
})
export class SearchComponent implements OnInit {
  private counties: Observable<CountyModel[]>;
  private townsCommunities: Observable<Array<TownModel | CommunityModel>>;

  @Output() selectedValues: EventEmitter<
    EntityDetailRequestModel
  > = new EventEmitter();

  public filteredCounties: Observable<CountyModel[]>;
  public filteredTownsCommunities: Observable<
    Array<TownModel | CommunityModel>
  >;

  public serachForm = this.formBuilder.group({
    county: [null],
    townCommunity: [null],
  });

  constructor(
    private townsService: CroatiaTownsService,
    private formBuilder: FormBuilder,
  ) {}

  public get f() {
    return this.serachForm.value;
  }

  ngOnInit() {
    this.counties = this.townsService.getCounties();
    this.townsCommunities = this.townsService.getTownsCommunities();

    this._initChangeEvents();
  }

  onCountySelect(value: CountyModel) {
    if (this.f.townCommunity) {
      this.serachForm.patchValue({ townCommunity: null });
    }

    this.filteredTownsCommunities = this.townsCommunities.pipe(
      map((arr: any[]) => arr.filter(itm => itm.countyID === value.ID)),
    );
  }

  onTownCommunitySelect(value: TownModel | CommunityModel) {
    if (!this.f.county) {
      this.filteredCounties = this.counties.pipe(
        map((arr: any[]) => {
          const county = arr.filter(itm => itm.ID === value.countyID);

          this.serachForm.patchValue({ county: county[0] });
          return county;
        }),
      );
    }
  }

  displayFn(item?: any): string | undefined {
    return item ? item.name : undefined;
  }

  submitValues(): void {
    let reqParams: EntityDetailRequestModel;
    if (this.f.townCommunity) {
      reqParams = {
        entityType: this.f.townCommunity.entityType,
        ID: this.f.townCommunity.ID,
      };
    } else if (!this.f.townCommunity && this.f.county) {
      reqParams = {
        entityType: this.f.county.entityType,
        ID: this.f.county.ID,
      };
    }

    this.serachForm.reset();
    this.selectedValues.emit(reqParams);
  }

  private _initChangeEvents(): void {
    this.filteredCounties = this.serachForm.get('county').valueChanges.pipe(
      startWith(''),
      switchMap(value => this._filter(this.counties, value)),
    );

    this.filteredTownsCommunities = this.serachForm
      .get('townCommunity')
      .valueChanges.pipe(
        startWith(''),
        switchMap(value => this._filter(this.townsCommunities, value)),
      );
  }

  private _filter(
    obsArr: Observable<any[]>,
    value: any | string,
  ): Observable<any[]> {
    if (value === null) {
      return obsArr;
    }

    const filterValue =
      typeof value === 'string'
        ? value.toLowerCase()
        : value.name.toLowerCase();

    return obsArr.pipe(
      map((arr: any[]) =>
        arr.filter(itm => itm.name.toLowerCase().includes(filterValue)),
      ),
    );
  }
}
