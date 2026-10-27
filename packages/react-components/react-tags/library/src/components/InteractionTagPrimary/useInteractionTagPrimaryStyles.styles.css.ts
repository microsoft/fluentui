import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { InteractionTagPrimarySlots, InteractionTagPrimaryState } from './InteractionTagPrimary.types';
import sharedStyles from '../Tag/TagSlots.module.css';
import styles from './InteractionTagPrimary.module.css';

export const interactionTagPrimaryClassNames: SlotClassNames<InteractionTagPrimarySlots> = {
  root: 'fui-InteractionTagPrimary',
  media: 'fui-InteractionTagPrimary__media',
  icon: 'fui-InteractionTagPrimary__icon',
  primaryText: 'fui-InteractionTagPrimary__primaryText',
  secondaryText: 'fui-InteractionTagPrimary__secondaryText',
};

export const useInteractionTagPrimaryStyles_unstable = (
  state: InteractionTagPrimaryState,
): InteractionTagPrimaryState => {
  state.root.className = clsx(
    interactionTagPrimaryClassNames.root,
    styles.root,
    styles[state.shape],
    styles[state.size],
    styles[state.appearance],
    state.disabled && styles.disabled,
    state.selected && !state.disabled && styles.selected,
    !state.media && !state.icon && styles.withoutMedia,
    state.hasSecondaryAction && styles.hasSecondaryAction,
    sharedStyles[state.size],
    state.secondaryText ? sharedStyles.withSecondaryText : sharedStyles.withoutSecondaryText,
    state.root.className,
  );
  if (state.icon) {
    state.icon.className = clsx(interactionTagPrimaryClassNames.icon, sharedStyles.icon, state.icon.className);
  }
  if (state.media) {
    state.media.className = clsx(interactionTagPrimaryClassNames.media, sharedStyles.media, state.media.className);
  }
  if (state.primaryText) {
    state.primaryText.className = clsx(
      interactionTagPrimaryClassNames.primaryText,
      sharedStyles.primaryText,
      state.primaryText.className,
    );
  }
  if (state.secondaryText) {
    state.secondaryText.className = clsx(
      interactionTagPrimaryClassNames.secondaryText,
      sharedStyles.secondaryText,
      state.secondaryText.className,
    );
  }
  return state;
};
