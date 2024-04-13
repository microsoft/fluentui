import { makeResetStyles, makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { typographyStyles, tokens } from '@fluentui/react-theme';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { TagPickerInputSlots, TagPickerInputState } from './TagPickerInput.types';
import { tagPickerInputTokens } from '../../utils/tokens';

export const tagPickerInputClassNames: SlotClassNames<TagPickerInputSlots> = {
  root: 'fui-TagPickerInput',
};

const useBaseStyle = makeResetStyles({
  backgroundColor: tokens.colorTransparentBackground,
  color: tokens.colorNeutralForeground1,
  fontFamily: tokens.fontFamilyBase,
  boxSizing: 'border-box',

  '&:focus': {
    outlineStyle: 'none',
  },
  '&::placeholder': {
    color: tokens.colorNeutralForeground4,
    opacity: 1,
  },
  '&::after': {
    visibility: 'hidden',
    whiteSpace: 'pre-wrap',
  },
  ...shorthands.border('0'),
  minWidth: '24px',
  maxWidth: '100%',
  // by default width is 0,
  // it will be calculated based on the requirement of stretching the component to 100% width
  // see setTagPickerInputStretchStyle method for more details
  width: tagPickerInputTokens.width,
  flexGrow: 1,
});

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
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
export const useTagPickerInputStyles = (state: TagPickerInputState): TagPickerInputState => {
  const baseStyle = useBaseStyle();
  const styles = useStyles();
  state.root.className = mergeClasses(
    tagPickerInputClassNames.root,
    baseStyle,
    styles[state.size],
    state.disabled && styles.disabled,
    state.root.className,
  );
  return state;
};
