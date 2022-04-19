import { SlotClassNames } from '@fluentui/react-utilities';
import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { OptionSlots, OptionState } from './Option.types';

/**
 * @deprecated Use `optionClassNames.root` instead.
 */
export const optionClassName = 'fui-Option';
export const optionClassNames: SlotClassNames<OptionSlots> = {
  root: 'fui-Option',
  checkIcon: 'fui-Option__checkIcon',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  // TODO: add themed styles
  root: {
    display: 'flex',
    alignItems: 'center',
    ...shorthands.padding('4px', '6px'),
    ...shorthands.borderRadius('4px'),

    '&:hover': {
      backgroundColor: '#f5f5f5',
    },
  },

  // these are testing-only styles
  active: {
    outlineWidth: '2px',
    outlineStyle: 'solid',
    outlineColor: 'black',
  },

  // these are testing-only styles
  selected: {},

  checkIcon: {
    ...shorthands.padding('4px'),
    visibility: 'hidden',
  },

  selectedCheck: {
    visibility: 'visible',
  },
});

/**
 * Apply styling to the Option slots based on the state
 */
export const useOptionStyles_unstable = (state: OptionState): OptionState => {
  const { active, selected } = state;
  const styles = useStyles();
  state.root.className = mergeClasses(
    optionClassNames.root,
    styles.root,
    selected && styles.selected,
    active && styles.active,
    state.root.className,
  );

  if (state.checkIcon) {
    state.checkIcon.className = mergeClasses(
      optionClassNames.checkIcon,
      styles.checkIcon,
      state.checkIcon.className,
      selected && styles.selectedCheck,
    );
  }

  return state;
};
