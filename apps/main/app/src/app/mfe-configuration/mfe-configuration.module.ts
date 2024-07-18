import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule } from '@angular/forms';
import { MFEConfigurationComponent } from './mfe-configuration.component';

@NgModule({
  declarations: [MFEConfigurationComponent],
  imports: [
    CommonModule,
    AgGridModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: MFEConfigurationComponent,
      },
    ]),
  ],
  providers: [],
})
export class MFEConfigurationModule {}
