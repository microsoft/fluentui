import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { InteractionTagSlots, InteractionTagState } from './InteractionTag.types';
import styles from './InteractionTag.module.css';

export const interactionTagClassNames: SlotClassNames<InteractionTagSlots> = {
  root: 'fui-InteractionTag',
};

export const useInteractionTagStyles = (state: InteractionTagState): InteractionTagState => {
  state.root.className = clsx(interactionTagClassNames.root, styles.root, state.root.className);
  return state;
};
