/* eslint-disable @typescript-eslint/no-this-alias */
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ColDef } from 'ag-grid-community';
import { MFEConfigurationService } from './mfe-configuration.service';
import { ButtonRendererComponent } from './button-renderer-component';
import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor';
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
  // Editor options for the JSON editor
  editorOptions: JsonEditorOptions;
  @ViewChild('configuration', { static: false })
  editor!: JsonEditorComponent;
  // Data to be displayed in the grid
  rowData: MFEConfiguration[] = [];
  // Currently selected item for editing or adding
  selectedItem: Partial<MFEConfiguration> = {};
  @ViewChild('content') content: unknown;
  // Reference to the modal dialog
  private modalRef!: NgbModalRef;
  // Flag to check if a new item is being added
  private isNew = true;
  // Column definitions for the ag-grid
  columnDefs: ColDef[] = [
    { headerName: 'Code', field: 'code' },
    { headerName: 'Name', field: 'name' },
    { headerName: 'Route', field: 'route' },
    { headerName: 'Description', field: 'description' },
    { headerName: 'Module', field: 'module' },
    { headerName: 'Url', field: 'url' },
    { headerName: 'Label For Link', field: 'label' },
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
  constructor(
    private mfeConfigurationService: MFEConfigurationService,
    private modalService: NgbModal
  ) {
    this.editorOptions = new JsonEditorOptions();
    this.editorOptions.modes = ['code', 'text', 'tree', 'view'];
    this.editorOptions.mode = 'code';
    this.editorOptions.navigationBar = true;
    this.editorOptions.statusBar = true;
  }
  // Fetches data from the service and populates the grid
  getData() {
    this.mfeConfigurationService.findAll().subscribe((data) => {
      this.rowData = data;
    });
  }
  // Lifecycle hook that is called after Angular has initialized all data-bound properties
  ngOnInit(): void {
    this.getData();
  }
  // Handles form submission for both creating and updating configurations
  onSubmit() {
    const self = this;
    this.selectedItem.configuration = JSON.parse(this.editor.getText() || '{}');
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
  // Prepares the UI for a new configuration entry
  onOpen() {
    this.isNew = true;
    this.openModal();
  }
  // Handles the edit action for a grid row
  onEdit(e: GridEventParams<MFEConfiguration>) {
    const self = this;
    self.isNew = false;
    this.mfeConfigurationService.findOne(e.rowData.code).subscribe({
      next(data) {
        self.openModal(data);
      },
    });
  }
  // Opens the modal dialog with the selected item's data for editing
  openModal(data: MFEConfiguration | object = {}) {
    this.selectedItem = data;
    if (this.selectedItem.configuration == null) {
      this.selectedItem.configuration = {};
    }
    this.modalRef = this.modalService.open(this.content);
    this.modalRef.result.finally(() => this.clean());
  }
  // Resets the selectedItem to an empty object
  clean() {
    this.selectedItem = {};
  }
  // Handles the delete action for a grid row
  onDelete(e: GridEventParams<MFEConfiguration>) {
    this.mfeConfigurationService
      .remove(e.rowData.code)
      .subscribe({ complete: () => this.getData() });
  }
}
