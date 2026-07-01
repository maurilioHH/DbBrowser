import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainNavComponent } from './pages/main-nav/main-nav.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoadingComponent } from './shared/loading/loading.component';

@Component({
  selector: 'app-root',
  imports: [MainNavComponent, HeaderComponent, FooterComponent, LoadingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'db-browser';
}
