import { shorthands, makeStyles, mergeClasses } from '@fluentui/react-make-styles';
import { createFocusOutlineStyle } from '@fluentui/react-tabster';
import { tokens } from '@fluentui/react-theme';
import { CheckboxState } from './Checkbox.types';

export const checkboxClassName = 'fui-Checkbox';
const checkboxClassNameIndicator = `${checkboxClassName}-indicator`;

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    display: 'inline-flex',
    position: 'relative',
    alignSelf: 'flex-start',
    alignItems: 'center',
    ...shorthands.padding('4px'),
    userSelect: 'none',
    cursor: 'pointer',
  },

  disabled: {
    color: tokens.colorNeutralForegroundDisabled,
    cursor: 'default',

    [`& .${checkboxClassNameIndicator}`]: {
      borderColor: tokens.colorNeutralStrokeDisabled,
      color: tokens.colorNeutralForegroundDisabled,
      backgroundColor: tokens.colorNeutralBackground1,
    },

    ':hover': {
      [`& .${checkboxClassNameIndicator}`]: {
        borderColor: tokens.colorNeutralStrokeDisabled,
        color: tokens.colorNeutralForegroundDisabled,
        backgroundColor: tokens.colorNeutralBackground1,
      },
    },

    ':active': {
      [`& .${checkboxClassNameIndicator}`]: {
        borderColor: tokens.colorNeutralStrokeDisabled,
        color: tokens.colorNeutralForegroundDisabled,
        backgroundColor: tokens.colorNeutralBackground1,
      },
    },
  },

  unchecked: {
    color: tokens.colorNeutralForeground3,

    [`& .${checkboxClassNameIndicator}`]: {
      borderColor: tokens.colorNeutralStrokeAccessible,
      '& > *': {
        opacity: 0,
      },
    },

    ':hover': {
      color: tokens.colorNeutralForeground2,

      [`& .${checkboxClassNameIndicator}`]: {
        borderColor: tokens.colorNeutralStrokeAccessibleHover,
      },
    },

    ':active': {
      color: tokens.colorNeutralForeground1,

      [`& .${checkboxClassNameIndicator}`]: {
        borderColor: tokens.colorNeutralStrokeAccessiblePressed,
      },
    },
  },

  checked: {
    color: tokens.colorNeutralForeground1,

    // TODO: neutralForegroundInverted change to NeutralForegroundOnBrand once it's added
    [`& .${checkboxClassNameIndicator}`]: {
      backgroundColor: tokens.colorCompoundBrandBackground,
      color: tokens.colorNeutralForegroundInverted,
      borderColor: tokens.colorBrandBackground,
    },

    ':active': {
      [`& .${checkboxClassNameIndicator}`]: {
        backgroundColor: tokens.colorCompoundBrandBackgroundPressed,
      },
    },

    ':hover': {
      [`& .${checkboxClassNameIndicator}`]: {
        backgroundColor: tokens.colorCompoundBrandBackgroundHover,
      },
    },
  },

  mixed: {
    color: tokens.colorNeutralForeground1,

    [`& .${checkboxClassNameIndicator}`]: {
      borderColor: tokens.colorCompoundBrandStroke,
      color: tokens.colorCompoundBrandForeground1,
    },

    ':active': {
      [`& .${checkboxClassNameIndicator}`]: {
        borderColor: tokens.colorCompoundBrandStrokePressed,
        color: tokens.colorCompoundBrandForeground1Pressed,
      },
    },

    ':hover': {
      [`& .${checkboxClassNameIndicator}`]: {
        borderColor: tokens.colorCompoundBrandStrokeHover,
        color: tokens.colorCompoundBrandForeground1Hover,
      },
    },
  },

  focusIndicator: createFocusOutlineStyle({ style: { outlineOffset: '2px' }, selector: 'focus-within' }),
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
  before: {
    marginLeft: '12px',
  },

  // TODO: change marginRight to Spacing horizontal M once it's added
  after: {
    marginRight: '12px',
  },
});

const useInputStyles = makeStyles({
  input: {
    opacity: 0,
    position: 'absolute',
    ...shorthands.margin(0),
    ...shorthands.padding(0),
    cursor: 'pointer',
  },

  disabled: {
    cursor: 'not-allowed',
  },
});

const useIndicatorStyles = makeStyles({
  box: {
    width: '100%',
    height: '100%',
    fill: 'currentColor',
    ...shorthands.overflow('hidden'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    boxSizing: 'border-box',
    ...shorthands.borderStyle('solid'),
    ...shorthands.borderWidth(tokens.strokeWidthThin),
    ...shorthands.borderRadius(tokens.borderRadiusSmall),
  },

  circular: {
    ...shorthands.borderRadius(tokens.borderRadiusCircular),
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
    `${checkboxClassNameIndicator}`,
    indicatorStyles.box,
    containerStyles[state.size],
    state.circular && indicatorStyles.circular,
    state.indicator.className,
  );

  return state;
};
