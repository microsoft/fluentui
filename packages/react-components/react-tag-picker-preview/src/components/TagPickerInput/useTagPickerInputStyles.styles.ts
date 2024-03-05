import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { typographyStyles, tokens } from '@fluentui/react-theme';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { TagPickerInputSlots, TagPickerInputState } from './TagPickerInput.types';

// TODO reuse input and icon styles from root

export const tagPickerInputClassNames: SlotClassNames<TagPickerInputSlots> = {
  root: 'fui-TagPickerInput',
  clearIcon: 'fui-TagPickerInput__clearIcon',
  expandIcon: 'fui-TagPickerInput__expandIcon',
};

const fieldHeights = {
  small: '22px',
  medium: '30px',
  large: '38px',
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
  root: {
    backgroundColor: tokens.colorTransparentBackground,
    ...shorthands.border('0'),
    color: tokens.colorNeutralForeground1,
    fontFamily: tokens.fontFamilyBase,
    flexGrow: 1,
    paddingLeft: tokens.spacingHorizontalXXS,

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
    height: fieldHeights.small,
    ...typographyStyles.caption1,
  },
  medium: {
    height: fieldHeights.medium,
    ...typographyStyles.body1,
  },
  large: {
    height: fieldHeights.large,
    ...typographyStyles.body2,
  },
  disabled: {
    color: tokens.colorNeutralForegroundDisabled,
    backgroundColor: tokens.colorTransparentBackground,
    cursor: 'not-allowed',
    '::placeholder': {
      color: tokens.colorNeutralForegroundDisabled,
    },
  },

  // TODO add additional classes for different states and/or slots
});

const useIconStyles = makeStyles({
  icon: {
    boxSizing: 'border-box',
    color: tokens.colorNeutralStrokeAccessible,
    cursor: 'pointer',
    display: 'block',
    fontSize: tokens.fontSizeBase500,
    position: 'absolute',
    right: '10px',
    top: '5px',
    // the SVG must have display: block for accurate positioning
    // otherwise an extra inline space is inserted after the svg element
    '& svg': {
      display: 'block',
    },
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
    cursor: 'not-allowed',
  },
});

/**
 * Apply styling to the TagPickerInput slots based on the state
 */
export const useTagPickerInputStyles_unstable = (state: TagPickerInputState): TagPickerInputState => {
  const styles = useStyles();
  const iconStyles = useIconStyles();
  state.root.className = mergeClasses(
    tagPickerInputClassNames.root,
    styles.root,
    styles[state.size],
    state.disabled && styles.disabled,
    state.root.className,
  );

  if (state.clearIcon) {
    state.clearIcon.className = mergeClasses(
      tagPickerInputClassNames.clearIcon,
      iconStyles.icon,
      iconStyles[state.size],
      state.disabled && iconStyles.disabled,
      !state.showClearIcon && iconStyles.visuallyHidden,
      state.clearIcon.className,
    );
  }

  if (state.expandIcon) {
    state.expandIcon.className = mergeClasses(
      tagPickerInputClassNames.expandIcon,
      iconStyles.icon,
      iconStyles[state.size],
      state.disabled && iconStyles.disabled,
      state.showClearIcon && iconStyles.visuallyHidden,
      state.expandIcon.className,
    );
  }

  return state;
};
