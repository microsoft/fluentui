import { shorthands, makeStyles, mergeClasses } from '@fluentui/react-make-styles';
import { createFocusOutlineStyle } from '@fluentui/react-tabster';
import { CheckboxState } from './Checkbox.types';

export const checkboxClassName = 'fui-Checkbox';

// TODO replace these spacing constants with theme values once they're on the theme
const spacingHorizontalS = '8px';
const spacingHorizontalM = '12px';

// CSS variables for the indicator colors.
// These let the colors be picked based on the :hover, etc. states on the root
const indicatorColor = '--fui-Checkbox-indicator-color';
const indicatorBorderColor = '--fui-Checkbox-indicator-borderColor';
const indicatorBackgroundColor = '--fui-Checkbox-indicator-backgroundColor';

/**
 * Styles for the root slot
 */
const useRootStyles = makeStyles({
  base: {
    position: 'relative',
    display: 'inline-flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'start',
    cursor: 'pointer',
    columnGap: spacingHorizontalM,
    ...shorthands.padding(spacingHorizontalS),
  },

  labelBefore: {
    flexDirection: 'row-reverse',
  },

  disabled: {
    cursor: 'default',
  },

  focusIndicator: theme => createFocusOutlineStyle(theme, { style: {}, selector: 'focus-within' }),
});

// Colors for the root element. These styles are mutually exclusive: exactly one should be applied at any time
const useRootColorStyles = makeStyles({
  unchecked: theme => ({
    color: theme.colorNeutralForeground3,
    [indicatorBorderColor]: theme.colorNeutralStrokeAccessible,

    ':hover': {
      color: theme.colorNeutralForeground2,
      [indicatorBorderColor]: theme.colorNeutralStrokeAccessibleHover,
    },

    ':active': {
      color: theme.colorNeutralForeground1,
      [indicatorBorderColor]: theme.colorNeutralStrokeAccessiblePressed,
    },
  }),

  checked: theme => ({
    color: theme.colorNeutralForeground1,
    [indicatorBackgroundColor]: theme.colorCompoundBrandBackground,
    [indicatorColor]: theme.colorNeutralForegroundOnBrand,
    [indicatorBorderColor]: theme.colorBrandBackground,

    ':active': {
      [indicatorBackgroundColor]: theme.colorCompoundBrandBackgroundPressed,
    },

    ':hover': {
      [indicatorBackgroundColor]: theme.colorCompoundBrandBackgroundHover,
    },
  }),

  mixed: theme => ({
    color: theme.colorNeutralForeground1,
    [indicatorBorderColor]: theme.colorCompoundBrandStroke,
    [indicatorColor]: theme.colorCompoundBrandForeground1,

    ':active': {
      [indicatorBorderColor]: theme.colorCompoundBrandStrokePressed,
      [indicatorColor]: theme.colorCompoundBrandForeground1Pressed,
    },

    ':hover': {
      [indicatorBorderColor]: theme.colorCompoundBrandStrokeHover,
      [indicatorColor]: theme.colorCompoundBrandForeground1Hover,
    },
  }),

  disabled: theme => ({
    color: theme.colorNeutralForegroundDisabled,
    [indicatorBorderColor]: theme.colorNeutralStrokeDisabled,
    [indicatorColor]: theme.colorNeutralForegroundDisabled,
    [indicatorBackgroundColor]: theme.colorNeutralBackground1,
  }),
});

const useInputStyles = makeStyles({
  base: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    boxSizing: 'border-box',
    ...shorthands.margin(0),
    opacity: 0,
    cursor: 'inherit',
  },
});

const useIndicatorStyles = makeStyles({
  base: theme => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box',
    ...shorthands.overflow('hidden'),
    ...shorthands.border(theme.strokeWidthThin, 'solid'),
    ...shorthands.borderRadius(theme.borderRadiusSmall),
    fill: 'currentColor',
    color: `var(${indicatorColor})`,
    borderColor: `var(${indicatorBorderColor})`,
    backgroundColor: `var(${indicatorBackgroundColor})`,
    cursor: 'inherit',
  }),

  medium: {
    width: '16px',
    height: '16px',
  },

  large: {
    width: '20px',
    height: '20px',
  },

  circular: theme => ({
    ...shorthands.borderRadius(theme.borderRadiusCircular),
  }),

  unchecked: {
    '& > *': {
      opacity: 0,
    },
  },
});

const useLabelStyles = makeStyles({
  base: {
    userSelect: 'none',
    cursor: 'inherit',
    color: 'inherit',
  },

  medium: {
    lineHeight: '16px',
  },

  large: {
    lineHeight: '20px',
  },
});

/**
 * Apply styling to the Checkbox slots based on the state
 */
export const useCheckboxStyles = (state: CheckboxState): CheckboxState => {
  const rootColorStyles = useRootColorStyles();
  let rootColorClass: string;
  if (state.input.disabled) {
    rootColorClass = rootColorStyles.disabled;
  } else if (state.checked === 'mixed') {
    rootColorClass = rootColorStyles.mixed;
  } else if (state.checked) {
    rootColorClass = rootColorStyles.checked;
  } else {
    rootColorClass = rootColorStyles.unchecked;
  }

  const rootStyles = useRootStyles();
  state.root.className = mergeClasses(
    checkboxClassName,
    rootStyles.base,
    rootStyles.focusIndicator,
    state.labelPosition === 'before' && rootStyles.labelBefore,
    state.input.disabled && rootStyles.disabled,
    rootColorClass,
    state.root.className,
  );

  const inputStyles = useInputStyles();
  state.input.className = mergeClasses(inputStyles.base, state.input.className);

  const indicatorStyles = useIndicatorStyles();
  state.indicator.className = mergeClasses(
    indicatorStyles.base,
    indicatorStyles[state.size],
    state.circular && indicatorStyles.circular,
    !state.checked && indicatorStyles.unchecked,
    state.indicator.className,
  );

  const labelStyles = useLabelStyles();
  if (state.label) {
    state.label.className = mergeClasses(labelStyles.base, labelStyles[state.size], state.label.className);
  }

  return state;
};
