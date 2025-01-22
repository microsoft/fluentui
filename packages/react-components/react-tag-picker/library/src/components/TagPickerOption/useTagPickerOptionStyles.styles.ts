import { makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { TagPickerOptionSlots, TagPickerOptionState } from './TagPickerOption.types';
import { useOptionStyles_unstable } from '@fluentui/react-combobox';
import { typographyStyles } from '@fluentui/react-theme';

export const tagPickerOptionClassNames: SlotClassNames<TagPickerOptionSlots> = {
  root: 'fui-TagPickerOption',
  media: 'fui-TagPickerOption__media',
  secondaryContent: 'fui-TagPickerOption__secondaryContent',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    display: 'grid',
    gridTemplateColumns: 'auto 1fr',
    alignItems: 'center',
  },

  secondaryContent: {
    gridColumnStart: 2,
    gridRowStart: 2,
    ...typographyStyles.caption1,
  },

  media: {
    gridRowStart: 'span 2',
  },
});

/**
 * Apply styling to the TagPickerOption slots based on the state
 */
export const useTagPickerOptionStyles_unstable = (state: TagPickerOptionState): TagPickerOptionState => {
  'use no memo';

  const styles = useStyles();

  state.root.className = mergeClasses(tagPickerOptionClassNames.root, styles.root, state.root.className);
  useOptionStyles_unstable({
    ...state,
    active: false,
    disabled: false,
    focusVisible: false,
    checkIcon: undefined,
    selected: false,
  });
  if (state.media) {
    state.media.className = mergeClasses(tagPickerOptionClassNames.media, styles.media, state.media.className);
  }

  if (state.secondaryContent) {
    state.secondaryContent.className = mergeClasses(
      tagPickerOptionClassNames.secondaryContent,
      styles.secondaryContent,
      state.secondaryContent.className,
    );
  }

  return state;
};
