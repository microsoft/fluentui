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
    userSelect: 'none',
    cursor: 'pointer',
  }),

  disabled: theme => ({
    color: theme.alias.color.neutral.neutralForegroundDisabled,
    cursor: 'default',
  }),

  unchecked: theme => ({
    color: theme.alias.color.neutral.neutralForeground3,

    '& div.ms-checkbox-indicator': {
      borderColor: theme.alias.color.neutral.neutralStrokeAccessible,
      borderWidth: theme.global.strokeWidth.thin,
      color: 'transparent',
    },

    ':hover': {
      color: theme.alias.color.neutral.neutralForeground2,

      '& div.ms-checkbox-indicator': {
        borderColor: theme.alias.color.neutral.neutralStrokeAccessibleHover,
      },
    },

    ':active': {
      color: theme.alias.color.neutral.neutralForeground1,

      '& div.ms-checkbox-indicator': {
        borderColor: theme.alias.color.neutral.neutralStrokeAccessiblePressed,
      },
    },
  }),

  checked: theme => ({
    color: theme.alias.color.neutral.neutralForeground1,

    // TODO: neutralForegroundInverted change to NeutralForegroundOnBrand once it's added
    '& div.ms-checkbox-indicator': {
      backgroundColor: theme.alias.color.neutral.compoundBrandBackground,
      color: theme.alias.color.neutral.neutralForegroundInverted,
      borderWidth: 0,
    },

    ':active': {
      '& div.ms-checkbox-indicator': {
        backgroundColor: theme.alias.color.neutral.compoundBrandBackgroundPressed,
      },
    },

    ':hover': {
      '& div.ms-checkbox-indicator': {
        backgroundColor: theme.alias.color.neutral.compoundBrandBackgroundHover,
      },
    },
  }),

  mixed: theme => ({
    color: theme.alias.color.neutral.neutralForeground1,

    '& div.ms-checkbox-indicator': {
      borderColor: theme.alias.color.neutral.compoundBrandStroke,
      color: theme.alias.color.neutral.compoundBrandForeground1,
      borderWidth: theme.global.strokeWidth.thin,
    },

    ':active': {
      '& div.ms-checkbox-indicator': {
        borderColor: theme.alias.color.neutral.compoundBrandStrokePressed,
        color: theme.alias.color.neutral.compoundBrandForeground1Pressed,
      },
    },

    ':hover': {
      '& div.ms-checkbox-indicator': {
        borderColor: theme.alias.color.neutral.compoundBrandStrokeHover,
        color: theme.alias.color.neutral.compoundBrandForeground1Hover,
      },
    },
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
  box: {
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

  circular: theme => ({
    borderRadius: theme.global.borderRadius.circular,
  }),

  disabled: theme => ({
    borderWidth: theme.global.strokeWidth.thin,
    borderColor: theme.alias.color.neutral.neutralStrokeDisabled,
    color: theme.alias.color.neutral.neutralForegroundDisabled,
  }),
});

/**
 * Apply styling to the Checkbox slots based on the state
 */
export const useCheckboxStyles = (state: CheckboxState): CheckboxState => {
  const checkedState = state.checked === 'mixed' ? 'mixed' : state.checked ? 'checked' : 'unchecked';
  const indicatorStyles = useIndicatorStyles();
  const inputStyles = useInputStyles();
  const boxStyles = useBoxStyles();
  const styles = useStyles();

  state.className = mergeClasses(
    styles.root,
    styles.focusIndictor,
    !state.disabled && styles[checkedState],
    state.disabled && styles.disabled,
    state.className,
  );

  state.input.className = mergeClasses(
    boxStyles[state.size],
    inputStyles.input,
    state.disabled && inputStyles.disabled,
    state.input.className,
  );

  state.checkboxClassName = mergeClasses(
    boxStyles.box,
    boxStyles[state.size],
    !!state.children && boxStyles[state.labelPosition],
  );

  state.indicator.className = mergeClasses(
    indicatorStyles.box,
    boxStyles[state.size],
    state.disabled && indicatorStyles.disabled,
    state.circular && indicatorStyles.circular,
    state.indicator.className,
  );

  return state;
};
