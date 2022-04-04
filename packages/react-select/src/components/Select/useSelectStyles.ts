import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import { SlotClassNames } from '@fluentui/react-utilities';
import type { SelectSlots, SelectState } from './Select.types';

/**
 * @deprecated Use `selectClassNames.root` instead.
 */
export const selectClassName = 'fui-Select';
export const selectClassNames: SlotClassNames<SelectSlots> = {
  root: 'fui-Select',
  select: 'fui-Select__select',
  icon: 'fui-Select__icon',
};

const iconSizes = {
  small: '16px',
  medium: '20px',
  large: '24px',
};

/*
 * TODO: a number of spacing and animation values are shared with react-input.
 * We should probably find a way to share these values between form controls in the theme.
 */

const contentSizes = {
  body1: {
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase300,
  },
  caption1: {
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
  },
  400: {
    fontSize: tokens.fontSizeBase400,
    lineHeight: tokens.lineHeightBase400,
  },
};

const horizontalSpacing = {
  xxs: '2px',
  xs: '4px',
  sNudge: '6px',
  s: '8px',
  mNudge: '10px',
  m: '12px',
};

const fieldHeights = {
  small: '24px',
  medium: '32px',
  large: '40px',
};

const motionDurations = {
  ultraFast: '0.05s',
  normal: '0.2s',
};

const motionCurves = {
  accelerateMid: 'cubic-bezier(0.7,0,1,0.5)',
  decelerateMid: 'cubic-bezier(0.1,0.9,0.2,1)',
};

/* end of shared values */

const useRootStyles = makeStyles({
  base: {
    alignItems: 'center',
    boxSizing: 'border-box',
    display: 'flex',
    flexWrap: 'nowrap',
    fontFamily: tokens.fontFamilyBase,
    position: 'relative',

    '&:after': {
      backgroundImage: `linear-gradient(
        0deg,
        ${tokens.colorCompoundBrandStroke} 0%,
        ${tokens.colorCompoundBrandStroke} 50%,
        transparent 50%,
        transparent 100%
      )`,
      ...shorthands.borderRadius(0, 0, tokens.borderRadiusMedium, tokens.borderRadiusMedium),
      boxSizing: 'border-box',
      content: '""',
      height: tokens.borderRadiusMedium,
      position: 'absolute',
      bottom: '0',
      left: '0',
      right: '0',
      transform: 'scaleX(0)',
      transitionProperty: 'transform',
      transitionDuration: motionDurations.ultraFast,
      transitionDelay: motionCurves.accelerateMid,
    },

    '&:focus-within::after': {
      transform: 'scaleX(1)',
      transitionProperty: 'transform',
      transitionDuration: motionDurations.normal,
      transitionDelay: motionCurves.decelerateMid,
    },
  },
});

const useSelectStyles = makeStyles({
  base: {
    appearance: 'none',
    ...shorthands.border('1px', 'solid', 'transparent'),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    boxShadow: 'none',
    boxSizing: 'border-box',
    color: tokens.colorNeutralForeground1,
    flexGrow: 1,

    ':focus-visible': {
      outlineWidth: '2px',
      outlineStyle: 'solid',
      outlineColor: 'transparent',
    },
  },
  disabled: {
    backgroundColor: tokens.colorTransparentBackground,
    color: tokens.colorNeutralForegroundDisabled,
    cursor: 'not-allowed',
  },
  small: {
    height: fieldHeights.small,
    ...shorthands.padding('0', horizontalSpacing.sNudge),
    ...contentSizes.caption1,
  },
  medium: {
    height: fieldHeights.medium,
    ...shorthands.padding('0', horizontalSpacing.mNudge),
    ...contentSizes.body1,
  },
  large: {
    height: fieldHeights.large,
    ...shorthands.padding('0', horizontalSpacing.m),
    ...contentSizes[400],
  },
  outline: {
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke1),
    borderBottomColor: tokens.colorNeutralStrokeAccessible,
  },
  underline: {
    backgroundColor: tokens.colorTransparentBackground,
    ...shorthands.borderBottom('1px', 'solid', tokens.colorNeutralStrokeAccessible),
    ...shorthands.borderRadius(0),
  },
  filledLighter: {
    backgroundColor: tokens.colorNeutralBackground1,
  },
  filledDarker: {
    backgroundColor: tokens.colorNeutralBackground3,
  },
});

const useIconStyles = makeStyles({
  icon: {
    boxSizing: 'border-box',
    color: tokens.colorNeutralStrokeAccessible,
    display: 'block',
    position: 'absolute',
    right: '0',
    pointerEvents: 'none',

    // the SVG must have display: block for accurate positioning
    // otherwise an extra inline space is inserted after the svg element
    '& svg': {
      display: 'block',
    },
  },
  small: {
    fontSize: iconSizes.small,
    height: iconSizes.small,
    paddingRight: horizontalSpacing.sNudge,
    paddingLeft: horizontalSpacing.xxs,
    width: iconSizes.small,
  },
  medium: {
    fontSize: iconSizes.medium,
    height: iconSizes.medium,
    paddingRight: horizontalSpacing.mNudge,
    paddingLeft: horizontalSpacing.xxs,
    width: iconSizes.medium,
  },
  large: {
    fontSize: iconSizes.large,
    height: iconSizes.large,
    paddingRight: horizontalSpacing.m,
    paddingLeft: horizontalSpacing.sNudge,
    width: iconSizes.large,
  },
});

/**
 * Apply styling to the Select slots based on the state
 */
export const useSelectStyles_unstable = (state: SelectState): SelectState => {
  const { size, appearance } = state;
  const disabled = state.select.disabled;

  const iconStyles = useIconStyles();
  const rootStyles = useRootStyles();
  const selectStyles = useSelectStyles();

  state.root.className = mergeClasses(selectClassNames.root, rootStyles.base, state.root.className);

  state.select.className = mergeClasses(
    selectClassNames.select,
    selectStyles.base,
    selectStyles[size],
    selectStyles[appearance],
    disabled && selectStyles.disabled,
    state.select.className,
  );

  if (state.icon) {
    state.icon.className = mergeClasses(selectClassNames.icon, iconStyles.icon, iconStyles[size], state.icon.className);
  }

  return state;
};
