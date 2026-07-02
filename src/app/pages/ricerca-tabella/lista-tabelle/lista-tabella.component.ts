import { Component, Directive, EventEmitter, input, Input, model, output, Output, QueryList, ViewChildren } from '@angular/core';
import { InfoTabellaVista } from '../../../model/info-tabella-vista';


@Component({
	selector: 'app-lista-tabella',
	imports: [],
	templateUrl: './lista-tabella.component.html',
  styleUrl: './lista-tabella.component.css',
})

export class ListaTabella {

  listaTabelle = input<InfoTabellaVista[]>();
  
  tabellaSelezionata = output<InfoTabellaVista>();


  onSelectTable(table: InfoTabellaVista){
	  this.tabellaSelezionata.emit(table);
  }

}