import { tokens } from '@fluentui/react-theme';
import { SlotClassNames } from '@fluentui/react-utilities';
import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { iconSizes } from '../../utils/internalTokens';
import type { ComboboxSlots, ComboboxState } from './Combobox.types';

export const comboboxClassNames: SlotClassNames<ComboboxSlots> = {
  root: 'fui-Combobox',
  input: 'fui-Combobox__input',
  expandIcon: 'fui-Combobox__expandIcon',
  listbox: 'fui-Combobox__listbox',
};

// Matches internal heights for Select and Input, but there are no theme variables for these
// field heights are 2px less than other controls, since the border is on the parent element.
const fieldHeights = {
  small: '22px',
  medium: '30px',
  large: '38px',
};

/**
 * Styles for Combobox
 */
const useStyles = makeStyles({
  root: {
    alignItems: 'center',
    ...shorthands.border(tokens.strokeWidthThin, 'solid', 'transparent'),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    boxSizing: 'border-box',
    columnGap: tokens.spacingHorizontalXXS,
    display: 'inline-grid',
    gridTemplateColumns: '1fr auto',
    justifyContent: 'space-between',
    minWidth: '250px',
    position: 'relative',

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

  listbox: {},

  listboxCollapsed: {
    display: 'none',
  },

  // size variants
  small: {
    paddingRight: tokens.spacingHorizontalSNudge,
  },
  medium: {
    paddingRight: tokens.spacingHorizontalMNudge,
  },
  large: {
    columnGap: tokens.spacingHorizontalSNudge,
    paddingRight: tokens.spacingHorizontalM,
  },

  // appearance variants
  outline: {
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.border(tokens.strokeWidthThin, 'solid', tokens.colorNeutralStroke1),
    borderBottomColor: tokens.colorNeutralStrokeAccessible,

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
  },
  'filled-darker': {
    backgroundColor: tokens.colorNeutralBackground3,
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
});

const useInputStyles = makeStyles({
  input: {
    backgroundColor: tokens.colorTransparentBackground,
    ...shorthands.border('0'),
    color: tokens.colorNeutralForeground1,
    fontFamily: tokens.fontFamilyBase,

    '&:focus': {
      outlineStyle: 'none',
    },

    '&::placeholder': {
      color: tokens.colorNeutralForeground4,
      opacity: 1,
    },
  },

  // size variants
  small: {
    fontSize: tokens.fontSizeBase200,
    height: fieldHeights.small,
    lineHeight: tokens.lineHeightBase200,
    ...shorthands.padding(0, 0, 0, `calc(${tokens.spacingHorizontalSNudge} + ${tokens.spacingHorizontalXXS})`),
  },
  medium: {
    fontSize: tokens.fontSizeBase300,
    height: fieldHeights.medium,
    lineHeight: tokens.lineHeightBase300,
    ...shorthands.padding(0, 0, 0, `calc(${tokens.spacingHorizontalMNudge} + ${tokens.spacingHorizontalXXS})`),
  },
  large: {
    fontSize: tokens.fontSizeBase400,
    height: fieldHeights.large,
    lineHeight: tokens.lineHeightBase400,
    ...shorthands.padding(0, 0, 0, `calc(${tokens.spacingHorizontalM} + ${tokens.spacingHorizontalSNudge})`),
  },
});

const useIconStyles = makeStyles({
  icon: {
    boxSizing: 'border-box',
    color: tokens.colorNeutralStrokeAccessible,
    display: 'block',
    fontSize: tokens.fontSizeBase500,

    // the SVG must have display: block for accurate positioning
    // otherwise an extra inline space is inserted after the svg element
    '& svg': {
      display: 'block',
    },
  },

  // icon size variants
  small: {
    fontSize: iconSizes.small,
    marginLeft: tokens.spacingHorizontalXXS,
  },
  medium: {
    fontSize: iconSizes.medium,
    marginLeft: tokens.spacingHorizontalXXS,
  },
  large: {
    fontSize: iconSizes.large,
    marginLeft: tokens.spacingHorizontalSNudge,
  },
});

/**
 * Apply styling to the Combobox slots based on the state
 */
export const useComboboxStyles_unstable = (state: ComboboxState): ComboboxState => {
  const { appearance, open, size } = state;
  const invalid = `${state.input['aria-invalid']}` === 'true';
  const styles = useStyles();
  const iconStyles = useIconStyles();
  const inputStyles = useInputStyles();

  state.root.className = mergeClasses(
    comboboxClassNames.root,
    styles.root,
    styles[appearance],
    styles[size],
    invalid && appearance !== 'underline' && styles.invalid,
    invalid && appearance === 'underline' && styles.invalidUnderline,
    state.root.className,
  );

  state.input.className = mergeClasses(
    comboboxClassNames.input,
    inputStyles.input,
    inputStyles[size],
    state.input.className,
  );

  if (state.listbox) {
    state.listbox.className = mergeClasses(
      comboboxClassNames.listbox,
      styles.listbox,
      !open && styles.listboxCollapsed,
      state.listbox.className,
    );
  }

  if (state.expandIcon) {
    state.expandIcon.className = mergeClasses(
      comboboxClassNames.expandIcon,
      iconStyles.icon,
      iconStyles[size],
      state.expandIcon.className,
    );
  }

  return state;
};
