import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { AriaLiveSlots, AriaLiveState } from './AriaLive.types';
import styles from './AriaLive.module.css';

export const ariaLiveClassNames: SlotClassNames<AriaLiveSlots> = {
  assertive: 'fui-AriaLive__assertive',
  polite: 'fui-AriaLive__polite',
};

export const useAriaLiveStyles_unstable = (state: AriaLiveState): AriaLiveState => {
  state.assertive.className = clsx(styles.visuallyHidden, ariaLiveClassNames.assertive, state.assertive.className);
  state.polite.className = clsx(styles.visuallyHidden, ariaLiveClassNames.polite, state.polite.className);
  return state;
};
