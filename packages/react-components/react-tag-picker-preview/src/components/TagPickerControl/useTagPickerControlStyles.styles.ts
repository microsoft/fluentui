import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { tokens } from '@fluentui/react-theme';
import type { TagPickerControlSlots, TagPickerControlState } from './TagPickerControl.types';

export const tagPickerControlClassNames: SlotClassNames<TagPickerControlSlots> = {
  root: 'fui-TagPickerControl',
};

// TODO reuse styles from combobox root slot
/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    alignItems: 'center',
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    columnGap: tokens.spacingHorizontalXXS,
    boxSizing: 'border-box',
    display: 'flex',
    minWidth: '250px',
    position: 'relative',
    flexWrap: 'wrap',
    paddingLeft: tokens.spacingHorizontalM,
    // 20px is a static value representing the space required for the caret icon
    paddingRight: `calc(${tokens.spacingHorizontalM} + 20px)`,

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
      ...shorthands.borderBottom(tokens.strokeWidthThick, 'solid', tokens.colorCompoundBrandStroke),
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
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
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
    ...shorthands.border(tokens.strokeWidthThin, 'solid', tokens.colorNeutralStroke1),
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
    ...shorthands.borderBottom(tokens.strokeWidthThin, 'solid', tokens.colorNeutralStrokeAccessible),
    ...shorthands.borderRadius(0),
  },
  'filled-lighter': {
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.border(tokens.strokeWidthThin, 'solid', tokens.colorTransparentStroke),
  },
  'filled-darker': {
    backgroundColor: tokens.colorNeutralBackground3,
    ...shorthands.border(tokens.strokeWidthThin, 'solid', tokens.colorTransparentStroke),
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

/**
 * Apply styling to the PickerControl slots based on the state
 */
export const useTagPickerControlStyles_unstable = (state: TagPickerControlState): TagPickerControlState => {
  const styles = useStyles();
  state.root.className = mergeClasses(
    tagPickerControlClassNames.root,
    styles.root,
    styles[state.size],
    styles[state.appearance],
    !state.disabled && state.appearance === 'outline' && styles.outlineInteractive,
    state.disabled && styles.disabled,
    state.root.className,
  );

  return state;
};
