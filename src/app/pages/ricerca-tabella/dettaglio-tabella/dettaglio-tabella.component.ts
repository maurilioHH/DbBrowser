import { SearchTableColumnsRequest } from './../../../model/search-table-columns-request';
import { Component, inject, input, OnInit, DestroyRef, effect, signal } from '@angular/core';
import { InfoTabellaVista } from '../../../model/info-tabella-vista';
import { DatabaseService } from '../../../services/database.service';
import { InfoColonna } from '../../../model/info-colonna';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { QueryVistaComponent } from './query-vista/query-vista.component';
import { QueryViewRequest } from '../../../model/query-view-request';


@Component({
  selector: 'app-dettaglio-tabella',
  imports: [ 
    QueryVistaComponent,
  ],
  templateUrl: './dettaglio-tabella.component.html',
  styleUrl: './dettaglio-tabella.component.css'
})

export class DettaglioTabellaComponent {
  
  tabellaSelezionata = input<InfoTabellaVista | undefined>();
  databaseService = inject(DatabaseService);
  listaColonne = signal<InfoColonna[] | undefined>(undefined);
  queryText = signal<string | undefined>(undefined);

  private destroyRef = inject(DestroyRef);

  constructor(){
    effect(() => {
      this.listaColonne.set(undefined);
      const tabellaVista = this.tabellaSelezionata();
      if(!tabellaVista) return;

      let searchTableColumnsRequest: SearchTableColumnsRequest = {
        databaseKey: tabellaVista.dbKey,
        owner: tabellaVista.owner,
        tableName: tabellaVista.name
      }

      this.databaseService
        .searchTableColumns(searchTableColumnsRequest)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: data => {
            console.log(data);
            this.listaColonne.set(data); 
          }
        });

      let queryViewRequest: QueryViewRequest = {
        databaseKey: tabellaVista.dbKey,
        owner: tabellaVista.owner,
        viewName: tabellaVista.name
      }

      console.log('tabellaVista: ', tabellaVista );


      if(tabellaVista.type === 'V'){
        this.databaseService
        .getQueryView(queryViewRequest)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: data => {
            console.log(data);
            this.queryText.set(data); 
          }
        });
      }    


    }) ;
  }


}
