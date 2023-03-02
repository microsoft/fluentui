import { makeStyles, mergeClasses } from '@griffel/react';
import type { TagSlots, TagState } from './Tag.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const tagClassNames: SlotClassNames<TagSlots> = {
  root: 'fui-Tag',
  content: 'fui-Tag_content',
  persona: 'fui-Tag_persona',
  icon: 'fui-Tag_icon',
  primaryText: 'fui-Tag_primaryText',
  secondaryText: 'fui-Tag_secondaryText',
  dismiss: 'fui-Tag_dismiss',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    // TODO Add default styles for the root element
  },
  content: {},
  persona: {},
  icon: {},
  primaryText: {},
  secondaryText: {},
  dismiss: {},

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
  if (state.persona) {
    state.persona.className = mergeClasses(tagClassNames.persona, styles.persona, state.persona.className);
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
  if (state.dismiss) {
    state.dismiss.className = mergeClasses(tagClassNames.dismiss, styles.dismiss, state.dismiss.className);
  }

  return state;
};
