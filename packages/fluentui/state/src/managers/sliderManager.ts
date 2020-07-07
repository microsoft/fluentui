import { createManager } from '../createManager';
import { Manager, ManagerConfig } from '../types';

export type SliderActions = {
  change: (value: string) => void;
};

export type SliderState = {
  value: string;
};

export type SliderManager = Manager<SliderState, SliderActions>;

export const createSliderManager = (config: Partial<ManagerConfig<SliderState, SliderActions>> = {}): SliderManager =>
  createManager<SliderState, SliderActions>({
    ...config,
    state: {
      value: '50',
      ...config.state,
    },
    actions: {
      change: value => () => ({ value }),
      ...config.actions,
    },
  });
