export interface CounterItem {
    id: number;
    count: number;
  }
  
  export interface CounterState {
    counters: CounterItem[];
  }
  
  export const initialState: CounterState = {
    counters: []
  };