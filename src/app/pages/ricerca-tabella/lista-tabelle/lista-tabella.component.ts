import { Component, Directive, EventEmitter, input, Input, model, output, Output, QueryList, ViewChildren } from '@angular/core';
import { InfoTabella } from '../../../model/info-tabella';


@Component({
	selector: 'app-lista-tabella',
	imports: [],
	templateUrl: './lista-tabella.component.html',
  styleUrl: './lista-tabella.component.css',
})

export class ListaTabella {

  listaTabelle = input<InfoTabella[]>();
  
  tabellaSelezionata = output<InfoTabella>();


  onSelectTable(table: InfoTabella){
	  this.tabellaSelezionata.emit(table);
  }

}