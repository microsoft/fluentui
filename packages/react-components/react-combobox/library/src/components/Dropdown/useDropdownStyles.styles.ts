import { createFocusOutlineStyle } from '@fluentui/react-tabster';
import { tokens, typographyStyles } from '@fluentui/react-theme';
import { SlotClassNames } from '@fluentui/react-utilities';
import { makeResetStyles, makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { iconSizes } from '../../utils/internalTokens';
import type { DropdownSlots, DropdownState } from './Dropdown.types';

export const dropdownClassNames: SlotClassNames<DropdownSlots> = {
  root: 'fui-Dropdown',
  button: 'fui-Dropdown__button',
  clearButton: 'fui-Dropdown__clearButton',
  expandIcon: 'fui-Dropdown__expandIcon',
  listbox: 'fui-Dropdown__listbox',
};

/**
 * Styles for Dropdown
 */
const useStyles = makeStyles({
  root: {
    borderRadius: tokens.borderRadiusMedium,
    boxSizing: 'border-box',
    display: 'inline-flex',
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
      height: `max(${tokens.strokeWidthThick}, ${tokens.borderRadiusMedium})`,
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

    '@supports selector(:has(*))': {
      [`:has(.${dropdownClassNames.clearButton}:focus)::after`]: {
        borderBottomColor: 'initial',
        transform: 'scaleX(0)',
      },
    },
  },

  listbox: {
    boxSizing: 'border-box',
    boxShadow: `${tokens.shadow16}`,
    borderRadius: tokens.borderRadiusMedium,
    maxHeight: '80vh',
  },

  listboxCollapsed: {
    display: 'none',
  },

  // When rendering inline, the popupSurface will be rendered under relatively positioned elements such as Input.
  // This is due to the surface being positioned as absolute, therefore zIndex: 1 ensures that won't happen.
  inlineListbox: {
    zIndex: 1,
  },

  button: {
    alignItems: 'center',
    backgroundColor: tokens.colorTransparentBackground,
    border: 'none',
    boxSizing: 'border-box',
    color: tokens.colorNeutralForeground1,
    columnGap: tokens.spacingHorizontalXXS,
    cursor: 'pointer',
    display: 'grid',
    fontFamily: tokens.fontFamilyBase,
    gridTemplateColumns: '[content] 1fr [icon] auto [end]',
    justifyContent: 'space-between',
    textAlign: 'left',
    width: '100%',

    '&:focus': {
      outlineStyle: 'none',
    },
  },

  placeholder: {
    color: tokens.colorNeutralForeground4,
  },

  // size variants
  small: {
    ...typographyStyles.caption1,
    padding: `3px ${
      tokens.spacingHorizontalSNudge
    } 3px ${`calc(${tokens.spacingHorizontalSNudge} + ${tokens.spacingHorizontalXXS})`}`,
  },
  medium: {
    ...typographyStyles.body1,
    padding: `5px ${
      tokens.spacingHorizontalMNudge
    } 5px ${`calc(${tokens.spacingHorizontalMNudge} + ${tokens.spacingHorizontalXXS})`}`,
  },
  large: {
    columnGap: tokens.spacingHorizontalSNudge,
    ...typographyStyles.body2,
    padding: `7px ${
      tokens.spacingHorizontalM
    } 7px ${`calc(${tokens.spacingHorizontalM} + ${tokens.spacingHorizontalSNudge})`}`,
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
    border: `${tokens.strokeWidthThin} solid transparent`,
  },
  'filled-darker': {
    backgroundColor: tokens.colorNeutralBackground3,
    border: `${tokens.strokeWidthThin} solid transparent`,
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

  disabledText: {
    color: tokens.colorNeutralForegroundDisabled,
    cursor: 'not-allowed',
  },

  hidden: {
    display: 'none',
  },
});

const useIconStyles = makeStyles({
  icon: {
    boxSizing: 'border-box',
    color: tokens.colorNeutralStrokeAccessible,
    display: 'block',
    fontSize: tokens.fontSizeBase500,
    gridColumnStart: 'icon',
    gridColumnEnd: 'end',

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

  disabled: {
    color: tokens.colorNeutralForegroundDisabled,
  },
});

const useBaseClearButtonStyle = makeResetStyles({
  alignSelf: 'center',
  backgroundColor: tokens.colorTransparentBackground,
  border: 'none',
  cursor: 'pointer',
  height: 'fit-content',
  margin: 0,
  marginRight: tokens.spacingHorizontalMNudge,
  padding: 0,
  position: 'relative',

  ...createFocusOutlineStyle(),
});

/**
 * Apply styling to the Dropdown slots based on the state
 */
export const useDropdownStyles_unstable = (state: DropdownState): DropdownState => {
  'use no memo';

  const { appearance, open, placeholderVisible, showClearButton, size } = state;
  const invalid = `${state.button['aria-invalid']}` === 'true';
  const disabled = state.button.disabled;
  const styles = useStyles();
  const iconStyles = useIconStyles();
  const clearButtonStyle = useBaseClearButtonStyle();

  state.root.className = mergeClasses(
    dropdownClassNames.root,
    styles.root,
    styles[appearance],
    !disabled && appearance === 'outline' && styles.outlineInteractive,
    invalid && appearance !== 'underline' && styles.invalid,
    invalid && appearance === 'underline' && styles.invalidUnderline,
    disabled && styles.disabled,
    state.root.className,
  );

  state.button.className = mergeClasses(
    dropdownClassNames.button,
    styles.button,
    styles[size],
    placeholderVisible && styles.placeholder,
    disabled && styles.disabledText,
    state.button.className,
  );

  if (state.listbox) {
    state.listbox.className = mergeClasses(
      dropdownClassNames.listbox,
      styles.listbox,
      state.inlinePopup && styles.inlineListbox,
      !open && styles.listboxCollapsed,
      state.listbox.className,
    );
  }

  if (state.expandIcon) {
    state.expandIcon.className = mergeClasses(
      dropdownClassNames.expandIcon,
      iconStyles.icon,
      iconStyles[size],
      disabled && iconStyles.disabled,
      showClearButton && styles.hidden,
      state.expandIcon.className,
    );
  }

  if (state.clearButton) {
    state.clearButton.className = mergeClasses(
      dropdownClassNames.clearButton,
      clearButtonStyle,
      iconStyles.icon,
      iconStyles[size],
      disabled && iconStyles.disabled,
      !showClearButton && styles.hidden,
      state.clearButton.className,
    );
  }

  return state;
};
