import { shorthands, makeStyles, mergeClasses } from '@griffel/react';
import { createCustomFocusIndicatorStyle } from '@fluentui/react-tabster';
import { tokens } from '@fluentui/react-theme';
import type { LinkSlots, LinkState } from './Link.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

import {
  ctrlFocusOuterStroke,
  ctrlLinkForegroundBrandHover,
  ctrlLinkForegroundBrandPressed,
  ctrlLinkForegroundNeutralRest,
  ctrlLinkForegroundNeutralHover,
  ctrlLinkForegroundNeutralPressed,
  foregroundCtrlNeutralPrimaryDisabled,
  textGlobalBody3Fontsize,
  textStyleDefaultRegularFontfamily,
  textStyleDefaultRegularWeight,
  strokewidthDefault,
  ctrlLinkForegroundBrandRest,
} from '@fluentui/semantic-tokens';

export const linkClassNames: SlotClassNames<LinkSlots> = {
  root: 'fui-Link',
};

const useStyles = makeStyles({
  focusIndicator: createCustomFocusIndicatorStyle({
    textDecorationColor: ctrlFocusOuterStroke,
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
    color: ctrlLinkForegroundBrandRest,
    cursor: 'pointer',
    display: 'inline',
    fontFamily: textStyleDefaultRegularFontfamily,
    fontSize: textGlobalBody3Fontsize,
    fontWeight: textStyleDefaultRegularWeight,
    margin: '0',
    padding: '0',
    overflow: 'inherit',
    textAlign: 'left',
    textDecorationLine: 'none',
    textDecorationThickness: strokewidthDefault,
    textOverflow: 'inherit',
    userSelect: 'text',

    ':hover': {
      textDecorationLine: 'underline',
      color: ctrlLinkForegroundBrandHover,
    },

    ':active': {
      textDecorationLine: 'underline',
      color: ctrlLinkForegroundBrandPressed,
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
    color: ctrlLinkForegroundNeutralRest,

    ':hover': {
      textDecorationLine: 'underline',
      color: ctrlLinkForegroundNeutralHover,
    },

    ':active': {
      textDecorationLine: 'underline',
      color: ctrlLinkForegroundNeutralPressed,
    },
  },
  // Overrides when the Link is rendered inline within text.
  inline: {
    textDecorationLine: 'underline',
  },
  // Overrides when the Link is disabled.
  disabled: {
    textDecorationLine: 'none',
    color: foregroundCtrlNeutralPrimaryDisabled,
    cursor: 'not-allowed',

    ':hover': {
      textDecorationLine: 'none',
      color: foregroundCtrlNeutralPrimaryDisabled,
    },

    ':active': {
      textDecorationLine: 'none',
      color: foregroundCtrlNeutralPrimaryDisabled,
    },
  },

  // TODO: Add semantic tokens for inverted colors (not yet defined).
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

export const useLinkStyles_unstable = (state: LinkState): LinkState => {
  'use no memo';

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
  );

  return state;
};
