import { shorthands, makeStyles, mergeClasses } from '@griffel/react';
import { createCustomFocusIndicatorStyle } from '@fluentui/react-tabster';
import { tokens } from '@fluentui/react-theme';
import * as semanticTokens from '@fluentui/semantic-tokens';
import { linkClassNames, type LinkState } from '@fluentui/react-link';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';

const useStyles = makeStyles({
  focusIndicator: createCustomFocusIndicatorStyle({
    textDecorationColor: semanticTokens.ctrlFocusInnerStroke,
    textDecorationLine: 'underline',
    textDecorationStyle: 'double',
    outlineStyle: 'none',
  }),
  // Common styles.
  root: {
    ':focus-visible': {
      outlineStyle: 'none',
    },
    backgroundColor: 'transparent',
    boxSizing: 'border-box',
    color: semanticTokens.ctrlLinkForegroundBrandRest,
    cursor: 'pointer',
    display: 'inline',
    fontFamily: semanticTokens.textStyleDefaultRegularFontFamily,
    fontSize: semanticTokens.textGlobalBody3FontSize,
    fontWeight: semanticTokens.textStyleDefaultRegularWeight,
    margin: '0',
    padding: '0',
    overflow: 'inherit',
    textAlign: 'left',
    textDecorationLine: 'none',
    textDecorationThickness: semanticTokens.strokeWidthDefault,
    textOverflow: 'inherit',
    userSelect: 'text',

    ':hover': {
      textDecorationLine: 'underline',
      color: semanticTokens.ctrlLinkForegroundBrandHover,
    },

    ':active': {
      textDecorationLine: 'underline',
      color: semanticTokens.ctrlLinkForegroundBrandPressed,
    },
  },
  // Overrides when the Link renders as a button.
  button: {
    ...shorthands.borderStyle('none'),
  },
  // Overrides when an href is present so the Link renders as an anchor.
  href: {
    fontSize: 'inherit',
  },
  // Overrides when the Link appears subtle.
  subtle: {
    color: semanticTokens.ctrlLinkForegroundNeutralRest,

    ':hover': {
      textDecorationLine: 'underline',
      color: semanticTokens.ctrlLinkForegroundNeutralHover,
    },

    ':active': {
      textDecorationLine: 'underline',
      color: semanticTokens.ctrlLinkForegroundNeutralPressed,
    },
  },
  // Overrides when the Link is rendered inline within text.
  inline: {
    textDecorationLine: 'underline',
  },
  // Overrides when the Link is disabled.
  disabled: {
    textDecorationLine: 'none',
    color: semanticTokens.foregroundCtrlNeutralPrimaryDisabled,
    cursor: 'not-allowed',

    ':hover': {
      textDecorationLine: 'none',
      color: semanticTokens.foregroundCtrlNeutralPrimaryDisabled,
    },

    ':active': {
      textDecorationLine: 'none',
      color: semanticTokens.foregroundCtrlNeutralPrimaryDisabled,
    },
  },

  // Semantic-tokens does not include inverted tokens, use existing tokens for now.
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
    linkClassNames.root,
    styles.root,
    styles.focusIndicator,
    root.as === 'a' && root.href && styles.href,
    root.as === 'button' && styles.button,
    appearance === 'subtle' && styles.subtle,
    backgroundAppearance === 'inverted' && styles.inverted,
    inline && styles.inline,
    disabled && styles.disabled,
    state.root.className,
    getSlotClassNameProp_unstable(state.root),
  );

  return state;
};
