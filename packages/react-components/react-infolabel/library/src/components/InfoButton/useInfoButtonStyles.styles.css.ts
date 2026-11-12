import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { InfoButtonSlots, InfoButtonState } from './InfoButton.types';
import styles from './InfoButton.module.css';

export const infoButtonClassNames: SlotClassNames<InfoButtonSlots> = {
  root: 'fui-InfoButton',
  // this className won't be used, but it's needed to satisfy the type checker
  popover: 'fui-InfoButton__popover',
  info: 'fui-InfoButton__info',
};

export const useInfoButtonStyles_unstable = (state: InfoButtonState): InfoButtonState => {
  state.root.className = clsx(
    infoButtonClassNames.root,
    styles.root,
    styles[state.size],
    state.popover.open && styles.open,
    state.root.className,
  );
  // The surface is portaled, so it must carry its own size class.
  state.info.className = clsx(infoButtonClassNames.info, styles.info, styles[state.size], state.info.className);

  return state;
};
