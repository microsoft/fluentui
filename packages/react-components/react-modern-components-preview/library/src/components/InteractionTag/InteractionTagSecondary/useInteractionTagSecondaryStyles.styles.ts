import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { InteractionTagSecondarySlots, InteractionTagSecondaryState } from './InteractionTagSecondary.types';
import styles from './InteractionTagSecondary.module.css';

export const interactionTagSecondaryClassNames: SlotClassNames<InteractionTagSecondarySlots> = {
  root: 'fui-InteractionTagSecondary',
};

export const useInteractionTagSecondaryStyles = (state: InteractionTagSecondaryState): InteractionTagSecondaryState => {
  state.root.className = clsx(interactionTagSecondaryClassNames.root, styles.root, state.root.className);
  return state;
};
