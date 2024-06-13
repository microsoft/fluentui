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
    borderRadius: `var(--ctrl-token-Dropdown-919, var(--semantic-token-Dropdown-920, ${tokens.borderRadiusMedium}))`,
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
      borderBottomLeftRadius: `var(--ctrl-token-Dropdown-921, var(--semantic-token-Dropdown-922, ${tokens.borderRadiusMedium}))`,
      borderBottomRightRadius: `var(--ctrl-token-Dropdown-923, var(--semantic-token-Dropdown-924, ${tokens.borderRadiusMedium}))`,
      borderBottom: `${tokens.strokeWidthThick} solid ${tokens.colorCompoundBrandStroke}`,
      clipPath: 'inset(calc(100% - 2px) 0 0 0)',
      transform: 'scaleX(0)',
      transitionProperty: 'transform',
      transitionDuration: `var(--ctrl-token-Dropdown-925, var(--semantic-token-Dropdown-926, ${tokens.durationUltraFast}))`,
      transitionDelay: `var(--ctrl-token-Dropdown-927, var(--semantic-token-Dropdown-928, ${tokens.curveAccelerateMid}))`,

      '@media screen and (prefers-reduced-motion: reduce)': {
        transitionDuration: '0.01ms',
        transitionDelay: '0.01ms',
      },
    },
    ':focus-within::after': {
      transform: 'scaleX(1)',
      transitionProperty: 'transform',
      transitionDuration: `var(--ctrl-token-Dropdown-929, var(--semantic-token-Dropdown-930, ${tokens.durationNormal}))`,
      transitionDelay: `var(--ctrl-token-Dropdown-931, var(--semantic-token-Dropdown-932, ${tokens.curveDecelerateMid}))`,

      '@media screen and (prefers-reduced-motion: reduce)': {
        transitionDuration: '0.01ms',
        transitionDelay: '0.01ms',
      },
    },
    ':focus-within:active::after': {
      borderBottomColor: `var(--ctrl-token-Dropdown-933, var(--semantic-token-Dropdown-934, ${tokens.colorCompoundBrandStrokePressed}))`,
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
    borderRadius: `var(--ctrl-token-Dropdown-935, var(--semantic-token-Dropdown-936, ${tokens.borderRadiusMedium}))`,
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
    backgroundColor: `var(--ctrl-token-Dropdown-937, var(--semantic-token-Dropdown-938, ${tokens.colorTransparentBackground}))`,
    border: 'none',
    boxSizing: 'border-box',
    color: `var(--ctrl-token-Dropdown-939, var(--semantic-token-Dropdown-940, ${tokens.colorNeutralForeground1}))`,
    columnGap: `var(--ctrl-token-Dropdown-941, var(--semantic-token-Dropdown-942, ${tokens.spacingHorizontalXXS}))`,
    cursor: 'pointer',
    display: 'grid',
    fontFamily: `var(--ctrl-token-Dropdown-943, var(--semantic-token-Dropdown-944, ${tokens.fontFamilyBase}))`,
    gridTemplateColumns: '[content] 1fr [icon] auto [end]',
    justifyContent: 'space-between',
    textAlign: 'left',
    width: '100%',

    '&:focus': {
      outlineStyle: 'none',
    },
  },

  placeholder: {
    color: `var(--ctrl-token-Dropdown-945, var(--semantic-token-Dropdown-946, ${tokens.colorNeutralForeground4}))`,
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
    columnGap: `var(--ctrl-token-Dropdown-947, var(--semantic-token-Dropdown-948, ${tokens.spacingHorizontalSNudge}))`,
    ...typographyStyles.body2,
    padding: `7px ${
      tokens.spacingHorizontalM
    } 7px ${`calc(${tokens.spacingHorizontalM} + ${tokens.spacingHorizontalSNudge})`}`,
  },

  // appearance variants
  outline: {
    backgroundColor: `var(--ctrl-token-Dropdown-949, var(--semantic-token-Dropdown-950, ${tokens.colorNeutralBackground1}))`,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,
    borderBottomColor: `var(--ctrl-token-Dropdown-951, var(--semantic-token-Dropdown-952, ${tokens.colorNeutralStrokeAccessible}))`,
  },
  outlineInteractive: {
    '&:hover': {
      ...shorthands.borderColor(tokens.colorNeutralStroke1Hover),
      borderBottomColor: `var(--ctrl-token-Dropdown-953, var(--semantic-token-Dropdown-954, ${tokens.colorNeutralStrokeAccessible}))`,
    },

    '&:active': {
      ...shorthands.borderColor(tokens.colorNeutralStroke1Pressed),
      borderBottomColor: `var(--ctrl-token-Dropdown-955, var(--semantic-token-Dropdown-956, ${tokens.colorNeutralStrokeAccessible}))`,
    },
  },
  underline: {
    backgroundColor: `var(--ctrl-token-Dropdown-957, var(--semantic-token-Dropdown-958, ${tokens.colorTransparentBackground}))`,
    borderBottom: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStrokeAccessible}`,
    borderRadius: '0',
  },
  'filled-lighter': {
    backgroundColor: `var(--ctrl-token-Dropdown-959, var(--semantic-token-Dropdown-960, ${tokens.colorNeutralBackground1}))`,
    border: `${tokens.strokeWidthThin} solid transparent`,
  },
  'filled-darker': {
    backgroundColor: `var(--ctrl-token-Dropdown-961, var(--semantic-token-Dropdown-962, ${tokens.colorNeutralBackground3}))`,
    border: `${tokens.strokeWidthThin} solid transparent`,
  },
  invalid: {
    ':not(:focus-within),:hover:not(:focus-within)': {
      ...shorthands.borderColor(tokens.colorPaletteRedBorder2),
    },
  },
  invalidUnderline: {
    ':not(:focus-within),:hover:not(:focus-within)': {
      borderBottomColor: `var(--ctrl-token-Dropdown-963, var(--semantic-token-Dropdown-964, ${tokens.colorPaletteRedBorder2}))`,
    },
  },
  disabled: {
    cursor: 'not-allowed',
    backgroundColor: `var(--ctrl-token-Dropdown-965, var(--semantic-token-Dropdown-966, ${tokens.colorTransparentBackground}))`,
    ...shorthands.borderColor(tokens.colorNeutralStrokeDisabled),
    '@media (forced-colors: active)': {
      ...shorthands.borderColor('GrayText'),
    },
  },

  disabledText: {
    color: `var(--ctrl-token-Dropdown-967, var(--semantic-token-Dropdown-968, ${tokens.colorNeutralForegroundDisabled}))`,
    cursor: 'not-allowed',
  },

  hidden: {
    display: 'none',
  },
});

const useIconStyles = makeStyles({
  icon: {
    boxSizing: 'border-box',
    color: `var(--ctrl-token-Dropdown-969, var(--semantic-token-Dropdown-970, ${tokens.colorNeutralStrokeAccessible}))`,
    display: 'block',
    fontSize: `var(--ctrl-token-Dropdown-971, var(--semantic-token-Dropdown-972, ${tokens.fontSizeBase500}))`,
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
    marginLeft: `var(--ctrl-token-Dropdown-973, var(--semantic-token-Dropdown-974, ${tokens.spacingHorizontalXXS}))`,
  },
  medium: {
    fontSize: iconSizes.medium,
    marginLeft: `var(--ctrl-token-Dropdown-975, var(--semantic-token-Dropdown-976, ${tokens.spacingHorizontalXXS}))`,
  },
  large: {
    fontSize: iconSizes.large,
    marginLeft: `var(--ctrl-token-Dropdown-977, var(--semantic-token-Dropdown-978, ${tokens.spacingHorizontalSNudge}))`,
  },

  disabled: {
    color: `var(--ctrl-token-Dropdown-979, var(--semantic-token-Dropdown-980, ${tokens.colorNeutralForegroundDisabled}))`,
  },
});

const useBaseClearButtonStyle = makeResetStyles({
  alignSelf: 'center',
  backgroundColor: `var(--ctrl-token-Dropdown-981, var(--semantic-token-Dropdown-982, ${tokens.colorTransparentBackground}))`,
  border: 'none',
  cursor: 'pointer',
  height: 'fit-content',
  margin: 0,
  marginRight: `var(--ctrl-token-Dropdown-983, var(--semantic-token-Dropdown-984, ${tokens.spacingHorizontalMNudge}))`,
  padding: 0,
  position: 'relative',

  ...createFocusOutlineStyle(),
});

/**
 * Apply styling to the Dropdown slots based on the state
 */
export const useDropdownStyles_unstable = (state: DropdownState): DropdownState => {
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
