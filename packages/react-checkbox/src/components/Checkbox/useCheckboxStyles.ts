import { makeStyles, mergeClasses } from '@fluentui/react-make-styles';
import { createFocusIndicatorStyleRule } from '@fluentui/react-tabster';
import { CheckboxState } from './Checkbox.types';

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
  },

  input: {
    opacity: 0,
    margin: 0,
    padding: 0,
  },

  focusIndicator: createFocusIndicatorStyleRule(theme => ({
    border: `2px solid ${theme.alias.color.neutral.neutralForeground1}`,
    borderRadius: '4px',
  })),

  // checkbox styles
  checkbox: theme => ({
    borderRadius: theme.global.borderRadius.small,
    borderStyle: 'solid',
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }),

  circular: theme => ({
    borderRadius: theme.global.borderRadius.circular,
  }),

  // TODO: get the disabled theme working, knowing if checked...
  disabled: theme => ({
    borderColor: theme.alias.color.neutral.neutralStrokeDisabled,
    borderWidth: theme.global.strokeWidth.thin,
  }),

  uncheckedCheckbox: theme => ({
    borderColor: theme.alias.color.neutral.neutralStrokeAccessible,
    borderWidth: theme.global.strokeWidth.thin,
    ':hover': {
      borderColor: theme.alias.color.neutral.neutralStrokeAccessibleHover,
    },
    ':active': {
      borderColor: theme.alias.color.neutral.neutralStrokeAccessiblePressed,
    },
  }),

  checkedCheckbox: theme => ({
    backgroundColor: theme.alias.color.neutral.compoundBrandBackground,
    borderWidth: 0,
    ':hover': {
      backgroundColor: theme.alias.color.neutral.compoundBrandBackgroundHover,
    },
    ':active': {
      backgroundColor: theme.alias.color.neutral.compoundBrandBackgroundPressed,
    },
  }),

  indeterminateCheckbox: theme => ({
    borderWidth: theme.global.strokeWidth.thin,
    bordercolor: theme.alias.color.neutral.compoundBrandStroke,
    ':hover': {
      borderColor: theme.alias.color.neutral.compoundBrandStrokeHover,
    },
    ':active': {
      borderColor: theme.alias.color.neutral.compoundBrandStrokePressed,
    },
  }),

  startSpacing: theme => ({
    // TODO: change this to Spacing horizontal M
    marginLeft: '12px',
  }),

  endSpacing: theme => ({
    // TODO: change this to Spacing horizontal M
    marginRight: '12px',
  }),

  medium: {
    width: '16px',
    height: '16px',
  },

  large: {
    width: '20px',
    height: '20px',
  },

  // icon styles
  icon: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  disabledIcon: theme => ({
    opacity: 1,
    color: theme.alias.color.neutral.neutralForegroundDisabled,
  }),

  mediumIcon: {
    width: '8px',
    height: '8px',
  },

  largeIcon: {
    width: '10px',
    height: '10px',
  },

  uncheckedIcon: theme => ({
    opacity: 0,
    ':hover': {
      opacity: 1,
      color: theme.alias.color.neutral.neutralForeground4,
    },
    ':active': {
      opacity: 1,
      color: theme.alias.color.neutral.neutralForeground1,
    },
  }),

  checkedIcon: theme => ({
    opacity: 1,
    // TODO: change to NeutralForegroundOnBrand once it's added
    color: theme.alias.color.neutral.neutralForegroundInverted,
    ':hover': {
      opacity: 1,
      color: theme.alias.color.neutral.neutralForegroundInverted,
    },
    ':active': {
      opacity: 1,
      color: theme.alias.color.neutral.neutralForegroundInverted,
    },
  }),

  indeterminateIcon: theme => ({
    opacity: 1,
    color: theme.alias.color.neutral.compoundBrandForeground1,
    ':hover': {
      opacity: 1,
      color: theme.alias.color.neutral.compoundBrandForeground1Hover,
    },
    ':active': {
      opacity: 1,
      color: theme.alias.color.neutral.compoundBrandForeground1Pressed,
    },
  }),

  // Label styles
  disabledLabel: theme => ({
    color: theme.alias.color.neutral.neutralForegroundDisabled,
  }),

  uncheckedLabel: theme => ({
    color: theme.alias.color.neutral.neutralForeground3,
    ':hover': {
      color: theme.alias.color.neutral.neutralForeground2,
    },
    ':active': {
      color: theme.alias.color.neutral.neutralForeground4,
    },
  }),

  checkedLabel: theme => ({
    color: theme.alias.color.neutral.neutralForeground1,
    ':hover': {
      color: theme.alias.color.neutral.neutralForeground1,
    },
    ':active': {
      color: theme.alias.color.neutral.neutralForeground1,
    },
  }),

  indeterminateLabel: theme => ({
    color: theme.alias.color.neutral.neutralForeground3,
    ':hover': {
      color: theme.alias.color.neutral.neutralForeground3,
    },
    ':active': {
      color: theme.alias.color.neutral.neutralForeground3,
    },
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

  if (state.inputProps) {
    state.inputProps.className = mergeClasses(
      styles.input,
      styles.focusIndicator,
      state.size && styles[`${state.size}` as keyof typeof styles],
    );
  }

  state.checkboxClassName = mergeClasses(
    styles.checkbox,
    state.disabled && styles.disabled,
    state.circular && styles.circular,
    styles[state.size],
    !state.disabled && styles[`${checkboxState}Checkbox` as keyof typeof styles],
    styles[`${state.labelPosition}Spacing` as keyof typeof styles],
  );

  state.iconClassName = mergeClasses(
    styles.icon,
    state.disabled && styles.disabledIcon,
    state.disabled && !state.checked && styles.uncheckedIcon,
    styles[`${state.size}Icon` as keyof typeof styles],
    !state.disabled && styles[`${checkboxState}Icon` as keyof typeof styles],
  );

  state.label.className = mergeClasses(
    !state.disabled && styles[`${checkboxState}Label` as keyof typeof styles],
    state.disabled && styles.disabledLabel,
  );

  return state;
};
