import { Component } from '@angular/core';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'DevsuPichincha';

  constructor(private titleService: Title) {
    this.titleService.setTitle(this.title);
  }
}
