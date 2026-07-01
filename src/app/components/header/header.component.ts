import { Component } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-header',
  imports: [NgbDropdownModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
