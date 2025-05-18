import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectTotalCounters } from '../../../counter/store/counter.selectors';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header-bar',
  imports: [RouterModule,CommonModule],
  templateUrl: './header-bar.component.html',
  styleUrl: './header-bar.component.css'
})
export class HeaderBarComponent {
  counterCount$:Observable<any>;

  constructor(private store: Store) {
    this.counterCount$ = this.store.select(selectTotalCounters);
  }

}
