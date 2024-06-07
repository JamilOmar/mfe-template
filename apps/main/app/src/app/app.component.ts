import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'main-app';
  routes: { path: string; name: string }[] = [{ path: '', name: 'home' }];
  constructor(private router: Router) {}
}
