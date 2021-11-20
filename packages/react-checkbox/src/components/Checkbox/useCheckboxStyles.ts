import { makeStyles, mergeClasses } from '@fluentui/react-make-styles';
import { createFocusOutlineStyle } from '@fluentui/react-tabster';
import { CheckboxState } from './Checkbox.types';

export const checkboxClassName = 'fui-Checkbox';

const indicatorVars = {
  color: '--fui-Checkbox-indicator-color',
  borderColor: '--fui-Checkbox-indicator-borderColor',
  backgroundColor: '--fui-Checkbox-indicator-backgroundColor',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: theme => ({
    display: 'inline-flex',
    position: 'relative',
    alignSelf: 'flex-start',
    alignItems: 'center',
    padding: '4px',
    userSelect: 'none',
    cursor: 'pointer',
  }),

  disabled: theme => ({
    color: theme.colorNeutralForegroundDisabled,
    cursor: 'default',

    [indicatorVars.borderColor]: theme.colorNeutralStrokeDisabled,
    [indicatorVars.color]: theme.colorNeutralForegroundDisabled,
    [indicatorVars.backgroundColor]: theme.colorNeutralBackground1,

    ':hover': {
      [indicatorVars.borderColor]: theme.colorNeutralStrokeDisabled,
      [indicatorVars.color]: theme.colorNeutralForegroundDisabled,
      [indicatorVars.backgroundColor]: theme.colorNeutralBackground1,
    },

    ':active': {
      [indicatorVars.borderColor]: theme.colorNeutralStrokeDisabled,
      [indicatorVars.color]: theme.colorNeutralForegroundDisabled,
      [indicatorVars.backgroundColor]: theme.colorNeutralBackground1,
    },
  }),

  unchecked: theme => ({
    color: theme.colorNeutralForeground3,
    [indicatorVars.borderColor]: theme.colorNeutralStrokeAccessible,

    ':hover': {
      color: theme.colorNeutralForeground2,
      [indicatorVars.borderColor]: theme.colorNeutralStrokeAccessibleHover,
    },

    ':active': {
      color: theme.colorNeutralForeground1,
      [indicatorVars.borderColor]: theme.colorNeutralStrokeAccessiblePressed,
    },
  }),

  checked: theme => ({
    color: theme.colorNeutralForeground1,

    [indicatorVars.backgroundColor]: theme.colorCompoundBrandBackground,
    [indicatorVars.color]: theme.colorNeutralForegroundOnBrand,
    [indicatorVars.borderColor]: theme.colorBrandBackground,

    ':active': {
      [indicatorVars.backgroundColor]: theme.colorCompoundBrandBackgroundPressed,
    },

    ':hover': {
      [indicatorVars.backgroundColor]: theme.colorCompoundBrandBackgroundHover,
    },
  }),

  mixed: theme => ({
    color: theme.colorNeutralForeground1,

    [indicatorVars.borderColor]: theme.colorCompoundBrandStroke,
    [indicatorVars.color]: theme.colorCompoundBrandForeground1,

    ':active': {
      [indicatorVars.borderColor]: theme.colorCompoundBrandStrokePressed,
      [indicatorVars.color]: theme.colorCompoundBrandForeground1Pressed,
    },

    ':hover': {
      [indicatorVars.borderColor]: theme.colorCompoundBrandStrokeHover,
      [indicatorVars.color]: theme.colorCompoundBrandForeground1Hover,
    },
  }),

  focusIndicator: theme =>
    createFocusOutlineStyle(theme, { style: { outlineOffset: '2px' }, selector: 'focus-within' }),
});

const useContainerStyles = makeStyles({
  container: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  medium: {
    width: '16px',
    height: '16px',
  },

  large: {
    width: '20px',
    height: '20px',
  },

  // TODO: change marginLeft to Spacing horizontal M once it's added
  before: theme => ({
    marginLeft: '12px',
  }),

  // TODO: change marginRight to Spacing horizontal M once it's added
  after: theme => ({
    marginRight: '12px',
  }),
});

const useInputStyles = makeStyles({
  input: {
    opacity: 0,
    position: 'absolute',
    margin: 0,
    padding: 0,
    cursor: 'pointer',
  },

  disabled: {
    cursor: 'not-allowed',
  },
});

const useIndicatorStyles = makeStyles({
  default: theme => ({
    width: '100%',
    height: '100%',
    fill: 'currentColor',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    boxSizing: 'border-box',
    borderStyle: 'solid',
    borderRadius: theme.borderRadiusSmall,
    borderWidth: theme.strokeWidthThin,
    borderColor: `var(${indicatorVars.borderColor})`,
    color: `var(${indicatorVars.color})`,
    backgroundColor: `var(${indicatorVars.backgroundColor})`,
  }),

  circular: theme => ({
    borderRadius: theme.borderRadiusCircular,
  }),

  unchecked: {
    '& > *': {
      opacity: 0,
    },
  },
});

/**
 * Apply styling to the Checkbox slots based on the state
 */
export const useCheckboxStyles = (state: CheckboxState): CheckboxState => {
  const checkedState = state.checked === 'mixed' ? 'mixed' : state.checked ? 'checked' : 'unchecked';
  const indicatorStyles = useIndicatorStyles();
  const inputStyles = useInputStyles();
  const containerStyles = useContainerStyles();
  const styles = useStyles();

  state.root.className = mergeClasses(
    checkboxClassName,
    styles.root,
    styles.focusIndicator,
    styles[checkedState],
    state.input.disabled && styles.disabled,
    state.root.className,
  );

  state.input.className = mergeClasses(
    containerStyles[state.size],
    inputStyles.input,
    state.input.disabled && inputStyles.disabled,
    state.input.className,
  );

  state.containerClassName = mergeClasses(
    containerStyles.container,
    containerStyles[state.size],
    state.hasLabel && containerStyles[state.labelPosition],
  );

  state.indicator.className = mergeClasses(
    indicatorStyles.default,
    state.circular && indicatorStyles.circular,
    !state.checked && indicatorStyles.unchecked,
    state.indicator.className,
  );

  return state;
};
