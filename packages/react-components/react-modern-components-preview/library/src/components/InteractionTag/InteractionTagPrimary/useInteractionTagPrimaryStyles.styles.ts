import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { InteractionTagPrimarySlots, InteractionTagPrimaryState } from './InteractionTagPrimary.types';
import styles from './InteractionTagPrimary.module.css';

export const interactionTagPrimaryClassNames: SlotClassNames<InteractionTagPrimarySlots> = {
  root: 'fui-InteractionTagPrimary',
  media: 'fui-InteractionTagPrimary__media',
  icon: 'fui-InteractionTagPrimary__icon',
  primaryText: 'fui-InteractionTagPrimary__primaryText',
  secondaryText: 'fui-InteractionTagPrimary__secondaryText',
};

export const useInteractionTagPrimaryStyles = (state: InteractionTagPrimaryState): InteractionTagPrimaryState => {
  state.root.className = clsx(interactionTagPrimaryClassNames.root, styles.root, state.root.className);
  if (state.media) {
    state.media.className = clsx(interactionTagPrimaryClassNames.media, styles.media, state.media.className);
  }
  if (state.icon) {
    state.icon.className = clsx(interactionTagPrimaryClassNames.icon, styles.icon, state.icon.className);
  }
  if (state.primaryText) {
    state.primaryText.className = clsx(
      interactionTagPrimaryClassNames.primaryText,
      styles.primaryText,
      state.primaryText.className,
    );
  }
  if (state.secondaryText) {
    state.secondaryText.className = clsx(
      interactionTagPrimaryClassNames.secondaryText,
      styles.secondaryText,
      state.secondaryText.className,
    );
  }
  return state;
};
