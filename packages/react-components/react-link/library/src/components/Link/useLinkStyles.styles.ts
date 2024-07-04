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
    textDecorationColor: `var(--ctrl-token-Link-1265, var(--semantic-token-Link-1266, ${tokens.colorStrokeFocus2}))`,
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
    color: `var(--ctrl-token-Link-1267, var(--semantic-token-Link-1268, ${tokens.colorBrandForegroundLink}))`,
    cursor: 'pointer',
    display: 'inline',
    fontFamily: `var(--ctrl-token-Link-1269, var(--semantic-token-Link-1270, ${tokens.fontFamilyBase}))`,
    fontSize: `var(--ctrl-token-Link-1271, var(--semantic-token-Link-1272, ${tokens.fontSizeBase300}))`,
    fontWeight: `var(--ctrl-token-Link-1273, var(--semantic-token-Link-1274, ${tokens.fontWeightRegular}))`,
    margin: '0',
    padding: '0',
    overflow: 'inherit',
    textAlign: 'left',
    textDecorationLine: 'none',
    textDecorationThickness: `var(--ctrl-token-Link-1275, var(--semantic-token-Link-1276, ${tokens.strokeWidthThin}))`,
    textOverflow: 'inherit',
    userSelect: 'text',

    ':hover': {
      textDecorationLine: 'underline',
      color: `var(--ctrl-token-Link-1277, var(--semantic-token-Link-1278, ${tokens.colorBrandForegroundLinkHover}))`,
    },

    ':active': {
      textDecorationLine: 'underline',
      color: `var(--ctrl-token-Link-1279, var(--semantic-token-Link-1280, ${tokens.colorBrandForegroundLinkPressed}))`,
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
    color: `var(--ctrl-token-Link-1281, var(--semantic-token-Link-1282, ${tokens.colorNeutralForeground2}))`,

    ':hover': {
      textDecorationLine: 'underline',
      color: `var(--ctrl-token-Link-1283, var(--semantic-token-Link-1284, ${tokens.colorNeutralForeground2Hover}))`,
    },

    ':active': {
      textDecorationLine: 'underline',
      color: `var(--ctrl-token-Link-1285, var(--semantic-token-Link-1286, ${tokens.colorNeutralForeground2Pressed}))`,
    },
  },
  // Overrides when the Link is rendered inline within text.
  inline: {
    textDecorationLine: 'underline',
  },
  // Overrides when the Link is disabled.
  disabled: {
    textDecorationLine: 'none',
    color: `var(--ctrl-token-Link-1287, var(--semantic-token-Link-1288, ${tokens.colorNeutralForegroundDisabled}))`,
    cursor: 'not-allowed',

    ':hover': {
      textDecorationLine: 'none',
      color: `var(--ctrl-token-Link-1289, var(--semantic-token-Link-1290, ${tokens.colorNeutralForegroundDisabled}))`,
    },

    ':active': {
      textDecorationLine: 'none',
      color: `var(--ctrl-token-Link-1291, var(--semantic-token-Link-1292, ${tokens.colorNeutralForegroundDisabled}))`,
    },
  },

  inverted: {
    color: `var(--ctrl-token-Link-1293, var(--semantic-token-Link-1294, ${tokens.colorBrandForegroundInverted}))`,
    ':hover': {
      color: `var(--ctrl-token-Link-1295, var(--semantic-token-Link-1296, ${tokens.colorBrandForegroundInvertedHover}))`,
    },
    ':active': {
      color: `var(--ctrl-token-Link-1297, var(--semantic-token-Link-1298, ${tokens.colorBrandForegroundInvertedPressed}))`,
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
