import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { typographyStyles, tokens } from '@fluentui/react-theme';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { TagPickerInputSlots, TagPickerInputState } from './TagPickerInput.types';

// TODO reuse input and icon styles from root

export const tagPickerInputClassNames: SlotClassNames<TagPickerInputSlots> = {
  root: 'fui-TagPickerInput',
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
    boxSizing: 'border-box',

    '&:focus': {
      outlineStyle: 'none',
    },

    '&::placeholder': {
      color: tokens.colorNeutralForeground4,
      opacity: 1,
    },
  },

  // size variants
  medium: {
    ...typographyStyles.body1,
    ...shorthands.paddingBlock(tokens.spacingVerticalSNudge),
  },
  large: {
    ...typographyStyles.body1,
    ...shorthands.paddingBlock(tokens.spacingVerticalMNudge),
  },
  'extra-large': {
    ...typographyStyles.body1,
    ...shorthands.paddingBlock(tokens.spacingVerticalM),
  },
  disabled: {
    color: tokens.colorNeutralForegroundDisabled,
    backgroundColor: tokens.colorTransparentBackground,
    cursor: 'not-allowed',
    '::placeholder': {
      color: tokens.colorNeutralForegroundDisabled,
    },
  },
});

/**
 * Apply styling to the TagPickerInput slots based on the state
 */
export const useTagPickerInputStyles_unstable = (state: TagPickerInputState): TagPickerInputState => {
  const styles = useStyles();
  state.root.className = mergeClasses(
    tagPickerInputClassNames.root,
    styles.root,
    styles[state.size],
    state.disabled && styles.disabled,
    state.root.className,
  );
  return state;
};
