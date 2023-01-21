import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { TreeItemSlots, TreeItemState } from './TreeItem.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { tokens } from '@fluentui/react-theme';
import { createFocusOutlineStyle } from '@fluentui/react-tabster';
import { useTreeContext_unstable } from '../../contexts/index';
import * as React from 'react';
import { levelToken } from '../../utils/tokens';

export const treeItemClassNames: SlotClassNames<TreeItemSlots> = {
  root: 'fui-TreeItem',
  content: 'fui-TreeItem__content',
  subtree: 'fui-TreeItem__subtree',
  expandIcon: 'fui-TreeItem__expandIcon',
  actions: 'fui-TreeItem__actions',
};

/**
 * Styles for the content slot
 */
const useContentStyles = makeStyles({
  base: {
    position: 'relative',
    alignItems: 'center',
    backgroundColor: tokens.colorSubtleBackground,
    cursor: 'pointer',
    color: tokens.colorNeutralForeground2,
    display: 'flex',
    minHeight: '32px',
    paddingRight: tokens.spacingHorizontalNone,
    paddingLeft: `calc(${levelToken.value} * ${tokens.spacingHorizontalXXL})`,
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    ':active': {
      color: tokens.colorNeutralForeground2Pressed,
      backgroundColor: tokens.colorSubtleBackgroundPressed,
      // TODO: stop using treeItemClassNames.expandIcon for styling
      [`& .${treeItemClassNames.expandIcon}`]: {
        color: tokens.colorNeutralForeground3Pressed,
      },
    },
    ':hover': {
      color: tokens.colorNeutralForeground2Hover,
      backgroundColor: tokens.colorSubtleBackgroundHover,
      // TODO: stop using treeItemClassNames.expandIcon  for styling
      [`& .${treeItemClassNames.expandIcon}`]: {
        color: tokens.colorNeutralForeground3Hover,
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
  leaf: {
    paddingLeft: `calc((${levelToken.value} * ${tokens.spacingHorizontalXXL}) + ${tokens.spacingHorizontalXXL})`,
  },
});

/**
 * Styles for the expand icon slot
 */
const useExpandIconStyles = makeStyles({
  base: {
    display: 'flex',
    alignItems: 'center',
    minWidth: '24px',
    boxSizing: 'border-box',
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
 * Styles for the action icon slot
 */
const useActionsStyles = makeStyles({
  base: {
    display: 'flex',
    opacity: '0',
    position: 'absolute',
    right: 0,
    top: 0,
    marginLeft: 'auto',
    ...shorthands.padding(0, tokens.spacingHorizontalXS),
  },
  open: {
    opacity: '1',
    position: 'relative',
  },
});

export const expandIconInlineStyles = {
  90: { transform: `rotate(90deg)` },
  0: { transform: `rotate(0deg)` },
  180: { transform: `rotate(180deg)` },
} as const;

/**
 * Apply styling to the TreeItem slots based on the state
 */
export const useTreeItemStyles_unstable = (state: TreeItemState): TreeItemState => {
  const contentStyles = useContentStyles();
  const expandIconStyles = useExpandIconStyles();
  const actionsStyles = useActionsStyles();

  const level = useTreeContext_unstable(ctx => ctx.level) - 1;
  const size = useTreeContext_unstable(ctx => ctx.size);
  const appearance = useTreeContext_unstable(ctx => ctx.appearance);

  const { actions, subtree, expandIcon, isActionsVisible: showActions } = state;

  state.root.className = mergeClasses(treeItemClassNames.root, state.root.className);

  state.content.className = mergeClasses(
    treeItemClassNames.content,
    contentStyles.base,
    contentStyles[appearance],
    contentStyles.focusIndicator,
    state.isLeaf && contentStyles.leaf,
    state.content.className,
  );

  state.root.style = {
    ...state.root.style,
    [levelToken.name]: level,
  } as React.CSSProperties;

  if (expandIcon) {
    expandIcon.className = mergeClasses(
      treeItemClassNames.expandIcon,
      expandIconStyles.base,
      expandIconStyles[size],
      expandIcon.className,
    );
  }
  if (actions) {
    actions.className = mergeClasses(
      treeItemClassNames.actions,
      actionsStyles.base,
      showActions && actionsStyles.open,
      actions.className,
    );
  }
  if (subtree) {
    subtree.className = mergeClasses(treeItemClassNames.subtree, subtree.className);
  }

  return state;
};
