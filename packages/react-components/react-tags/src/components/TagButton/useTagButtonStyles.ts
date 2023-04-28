import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { TagButtonSlots, TagButtonState } from './TagButton.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const tagButtonClassNames: SlotClassNames<TagButtonSlots> = {
  root: 'fui-TagButton',
  contentButton: 'fui-TagButton__contentButton',
  avatar: 'fui-TagButton__avatar',
  icon: 'fui-TagButton__icon',
  primaryText: 'fui-TagButton__primaryText',
  secondaryText: 'fui-TagButton__secondaryText',
  dismissButton: 'fui-TagButton__dismissButton',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    display: 'inline-flex',
  },
  contentButton: {
    display: 'inline-grid',
    gridTemplateColumns: 'auto 8px auto auto 8px auto',
    gridTemplateRows: '1fr auto auto 1fr',
    gridTemplateAreas: `
    "avatar . icon .         ."
    "avatar . icon primary   ."
    "avatar . icon secondary ."
    "avatar . icon .         ."
    `,
  },
  avatar: {
    alignSelf: 'center',
    ...shorthands.gridArea('avatar'),
  },
  icon: {
    alignSelf: 'center',
    ...shorthands.gridArea('icon'),
  },
  primaryText: { ...shorthands.gridArea('primary') },
  secondaryText: { ...shorthands.gridArea('secondary') },
  dismissButton: {},

  // TODO add additional classes for different states and/or slots
});

/**
 * Apply styling to the TagButton slots based on the state
 */
export const useTagButtonStyles_unstable = (state: TagButtonState): TagButtonState => {
  const styles = useStyles();
  state.root.className = mergeClasses(tagButtonClassNames.root, styles.root, state.root.className);
  if (state.contentButton) {
    state.contentButton.className = mergeClasses(
      tagButtonClassNames.contentButton,
      styles.contentButton,
      state.contentButton.className,
    );
  }
  if (state.avatar) {
    state.avatar.className = mergeClasses(tagButtonClassNames.avatar, styles.avatar, state.avatar.className);
  }
  if (state.icon) {
    state.icon.className = mergeClasses(tagButtonClassNames.icon, styles.icon, state.icon.className);
  }
  if (state.primaryText) {
    state.primaryText.className = mergeClasses(
      tagButtonClassNames.primaryText,
      styles.primaryText,
      state.primaryText.className,
    );
  }
  if (state.secondaryText) {
    state.secondaryText.className = mergeClasses(
      tagButtonClassNames.secondaryText,
      styles.secondaryText,
      state.secondaryText.className,
    );
  }
  if (state.dismissButton) {
    state.dismissButton.className = mergeClasses(
      tagButtonClassNames.dismissButton,
      styles.dismissButton,
      state.dismissButton.className,
    );
  }

  return state;
};
