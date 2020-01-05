import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatInputModule,
  MatToolbarModule,
} from '@angular/material';

@NgModule({
  exports: [
    MatAutocompleteModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
  ],
  imports: [
    CommonModule,
    MatAutocompleteModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
  ],
})
export class MaterialModule {}
