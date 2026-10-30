import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { DividerSlots, DividerState } from './Divider.types';
import styles from './Divider.module.css';

export const dividerClassNames: SlotClassNames<DividerSlots> = {
  root: 'fui-Divider',
  wrapper: 'fui-Divider__wrapper',
};

export const useDividerStyles_unstable = (state: DividerState): DividerState => {
  state.root.className = clsx(
    dividerClassNames.root,
    styles.root,
    styles[state.alignContent],
    state.appearance && styles[state.appearance],
    styles[state.vertical ? 'vertical' : 'horizontal'],
    state.inset && styles.inset,
    state.root.children !== undefined && styles.withChildren,
    state.root.className,
  );
  if (state.wrapper) {
    state.wrapper.className = clsx(dividerClassNames.wrapper, state.wrapper.className);
  }

  return state;
};
