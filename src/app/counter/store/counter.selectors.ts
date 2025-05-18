import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CounterState } from './counter.reducer';

export const selectCounterState = createFeatureSelector<CounterState>('counter');

export const selectCounters = createSelector(
  selectCounterState,
  (state) => state.counters
);

export const selectTotalCounters = createSelector(
  selectCounterState,
  (state) => state.counters.length
);