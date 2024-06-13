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
    color: `var(--ctrl-token-TreeItemLayout-2869, var(--semantic-token-TreeItemLayout-2870, ${tokens.colorNeutralForeground2Pressed}))`,
    backgroundColor: `var(--ctrl-token-TreeItemLayout-2871, var(--semantic-token-TreeItemLayout-2872, ${tokens.colorSubtleBackgroundPressed}))`,
    // TODO: stop using treeItemLayoutClassNames.expandIcon for styling
    [`& .${treeItemLayoutClassNames.expandIcon}`]: {
      color: `var(--ctrl-token-TreeItemLayout-2873, var(--semantic-token-TreeItemLayout-2874, ${tokens.colorNeutralForeground3Pressed}))`,
    },
  },
  ':hover': {
    color: `var(--ctrl-token-TreeItemLayout-2875, var(--semantic-token-TreeItemLayout-2876, ${tokens.colorNeutralForeground2Hover}))`,
    backgroundColor: `var(--ctrl-token-TreeItemLayout-2877, var(--semantic-token-TreeItemLayout-2878, ${tokens.colorSubtleBackgroundHover}))`,
    // TODO: stop using treeItemLayoutClassNames.expandIcon  for styling
    [`& .${treeItemLayoutClassNames.expandIcon}`]: {
      color: `var(--ctrl-token-TreeItemLayout-2879, var(--semantic-token-TreeItemLayout-2880, ${tokens.colorNeutralForeground3Hover}))`,
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
      backgroundColor: `var(--ctrl-token-TreeItemLayout-2881, var(--semantic-token-TreeItemLayout-2882, ${tokens.colorSubtleBackgroundLightAlphaHover}))`,
    },
    ':active': {
      backgroundColor: `var(--ctrl-token-TreeItemLayout-2883, var(--semantic-token-TreeItemLayout-2884, ${tokens.colorSubtleBackgroundLightAlphaPressed}))`,
    },
  },
  transparent: {
    backgroundColor: `var(--ctrl-token-TreeItemLayout-2885, var(--semantic-token-TreeItemLayout-2886, ${tokens.colorTransparentBackground}))`,
    ':hover': {
      backgroundColor: `var(--ctrl-token-TreeItemLayout-2887, var(--semantic-token-TreeItemLayout-2888, ${tokens.colorTransparentBackgroundHover}))`,
    },
    ':active': {
      backgroundColor: `var(--ctrl-token-TreeItemLayout-2889, var(--semantic-token-TreeItemLayout-2890, ${tokens.colorTransparentBackgroundPressed}))`,
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
  gap: `var(--ctrl-token-TreeItemLayout-2891, var(--semantic-token-TreeItemLayout-2892, ${tokens.spacingHorizontalXS}))`,
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
  color: `var(--ctrl-token-TreeItemLayout-2893, var(--semantic-token-TreeItemLayout-2894, ${tokens.colorNeutralForeground3}))`,
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
  color: `var(--ctrl-token-TreeItemLayout-2895, var(--semantic-token-TreeItemLayout-2896, ${tokens.colorNeutralForeground2}))`,
  lineHeight: `var(--ctrl-token-TreeItemLayout-2897, var(--semantic-token-TreeItemLayout-2898, ${tokens.lineHeightBase500}))`,
  fontSize: `var(--ctrl-token-TreeItemLayout-2899, var(--semantic-token-TreeItemLayout-2900, ${tokens.fontSizeBase500}))`,
});

const useIconBeforeStyles = makeStyles({
  medium: {
    paddingRight: `var(--ctrl-token-TreeItemLayout-2901, var(--semantic-token-TreeItemLayout-2902, ${tokens.spacingHorizontalXS}))`,
  },
  small: {
    paddingRight: `var(--ctrl-token-TreeItemLayout-2903, var(--semantic-token-TreeItemLayout-2904, ${tokens.spacingHorizontalXXS}))`,
  },
});

const useIconAfterStyles = makeStyles({
  medium: {
    paddingLeft: `var(--ctrl-token-TreeItemLayout-2905, var(--semantic-token-TreeItemLayout-2906, ${tokens.spacingHorizontalXS}))`,
  },
  small: {
    paddingLeft: `var(--ctrl-token-TreeItemLayout-2907, var(--semantic-token-TreeItemLayout-2908, ${tokens.spacingHorizontalXXS}))`,
  },
});

/**
 * Apply styling to the TreeItemLayout slots based on the state
 */
export const useTreeItemLayoutStyles_unstable = (state: TreeItemLayoutState): TreeItemLayoutState => {
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
