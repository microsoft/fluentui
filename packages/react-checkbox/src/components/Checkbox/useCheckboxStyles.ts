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

const useInputStyle = makeStyles({
  input: {
    opacity: 0,
    margin: 0,
    padding: 0,
    cursor: 'pointer',
  },

  disabled: {
    cursor: 'default',
  },
});

const useBoxStyles = makeStyles({
  box: theme => ({
    display: 'flex',
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box',
    borderStyle: 'solid',
    borderRadius: theme.global.borderRadius.small,
  }),

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

  circular: theme => ({
    borderRadius: theme.global.borderRadius.circular,
  }),

  disabled: theme => ({
    borderWidth: theme.global.strokeWidth.thin,
    borderColor: theme.alias.color.neutral.neutralStrokeDisabled,
  }),

  unchecked: theme => ({
    borderColor: theme.alias.color.neutral.neutralStrokeAccessible,
    borderWidth: theme.global.strokeWidth.thin,
    ':hover': {
      borderColor: theme.alias.color.neutral.neutralStrokeAccessibleHover,
    },
    ':active': {
      borderColor: theme.alias.color.neutral.neutralStrokeAccessiblePressed,
    },
  }),

  checked: theme => ({
    backgroundColor: theme.alias.color.neutral.compoundBrandBackground,
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
    borderWidth: theme.global.strokeWidth.thin,
    ':hover': {
      borderColor: theme.alias.color.neutral.compoundBrandStrokeHover,
    },
    ':active': {
      borderColor: theme.alias.color.neutral.compoundBrandStrokePressed,
    },
  }),
});

const useIndicatorStyles = makeStyles({
  indicator: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fill: 'currentColor',
  },

  // TODO: Remove fontSize once checkbox uses react-icons
  medium: {
    fontSize: '8px',
    width: '8px',
    height: '8px',
  },

  // TODO: Remove fontSize once checkbox uses react-icons
  large: {
    fontSize: '10px',
    width: '10px',
    height: '10px',
  },

  disabled: theme => ({
    opacity: 1,
    color: theme.alias.color.neutral.neutralForegroundDisabled,
  }),

  unchecked: {
    opacity: 0,
  },

  // TODO: neutralForegroundInverted change to NeutralForegroundOnBrand once it's added
  checked: theme => ({
    opacity: 1,
    color: theme.alias.color.neutral.neutralForegroundInverted,
  }),

  mixed: theme => ({
    opacity: 1,
    color: theme.alias.color.neutral.compoundBrandForeground1,
    ':hover': {
      color: theme.alias.color.neutral.compoundBrandForeground1Hover,
    },
    ':active': {
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
  const inputStyles = useInputStyle();
  const boxStyles = useBoxStyles();
  const styles = useStyles();

  state.className = mergeClasses(styles.root, styles.focusIndictor, state.className);

  state.input.className = mergeClasses(
    boxStyles[state.size],
    inputStyles.input,
    state.disabled && inputStyles.disabled,
    state.input.className,
  );

  state.checkboxClassName = mergeClasses(
    boxStyles.box,
    boxStyles[state.size],
    !!state.label.children && boxStyles[state.labelPosition],
    !state.disabled && boxStyles[checkedState],
    state.disabled && boxStyles.disabled,
    state.circular && boxStyles.circular,
  );

  state.indicator.className = mergeClasses(
    indicatorStyles[state.size],
    indicatorStyles.indicator,
    state.disabled && indicatorStyles.disabled,
    !state.disabled && indicatorStyles[checkedState],
    state.indicator.className,
  );

  state.label.className = mergeClasses(
    labelStyles.label,
    !state.disabled && labelStyles[checkedState],
    state.disabled && labelStyles.disabled,
  );

  return state;
};
