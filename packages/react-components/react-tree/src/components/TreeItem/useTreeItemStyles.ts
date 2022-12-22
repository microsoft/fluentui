import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { TreeItemSlots, TreeItemState } from './TreeItem.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { tokens, typographyStyles } from '@fluentui/react-theme';
import { createFocusOutlineStyle } from '@fluentui/react-tabster';
import { useTreeContext_unstable } from '../../contexts/index';
import * as React from 'react';

export const treeItemClassNames: SlotClassNames<TreeItemSlots> = {
  root: 'fui-TreeItem',
  expandIcon: 'fui-TreeItem__expandIcon',
  iconBefore: 'fui-TreeItem__iconBefore',
  iconAfter: 'fui-TreeItem__iconAfter',
  actions: 'fui-TreeItem__actions',
  badges: 'fui-TreeItem__badges',
};

const treeItemTokens = {
  level: '--fluent-TreeItem--level',
} as const;
const treeItemTokenValues = {
  level: `var(${treeItemTokens.level}, 0)`,
} as const;

/**
 * Styles for the root slot
 */
const useRootStyles = makeStyles({
  base: {
    position: 'relative',
    alignItems: 'center',
    backgroundColor: tokens.colorSubtleBackground,
    cursor: 'pointer',
    color: tokens.colorNeutralForeground2,
    display: 'flex',
    paddingRight: tokens.spacingHorizontalNone,
    paddingLeft: `calc(${treeItemTokenValues.level} * ${tokens.spacingHorizontalXXL})`,
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    ':active': {
      color: tokens.colorNeutralForeground2Pressed,
      backgroundColor: tokens.colorSubtleBackgroundPressed,
      [`& .${treeItemClassNames.expandIcon}`]: {
        color: tokens.colorNeutralForeground3Pressed,
      },
    },
    ':focus': {
      [`& .${treeItemClassNames.actions}`]: {
        display: 'flex',
        opacity: '1',
        position: 'relative',
        width: 'unset',
        height: 'unset',
        right: 'unset',
      },
    },
    ':hover': {
      color: tokens.colorNeutralForeground2Hover,
      backgroundColor: tokens.colorSubtleBackgroundHover,
      [`& .${treeItemClassNames.actions}`]: {
        display: 'flex',
        opacity: '1',
        position: 'relative',
        width: 'unset',
        height: 'unset',
        right: 'unset',
      },
      [`& .${treeItemClassNames.expandIcon}`]: {
        color: tokens.colorNeutralForeground3Hover,
      },
    },
  },
  actionsAndBadges: {
    ':focus': {
      [`& .${treeItemClassNames.badges}`]: {
        display: 'none',
      },
    },
    ':hover': {
      [`& .${treeItemClassNames.badges}`]: {
        display: 'none',
      },
    },
  },
  focusIndicator: createFocusOutlineStyle(),
  // Appearance variations
  subtle: {},
  'subtle-alpha': {
    ':hover': {
      backgroundColor: tokens.colorSubtleBackgroundLightAlphaHover,
    },
    ':active': {
      backgroundColor: tokens.colorSubtleBackgroundLightAlphaPressed,
    },
  },
  transparent: {
    backgroundColor: tokens.colorTransparentBackground,
    ':hover': {
      backgroundColor: tokens.colorTransparentBackgroundHover,
    },
    ':active': {
      backgroundColor: tokens.colorTransparentBackgroundPressed,
    },
  },

  // Size variations
  medium: {
    minHeight: '32px',
    ...typographyStyles.body1,
  },
  small: {
    minHeight: '24px',
    ...typographyStyles.caption1,
  },
  leaf: {
    // FIXME: for some reason prettier is not wrapping this after 120 characters
    // eslint-disable-next-line @fluentui/max-len
    paddingLeft: `calc((${treeItemTokenValues.level} * ${tokens.spacingHorizontalXXL}) + ${tokens.spacingHorizontalXXL})`,
  },
});

/**
 * Styles for the expand icon slot
 */
const useExpandIconStyles = makeStyles({
  base: {
    display: 'flex',
    alignItems: 'center',
    paddingRight: tokens.spacingHorizontalXS,
    color: tokens.colorNeutralForeground3,
  },
  medium: {
    paddingLeft: tokens.spacingHorizontalS,
  },
  small: {
    paddingLeft: tokens.spacingHorizontalSNudge,
  },
});

/**
 * Styles for the before/after icon slot
 */
const useIconStyles = makeStyles({
  base: {
    display: 'flex',
    alignItems: 'center',
    color: tokens.colorNeutralForeground2,
    lineHeight: tokens.lineHeightBase500,
    fontSize: tokens.fontSizeBase500,
  },
});

const useIconBefore = makeStyles({
  medium: {
    paddingRight: tokens.spacingHorizontalSNudge,
  },
  small: {
    paddingRight: tokens.spacingHorizontalXS,
  },
});

const useIconAfter = makeStyles({
  medium: {
    paddingLeft: tokens.spacingHorizontalSNudge,
  },
  small: {
    paddingLeft: tokens.spacingHorizontalXS,
  },
});

/**
 * Styles for the action icon slot
 */
const useBadgesStyles = makeStyles({
  base: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 'auto',
    ...shorthands.padding(0, tokens.spacingHorizontalXS),
    ...shorthands.gap(tokens.spacingHorizontalXS),
  },
});
/**
 * Styles for the action icon slot
 */
const useActionsStyles = makeStyles({
  base: {
    opacity: '0',
    position: 'absolute',
    width: 0,
    height: 0,
    right: 0,
    marginLeft: 'auto',
    ...shorthands.padding(0, tokens.spacingHorizontalXS),
  },
});

/**
 * Apply styling to the TreeItem slots based on the state
 */
export const useTreeItemStyles_unstable = (state: TreeItemState): TreeItemState => {
  const rootStyles = useRootStyles();
  const expandIconStyles = useExpandIconStyles();
  const iconStyles = useIconStyles();
  const iconBeforeStyles = useIconBefore();
  const iconAfterStyles = useIconAfter();
  const actionsStyles = useActionsStyles();
  const badgesStyles = useBadgesStyles();

  const level = useTreeContext_unstable(ctx => ctx.level) - 1;
  const size = useTreeContext_unstable(ctx => ctx.size);
  const appearance = useTreeContext_unstable(ctx => ctx.appearance);

  const { iconAfter, actions, iconBefore, expandIcon, badges } = state;

  state.root.className = mergeClasses(
    treeItemClassNames.root,
    rootStyles.base,
    rootStyles[appearance],
    rootStyles.focusIndicator,
    rootStyles[size],
    actions && badges && rootStyles.actionsAndBadges,
    state.isLeaf && rootStyles.leaf,
    state.root.className,
  );

  state.root.style = {
    ...state.root.style,
    [treeItemTokens.level]: level,
  } as React.CSSProperties;

  if (expandIcon) {
    expandIcon.className = mergeClasses(
      treeItemClassNames.expandIcon,
      expandIconStyles.base,
      expandIconStyles[size],
      expandIcon.className,
    );
  }

  if (iconBefore) {
    iconBefore.className = mergeClasses(
      treeItemClassNames.iconBefore,
      iconStyles.base,
      iconBeforeStyles[size],
      iconBefore.className,
    );
  }

  if (iconAfter) {
    iconAfter.className = mergeClasses(
      treeItemClassNames.iconAfter,
      iconStyles.base,
      iconAfterStyles[size],
      iconAfter.className,
    );
  }

  if (actions) {
    actions.className = mergeClasses(treeItemClassNames.actions, actionsStyles.base, actions.className);
  }
  if (badges) {
    badges.className = mergeClasses(treeItemClassNames.badges, badgesStyles.base, badges.className);
  }

  return state;
};
