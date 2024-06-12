import { makeResetStyles, makeStyles, mergeClasses } from '@griffel/react';
import { typographyStyles, tokens } from '@fluentui/react-theme';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { TagPickerInputSlots, TagPickerInputState } from './TagPickerInput.types';
import { tagPickerInputTokens } from '../../utils/tokens';

export const tagPickerInputClassNames: SlotClassNames<TagPickerInputSlots> = {
  root: 'fui-TagPickerInput',
};

const useBaseStyle = makeResetStyles({
  backgroundColor: `var(--ctrl-token-TagPickerInput-2273, var(--semantic-token-TagPickerInput-2274, ${tokens.colorTransparentBackground}))`,
  color: `var(--ctrl-token-TagPickerInput-2275, var(--semantic-token-TagPickerInput-2276, ${tokens.colorNeutralForeground1}))`,
  fontFamily: `var(--ctrl-token-TagPickerInput-2277, var(--semantic-token-TagPickerInput-2278, ${tokens.fontFamilyBase}))`,
  boxSizing: 'border-box',

  '&:focus': {
    outlineStyle: 'none',
  },
  '&::placeholder': {
    color: `var(--ctrl-token-TagPickerInput-2279, var(--semantic-token-TagPickerInput-2280, ${tokens.colorNeutralForeground4}))`,
    opacity: 1,
  },
  '&::after': {
    visibility: 'hidden',
    whiteSpace: 'pre-wrap',
  },
  border: 'none',
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
    padding: `${tokens.spacingVerticalSNudge} 0 ${tokens.spacingVerticalSNudge} 0`,
  },
  large: {
    ...typographyStyles.body1,
    padding: `${tokens.spacingVerticalMNudge} 0 ${tokens.spacingVerticalMNudge} 0`,
  },
  'extra-large': {
    ...typographyStyles.body1,
    padding: `${tokens.spacingVerticalM} 0 ${tokens.spacingVerticalM} 0`,
  },
  disabled: {
    color: `var(--ctrl-token-TagPickerInput-2281, var(--semantic-token-TagPickerInput-2282, ${tokens.colorNeutralForegroundDisabled}))`,
    backgroundColor: `var(--ctrl-token-TagPickerInput-2283, var(--semantic-token-TagPickerInput-2284, ${tokens.colorTransparentBackground}))`,
    cursor: 'not-allowed',
    '::placeholder': {
      color: `var(--ctrl-token-TagPickerInput-2285, var(--semantic-token-TagPickerInput-2286, ${tokens.colorNeutralForegroundDisabled}))`,
    },
  },
});

/**
 * Apply styling to the TagPickerInput slots based on the state
 */
export const useTagPickerInputStyles_unstable = (state: TagPickerInputState): TagPickerInputState => {
  'use no memo';

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
