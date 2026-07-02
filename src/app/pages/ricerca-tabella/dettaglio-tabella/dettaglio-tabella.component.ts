import { SearchTableColumnsRequest } from './../../../model/search-table-columns-request';
import { Component, inject, input, OnInit, DestroyRef, effect, signal } from '@angular/core';
import { InfoTabellaVista } from '../../../model/info-tabella-vista';
import { DatabaseService } from '../../../services/database.service';
import { InfoColonna } from '../../../model/info-colonna';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { QueryVistaComponent } from './query-vista/query-vista.component';

@Component({
  selector: 'app-dettaglio-tabella',
  imports: [
    QueryVistaComponent
  ],
  templateUrl: './dettaglio-tabella.component.html',
  styleUrl: './dettaglio-tabella.component.css'
})

export class DettaglioTabellaComponent {
  
  tabellaSelezionata = input<InfoTabellaVista | undefined>();
  databaseService = inject(DatabaseService);
  listaColonne= signal<InfoColonna[] | undefined>(undefined);

  private destroyRef = inject(DestroyRef);

  constructor(){
    effect(() => {
      this.listaColonne.set(undefined);
      const tabella = this.tabellaSelezionata();
      if(!tabella) return;

      let request: SearchTableColumnsRequest = {
        databaseKey: tabella.dbKey,
        owner: tabella.owner,
        tableName: tabella.name
      }

      this.databaseService
        .searchTableColumns(request)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: data => {
            console.log(data);
            this.listaColonne.set(data); 
          }
        });
    }) ;
  }


}
