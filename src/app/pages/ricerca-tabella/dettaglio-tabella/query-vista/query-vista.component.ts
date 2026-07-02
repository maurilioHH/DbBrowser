import { Component, input } from '@angular/core';
import {
	NgbAccordionButton,
	NgbAccordionDirective,
	NgbAccordionItem,
	NgbAccordionHeader,
	NgbAccordionToggle,
	NgbAccordionBody,
	NgbAccordionCollapse,
  NgbModal,
} from '@ng-bootstrap/ng-bootstrap/';

@Component({
  selector: 'app-query-vista',
  imports: [	
    NgbAccordionButton,
    NgbAccordionDirective,
    NgbAccordionItem,
    NgbAccordionHeader,
    NgbAccordionToggle,
    NgbAccordionBody,
    NgbAccordionCollapse
  ],
  templateUrl: './query-vista.component.html',
  styleUrl: './query-vista.component.css'
})

export class QueryVistaComponent {
  queryText = input.required<string>();
}
