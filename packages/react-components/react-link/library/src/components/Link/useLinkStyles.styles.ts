import { shorthands, makeStyles, mergeClasses } from '@griffel/react';
import { createCustomFocusIndicatorStyle } from '@fluentui/react-tabster';
import { tokens } from '@fluentui/react-theme';
import type { LinkSlots, LinkState } from './Link.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const linkClassNames: SlotClassNames<LinkSlots> = {
  root: 'fui-Link',
};

const useStyles = makeStyles({
  focusIndicator: createCustomFocusIndicatorStyle({
    textDecorationColor: tokens.colorStrokeFocus2,
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
    color: tokens.colorBrandForegroundLink,
    cursor: 'pointer',
    display: 'inline',
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightRegular,
    margin: '0',
    padding: '0',
    overflow: 'inherit',
    textAlign: 'left',
    textDecorationLine: 'none',
    textDecorationThickness: tokens.strokeWidthThin,
    textOverflow: 'inherit',
    userSelect: 'text',

    ':hover': {
      textDecorationLine: 'underline',
      color: tokens.colorBrandForegroundLinkHover,
    },

    ':active': {
      textDecorationLine: 'underline',
      color: tokens.colorBrandForegroundLinkPressed,
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
    color: tokens.colorNeutralForeground2,

    ':hover': {
      textDecorationLine: 'underline',
      color: tokens.colorNeutralForeground2Hover,
    },

    ':active': {
      textDecorationLine: 'underline',
      color: tokens.colorNeutralForeground2Pressed,
    },
  },
  // Overrides when the Link is rendered inline within text.
  inline: {
    textDecorationLine: 'underline',
  },
  // Overrides when the Link is disabled.
  disabled: {
    textDecorationLine: 'none',
    color: tokens.colorNeutralForegroundDisabled,
    cursor: 'not-allowed',

    ':hover': {
      textDecorationLine: 'none',
      color: tokens.colorNeutralForegroundDisabled,
    },

    ':active': {
      textDecorationLine: 'none',
      color: tokens.colorNeutralForegroundDisabled,
    },
  },

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
