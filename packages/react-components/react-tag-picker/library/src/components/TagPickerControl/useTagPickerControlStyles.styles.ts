import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { tokens } from '@fluentui/react-theme';
import type {
  TagPickerControlInternalSlots,
  TagPickerControlSlots,
  TagPickerControlState,
} from './TagPickerControl.types';

export const tagPickerControlClassNames: SlotClassNames<TagPickerControlSlots & TagPickerControlInternalSlots> = {
  root: 'fui-TagPickerControl',
  expandIcon: 'fui-TagPickerControl__expandIcon',
  secondaryAction: 'fui-TagPickerControl__secondaryAction',
  aside: 'fui-TagPickerControl__aside',
};

export const tagPickerControlAsideWidthToken = '--fui-TagPickerControl-aside-width' as const;

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    borderRadius: tokens.borderRadiusMedium,
    paddingRight: `calc(${tokens.spacingHorizontalM} + var(${tagPickerControlAsideWidthToken}, 0px))`,
    paddingLeft: tokens.spacingHorizontalM,
    alignItems: 'center',
    columnGap: tokens.spacingHorizontalXXS,
    boxSizing: 'border-box',
    display: 'flex',
    minWidth: '250px',
    position: 'relative',
    flexWrap: 'wrap',

    // windows high contrast mode focus indicator
    ':focus-within': {
      outlineWidth: '2px',
      outlineStyle: 'solid',
      outlineColor: 'transparent',
    },

    // bottom focus border, shared with Input, Select, and SpinButton
    '::after': {
      boxSizing: 'border-box',
      content: '""',
      position: 'absolute',
      left: '-1px',
      bottom: '-1px',
      right: '-1px',
      height: `max(2px, ${tokens.borderRadiusMedium})`,
      borderBottomLeftRadius: tokens.borderRadiusMedium,
      borderBottomRightRadius: tokens.borderRadiusMedium,
      borderBottom: `${tokens.strokeWidthThick} solid ${tokens.colorCompoundBrandStroke}`,
      clipPath: 'inset(calc(100% - 2px) 0 0 0)',
      transform: 'scaleX(0)',
      transitionProperty: 'transform',
      transitionDuration: tokens.durationUltraFast,
      transitionDelay: tokens.curveAccelerateMid,

      '@media screen and (prefers-reduced-motion: reduce)': {
        transitionDuration: '0.01ms',
        transitionDelay: '0.01ms',
      },
    },
    ':focus-within::after': {
      transform: 'scaleX(1)',
      transitionProperty: 'transform',
      transitionDuration: tokens.durationNormal,
      transitionDelay: tokens.curveDecelerateMid,

      '@media screen and (prefers-reduced-motion: reduce)': {
        transitionDuration: '0.01ms',
        transitionDelay: '0.01ms',
      },
    },
    ':focus-within:active::after': {
      borderBottomColor: tokens.colorCompoundBrandStrokePressed,
    },
  },

  listbox: {
    boxShadow: `${tokens.shadow16}`,
    borderRadius: tokens.borderRadiusMedium,
    maxHeight: '80vh',
    boxSizing: 'border-box',
  },

  listboxCollapsed: {
    display: 'none',
  },

  // size variants
  medium: {
    minHeight: '32px',
  },
  large: {
    minHeight: '40px',
  },
  'extra-large': {
    minHeight: '44px',
  },

  // appearance variants
  outline: {
    backgroundColor: tokens.colorNeutralBackground1,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,
    borderBottomColor: tokens.colorNeutralStrokeAccessible,
  },

  outlineInteractive: {
    '&:hover': {
      ...shorthands.borderColor(tokens.colorNeutralStroke1Hover),
      borderBottomColor: tokens.colorNeutralStrokeAccessible,
    },

    '&:active': {
      ...shorthands.borderColor(tokens.colorNeutralStroke1Pressed),
      borderBottomColor: tokens.colorNeutralStrokeAccessible,
    },
  },
  underline: {
    backgroundColor: tokens.colorTransparentBackground,
    borderBottom: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStrokeAccessible}`,
    borderRadius: '0',
  },
  'filled-lighter': {
    backgroundColor: tokens.colorNeutralBackground1,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorTransparentStroke}`,
  },
  'filled-darker': {
    backgroundColor: tokens.colorNeutralBackground3,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorTransparentStroke}`,
  },
  invalid: {
    ':not(:focus-within),:hover:not(:focus-within)': {
      ...shorthands.borderColor(tokens.colorPaletteRedBorder2),
    },
  },
  invalidUnderline: {
    ':not(:focus-within),:hover:not(:focus-within)': {
      borderBottomColor: tokens.colorPaletteRedBorder2,
    },
  },

  disabled: {
    cursor: 'not-allowed',
    backgroundColor: tokens.colorTransparentBackground,
    ...shorthands.borderColor(tokens.colorNeutralStrokeDisabled),
    '@media (forced-colors: active)': {
      ...shorthands.borderColor('GrayText'),
    },
  },
});

const useAsideStyles = makeStyles({
  root: {
    display: 'grid',
    alignItems: 'center',
    position: 'absolute',
    top: '0',
    right: tokens.spacingHorizontalM,
    gridTemplateColumns: 'repeat(2, auto)',
    gridTemplateRows: 'minmax(32px, auto) 1fr',
    height: '100%',
    cursor: 'text',
  },
  // size variants
  medium: {
    minHeight: '32px',
  },
  large: {
    minHeight: '40px',
  },
  'extra-large': {
    minHeight: '44px',
  },
});

export const iconSizes = {
  small: '16px',
  medium: '20px',
  large: '24px',
};

const useIconStyles = makeStyles({
  icon: {
    boxSizing: 'border-box',
    color: tokens.colorNeutralStrokeAccessible,
    cursor: 'pointer',
    display: 'block',
    fontSize: tokens.fontSizeBase500,
    // the SVG must have display: block for accurate positioning
    // otherwise an extra inline space is inserted after the svg element
    '& svg': {
      display: 'block',
    },
  },
  // icon size variants
  medium: {
    fontSize: iconSizes.small,
    marginLeft: tokens.spacingHorizontalXXS,
  },
  large: {
    fontSize: iconSizes.medium,
    marginLeft: tokens.spacingHorizontalXXS,
  },
  'extra-large': {
    fontSize: iconSizes.large,
    marginLeft: tokens.spacingHorizontalSNudge,
  },
  disabled: {
    color: tokens.colorNeutralForegroundDisabled,
    cursor: 'not-allowed',
  },
});

/**
 * Apply styling to the PickerControl slots based on the state
 */
export const useTagPickerControlStyles_unstable = (state: TagPickerControlState): TagPickerControlState => {
  'use no memo';

  const styles = useStyles();
  const iconStyles = useIconStyles();
  const asideStyles = useAsideStyles();
  state.root.className = mergeClasses(
    tagPickerControlClassNames.root,
    styles.root,
    styles[state.size],
    styles[state.appearance],
    !state.disabled && state.appearance === 'outline' && styles.outlineInteractive,
    state.invalid && state.appearance !== 'underline' && styles.invalid,
    state.invalid && state.appearance === 'underline' && styles.invalidUnderline,
    state.disabled && styles.disabled,
    state.root.className,
  );

  if (state.aside) {
    state.aside.className = mergeClasses(
      tagPickerControlClassNames.aside,
      asideStyles.root,
      asideStyles[state.size],
      state.aside.className,
    );
  }

  if (state.expandIcon) {
    state.expandIcon.className = mergeClasses(
      tagPickerControlClassNames.expandIcon,
      iconStyles.icon,
      iconStyles[state.size],
      state.disabled && iconStyles.disabled,
      state.expandIcon.className,
    );
  }

  if (state.secondaryAction) {
    state.secondaryAction.className = mergeClasses(
      tagPickerControlClassNames.secondaryAction,
      state.secondaryAction.className,
    );
  }

  return state;
};
