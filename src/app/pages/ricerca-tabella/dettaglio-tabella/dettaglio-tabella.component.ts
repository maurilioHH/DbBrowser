import { SearchTableColumnsRequest } from './../../../model/search-table-columns-request';
import { Component, inject, input, OnInit, DestroyRef, effect, signal } from '@angular/core';
import { InfoTabella } from '../../../model/info-tabella';
import { DatabaseService } from '../../../services/database.service';
import { InfoColonna } from '../../../model/info-colonna';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-dettaglio-tabella',
  imports: [],
  templateUrl: './dettaglio-tabella.component.html',
  styleUrl: './dettaglio-tabella.component.css'
})

export class DettaglioTabellaComponent {
  
  tabellaSelezionata = input<InfoTabella | undefined>();
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
        tableName: tabella.tableName
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
