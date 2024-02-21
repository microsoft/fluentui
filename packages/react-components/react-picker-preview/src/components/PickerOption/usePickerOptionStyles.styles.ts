import { makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { PickerOptionSlots, PickerOptionState } from './PickerOption.types';
import { useOptionStyles_unstable } from '@fluentui/react-combobox';

export const pickerOptionClassNames: SlotClassNames<PickerOptionSlots> = {
  root: 'fui-PickerOption',
  media: 'fui-PickerOption__media',
  secondaryContent: 'fui-PickerOption__secondaryContent',
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
  },

  media: {
    gridRowStart: 'span 2',
  },
});

/**
 * Apply styling to the PickerOption slots based on the state
 */
export const usePickerOptionStyles_unstable = (state: PickerOptionState): PickerOptionState => {
  const rootClassName = state.root.className;
  useOptionStyles_unstable({ ...state, checkIcon: undefined });
  const styles = useStyles();

  state.root.className = mergeClasses(pickerOptionClassNames.root, state.root.className, styles.root, rootClassName);
  if (state.media) {
    state.media.className = mergeClasses(pickerOptionClassNames.media, styles.media, state.media.className);
  }

  if (state.secondaryContent) {
    state.secondaryContent.className = mergeClasses(
      pickerOptionClassNames.secondaryContent,
      styles.secondaryContent,
      state.secondaryContent.className,
    );
  }

  return state;
};
