import { makeStyles, mergeClasses } from '@fluentui/react-make-styles';
import { createFocusIndicatorStyleRule } from '@fluentui/react-tabster';
import { CheckboxState } from './Checkbox.types';

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
  }),

  focusIndictor: createFocusIndicatorStyleRule(
    theme => ({
      ':after': {
        content: "''",
        position: 'absolute',
        width: '100%',
        height: '100%',
        border: `2px solid ${theme.alias.color.neutral.neutralForeground1}`,
        borderRadius: '4px',
        margin: '-6px',
      },
    }),
    { selector: 'focus-within' },
  ),
});

const useBoxStyles = makeStyles({
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

  medium: {
    width: '16px',
    height: '16px',
  },

  large: {
    width: '20px',
    height: '20px',
  },

  disabled: {
    cursor: 'default',
  },
});

const useIndicatorStyles = makeStyles({
  box: theme => ({
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
    borderRadius: theme.global.borderRadius.small,
  }),

  // TODO: Remove fontSize once checkbox uses react-icons
  medium: {
    '> :first-child': {
      width: '8px',
      height: '8px',
    },
  },

  // TODO: Remove fontSize once checkbox uses react-icons
  large: {
    '> :first-child': {
      width: '10px',
      height: '10px',
    },
  },

  circular: theme => ({
    borderRadius: theme.global.borderRadius.circular,
  }),

  disabled: theme => ({
    borderWidth: theme.global.strokeWidth.thin,
    borderColor: theme.alias.color.neutral.neutralStrokeDisabled,
    color: theme.alias.color.neutral.neutralForegroundDisabled,
  }),

  unchecked: theme => ({
    borderColor: theme.alias.color.neutral.neutralStrokeAccessible,
    borderWidth: theme.global.strokeWidth.thin,
    color: 'transparent',

    ':hover': {
      borderColor: theme.alias.color.neutral.neutralStrokeAccessibleHover,
    },

    ':active': {
      borderColor: theme.alias.color.neutral.neutralStrokeAccessiblePressed,
    },
  }),

  // TODO: neutralForegroundInverted change to NeutralForegroundOnBrand once it's added
  checked: theme => ({
    backgroundColor: theme.alias.color.neutral.compoundBrandBackground,
    color: theme.alias.color.neutral.neutralForegroundInverted,
    borderWidth: 0,

    ':hover': {
      backgroundColor: theme.alias.color.neutral.compoundBrandBackgroundHover,
    },

    ':active': {
      backgroundColor: theme.alias.color.neutral.compoundBrandBackgroundPressed,
    },
  }),

  mixed: theme => ({
    borderColor: theme.alias.color.neutral.compoundBrandStroke,
    color: theme.alias.color.neutral.compoundBrandForeground1,
    borderWidth: theme.global.strokeWidth.thin,

    ':hover': {
      borderColor: theme.alias.color.neutral.compoundBrandStrokeHover,
      color: theme.alias.color.neutral.compoundBrandForeground1Hover,
    },

    ':active': {
      borderColor: theme.alias.color.neutral.compoundBrandStrokePressed,
      color: theme.alias.color.neutral.compoundBrandForeground1Pressed,
    },
  }),
});

const useLabelStyles = makeStyles({
  label: {
    userSelect: 'none',
    cursor: 'pointer',
  },

  disabled: theme => ({
    color: theme.alias.color.neutral.neutralForegroundDisabled,
    cursor: 'default',
  }),

  unchecked: theme => ({
    color: theme.alias.color.neutral.neutralForeground3,
    ':hover': {
      color: theme.alias.color.neutral.neutralForeground2,
    },
    ':active': {
      color: theme.alias.color.neutral.neutralForeground1,
    },
  }),

  checked: theme => ({
    color: theme.alias.color.neutral.neutralForeground1,
  }),

  mixed: theme => ({
    color: theme.alias.color.neutral.neutralForeground1,
  }),
});

/**
 * Apply styling to the Checkbox slots based on the state
 */
export const useCheckboxStyles = (state: CheckboxState): CheckboxState => {
  const checkedState = state.checked === 'mixed' ? 'mixed' : state.checked ? 'checked' : 'unchecked';
  const indicatorStyles = useIndicatorStyles();
  const labelStyles = useLabelStyles();
  const inputStyles = useInputStyles();
  const boxStyles = useBoxStyles();
  const styles = useStyles();

  state.className = mergeClasses(
    styles.root,
    styles.focusIndictor,
    labelStyles.label,
    !state.disabled && labelStyles[checkedState],
    state.disabled && labelStyles.disabled,
    state.className,
  );

  state.input.className = mergeClasses(
    boxStyles[state.size],
    inputStyles.input,
    state.disabled && inputStyles.disabled,
    state.input.className,
  );

  state.checkboxClassName = mergeClasses(
    boxStyles.container,
    boxStyles[state.size],
    !!state.children && boxStyles[state.labelPosition],
  );

  state.indicator.className = mergeClasses(
    indicatorStyles.box,
    boxStyles[state.size],
    indicatorStyles[state.size],
    !state.disabled && indicatorStyles[checkedState],
    state.disabled && indicatorStyles.disabled,
    state.circular && indicatorStyles.circular,
    state.indicator.className,
  );

  return state;
};
