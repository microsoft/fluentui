import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { TagSlots, TagState } from './Tag.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const tagClassNames: SlotClassNames<TagSlots> = {
  root: 'fui-Tag',
  content: 'fui-Tag__content',
  avatar: 'fui-Tag__avatar',
  icon: 'fui-Tag__icon',
  primaryText: 'fui-Tag__primaryText',
  secondaryText: 'fui-Tag__secondaryText',
  dismissButton: 'fui-Tag__dismissButton',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    display: 'inline-flex',
  },
  content: {
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
 * Apply styling to the Tag slots based on the state
 */
export const useTagStyles_unstable = (state: TagState): TagState => {
  const styles = useStyles();
  state.root.className = mergeClasses(tagClassNames.root, styles.root, state.root.className);
  if (state.content) {
    state.content.className = mergeClasses(tagClassNames.content, styles.content, state.content.className);
  }
  if (state.avatar) {
    state.avatar.className = mergeClasses(tagClassNames.avatar, styles.avatar, state.avatar.className);
  }
  if (state.icon) {
    state.icon.className = mergeClasses(tagClassNames.icon, styles.icon, state.icon.className);
  }
  if (state.primaryText) {
    state.primaryText.className = mergeClasses(
      tagClassNames.primaryText,
      styles.primaryText,
      state.primaryText.className,
    );
  }
  if (state.secondaryText) {
    state.secondaryText.className = mergeClasses(
      tagClassNames.secondaryText,
      styles.secondaryText,
      state.secondaryText.className,
    );
  }
  if (state.dismissButton) {
    state.dismissButton.className = mergeClasses(
      tagClassNames.dismissButton,
      styles.dismissButton,
      state.dismissButton.className,
    );
  }

  return state;
};
