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
  main: 'fui-TreeItemLayout__main',
  iconAfter: 'fui-TreeItemLayout__iconAfter',
  expandIcon: 'fui-TreeItemLayout__expandIcon',
  aside: 'fui-TreeItemLayout__aside',
  actions: 'fui-TreeItemLayout__actions',
  selector: 'fui-TreeItemLayout__selector',
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
    ...typographyStyles.body1,
  },
  small: {
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
 * Styles for the content slot
 */
const useMainStyles = makeStyles({
  base: {
    ...shorthands.padding(0, tokens.spacingHorizontalXXS),
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

const useIconBeforeStyles = makeStyles({
  medium: {
    paddingRight: tokens.spacingHorizontalXS,
  },
  small: {
    paddingRight: tokens.spacingHorizontalXXS,
  },
});

const useIconAfterStyles = makeStyles({
  medium: {
    paddingLeft: tokens.spacingHorizontalXS,
  },
  small: {
    paddingLeft: tokens.spacingHorizontalXXS,
  },
});

/**
 * Apply styling to the TreeItemLayout slots based on the state
 */
export const useTreeItemLayoutStyles_unstable = (state: TreeItemLayoutState): TreeItemLayoutState => {
  const { main, iconAfter, iconBefore, expandIcon, root, aside, actions, selector } = state;
  const rootStyles = useRootStyles();
  const actionsStyles = useActionsStyles();
  const asideStyles = useAsideStyles();

  const mainStyles = useMainStyles();

  const expandIconStyles = useExpandIconStyles();
  const iconStyles = useIconStyles();
  const iconBeforeStyles = useIconBeforeStyles();
  const iconAfterStyles = useIconAfterStyles();

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

  main.className = mergeClasses(treeItemLayoutClassNames.main, mainStyles.base, main.className);

  if (expandIcon) {
    expandIcon.className = mergeClasses(
      treeItemLayoutClassNames.expandIcon,
      expandIconStyles.base,
      expandIcon.className,
    );
  }

  if (iconBefore) {
    iconBefore.className = mergeClasses(
      treeItemLayoutClassNames.iconBefore,
      iconStyles.base,
      iconBeforeStyles[size],
      iconBefore.className,
    );
  }

  if (iconAfter) {
    iconAfter.className = mergeClasses(
      treeItemLayoutClassNames.iconAfter,
      iconStyles.base,
      iconAfterStyles[size],
      iconAfter.className,
    );
  }

  if (actions) {
    actions.className = mergeClasses(treeItemLayoutClassNames.actions, actionsStyles.base, actions.className);
  }
  if (aside) {
    aside.className = mergeClasses(treeItemLayoutClassNames.aside, asideStyles.base, aside.className);
  }
  if (expandIcon) {
    expandIcon.className = mergeClasses(
      treeItemLayoutClassNames.expandIcon,
      expandIconStyles.base,
      expandIcon.className,
    );
  }
  if (selector) {
    selector.className = mergeClasses(treeItemLayoutClassNames.selector, selector.className);
  }

  return state;
};
