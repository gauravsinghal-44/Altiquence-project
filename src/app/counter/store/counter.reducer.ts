import { createReducer, on } from '@ngrx/store';
import { increment, decrement, deleteCounter, addCounter, resetAll } from './counter.actions';

export interface Counter {
  id: number;
  count: number;
}

export interface CounterState {
  counters: Counter[];
}

export const initialState: CounterState = {
  counters: []
};

export const counterReducer = createReducer(
  initialState,
  on(addCounter, (state, { id }) => ({
    ...state,
    counters: [...state.counters, { id, count: 0 }]
  })),
  on(increment, (state, { id }) => ({
    ...state,
    counters: state.counters.map(c =>
      c.id === id ? { ...c, count: c.count + 1 } : c
    )
  })),
  on(decrement, (state, { id }) => ({
    ...state,
    counters: state.counters.map(c =>
      c.id === id && c.count > 0 ? { ...c, count: c.count - 1 } : c
    )
  })),
  on(deleteCounter, (state, { id }) => ({
    ...state,
    counters: state.counters.filter(c => c.id !== id)
  })),
  on(resetAll, (state) => ({
    ...state,
    counters: []
  }))
  
);
