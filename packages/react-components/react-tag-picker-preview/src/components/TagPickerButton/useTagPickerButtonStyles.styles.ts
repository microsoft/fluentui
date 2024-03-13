import { makeResetStyles, makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { tokens, typographyStyles } from '@fluentui/react-theme';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { createFocusOutlineStyle } from '@fluentui/react-tabster';
import type { TagPickerButtonSlots, TagPickerButtonState } from './TagPickerButton.types';

export const tagPickerButtonClassNames: SlotClassNames<TagPickerButtonSlots> = {
  root: 'fui-TagPickerButton',
  clearButton: 'fui-TagPickerButton__clearButton',
  expandIcon: 'fui-TagPickerButton__expandIcon',
};

export const iconSizes = {
  small: '16px',
  medium: '20px',
  large: '24px',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  button: {
    alignItems: 'center',
    minHeight: '30px',
    backgroundColor: tokens.colorTransparentBackground,
    ...shorthands.border('0'),
    boxSizing: 'border-box',
    color: tokens.colorNeutralForeground1,
    columnGap: tokens.spacingHorizontalXXS,
    cursor: 'pointer',
    fontFamily: tokens.fontFamilyBase,
    textAlign: 'left',
    flexGrow: 1,

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
    ...shorthands.padding(
      '3px',
      tokens.spacingHorizontalSNudge,
      '3px',
      `calc(${tokens.spacingHorizontalSNudge} + ${tokens.spacingHorizontalXXS})`,
    ),
  },
  medium: {
    ...typographyStyles.body1,
    ...shorthands.padding(
      '5px',
      tokens.spacingHorizontalMNudge,
      '5px',
      `calc(${tokens.spacingHorizontalMNudge} + ${tokens.spacingHorizontalXXS})`,
    ),
  },
  large: {
    columnGap: tokens.spacingHorizontalSNudge,
    ...typographyStyles.body2,
    ...shorthands.padding(
      '7px',
      tokens.spacingHorizontalM,
      '7px',
      `calc(${tokens.spacingHorizontalM} + ${tokens.spacingHorizontalSNudge})`,
    ),
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
    ...shorthands.border(tokens.strokeWidthThin, 'solid', 'transparent'),
  },
  'filled-darker': {
    backgroundColor: tokens.colorNeutralBackground3,
    ...shorthands.border(tokens.strokeWidthThin, 'solid', 'transparent'),
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
  visuallyHidden: {
    clip: 'rect(0px, 0px, 0px, 0px)',
    height: '1px',
    ...shorthands.margin('-1px'),
    ...shorthands.overflow('hidden'),
    ...shorthands.padding('0px'),
    width: '1px',
    position: 'absolute',
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
    position: 'absolute',
    right: '10px',
    top: '5px',

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
 * Apply styling to the PickerButton slots based on the state
 */
export const useTagPickerButtonStyles_unstable = (state: TagPickerButtonState): TagPickerButtonState => {
  const styles = useStyles();
  const clearButtonStyles = useBaseClearButtonStyle();
  const iconStyles = useIconStyles();
  state.root.className = mergeClasses(
    tagPickerButtonClassNames.root,
    styles.button,
    styles[state.size],
    state.hasSelectedOption && styles.visuallyHidden,
    state.root.className,
  );

  if (state.clearButton) {
    state.clearButton.className = mergeClasses(
      tagPickerButtonClassNames.clearButton,
      clearButtonStyles,
      iconStyles.icon,
      iconStyles[state.size],
      state.disabled && iconStyles.disabled,
      !state.showClearIcon && styles.hidden,
      state.clearButton.className,
    );
  }

  if (state.expandIcon) {
    state.expandIcon.className = mergeClasses(
      tagPickerButtonClassNames.expandIcon,
      iconStyles.icon,
      iconStyles[state.size],
      state.disabled && iconStyles.disabled,
      state.showClearIcon && styles.hidden,
      state.expandIcon.className,
    );
  }

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};
