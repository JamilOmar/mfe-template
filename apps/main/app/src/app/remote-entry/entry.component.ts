import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-entry',
  template: `<demo-nx-welcome></demo-nx-welcome>`,
})
export class RemoteEntryComponent implements OnInit {
  ngOnInit() {
    console.log('loaded remote entry component');
  }
}
