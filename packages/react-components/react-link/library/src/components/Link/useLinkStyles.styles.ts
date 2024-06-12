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
    textDecorationColor: `var(--1265, var(--1266, ${tokens.colorStrokeFocus2}))`,
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
    color: `var(--1267, var(--1268, ${tokens.colorBrandForegroundLink}))`,
    cursor: 'pointer',
    display: 'inline',
    fontFamily: `var(--1269, var(--1270, ${tokens.fontFamilyBase}))`,
    fontSize: `var(--1271, var(--1272, ${tokens.fontSizeBase300}))`,
    fontWeight: `var(--1273, var(--1274, ${tokens.fontWeightRegular}))`,
    margin: '0',
    padding: '0',
    overflow: 'inherit',
    textAlign: 'left',
    textDecorationLine: 'none',
    textDecorationThickness: `var(--1275, var(--1276, ${tokens.strokeWidthThin}))`,
    textOverflow: 'inherit',
    userSelect: 'text',

    ':hover': {
      textDecorationLine: 'underline',
      color: `var(--1277, var(--1278, ${tokens.colorBrandForegroundLinkHover}))`,
    },

    ':active': {
      textDecorationLine: 'underline',
      color: `var(--1279, var(--1280, ${tokens.colorBrandForegroundLinkPressed}))`,
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
    color: `var(--1281, var(--1282, ${tokens.colorNeutralForeground2}))`,

    ':hover': {
      textDecorationLine: 'underline',
      color: `var(--1283, var(--1284, ${tokens.colorNeutralForeground2Hover}))`,
    },

    ':active': {
      textDecorationLine: 'underline',
      color: `var(--1285, var(--1286, ${tokens.colorNeutralForeground2Pressed}))`,
    },
  },
  // Overrides when the Link is rendered inline within text.
  inline: {
    textDecorationLine: 'underline',
  },
  // Overrides when the Link is disabled.
  disabled: {
    textDecorationLine: 'none',
    color: `var(--1287, var(--1288, ${tokens.colorNeutralForegroundDisabled}))`,
    cursor: 'not-allowed',

    ':hover': {
      textDecorationLine: 'none',
      color: `var(--1289, var(--1290, ${tokens.colorNeutralForegroundDisabled}))`,
    },

    ':active': {
      textDecorationLine: 'none',
      color: `var(--1291, var(--1292, ${tokens.colorNeutralForegroundDisabled}))`,
    },
  },

  inverted: {
    color: `var(--1293, var(--1294, ${tokens.colorBrandForegroundInverted}))`,
    ':hover': {
      color: `var(--1295, var(--1296, ${tokens.colorBrandForegroundInvertedHover}))`,
    },
    ':active': {
      color: `var(--1297, var(--1298, ${tokens.colorBrandForegroundInvertedPressed}))`,
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
