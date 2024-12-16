import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MainViewComponent } from "./views/main-view/main-view.component";
import { CommonModule } from '@angular/common';
import { isStandalone } from '@angular/core';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, CommonModule, RouterLink],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-tester';
}
