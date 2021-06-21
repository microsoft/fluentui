import { makeStyles, mergeClasses } from '@fluentui/react-make-styles';
import { CheckboxState } from './Checkbox.types';

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {},

  input: {
    opacity: '0%',
    margin: 0,
    padding: 0,
    position: 'absolute',
  },

  // Checkbox styles

  mediumCheckbox: theme => ({
    width: '16px',
    height: '16px',
  }),

  largeCheckbox: theme => ({
    width: '20px',
    height: '20px',
  }),

  circular: theme => ({
    borderRadius: theme.global.borderRadius.circular,
  }),

  checkbox: theme => ({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: theme.global.strokeWidth.thin,
    borderRadius: theme.global.borderRadius.small,
    borderStyle: 'solid',
  }),

  uncheckedCheckbox: theme => ({
    borderColor: theme.alias.color.neutral.neutralStrokeAccessible,
  }),

  checkedCheckbox: theme => ({
    backgroundColor: theme.alias.color.neutral.compoundBrandBackground,
  }),

  indeterminateCheckbox: theme => ({
    borderColor: theme.alias.color.neutral.compoundBrandStroke,
    ':after': {
      content: '""',
      // color: theme.alias.color.neutral.compoundBrandForeground1,
      // borderRadius: roundedCorner2,
      position: 'absolute',
      width: 10,
      height: 10,
      top: 4,
      left: 4,
      boxSizing: 'border-box',
      borderWidth: 5,
      borderStyle: 'solid',
      transitionProperty: 'border-width, border, border-color',
    },
  }),

  // Icon styles

  uncheckedIcon: theme => ({
    opacity: 0,
    [`:hover`]: {
      opacity: 1,
      color: theme.alias.color.neutral.neutralForeground4,
    },
  }),

  checkedIcon: theme => ({
    color: theme.alias.color.neutral.neutralForegroundInvertedAccessible,
  }),

  indeterminateIcon: {
    opacity: 0,
  },

  icon: theme => ({
    color: theme.alias.color.neutral.neutralForeground4,
    padding: 0,
    margin: 0,
  }),
});

/**
 * Apply styling to the Checkbox slots based on the state
 */
export const useCheckboxStyles = (state: CheckboxState): CheckboxState => {
  const styles = useStyles();
  let checkboxState;

  if (state.checked === 'indeterminate') {
    checkboxState = 'indeterminate';
  } else if (state.checked) {
    checkboxState = 'checked';
  } else {
    checkboxState = 'unchecked';
  }

  state.className = mergeClasses(styles.root, state.className);

  state.inputClassName = mergeClasses(
    styles.input,
    state.size && styles[`${state.size}Checkbox` as keyof typeof styles],
  );

  state.checkboxClassName = mergeClasses(
    styles.checkbox,
    styles[`${checkboxState}Checkbox` as keyof typeof styles],
    state.circular && styles.circular,
    state.size && styles[`${state.size}Checkbox` as keyof typeof styles],
  );

  state.iconClassName = mergeClasses(styles[`${checkboxState}Icon` as keyof typeof styles]);

  return state;
};
