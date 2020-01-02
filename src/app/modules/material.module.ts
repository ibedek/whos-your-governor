import { NgModule } from '@angular/core';
import { MatButtonModule, MatToolbarModule } from '@angular/material';

@NgModule({
  exports: [MatButtonModule, MatToolbarModule],
  imports: [MatButtonModule, MatToolbarModule],
})
export class MaterialModule {}
