import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { ToasterSlots, ToasterState } from './Toaster.types';
import { TOAST_POSITIONS, getPositionStyles } from '../../state/index';
import styles from './Toaster.module.css';

export const toasterClassNames: SlotClassNames<ToasterSlots> = {
  root: 'fui-Toaster',
};

export const useToasterStyles_unstable = (state: ToasterState): ToasterState => {
  const className = clsx(toasterClassNames.root, styles.root, state.inline && styles.inline, state.root.className);
  for (const position of ['bottomStart', 'bottomEnd', 'topStart', 'topEnd', 'top', 'bottom'] as const) {
    const positionSlot = state[position];
    if (positionSlot) {
      positionSlot.className = className;
      positionSlot.style ??= {};
      Object.assign(positionSlot.style, getPositionStyles(TOAST_POSITIONS[position], state.dir, state.offset));
    }
  }
  return state;
};
