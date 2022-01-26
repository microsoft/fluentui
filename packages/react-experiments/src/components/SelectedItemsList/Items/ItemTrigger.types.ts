import * as React from 'react';
import type { ISelectedItemProps } from '../SelectedItemsList.types';

export type TriggerProps<T> = ISelectedItemProps<T> & {
  onTrigger?: () => void;
};

export type Item<T> = React.ComponentType<ISelectedItemProps<T>>;

export type ItemCanDispatchTrigger<T> = React.ComponentType<TriggerProps<T>>;
