/* eslint-disable @typescript-eslint/no-this-alias */
import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColDef } from 'ag-grid-community';
import { MFEConfigurationService } from './mfe-configuration.service';
import { ButtonRendererComponent } from './button-renderer-component';
import {
  CreateMFEConfigurationDto,
  GridEventParams,
  MFEConfiguration,
  UpdateMFEConfigurationDto,
} from './types';

@Component({
  selector: 'app-mfe-configuration',
  templateUrl: './mfe-configuration.component.html',
})
export class MFEConfigurationComponent implements OnInit {
  constructor(
    private mfeConfigurationService: MFEConfigurationService,
    private modalService: NgbModal
  ) {}
  @ViewChild('content') content: unknown;
  private modalRef: any;
  private isNew = true;
  columnDefs: ColDef[] = [
    { headerName: 'Code', field: 'code' },
    { headerName: 'Name', field: 'name' },
    { headerName: 'Route', field: 'route' },
    { headerName: 'Description', field: 'description' },
    { headerName: 'Module', field: 'module' },
    { headerName: 'Url', field: 'url' },
    { headerName: 'Label For Link', field: 'label' },
    { headerName: 'Configuration', field: 'configuration' },
    { headerName: 'ModuleClass', field: 'moduleClass' },
    {
      headerName: 'Actions',
      field: 'actions',
      cellRenderer: ButtonRendererComponent,
      cellRendererParams: {
        onClick: this.onEdit.bind(this),
        label: 'Edit',
      },
    },
    {
      headerName: 'Actions',
      field: 'actions',
      cellRenderer: ButtonRendererComponent,
      cellRendererParams: {
        onClick: this.onDelete.bind(this),
        label: 'Delete',
      },
    },
  ];

  rowData: MFEConfiguration[] = [];
  selectedItem: Partial<MFEConfiguration> = {};

  getData() {
    this.mfeConfigurationService.findAll().subscribe((data) => {
      this.rowData = data;
    });
  }
  ngOnInit(): void {
    this.getData();
  }

  onSubmit() {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;
    const action$ = this.isNew
      ? this.mfeConfigurationService.create(
          this.selectedItem as CreateMFEConfigurationDto
        )
      : this.mfeConfigurationService.update(
          this.selectedItem?.code,
          this.selectedItem as UpdateMFEConfigurationDto
        );
    action$.subscribe({
      complete() {
        self.modalRef.close();
        self.getData();
      },
    });
  }

  onOpen() {
    this.isNew = true;
    this.openModal();
  }
  onEdit(e: GridEventParams<MFEConfiguration>) {
    const self = this;
    self.isNew = false;
    this.mfeConfigurationService.findOne(e.rowData.code).subscribe({
      next(data) {
        self.openModal(data);
      },
    });
  }
  openModal(data: MFEConfiguration | object = {}) {
    this.selectedItem = data;
    this.modalRef = this.modalService.open(this.content);
    this.modalRef.result
      .then((result: any) => {
        console.log(result);
      })
      .finally(() => this.clean());
  }
  clean() {
    this.selectedItem = {};
  }
  onDelete(e: GridEventParams<MFEConfiguration>) {
    this.mfeConfigurationService
      .remove(e.rowData.code)
      .subscribe({ complete: () => this.getData() });
  }
}
