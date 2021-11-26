import { makeStyles, mergeClasses } from '@fluentui/react-make-styles';
import { createFocusOutlineStyle } from '@fluentui/react-tabster';
import { CheckboxState } from './Checkbox.types';

export const checkboxClassName = 'fui-Checkbox';

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

    [`& .${checkboxClassName}-indicator`]: {
      borderColor: theme.colorNeutralStrokeDisabled,
      color: theme.colorNeutralForegroundDisabled,
      backgroundColor: theme.colorNeutralBackground1,
    },

    ':hover': {
      [`& .${checkboxClassName}-indicator`]: {
        borderColor: theme.colorNeutralStrokeDisabled,
        color: theme.colorNeutralForegroundDisabled,
        backgroundColor: theme.colorNeutralBackground1,
      },
    },

    ':active': {
      [`& .${checkboxClassName}-indicator`]: {
        borderColor: theme.colorNeutralStrokeDisabled,
        color: theme.colorNeutralForegroundDisabled,
        backgroundColor: theme.colorNeutralBackground1,
      },
    },
  }),

  unchecked: theme => ({
    color: theme.colorNeutralForeground3,

    [`& .${checkboxClassName}-indicator`]: {
      borderColor: theme.colorNeutralStrokeAccessible,
      '& > *': {
        opacity: 0,
      },
    },

    ':hover': {
      color: theme.colorNeutralForeground2,

      [`& .${checkboxClassName}-indicator`]: {
        borderColor: theme.colorNeutralStrokeAccessibleHover,
      },
    },

    ':active': {
      color: theme.colorNeutralForeground1,

      [`& .${checkboxClassName}-indicator`]: {
        borderColor: theme.colorNeutralStrokeAccessiblePressed,
      },
    },
  }),

  checked: theme => ({
    color: theme.colorNeutralForeground1,

    // TODO: neutralForegroundInverted change to NeutralForegroundOnBrand once it's added
    [`& .${checkboxClassName}-indicator`]: {
      backgroundColor: theme.colorCompoundBrandBackground,
      color: theme.colorNeutralForegroundInverted,
      borderColor: theme.colorBrandBackground,
    },

    ':active': {
      [`& .${checkboxClassName}-indicator`]: {
        backgroundColor: theme.colorCompoundBrandBackgroundPressed,
      },
    },

    ':hover': {
      [`& .${checkboxClassName}-indicator`]: {
        backgroundColor: theme.colorCompoundBrandBackgroundHover,
      },
    },
  }),

  mixed: theme => ({
    color: theme.colorNeutralForeground1,

    [`& .${checkboxClassName}-indicator`]: {
      borderColor: theme.colorCompoundBrandStroke,
      color: theme.colorCompoundBrandForeground1,
    },

    ':active': {
      [`& .${checkboxClassName}-indicator`]: {
        borderColor: theme.colorCompoundBrandStrokePressed,
        color: theme.colorCompoundBrandForeground1Pressed,
      },
    },

    ':hover': {
      [`& .${checkboxClassName}-indicator`]: {
        borderColor: theme.colorCompoundBrandStrokeHover,
        color: theme.colorCompoundBrandForeground1Hover,
      },
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
    borderRadius: theme.borderRadiusSmall,
    borderWidth: theme.strokeWidthThin,
  }),

  circular: theme => ({
    borderRadius: theme.borderRadiusCircular,
  }),
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
    `${checkboxClassName}-indicator`,
    indicatorStyles.box,
    containerStyles[state.size],
    state.circular && indicatorStyles.circular,
    state.indicator.className,
  );

  return state;
};
