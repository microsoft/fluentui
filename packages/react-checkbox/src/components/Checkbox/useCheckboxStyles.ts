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
    cursor: 'pointer',
    columnGap: spacingHorizontalM,
    ...shorthands.padding(spacingHorizontalS),
  },

  disabled: {
    cursor: 'default',
  },

  focusIndicator: theme => createFocusOutlineStyle(theme, { style: {}, selector: 'focus-within' }),
});

// These color styles are mutually exclusive: exactly one should be applied at any time
const useColorStyles = makeStyles({
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
    alignSelf: 'flex-start',
    boxSizing: 'border-box',
    flexShrink: 0,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
    alignSelf: 'center',
    userSelect: 'none',
    cursor: 'inherit',
    color: 'inherit',
  },

  medium: {
    // Use a negative margin to account for the difference between the indicator's height (16px) and the
    // label's line height (20px). This prevents the label from expanding the height of the checkbox, but
    // preserves the line height if the label wraps.
    // (When the size is large, the line-height matches the indicator height, so no margin is necessary)
    marginTop: '-2px',
    marginBottom: '-2px',
  },
});

/**
 * Apply styling to the Checkbox slots based on the state
 */
export const useCheckboxStyles = (state: CheckboxState): CheckboxState => {
  const colorStyles = useColorStyles();
  let colorClass: string;
  if (state.input.disabled) {
    colorClass = colorStyles.disabled;
  } else if (state.checked === 'mixed') {
    colorClass = colorStyles.mixed;
  } else if (state.checked) {
    colorClass = colorStyles.checked;
  } else {
    colorClass = colorStyles.unchecked;
  }

  const rootStyles = useRootStyles();
  state.root.className = mergeClasses(
    checkboxClassName,
    rootStyles.base,
    rootStyles.focusIndicator,
    state.input.disabled && rootStyles.disabled,
    colorClass,
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
    state.label.className = mergeClasses(
      labelStyles.base,
      state.size === 'medium' && labelStyles.medium,
      state.label.className,
    );
  }

  return state;
};
