import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectCounters,selectTotalCounters } from '../../store/counter.selectors';
import { addCounter, decrement, deleteCounter, increment, resetAll } from '../../store/counter.actions';
import { Counter } from '../../store/counter.reducer';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-counter',
  imports: [CommonModule],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css'
})
export class CounterComponent {
  counters$: Observable<Counter[]>;
  totalCounters$: Observable<number>;

  private nextId = 1;

  constructor(private store: Store) {
    this.counters$ = this.store.select(selectCounters);
    this.totalCounters$ = this.store.select(selectTotalCounters);
  }

  addNewCounter() {
    this.store.dispatch(addCounter({ id: this.nextId++ }));
  }

  incrementCounter(id: number) {
    this.store.dispatch(increment({ id }));
  }

  decrementCounter(id: number) {
    this.store.dispatch(decrement({ id }));
  }

  deleteCounter(id: number) {
    this.store.dispatch(deleteCounter({ id }));
  }

  resetAllCounters() {
    this.store.dispatch(resetAll());
  }
}
