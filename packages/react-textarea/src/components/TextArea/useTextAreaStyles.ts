import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { TextAreaSlots, TextAreaState } from './TextArea.types';
import { getBottomFocusIndicator } from '@fluentui/react-tabster';
import { tokens } from '@fluentui/react-theme';
import { SlotClassNames } from '@fluentui/react-utilities';

export const textAreaClassNames: SlotClassNames<TextAreaSlots> = {
  root: 'fui-TextArea',
  textArea: 'fui-TextArea__textArea',
};

// TODO(sharing) use theme values once available
const spacingTokens = {
  horizontal: {
    sNudge: '6px',
    mNudge: '10px',
    xss: '2px',
    m: '12px',
  },
};
const contentSizeTokens = {
  body1: {
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase300,
  },
  caption1: {
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
  },
  base400: {
    fontSize: tokens.fontSizeBase400,
    lineHeight: tokens.lineHeightBase400,
  },
};
const textAreaHeight = {
  small: '24px',
  medium: '32px',
  large: '40px',
};

/**
 * Styles for the root(wrapper) slot
 */
const useRootStyles = makeStyles({
  base: {
    display: 'inline-flex',
    boxSizing: 'border-box',
    position: 'relative',
    // Padding needed so the focus indicator does not overlap the resize handle, this should match focus indicator size.
    ...shorthands.padding('0', '0', tokens.strokeWidthThick, '0'),
    ...shorthands.margin('0'),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
  },

  disabled: {
    backgroundColor: tokens.colorTransparentBackground,
    ...shorthands.border(tokens.strokeWidthThin, 'solid', tokens.colorNeutralStrokeDisabled),
    [`& > textarea`]: {
      cursor: 'not-allowed',
      '::placeholder': {
        color: tokens.colorNeutralForegroundDisabled,
      },
    },
  },

  interactive: getBottomFocusIndicator({
    borderWidth: tokens.strokeWidthThick,
    borderRadius: tokens.borderRadiusMedium,
    borderColor: tokens.colorCompoundBrandStroke,
    pressedBorderColor: tokens.colorCompoundBrandStrokePressed,
    targetChild: 'textarea',
  }),

  filledDarker: {
    backgroundColor: tokens.colorNeutralBackground3,
    ...shorthands.border(tokens.strokeWidthThin, 'solid', tokens.colorTransparentStrokeInteractive),
  },

  filledLighter: {
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.border(tokens.strokeWidthThin, 'solid', tokens.colorTransparentStrokeInteractive),
  },

  outline: {
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.border(tokens.strokeWidthThin, 'solid', tokens.colorNeutralStroke1),
    borderBottomColor: tokens.colorNeutralStrokeAccessible,
  },
  outlineInteractive: {
    ':hover': {
      ...shorthands.border(tokens.strokeWidthThin, 'solid', tokens.colorNeutralStroke1Hover),
      borderBottomColor: tokens.colorNeutralStrokeAccessibleHover,
    },

    ':active': {
      ...shorthands.border(tokens.strokeWidthThin, 'solid', tokens.colorNeutralStroke1Pressed),
      borderBottomColor: tokens.colorNeutralStrokeAccessiblePressed,
    },

    ':focus-within': {
      ...shorthands.border(tokens.strokeWidthThin, 'solid', tokens.colorNeutralStroke1),
      borderBottomColor: tokens.colorCompoundBrandStroke,
    },
  },
});

/**
 * Styles for the textArea slot
 */
const useTextAreaStyles = makeStyles({
  base: {
    ...shorthands.borderStyle('none'),
    ...shorthands.margin('0'),
    backgroundColor: 'transparent',
    color: tokens.colorNeutralForeground1,

    '::placeholder': {
      color: tokens.colorNeutralForeground4,
      opacity: 1,
    },

    '::selection': {
      color: tokens.colorNeutralForegroundInverted,
      backgroundColor: tokens.colorNeutralBackgroundInverted,
    },
  },

  none: {
    resize: 'none',
  },
  both: {
    resize: 'both',
  },
  horizontal: {
    resize: 'horizontal',
  },
  vertical: {
    resize: 'vertical',
  },

  // The padding style adds both content and regular padding (from design spec), this is because the handle is not
  // affected by changing the padding of the root.
  small: {
    height: textAreaHeight.small,
    ...shorthands.padding(
      '0',
      `calc(${spacingTokens.horizontal.mNudge} + ${spacingTokens.horizontal.xss})`,
      '0',
      `calc(${spacingTokens.horizontal.sNudge} + ${spacingTokens.horizontal.xss})`,
    ),
    ...contentSizeTokens.caption1,
  },
  medium: {
    height: textAreaHeight.medium,
    ...shorthands.padding('0', `calc(${spacingTokens.horizontal.mNudge} + ${spacingTokens.horizontal.xss})`),
    ...contentSizeTokens.body1,
  },
  large: {
    height: textAreaHeight.large,
    ...shorthands.padding('0', `calc(${spacingTokens.horizontal.m} + ${spacingTokens.horizontal.xss})`),
    ...contentSizeTokens.base400,
  },
});

/**
 * Apply styling to the TextArea slots based on the state
 */
export const useTextAreaStyles_unstable = (state: TextAreaState): TextAreaState => {
  const disabled = state.textArea.disabled;
  const { size, appearance, resize } = state;

  const rootStyles = useRootStyles();
  state.root.className = mergeClasses(
    textAreaClassNames.root,
    rootStyles.base,
    rootStyles[appearance],
    disabled && rootStyles.disabled,
    !disabled && rootStyles.interactive,
    !disabled && appearance === 'outline' && rootStyles.outlineInteractive,
    state.root.className,
  );

  const textAreaStyles = useTextAreaStyles();
  state.textArea.className = mergeClasses(
    textAreaClassNames.textArea,
    textAreaStyles.base,
    textAreaStyles[size],
    textAreaStyles[resize],
    state.textArea.className,
  );

  return state;
};
