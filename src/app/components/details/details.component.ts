import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { EntityDetailRequestModel } from 'src/app/_models/entity-detail-request.model';
import { CroatiaTownsService } from 'src/app/_services/croatia-towns.service';

@Component({
  selector: 'app-details',
  styleUrls: ['details.component.scss'],
  templateUrl: 'details.component.html',
})
export class DetailsComponent implements OnInit, OnDestroy, OnChanges {
  private detailsSubscription: Subscription;

  @Input() selectedValues: EntityDetailRequestModel;

  public detailsForm = this.formBuilder.group({
    address: new FormControl({ value: '', disabled: true }),
    country: new FormControl({ value: 'Hrvatska', disabled: true }),
    email: new FormControl({ value: '', disabled: true }),
    fax: new FormControl({ value: '', disabled: true }),
    governor: new FormControl({ value: '', disabled: true }),
    name: new FormControl({ value: '', disabled: true }),
    phone: new FormControl({ value: '', disabled: true }),
    viceGovernor: new FormControl({ value: '', disabled: true }),
    web: new FormControl({ value: '', disabled: true }),
    zipCode: new FormControl({ value: '', disabled: true }),
  });

  public hasError = false;

  constructor(
    private formBuilder: FormBuilder,
    private townsService: CroatiaTownsService,
  ) {}

  public get f() {
    return this.detailsForm.value;
  }

  ngOnInit() {
    this._loadData();
  }

  ngOnDestroy() {
    this.detailsSubscription.unsubscribe();
  }

  ngOnChanges() {
    this._loadData();
  }

  private _loadData() {
    this.detailsSubscription = this.townsService
      .getDetails(this.selectedValues)
      .subscribe(
        res => {
          this.detailsForm.patchValue(res);
          this.hasError = false;
        },
        err => {
          // console.log(err);
          this.hasError = true;
        },
      );
  }
}
