import { makeStyles, mergeClasses, shorthands } from '@fluentui/react-make-styles';
import { createFocusOutlineStyle } from '@fluentui/react-tabster';
import type { RadioItemState } from './RadioItem.types';

export const radioItemClassName = 'fui-RadioItem';

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: theme => ({
    display: 'inline-flex',
    position: 'relative',
    alignSelf: 'flex-start',
    alignItems: 'center',
    ...shorthands.padding('4px'),
    userSelect: 'none',
    cursor: 'pointer',
  }),

  checked: theme => ({
    color: theme.colorNeutralForeground1,

    // TODO: neutralForegroundInverted change to NeutralForegroundOnBrand once it's added
    [`& .${radioItemClassName}-indicator`]: {
      backgroundColor: theme.colorCompoundBrandBackground,
      color: theme.colorNeutralForegroundInverted,
      borderColor: theme.colorBrandBackground,
      boxShadow: '0 0 0 2px currentColor inset',
    },

    ':active': {
      [`& .${radioItemClassName}-indicator`]: {
        backgroundColor: theme.colorCompoundBrandBackgroundPressed,
      },
    },

    ':hover': {
      [`& .${radioItemClassName}-indicator`]: {
        backgroundColor: theme.colorCompoundBrandBackgroundHover,
      },
    },
  }),

  unchecked: theme => ({
    color: theme.colorNeutralForeground3,

    [`& .${radioItemClassName}-indicator`]: {
      borderColor: theme.colorNeutralStrokeAccessible,
      '& > *': {
        opacity: 0,
      },
    },

    ':hover': {
      color: theme.colorNeutralForeground2,

      [`& .${radioItemClassName}-indicator`]: {
        borderColor: theme.colorNeutralStrokeAccessibleHover,
      },
    },

    ':active': {
      color: theme.colorNeutralForeground1,

      [`& .${radioItemClassName}-indicator`]: {
        borderColor: theme.colorNeutralStrokeAccessiblePressed,
      },
    },
  }),

  disabled: theme => ({
    color: theme.colorNeutralForegroundDisabled,
    cursor: 'default',

    [`& .${radioItemClassName}-indicator`]: {
      borderColor: theme.colorNeutralStrokeDisabled,
      color: theme.colorNeutralForegroundDisabled,
      backgroundColor: theme.colorNeutralBackground1,
    },

    ':hover': {
      [`& .${radioItemClassName}-indicator`]: {
        borderColor: theme.colorNeutralStrokeDisabled,
        color: theme.colorNeutralForegroundDisabled,
        backgroundColor: theme.colorNeutralBackground1,
      },
    },

    ':active': {
      [`& .${radioItemClassName}-indicator`]: {
        borderColor: theme.colorNeutralStrokeDisabled,
        color: theme.colorNeutralForegroundDisabled,
        backgroundColor: theme.colorNeutralBackground1,
      },
    },
  }),

  bottomLabelPosition: {
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'flex-start',
  },

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

  disabled: theme => ({
    cursor: 'not-allowed',
    color: theme.colorNeutralForegroundDisabled,
  }),
});

const useIndicatorStyles = makeStyles({
  indicator: theme => ({
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
    ...shorthands.borderRadius(theme.borderRadiusCircular),
    ...shorthands.borderWidth(theme.strokeWidthThin),
  }),
});

const useSubtextStyles = makeStyles({
  subtext: theme => ({
    display: 'block',
    fontFamily: theme.fontFamilyBase,
    fontSize: theme.fontSizeBase200,
    lineHeight: theme.lineHeightBase200,
    fontWeight: theme.fontWeightRegular,
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
  const labelStyles = useLabelStyles();
  const subtextStyles = useSubtextStyles();
  const styles = useStyles();

  state.root.className = mergeClasses(
    radioItemClassName,
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
    `${radioItemClassName}-indicator`,
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
