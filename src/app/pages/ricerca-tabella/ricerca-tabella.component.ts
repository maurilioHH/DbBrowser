import { SearchTablesRequest } from './../../model/search-tables-request';
import { Component, DestroyRef, inject, OnDestroy, OnInit, output, signal } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import { DbConfigMap } from '../../model/db-config.model';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ReactiveFormsModule, FormArray } from '@angular/forms';
import { KeyValuePipe, NgClass } from '@angular/common';
import { InfoTabella } from '../../model/info-tabella';
import { ListaTabella } from './lista-tabelle/lista-tabella.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

interface DropdownOption {
  id: string;
  label: string;
}

@Component({
  selector: 'app-ricerca-tabella',
  imports: [ReactiveFormsModule, KeyValuePipe, ListaTabella, NgbDropdownModule, NgClass],
  templateUrl: './ricerca-tabella.component.html',
  styleUrl: './ricerca-tabella.component.css',
})

export class RicercaTabellaComponent implements OnInit {
  databaseService = inject(DatabaseService);
  formBuilder = inject(FormBuilder);

  databases: DbConfigMap | undefined;
  //listaTabelle?: InfoTabella[] = undefined;
  listaTabelle = signal<InfoTabella[] | undefined>(undefined);
  listaOwners = signal<string[] | undefined>(undefined);

  tabellaSelezionata = output<InfoTabella | undefined>();
  navItem = output<number>();

  tipologieSelezionate: string[] = [];

  private destroyRef = inject(DestroyRef);

  tipologieObj: DropdownOption[] = [
    { id: 'T', label: 'Tabelle' },
    { id: 'V', label: 'Viste' }
  ];
  tipologiaDefault = 'T';

  dbFormGroup = new FormGroup(
    {
      database: new FormControl('tutti', { updateOn: 'change' }),
      owner: new FormControl(''),
      nomeTabella: new FormControl('', {
        validators: [Validators.minLength(3)],
      }),
      tipologie: new FormArray(this.tipologieObj.map((option) => new FormControl(option.id === this.tipologiaDefault)))
    },
    {
      validators: almenoUnoObbligatorioValidator,
    },
  );

  ngOnInit(): void {
    this.databaseService.getDatabases()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data) => {
          this.databases = data;
        },
      });

    this.dbFormGroup.controls.nomeTabella.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((nuovoValore) => {
        this.listaTabelle.set(undefined);
        this.tabellaSelezionata.emit(undefined);
      });

    this.dbFormGroup.controls.tipologie.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((nuovoValore) => {
        console.log(nuovoValore);
        this.listaTabelle.set(undefined);
        this.tabellaSelezionata.emit(undefined);
      });

  }

  onSelectDatabase() {
    // Recuperiamo il valore direttamente dal form control
    const selectedDb = this.dbFormGroup.controls.database.value;

    this.listaOwners.set(undefined);
    this.listaTabelle.set(undefined);
    this.dbFormGroup.controls.owner.setValue(null);
    this.dbFormGroup.controls.nomeTabella.setValue(null);

    this.tabellaSelezionata.emit(undefined);

    // Gestione di "Tutti" o valore nullo
    if (!selectedDb || selectedDb === 'tutti') {
      // Gestisci il caso in cui non ci sia un DB specifico (es. svuota o ferma la chiamata)
      return;
    }

    const ownersSubscription = this.databaseService
      .searchOwners(selectedDb) // Non serve più l'operatore '!'
      .subscribe({
        next: (data) => {
          this.listaOwners.set(data);
        },
      });
    this.destroyRef.onDestroy(() => ownersSubscription.unsubscribe());
  }

  onSelectOwner() {
    this.listaTabelle.set(undefined);
  }
  
  onSelectTipologia(){
    this.listaTabelle.set(undefined);
  }

  onSubmit() {

    const formValue = this.dbFormGroup.value;

    const tipologieSelezionateFinali = this.tipologieObj
      .filter((_, index) => formValue.tipologie![index])
      .map(option => option.id);

    console.log('tipologieSelezionateFinali: ', tipologieSelezionateFinali);

    let request: SearchTablesRequest = {
      databaseName: this.dbFormGroup.controls.database.value === 'tutti' ? null : this.dbFormGroup.controls.database.value,
      owner: this.dbFormGroup.controls.owner.value ?? undefined,
      tableName: this.dbFormGroup.controls.nomeTabella.value ?? undefined,
      tipologie: tipologieSelezionateFinali
    };

    this.databaseService.searchTables(request)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data) => {
          this.listaTabelle.set(data);
        },
      });
    
  }

  onReset() {

    this.dbFormGroup.reset({
      database: 'tutti', // Ripristina il valore iniziale se vuoi
      owner: '',
      nomeTabella: ''
    });

    const valoriDefaultTipologie = this.tipologieObj.map(option => option.id === this.tipologiaDefault);
    this.tipologieFormArray.reset(valoriDefaultTipologie);

    this.dbFormGroup.updateValueAndValidity();

    this.listaOwners.set(undefined);
    this.listaTabelle.set(undefined);
    this.tabellaSelezionata.emit(undefined);
  }

  onTabellaSelezionata(tabella: InfoTabella) {
    this.tabellaSelezionata.emit(tabella);
    this.navItem.emit(2);
  }


  get tipologieFormArray(): FormArray {
    return this.dbFormGroup.get('tipologie') as FormArray;
  }

  // Genera la label dinamica per il bottone basandosi sui booleani del FormArray
  getDropdownLabel(): string {
    const selectedValues = this.tipologieFormArray.value; // es. [true, false, true]
    
    // Filtriamo le opzioni corrispondenti ai 'true'
    const selectedLabels = this.tipologieObj
      .filter((_, index) => selectedValues[index])
      .map(option => option.label);

    if (selectedLabels.length === 0) {
      return 'Seleziona opzioni';
    }
    if (selectedLabels.length > 2) {
      return `${selectedLabels.length} selezionati`;
    }
    return selectedLabels.join(', ');
  }

  // Restituisce la classe CSS per il colore del testo
  getDropdownColorClass(): string {
    // Verifichiamo se ci sono elementi selezionati (puoi usare la stessa logica che usi in getDropdownLabel)
    const selectedValues = this.tipologieFormArray.value;
    const hasSelection = selectedValues.some((val: boolean) => val === true);

    // Se NON c'è nessuna selezione, ritorna 'text-muted' (grigio), altrimenti testo scuro
    return hasSelection ? 'text-dark' : 'text-muted';
  }


}







//VALIDATORE
export const almenoUnoObbligatorioValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

  // Se il controllo non è ancora pronto, evita controlli a vuoto
  if (!control) return null;

  const database = control.get('database')?.value;
  // Forza il valore a stringa vuota se è null o undefined
  const nomeTabella = control.get('nomeTabella')?.value || '';

  // Se il database è 'tutti' o null e la tabella è vuota
  if ((database === null || database === 'tutti') && nomeTabella.trim() === '') {
    // Il form è INVALIDO
    return { tabellaRichiestaConTutti: true };
  }

  // In tutti gli altri casi il form è valido
  return null;
};

