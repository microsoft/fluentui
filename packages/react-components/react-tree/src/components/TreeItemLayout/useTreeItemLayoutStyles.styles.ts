import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { TreeItemLayoutSlots, TreeItemLayoutState } from './TreeItemLayout.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { tokens, typographyStyles } from '@fluentui/react-theme';
import { useTreeContext_unstable } from '../../contexts/treeContext';
import { treeItemLevelToken } from '../../utils/tokens';
import { useTreeItemContext_unstable } from '../../contexts/treeItemContext';

export const treeItemLayoutClassNames: SlotClassNames<TreeItemLayoutSlots> = {
  root: 'fui-TreeItemLayout',
  iconBefore: 'fui-TreeItemLayout__iconBefore',
  iconAfter: 'fui-TreeItemLayout__iconAfter',
  expandIcon: 'fui-TreeItemLayout__expandIcon',
  aside: 'fui-TreeItemLayout__aside',
  actions: 'fui-TreeItemLayout__actions',
};

/**
 * Styles for the root slot
 */
const useRootStyles = makeStyles({
  base: {
    display: 'flex',
    alignItems: 'center',
    minHeight: '32px',
    boxSizing: 'border-box',
    ...shorthands.gridArea('layout'),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    ':active': {
      color: tokens.colorNeutralForeground2Pressed,
      backgroundColor: tokens.colorSubtleBackgroundPressed,
      // TODO: stop using treeItemLayoutClassNames.expandIcon for styling
      [`& .${treeItemLayoutClassNames.expandIcon}`]: {
        color: tokens.colorNeutralForeground3Pressed,
      },
    },
    ':hover': {
      color: tokens.colorNeutralForeground2Hover,
      backgroundColor: tokens.colorSubtleBackgroundHover,
      // TODO: stop using treeItemLayoutClassNames.expandIcon  for styling
      [`& .${treeItemLayoutClassNames.expandIcon}`]: {
        color: tokens.colorNeutralForeground3Hover,
      },
    },
  },
  leaf: {
    paddingLeft: `calc(var(${treeItemLevelToken}, 1) * ${tokens.spacingHorizontalXXL})`,
  },
  branch: {
    paddingLeft: `calc((var(${treeItemLevelToken}, 1) - 1) * ${tokens.spacingHorizontalXXL})`,
  },
  medium: {
    columnGap: tokens.spacingHorizontalSNudge,
    ...typographyStyles.body1,
  },
  small: {
    columnGap: tokens.spacingHorizontalXS,
    minHeight: '24px',
    ...typographyStyles.caption1,
  },
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
  iconBefore: {},
  iconAfter: {},
});

/**
 * Styles for the action icon slot
 */
const useActionsStyles = makeStyles({
  base: {
    display: 'flex',
    marginLeft: 'auto',
    position: 'relative',
    zIndex: 1,
    ...shorthands.gridArea('aside'),
    ...shorthands.padding(0, tokens.spacingHorizontalS),
  },
});
/**
 * Styles for the action icon slot
 */
const useAsideStyles = makeStyles({
  base: {
    display: 'flex',
    marginLeft: 'auto',
    alignItems: 'center',
    zIndex: 0,
    ...shorthands.gridArea('aside'),
    ...shorthands.padding(0, tokens.spacingHorizontalM),
    ...shorthands.gap(tokens.spacingHorizontalXS),
  },
});

/**
 * Styles for the expand icon slot
 */
const useExpandIconStyles = makeStyles({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '24px',
    boxSizing: 'border-box',
    color: tokens.colorNeutralForeground3,
    ...shorthands.flex(0, 0, 'auto'),
    ...shorthands.padding(tokens.spacingVerticalXS, 0),
  },
});

/**
 * Apply styling to the TreeItemLayout slots based on the state
 */
export const useTreeItemLayoutStyles_unstable = (state: TreeItemLayoutState): TreeItemLayoutState => {
  const { iconAfter, iconBefore, root } = state;
  const rootStyles = useRootStyles();
  const iconStyles = useIconStyles();
  const actionsStyles = useActionsStyles();
  const asideStyles = useAsideStyles();
  const expandIconStyles = useExpandIconStyles();

  const size = useTreeContext_unstable(ctx => ctx.size);
  const appearance = useTreeContext_unstable(ctx => ctx.appearance);
  const itemType = useTreeItemContext_unstable(ctx => ctx.itemType);

  root.className = mergeClasses(
    treeItemLayoutClassNames.root,
    rootStyles.base,
    rootStyles[appearance],
    rootStyles[size],
    rootStyles[itemType],
    root.className,
  );

  if (iconBefore) {
    iconBefore.className = mergeClasses(
      treeItemLayoutClassNames.iconBefore,
      iconStyles.base,
      iconStyles.iconBefore,
      iconBefore.className,
    );
  }

  if (iconAfter) {
    iconAfter.className = mergeClasses(
      treeItemLayoutClassNames.iconAfter,
      iconStyles.base,
      iconStyles.iconAfter,
      iconAfter.className,
    );
  }

  if (state.actions) {
    state.actions.className = mergeClasses(
      treeItemLayoutClassNames.actions,
      actionsStyles.base,
      state.actions.className,
    );
  }
  if (state.aside) {
    state.aside.className = mergeClasses(treeItemLayoutClassNames.aside, asideStyles.base, state.aside.className);
  }
  if (state.expandIcon) {
    state.expandIcon.className = mergeClasses(
      treeItemLayoutClassNames.expandIcon,
      expandIconStyles.base,
      state.expandIcon.className,
    );
  }

  return state;
};
