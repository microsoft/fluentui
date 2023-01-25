import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { TreeItemLayoutSlots, TreeItemLayoutState } from './TreeItemLayout.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { tokens, typographyStyles } from '@fluentui/react-theme';
import { useTreeContext_unstable } from '../../contexts/treeContext';

export const treeItemLayoutClassNames: SlotClassNames<TreeItemLayoutSlots> = {
  root: 'fui-TreeItemLayout',
  aside: 'fui-TreeItemLayout__aside',
  iconAfter: 'fui-TreeItemLayout__iconAfter',
  iconBefore: 'fui-TreeItemLayout__iconBefore',
};

/**
 * Styles for the root slot
 */
const useRootStyles = makeStyles({
  base: {
    display: 'flex',
    alignItems: 'center',
    ...shorthands.flex(1),
  },
  medium: {
    columnGap: tokens.spacingHorizontalSNudge,
    minHeight: '32px',
    ...typographyStyles.body1,
  },
  small: {
    columnGap: tokens.spacingHorizontalXS,
    minHeight: '24px',
    ...typographyStyles.caption1,
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

/**
 * Styles for the action icon slot
 */
const useAsideStyles = makeStyles({
  base: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 'auto',
    ...shorthands.padding(0, tokens.spacingHorizontalXS),
    ...shorthands.gap(tokens.spacingHorizontalXS),
  },
});

/**
 * Apply styling to the TreeItemLayout slots based on the state
 */
export const useTreeItemLayoutStyles_unstable = (state: TreeItemLayoutState): TreeItemLayoutState => {
  const { iconAfter, iconBefore, aside, root } = state;
  const rootStyles = useRootStyles();
  const iconStyles = useIconStyles();
  const asideStyles = useAsideStyles();

  const size = useTreeContext_unstable(ctx => ctx.size);

  root.className = mergeClasses(treeItemLayoutClassNames.root, rootStyles.base, rootStyles[size], root.className);

  if (iconBefore) {
    iconBefore.className = mergeClasses(treeItemLayoutClassNames.iconBefore, iconStyles.base, iconBefore.className);
  }

  if (iconAfter) {
    iconAfter.className = mergeClasses(treeItemLayoutClassNames.iconAfter, iconStyles.base, iconAfter.className);
  }

  if (aside) {
    aside.className = mergeClasses(treeItemLayoutClassNames.aside, asideStyles.base, aside.className);
  }

  return state;
};
