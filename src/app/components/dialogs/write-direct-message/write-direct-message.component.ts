import { Component, OnInit, signal, Signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { DataService, ShortMember } from '../../../shared/services/data.service';
import { map, Observable, startWith } from 'rxjs';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'writeDirectMessage',
  standalone: true,
  imports: [MatButtonModule, FormsModule, ReactiveFormsModule, MatInputModule, MatAutocompleteModule, AsyncPipe],
  templateUrl: './write-direct-message.component.html',
  styleUrl: './write-direct-message.component.scss'
})
export class WriteDirectMessageComponent implements OnInit {
  myControl = new FormControl<string | ShortMember>('');

  members: Signal<ShortMember[] | null> = signal(null);

  filteredOptions!: Observable<ShortMember[] | undefined>;

  constructor(public dialogRef: MatDialogRef<WriteDirectMessageComponent>, private dataService: DataService) {}


  ngOnInit() {
    this.dataService.fetchContacts();
    this.members = this.dataService.getContacts();
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.fullName;
        return name ? this._filter(name as string) : this.members()?.slice();
      }),
    );
  }


  displayFn(user: ShortMember): string {
    return user && user.fullName ? user.fullName : '';
  }


  private _filter(name: string): ShortMember[] {
    const filterValue = name.toLowerCase();

    return this.members()?.filter(option => option.fullName.toLowerCase().includes(filterValue)) || [{ fullName: '', id: "abc", image: ''}];
  }


  writeContact(contact: ShortMember) {
    console.log("Writing to: ", contact);
    this.dialogRef.close();
  }

}
