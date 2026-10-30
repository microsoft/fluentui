import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { InteractionTagSecondarySlots, InteractionTagSecondaryState } from './InteractionTagSecondary.types';
import styles from './InteractionTagSecondary.module.css';

export const interactionTagSecondaryClassNames: SlotClassNames<InteractionTagSecondarySlots> = {
  root: 'fui-InteractionTagSecondary',
};

export const useInteractionTagSecondaryStyles_unstable = (
  state: InteractionTagSecondaryState,
): InteractionTagSecondaryState => {
  state.root.className = clsx(
    interactionTagSecondaryClassNames.root,
    styles.root,
    styles[state.shape],
    styles[state.size],
    styles[state.appearance],
    state.disabled && styles.disabled,
    state.selected && !state.disabled && styles.selected,
    state.root.className,
  );
  return state;
};
