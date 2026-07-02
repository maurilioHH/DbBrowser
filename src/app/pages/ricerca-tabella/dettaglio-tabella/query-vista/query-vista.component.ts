import { Component, input } from '@angular/core';
import {NgbAccordionModule,  NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-query-vista',
  imports: [	
    NgbAccordionModule
  ],
  templateUrl: './query-vista.component.html',
  styleUrl: './query-vista.component.css'
})

export class QueryVistaComponent {
  queryText = input.required<string | undefined>();
}
