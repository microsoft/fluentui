import { makeStyles, mergeClasses } from '@fluentui/react-make-styles';
import { createFocusOutlineStyle } from '@fluentui/react-tabster';
import type { RadioItemState } from './RadioItem.types';

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

  checked: theme => ({
    color: theme.colorNeutralForeground1,

    // TODO: neutralForegroundInverted change to NeutralForegroundOnBrand once it's added
    '& .ms-checkbox-indicator': {
      backgroundColor: theme.colorCompoundBrandBackground,
      color: theme.colorNeutralForegroundInverted,
      borderColor: theme.colorBrandBackground,
      boxShadow: '0 0 0 2px currentColor inset',
    },

    ':active': {
      '& .ms-checkbox-indicator': {
        backgroundColor: theme.colorCompoundBrandBackgroundPressed,
      },
    },

    ':hover': {
      '& .ms-checkbox-indicator': {
        backgroundColor: theme.colorCompoundBrandBackgroundHover,
      },
    },
  }),

  unchecked: theme => ({
    color: theme.colorNeutralForeground3,

    '& .ms-checkbox-indicator': {
      borderColor: theme.colorNeutralStrokeAccessible,
      '& > *': {
        opacity: 0,
      },
    },

    ':hover': {
      color: theme.colorNeutralForeground2,

      '& .ms-checkbox-indicator': {
        borderColor: theme.colorNeutralStrokeAccessibleHover,
      },
    },

    ':active': {
      color: theme.colorNeutralForeground1,

      '& .ms-checkbox-indicator': {
        borderColor: theme.colorNeutralStrokeAccessiblePressed,
      },
    },
  }),

  disabled: theme => ({
    color: theme.colorNeutralForegroundDisabled,
    cursor: 'default',

    '& .ms-checkbox-indicator': {
      borderColor: theme.colorNeutralStrokeDisabled,
      color: theme.colorNeutralForegroundDisabled,
      backgroundColor: theme.colorNeutralBackground1,
    },

    ':hover': {
      '& .ms-checkbox-indicator': {
        borderColor: theme.colorNeutralStrokeDisabled,
        color: theme.colorNeutralForegroundDisabled,
        backgroundColor: theme.colorNeutralBackground1,
      },
    },

    ':active': {
      '& .ms-checkbox-indicator': {
        borderColor: theme.colorNeutralStrokeDisabled,
        color: theme.colorNeutralForegroundDisabled,
        backgroundColor: theme.colorNeutralBackground1,
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
    marginRight: '12px',
  },

  dimensions: {
    width: '16px',
    height: '16px',
  },
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
    // TODO(Peter): Add this to label as well
    cursor: 'not-allowed',
  },
});

const useIndicatorStyles = makeStyles({
  indicator: theme => ({
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
    borderRadius: theme.borderRadiusCircular,
    borderWidth: theme.strokeWidthThin,
  }),
});

/**
 * Apply styling to the RadioItem slots based on the state
 */
export const useRadioItemStyles = (state: RadioItemState): RadioItemState => {
  const checkedState = state.checked ? 'checked' : 'unchecked';
  const containerStyles = useContainerStyles();
  const indicatorStyles = useIndicatorStyles();
  const inputStyles = useInputStyles();
  const styles = useStyles();

  state.root.className = mergeClasses(
    styles.root,
    styles.focusIndicator,
    styles[checkedState],
    state.input.disabled && styles.disabled,
    state.root.className,
  );

  state.input.className = mergeClasses(
    containerStyles.dimensions,
    inputStyles.input,
    state.input.disabled && inputStyles.disabled,
    state.input.className,
  );

  state.containerClassName = mergeClasses(containerStyles.container, containerStyles.dimensions);

  state.indicator.className = mergeClasses(
    indicatorStyles.indicator,
    containerStyles.dimensions,
    'ms-checkbox-indicator',
    state.indicator.className,
  );

  return state;
};
