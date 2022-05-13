import { shorthands, makeStyles, mergeClasses } from '@griffel/react';
import { createCustomFocusIndicatorStyle } from '@fluentui/react-tabster';
import { tokens } from '@fluentui/react-theme';
import type { LinkSlots, LinkState } from './Link.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

/**
 * @deprecated Use `linkClassNames.root` instead.
 */
export const linkClassName = 'fui-Link';
export const linkClassNames: SlotClassNames<LinkSlots> = {
  root: 'fui-Link',
};

const useStyles = makeStyles({
  focusIndicator: createCustomFocusIndicatorStyle({
    borderBottomColor: 'transparent',
    textDecorationColor: tokens.colorStrokeFocus2,
    textDecorationLine: 'underline',
    textDecorationStyle: 'double',
  }),
  // Common styles.
  root: {
    backgroundColor: 'transparent',
    borderTopStyle: 'none',
    borderLeftStyle: 'none',
    borderRightStyle: 'none',
    borderBottomColor: 'transparent',
    borderBottomStyle: 'solid',
    borderBottomWidth: tokens.strokeWidthThin,
    boxSizing: 'border-box',
    color: tokens.colorBrandForegroundLink,
    cursor: 'pointer',
    display: 'inline',
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightRegular,
    ...shorthands.margin(0),
    ...shorthands.padding(0),
    ...shorthands.overflow('inherit'),
    textAlign: 'left',
    textDecorationLine: 'none',
    textOverflow: 'inherit',
    userSelect: 'text',

    ':hover': {
      borderBottomColor: tokens.colorBrandForegroundLinkHover,
      color: tokens.colorBrandForegroundLinkHover,
    },

    ':active': {
      borderBottomColor: tokens.colorBrandForegroundLinkPressed,
      color: tokens.colorBrandForegroundLinkPressed,
    },
  },
  // Overrides when an href is present so the Link renders as an anchor.
  href: {
    fontSize: 'inherit',
  },
  // Overrides when the Link appears subtle.
  subtle: {
    color: tokens.colorNeutralForeground2,

    ':hover': {
      borderBottomColor: tokens.colorNeutralForeground2Hover,
      color: tokens.colorNeutralForeground2Hover,
    },

    ':active': {
      borderBottomColor: tokens.colorNeutralForeground2Pressed,
      color: tokens.colorNeutralForeground2Pressed,
    },
  },
  // Overrides when the Link is rendered inline within text.
  inline: {
    borderBottomColor: tokens.colorBrandForegroundLink,
  },
  // Overrides when the Link is rendered inline within text and appears subtle.
  inlineSubtle: {
    borderBottomColor: tokens.colorNeutralForeground2,
  },
  // Overrides when the Link is disabled.
  disabled: {
    borderBottomColor: 'transparent',
    color: tokens.colorNeutralForegroundDisabled,
    cursor: 'not-allowed',

    ':hover': {
      borderBottomColor: 'transparent',
      color: tokens.colorNeutralForegroundDisabled,
    },

    ':active': {
      borderBottomColor: 'transparent',
      color: tokens.colorNeutralForegroundDisabled,
    },
  },
});

export const useLinkStyles_unstable = (state: LinkState): LinkState => {
  const styles = useStyles();
  const { appearance, disabled, inline, root } = state;

  state.root.className = mergeClasses(
    linkClassNames.root,
    styles.root,
    styles.focusIndicator,
    root.as === 'a' && root.href && styles.href,
    appearance === 'subtle' && styles.subtle,
    inline && styles.inline,
    appearance === 'subtle' && inline && styles.inlineSubtle,
    disabled && styles.disabled,
    state.root.className,
  );

  return state;
};
