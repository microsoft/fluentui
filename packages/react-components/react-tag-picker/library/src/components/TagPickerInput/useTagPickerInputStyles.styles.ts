import { makeResetStyles, makeStyles, mergeClasses } from '@griffel/react';
import { typographyStyles, tokens } from '@fluentui/react-theme';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { TagPickerInputSlots, TagPickerInputState } from './TagPickerInput.types';
import { tagPickerInputTokens } from '../../utils/tokens';

export const tagPickerInputClassNames: SlotClassNames<TagPickerInputSlots> = {
  root: 'fui-TagPickerInput',
};

const useBaseStyle = makeResetStyles({
  backgroundColor: `var(--2273, var(--2274, ${tokens.colorTransparentBackground}))`,
  color: `var(--2275, var(--2276, ${tokens.colorNeutralForeground1}))`,
  fontFamily: `var(--2277, var(--2278, ${tokens.fontFamilyBase}))`,
  boxSizing: 'border-box',

  '&:focus': {
    outlineStyle: 'none',
  },
  '&::placeholder': {
    color: `var(--2279, var(--2280, ${tokens.colorNeutralForeground4}))`,
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
    color: `var(--2281, var(--2282, ${tokens.colorNeutralForegroundDisabled}))`,
    backgroundColor: `var(--2283, var(--2284, ${tokens.colorTransparentBackground}))`,
    cursor: 'not-allowed',
    '::placeholder': {
      color: `var(--2285, var(--2286, ${tokens.colorNeutralForegroundDisabled}))`,
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
