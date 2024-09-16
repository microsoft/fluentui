import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { tokens, typographyStyles } from '@fluentui/react-theme';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { TagPickerButtonSlots, TagPickerButtonState } from './TagPickerButton.types';

export const tagPickerButtonClassNames: SlotClassNames<TagPickerButtonSlots> = {
  root: 'fui-TagPickerButton',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  button: {
    alignItems: 'center',
    minHeight: '32px',
    backgroundColor: tokens.colorTransparentBackground,
    border: 'none',
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
  medium: {
    ...typographyStyles.caption1,
    padding: `3px ${
      tokens.spacingHorizontalSNudge
    } 3px ${`calc(${tokens.spacingHorizontalSNudge} + ${tokens.spacingHorizontalXXS})`}`,
  },
  large: {
    ...typographyStyles.body1,
    padding: `5px ${
      tokens.spacingHorizontalMNudge
    } 5px ${`calc(${tokens.spacingHorizontalMNudge} + ${tokens.spacingHorizontalXXS})`}`,
  },
  'extra-large': {
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
  visuallyHidden: {
    clip: 'rect(0px, 0px, 0px, 0px)',
    height: '1px',
    margin: '-1px',
    overflow: 'hidden',
    padding: '0px',
    width: '1px',
    position: 'absolute',
  },
});

/**
 * Apply styling to the PickerButton slots based on the state
 */
export const useTagPickerButtonStyles_unstable = (state: TagPickerButtonState): TagPickerButtonState => {
  'use no memo';

  const styles = useStyles();
  state.root.className = mergeClasses(
    tagPickerButtonClassNames.root,
    styles.button,
    styles[state.size],
    state.hasSelectedOption && styles.visuallyHidden,
    state.root.className,
  );

  return state;
};
