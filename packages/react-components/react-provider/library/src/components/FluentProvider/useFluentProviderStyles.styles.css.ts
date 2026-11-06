import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { FluentProviderSlots, FluentProviderState } from './FluentProvider.types';
import styles from './FluentProvider.module.css';

export const fluentProviderClassNames: SlotClassNames<FluentProviderSlots> = {
  root: 'fui-FluentProvider',
};

/** Applies style classnames to slots */
export const useFluentProviderStyles_unstable = (state: FluentProviderState): FluentProviderState => {
  state.root.className = clsx(
    fluentProviderClassNames.root,
    state.themeClassName,
    styles.root,
    state.dir === 'rtl' && styles.rtl,
    state.root.className,
  );

  return state;
};
