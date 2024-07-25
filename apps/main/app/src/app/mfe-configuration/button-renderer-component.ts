// Author: T4professor

import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { GridEventParams, MFEConfiguration } from '../types';

@Component({
  selector: 'app-button-renderer',
  template: `
    <button type="button" class="btn btn-link" (click)="onClick($event)">
      {{ label }}
    </button>
  `,
})
export class ButtonRendererComponent implements ICellRendererAngularComp {
  constructor() {
    this.label = '';
  }

  public params: ICellRendererParams | any;
  public label: string;

  agInit(params: ICellRendererParams): void {
    this.params = params;
    this.label = this.params.label || null;
  }
  refresh(params?: ICellRendererParams): boolean {
    return true;
  }
  onClick($event: unknown) {
    if (this.params.onClick instanceof Function) {
      const params = {
        event: $event,
        rowData: this.params.node.data,
      } as GridEventParams<MFEConfiguration>;
      this.params.onClick(params);
    }
  }
}
