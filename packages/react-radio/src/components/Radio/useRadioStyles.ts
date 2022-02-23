import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { createFocusOutlineStyle } from '@fluentui/react-tabster';
import { tokens } from '@fluentui/react-theme';
import type { RadioState } from './Radio.types';

export const radioClassName = 'fui-Radio';

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

  checked: {
    color: tokens.colorNeutralForeground1,

    // TODO: neutralForegroundInverted change to NeutralForegroundOnBrand once it's added
    [`& .${radioClassName}-indicator`]: {
      backgroundColor: tokens.colorCompoundBrandBackground,
      color: tokens.colorNeutralForegroundInverted,
      borderColor: tokens.colorBrandBackground,
      boxShadow: '0 0 0 2px currentColor inset',
    },

    ':active': {
      [`& .${radioClassName}-indicator`]: {
        backgroundColor: tokens.colorCompoundBrandBackgroundPressed,
      },
    },

    ':hover': {
      [`& .${radioClassName}-indicator`]: {
        backgroundColor: tokens.colorCompoundBrandBackgroundHover,
      },
    },
  },

  unchecked: {
    color: tokens.colorNeutralForeground3,

    [`& .${radioClassName}-indicator`]: {
      borderColor: tokens.colorNeutralStrokeAccessible,
      '& > *': {
        opacity: 0,
      },
    },

    ':hover': {
      color: tokens.colorNeutralForeground2,

      [`& .${radioClassName}-indicator`]: {
        borderColor: tokens.colorNeutralStrokeAccessibleHover,
      },
    },

    ':active': {
      color: tokens.colorNeutralForeground1,

      [`& .${radioClassName}-indicator`]: {
        borderColor: tokens.colorNeutralStrokeAccessiblePressed,
      },
    },
  },

  disabled: {
    color: tokens.colorNeutralForegroundDisabled,
    cursor: 'default',

    [`& .${radioClassName}-indicator`]: {
      borderColor: tokens.colorNeutralStrokeDisabled,
      color: tokens.colorNeutralForegroundDisabled,
      backgroundColor: tokens.colorNeutralBackground1,
    },

    ':hover': {
      [`& .${radioClassName}-indicator`]: {
        borderColor: tokens.colorNeutralStrokeDisabled,
        color: tokens.colorNeutralForegroundDisabled,
        backgroundColor: tokens.colorNeutralBackground1,
      },
    },

    ':active': {
      [`& .${radioClassName}-indicator`]: {
        borderColor: tokens.colorNeutralStrokeDisabled,
        color: tokens.colorNeutralForegroundDisabled,
        backgroundColor: tokens.colorNeutralBackground1,
      },
    },
  },

  bottomLabelPosition: {
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'flex-start',
  },

  focusIndicator: createFocusOutlineStyle({ style: { outlineOffset: '2px' }, selector: 'focus-within' }),
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

  bottomLabelPosition: {
    marginRight: '0px',
    marginBottom: '12px',
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

const useLabelStyles = makeStyles({
  label: {
    cursor: 'pointer',
  },

  disabled: {
    cursor: 'not-allowed',
    color: tokens.colorNeutralForegroundDisabled,
  },
});

const useIndicatorStyles = makeStyles({
  indicator: {
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
    ...shorthands.borderRadius(tokens.borderRadiusCircular),
    ...shorthands.borderWidth(tokens.strokeWidthThin),
  },
});

const useSubtextStyles = makeStyles({
  subtext: {
    display: 'block',
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
    fontWeight: tokens.fontWeightRegular,
  },
});

/**
 * Apply styling to the Radio slots based on the state
 */
export const useRadioStyles_unstable = (state: RadioState): RadioState => {
  const checkedState = state.checked ? 'checked' : 'unchecked';
  const containerStyles = useContainerStyles();
  const indicatorStyles = useIndicatorStyles();
  const inputStyles = useInputStyles();
  const labelStyles = useLabelStyles();
  const subtextStyles = useSubtextStyles();
  const styles = useStyles();

  state.root.className = mergeClasses(
    radioClassName,
    styles.root,
    styles.focusIndicator,
    styles[checkedState],
    state.input.disabled && styles.disabled,
    state.labelPosition === 'bottom' && styles.bottomLabelPosition,
    state.root.className,
  );

  state.input.className = mergeClasses(
    containerStyles.dimensions,
    inputStyles.input,
    state.input.disabled && inputStyles.disabled,
    state.input.className,
  );

  state.containerClassName = mergeClasses(
    containerStyles.container,
    state.labelPosition === 'bottom' && containerStyles.bottomLabelPosition,
    containerStyles.dimensions,
  );

  state.indicator.className = mergeClasses(
    `${radioClassName}-indicator`,
    indicatorStyles.indicator,
    containerStyles.dimensions,
    state.indicator.className,
  );

  state.label.className = mergeClasses(
    labelStyles.label,
    state.input.disabled && labelStyles.disabled,
    state.label.className,
  );

  if (state.subtext) {
    state.subtext.className = mergeClasses(subtextStyles.subtext, state.subtext.className);
  }

  return state;
};
