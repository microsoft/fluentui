import { SlotClassNames } from '@fluentui/react-utilities';
import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { ComboButtonSlots, ComboButtonState } from './ComboButton.types';

/**
 * @deprecated Use `comboButtonClassNames.root` instead.
 */
export const comboButtonClassName = 'fui-ComboButton';
export const comboButtonClassNames: SlotClassNames<ComboButtonSlots> = {
  root: 'fui-ComboButton',
  content: 'fui-ComboButton__content',
  expandIcon: 'fui-ComboButton__expandIcon',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  // TODO: add themed styles
  root: {
    ...shorthands.border('1px', 'solid', '#d1d1d1'),
    borderBottomColor: '#616161',
    ...shorthands.borderRadius('4px'),
    display: 'flex',
    alignItems: 'center',

    '&:focus-within': {
      outlineWidth: '2px',
      outlineStyle: 'solid',
      outlineColor: 'transparent',
      borderBottomColor: '#0078d4',
      borderBottomWidth: '2px',
    },
  },

  expandIcon: {
    flexGrow: 0,
    flexShrink: 0,
    ...shorthands.padding('4px'),
  },

  content: {
    flexGrow: 1,
    backgroundColor: 'transparent',
    ...shorthands.border('none'),
    textAlign: 'left',
    ...shorthands.padding('4px', '8px'),

    '&:focus': {
      outlineStyle: 'none',
    },
  },
});

/**
 * Apply styling to the ComboButton slots based on the state
 */
export const useComboButtonStyles_unstable = (state: ComboButtonState): ComboButtonState => {
  const styles = useStyles();
  state.root.className = mergeClasses(comboButtonClassNames.root, styles.root, state.root.className);

  state.content.className = mergeClasses(comboButtonClassNames.content, styles.content, state.content.className);

  if (state.expandIcon) {
    state.expandIcon.className = mergeClasses(
      comboButtonClassNames.expandIcon,
      styles.expandIcon,
      state.expandIcon.className,
    );
  }

  return state;
};
