import createManager from '../createManager';
import { Manager, ManagerConfig } from '../types';

export type DropdownActions<I> = {
  clear: () => void;

  open: () => void;
  close: () => void;

  select: (item: I) => void;
  unselect: (item: I) => void;
};

export type DropdownState<I> = {
  multiple: boolean;
  open: boolean;

  searchQuery: string;

  items: I[];
  values: string[];
};

export type DropdownManager<I> = Manager<DropdownState<I>, DropdownActions<I>>;

export const createDropdownManager = <I>(
  config: Partial<ManagerConfig<DropdownState<I>, DropdownActions<I>>> = {},
): DropdownManager<I> =>
  createManager<DropdownState<I>, DropdownActions<I>>({
    ...config,
    state: {
      multiple: false,
      open: false,

      searchQuery: '',

      items: [],
      values: [],

      ...config.state,
    },
    actions: {
      clear: () => () => ({ values: [] }),

      close: () => () => ({ open: false }),
      open: () => () => ({ open: true }),

      select: (item: I) => state => ({ values: [state.items.indexOf(item).toString()] }),
      unselect: (item: I) => state => ({ values: [state.items.indexOf(item).toString()] }),

      ...config.actions,
    },
  });
