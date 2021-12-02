import { makeStyles, mergeClasses } from '@fluentui/react-make-styles';
import { createFocusOutlineStyle } from '@fluentui/react-tabster';
import { CheckboxState } from './Checkbox.types';

export const checkboxClassName = 'fui-Checkbox';

const indicatorColor = '--fui-Checkbox-indicator-color';
const indicatorBorderColor = '--fui-Checkbox-indicator-borderColor';
const indicatorBackgroundColor = '--fui-Checkbox-indicator-backgroundColor';

/**
 * Styles for the root slot
 */
const useRootStyles = makeStyles({
  base: {
    position: 'relative',
    display: 'inline-grid',
    gridTemplateAreas: '"indicator"',
    alignItems: 'center',
    justifyContent: 'start',
    padding: '8px', // TODO: change to SpacingHorizontalS once it's added to the theme
    gap: '12px', // TODO: change to SpacingHorizontalM once it's added to the theme
  },

  // With label; positioned before the checkbox
  labelBefore: {
    gridTemplateAreas: '"label indicator"',
  },

  // With label; positioned after the checkbox
  labelAfter: {
    gridTemplateAreas: '"indicator label"',
  },

  enabled: {
    cursor: 'pointer',
  },

  focusIndicator: theme => createFocusOutlineStyle(theme, { style: {}, selector: 'focus-within' }),
});

const useRootColorStyles = makeStyles({
  disabled: theme => ({
    color: theme.colorNeutralForegroundDisabled,
    [indicatorBorderColor]: theme.colorNeutralStrokeDisabled,
    [indicatorColor]: theme.colorNeutralForegroundDisabled,
    [indicatorBackgroundColor]: theme.colorNeutralBackground1,
  }),

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
});

const useInputStyles = makeStyles({
  base: {
    gridArea: 'indicator',
    width: 'auto',
    height: 'auto',
    placeSelf: 'stretch',
    opacity: 0,
    margin: 0,
    padding: 0,
    cursor: 'inherit',
  },
});

const useIndicatorStyles = makeStyles({
  base: theme => ({
    gridArea: 'indicator',
    fill: 'currentColor',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box',
    borderStyle: 'solid',
    borderRadius: theme.borderRadiusSmall,
    borderWidth: theme.strokeWidthThin,
    borderColor: `var(${indicatorBorderColor})`,
    color: `var(${indicatorColor})`,
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
    borderRadius: theme.borderRadiusCircular,
  }),

  unchecked: {
    '& > *': {
      opacity: 0,
    },
  },
});

const useLabelStyles = makeStyles({
  base: {
    gridArea: 'label',
    userSelect: 'none',
    cursor: 'inherit',
    color: 'inherit',
  },
});

/**
 * Apply styling to the Checkbox slots based on the state
 */
export const useCheckboxStyles = (state: CheckboxState): CheckboxState => {
  const rootStyles = useRootStyles();
  const rootColorStyles = useRootColorStyles();
  const inputStyles = useInputStyles();
  const indicatorStyles = useIndicatorStyles();

  let rootColors: string;
  if (state.input.disabled) {
    rootColors = rootColorStyles.disabled;
  } else if (state.checked === 'mixed') {
    rootColors = rootColorStyles.mixed;
  } else if (state.checked) {
    rootColors = rootColorStyles.checked;
  } else {
    rootColors = rootColorStyles.unchecked;
  }

  state.root.className = mergeClasses(
    checkboxClassName,
    rootStyles.base,
    rootStyles.focusIndicator,
    rootColors,
    state.label && (state.labelPosition === 'before' ? rootStyles.labelBefore : rootStyles.labelAfter),
    !state.input.disabled && rootStyles.enabled,
    state.root.className,
  );

  state.input.className = mergeClasses(inputStyles.base, indicatorStyles[state.size], state.input.className);

  state.indicator.className = mergeClasses(
    indicatorStyles.base,
    indicatorStyles[state.size],
    state.circular && indicatorStyles.circular,
    !state.checked && indicatorStyles.unchecked,
    state.indicator.className,
  );

  const labelStyles = useLabelStyles();
  if (state.label) {
    state.label.className = mergeClasses(labelStyles.base, state.label.className);
  }

  return state;
};
