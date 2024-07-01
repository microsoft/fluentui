import { makeResetStyles, makeStyles, mergeClasses } from '@griffel/react';
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

const useRootBaseStyles = makeResetStyles({
  display: 'flex',
  alignItems: 'center',
  minHeight: '32px',
  boxSizing: 'border-box',
  gridArea: 'layout',
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
});

/**
 * Styles for the root slot
 */
const useRootStyles = makeStyles({
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
const useActionsBaseStyles = makeResetStyles({
  display: 'flex',
  marginLeft: 'auto',
  position: 'relative',
  zIndex: 1,
  gridArea: 'aside',
  padding: `0 ${tokens.spacingHorizontalS}`,
});
/**
 * Styles for the action icon slot
 */
const useAsideBaseStyles = makeResetStyles({
  display: 'flex',
  marginLeft: 'auto',
  alignItems: 'center',
  zIndex: 0,
  gridArea: 'aside',
  padding: `0 ${tokens.spacingHorizontalM}`,
  gap: tokens.spacingHorizontalXS,
});

/**
 * Styles for the expand icon slot
 */
const useExpandIconBaseStyles = makeResetStyles({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: '24px',
  boxSizing: 'border-box',
  color: tokens.colorNeutralForeground3,
  flex: `0 0 auto`,
  padding: `${tokens.spacingVerticalXS} 0`,
});

/**
 * Styles for the content slot
 */
const useMainBaseStyles = makeResetStyles({
  padding: `0 ${tokens.spacingHorizontalXXS}`,
});

/**
 * Styles for the before/after icon slot
 */
const useIconBaseStyles = makeResetStyles({
  display: 'flex',
  alignItems: 'center',
  color: tokens.colorNeutralForeground2,
  lineHeight: tokens.lineHeightBase500,
  fontSize: tokens.fontSizeBase500,
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
  'use no memo';

  const { main, iconAfter, iconBefore, expandIcon, root, aside, actions, selector } = state;
  const rootStyles = useRootStyles();
  const rootBaseStyles = useRootBaseStyles();
  const actionsBaseStyles = useActionsBaseStyles();
  const asideBaseStyles = useAsideBaseStyles();

  const mainBaseStyles = useMainBaseStyles();

  const expandIconBaseStyles = useExpandIconBaseStyles();
  const iconBaseStyles = useIconBaseStyles();
  const iconBeforeStyles = useIconBeforeStyles();
  const iconAfterStyles = useIconAfterStyles();

  const size = useTreeContext_unstable(ctx => ctx.size);
  const appearance = useTreeContext_unstable(ctx => ctx.appearance);
  const itemType = useTreeItemContext_unstable(ctx => ctx.itemType);

  root.className = mergeClasses(
    treeItemLayoutClassNames.root,
    rootBaseStyles,
    rootStyles[appearance],
    rootStyles[size],
    rootStyles[itemType],
    root.className,
  );

  main.className = mergeClasses(treeItemLayoutClassNames.main, mainBaseStyles, main.className);

  if (expandIcon) {
    expandIcon.className = mergeClasses(
      treeItemLayoutClassNames.expandIcon,
      expandIconBaseStyles,
      expandIcon.className,
    );
  }

  if (iconBefore) {
    iconBefore.className = mergeClasses(
      treeItemLayoutClassNames.iconBefore,
      iconBaseStyles,
      iconBeforeStyles[size],
      iconBefore.className,
    );
  }

  if (iconAfter) {
    iconAfter.className = mergeClasses(
      treeItemLayoutClassNames.iconAfter,
      iconBaseStyles,
      iconAfterStyles[size],
      iconAfter.className,
    );
  }

  if (actions) {
    actions.className = mergeClasses(treeItemLayoutClassNames.actions, actionsBaseStyles, actions.className);
  }
  if (aside) {
    aside.className = mergeClasses(treeItemLayoutClassNames.aside, asideBaseStyles, aside.className);
  }
  if (selector) {
    selector.className = mergeClasses(treeItemLayoutClassNames.selector, selector.className);
  }

  return state;
};
