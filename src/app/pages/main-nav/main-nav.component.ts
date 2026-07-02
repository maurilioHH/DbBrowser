import { Component } from '@angular/core';
import {
  NgbNavContent,
  NgbNav,
  NgbNavItem,
  NgbNavItemRole,
  NgbNavLinkButton,
  NgbNavLinkBase,
  NgbNavOutlet,
} from '@ng-bootstrap/ng-bootstrap';
import { RicercaTabellaComponent } from '../ricerca-tabella/ricerca-tabella.component';
import { DettaglioTabellaComponent } from '../ricerca-tabella/dettaglio-tabella/dettaglio-tabella.component';
import { InfoTabellaVista } from '../../model/info-tabella-vista';

@Component({
  selector: 'app-main-nav',
  imports: [
    NgbNavContent,
    NgbNav,
    NgbNavItem,
    NgbNavItemRole,
    NgbNavLinkButton,
    NgbNavLinkBase,
    NgbNavOutlet,
    RicercaTabellaComponent,
    DettaglioTabellaComponent
  ],
  templateUrl: './main-nav.component.html',
  styleUrl: './main-nav.component.css',
})

export class MainNavComponent {
  active = 1;
  tabellaSelezionata: InfoTabellaVista | undefined = undefined;
  tabDettaglioDisabled = true;

  onTabellaSelezionata(tabSelezionata: InfoTabellaVista | undefined){
    //console.log('tabSelezionata: ', tabSelezionata);
    this.tabellaSelezionata = tabSelezionata;
    this.tabDettaglioDisabled = this.tabellaSelezionata === undefined;
  }

}
