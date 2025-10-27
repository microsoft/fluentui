'use client';

import { shorthands, makeStyles, mergeClasses } from '@griffel/react';
import { createCustomFocusIndicatorStyle } from '@fluentui/react-tabster';
import { tokens } from '@fluentui/react-theme';
import * as semanticTokens from '@fluentui/semantic-tokens';
import { linkClassNames, type LinkState } from '@fluentui/react-link';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';

const useStyles = makeStyles({
  focusIndicator: createCustomFocusIndicatorStyle({
    textDecorationColor: semanticTokens.groupFocusInnerStroke,
    textDecorationLine: 'underline',
    textDecorationStyle: 'double',
    outlineStyle: 'none',
  }),
  // Common styles.
  root: {
    ':focus-visible': {
      outlineStyle: 'none',
    },
    textDecoration: semanticTokens.groupLinkTextUnderlineStyle,
    backgroundColor: 'transparent',
    boxSizing: 'border-box',
    color: semanticTokens.groupLinkBrandTextForeground,
    cursor: 'pointer',
    display: 'inline',
    fontFamily: semanticTokens.groupLinkTextFontfamily,
    fontSize: semanticTokens.groupLinkMediumTextFontsize,
    lineHeight: semanticTokens.groupLinkMediumTextLineheight,
    fontWeight: semanticTokens.groupLinkMediumTextFontweight,
    margin: '0',
    padding: '0',
    overflow: 'inherit',
    textAlign: 'left',
    textDecorationLine: semanticTokens.groupLinkOnpageTextDecorationline,
    textDecorationThickness: semanticTokens.groupLinkTextUnderlineStrokewidth,
    textOverflow: 'inherit',
    userSelect: 'text',

    ':hover': {
      textDecorationLine: semanticTokens.groupLinkOnpageTextDecorationlineHover,
      color: semanticTokens.groupLinkBrandTextForegroundHover,
    },

    ':active': {
      textDecorationLine: semanticTokens.groupLinkOnpageTextDecorationlinePressed,
      color: semanticTokens.groupLinkBrandTextForegroundPressed,
    },
  },
  // Overrides when the Link renders as a button.
  button: {
    ...shorthands.borderStyle('none'),
  },
  // Overrides when an href is present so the Link renders as an anchor.
  href: {
    fontSize: 'inherit',
    lineHeight: 'inherit',
  },
  // Overrides when the Link appears subtle.
  subtle: {
    color: semanticTokens.groupLinkNeutralTextForeground,

    ':hover': {
      color: semanticTokens.groupLinkNeutralTextForegroundHover,
    },

    ':active': {
      color: semanticTokens.groupLinkNeutralTextForegroundPressed,
    },
  },
  // Overrides when the Link is rendered inline within text.
  inline: {
    textDecorationLine: 'underline',
    ':hover': {
      textDecorationLine: 'underline',
    },
    ':active': {
      textDecorationLine: 'underline',
    },
  },
  // Overrides when the Link is disabled.
  disabled: {
    textDecorationLine: 'none',
    color: semanticTokens.groupLinkBrandTextForegroundDisabled,
    cursor: 'not-allowed',

    ':hover': {
      textDecorationLine: 'none',
      color: semanticTokens.groupLinkBrandTextForegroundDisabled,
    },

    ':active': {
      textDecorationLine: 'none',
      color: semanticTokens.groupLinkBrandTextForegroundDisabled,
    },
  },
  // Overrides when the Link is disabled.
  disabledSubtle: {
    textDecorationLine: 'none',
    color: semanticTokens.groupLinkNeutralTextForegroundDisabled,
    cursor: 'not-allowed',

    ':hover': {
      textDecorationLine: 'none',
      color: semanticTokens.groupLinkNeutralTextForegroundDisabled,
    },

    ':active': {
      textDecorationLine: 'none',
      color: semanticTokens.groupLinkNeutralTextForegroundDisabled,
    },
  },

  // Semantic-tokens does not include inverted tokens, use legacy/inverted themes
  inverted: {
    color: tokens.colorBrandForegroundInverted,
    ':hover': {
      color: tokens.colorBrandForegroundInvertedHover,
    },
    ':active': {
      color: tokens.colorBrandForegroundInvertedPressed,
    },
  },
});

export const useSemanticLinkStyles = (_state: unknown): LinkState => {
  'use no memo';

  const state = _state as LinkState;

  const styles = useStyles();
  const { appearance, disabled, inline, root, backgroundAppearance } = state;

  state.root.className = mergeClasses(
    state.root.className,
    linkClassNames.root,
    styles.root,
    styles.focusIndicator,
    root.as === 'a' && root.href && styles.href,
    root.as === 'button' && styles.button,
    appearance === 'subtle' && styles.subtle,
    backgroundAppearance === 'inverted' && styles.inverted,
    inline && styles.inline,
    disabled && styles.disabled,
    appearance === 'subtle' && disabled && styles.disabledSubtle,
    getSlotClassNameProp_unstable(state.root),
  );

  return state;
};
