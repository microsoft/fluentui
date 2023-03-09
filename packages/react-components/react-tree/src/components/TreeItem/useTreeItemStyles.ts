import { GriffelStyle, makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { TreeItemCSSProperties, TreeItemSlots, TreeItemState } from './TreeItem.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { tokens } from '@fluentui/react-theme';
import { createFocusOutlineStyle } from '@fluentui/react-tabster';
import { useTreeContext_unstable } from '../../contexts/index';
import { treeItemLevelToken } from '../../utils/tokens';

export const treeItemClassNames: SlotClassNames<TreeItemSlots> = {
  root: 'fui-TreeItem',
  content: 'fui-TreeItem__content',
  subtree: 'fui-TreeItem__subtree',
  expandIcon: 'fui-TreeItem__expandIcon',
  actions: 'fui-TreeItem__actions',
};

type StaticLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
type StaticLevelProperty = `level${StaticLevel}`;

const useRootStyles = makeStyles({
  ...(Object.fromEntries(
    Array.from<never, [StaticLevelProperty, TreeItemCSSProperties]>({ length: 10 }, (_, index) => [
      `level${(index + 1) as StaticLevel}`,
      { [treeItemLevelToken]: index + 1 },
    ]),
  ) as Record<StaticLevelProperty, GriffelStyle>),
});

/**
 * Styles for the content slot
 */
const useContentStyles = makeStyles({
  base: {
    position: 'relative',
    cursor: 'pointer',
    display: 'flex',
    backgroundColor: tokens.colorSubtleBackground,
    color: tokens.colorNeutralForeground2,
    paddingRight: tokens.spacingHorizontalNone,
    paddingLeft: `calc((var(${treeItemLevelToken}, 1) - 1) * ${tokens.spacingHorizontalXXL})`,
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
    paddingLeft: `calc(var(${treeItemLevelToken}, 1) * ${tokens.spacingHorizontalXXL})`,
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
    ...shorthands.padding(tokens.spacingVerticalXS, 0),
  },
});

/**
 * Styles for the action icon slot
 */
const useActionsStyles = makeStyles({
  base: {
    display: 'none',
    marginLeft: 'auto',
    ...shorthands.padding(0, tokens.spacingHorizontalS),
  },
  open: {
    display: 'flex',
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
  const rootStyles = useRootStyles();
  const contentStyles = useContentStyles();
  const expandIconStyles = useExpandIconStyles();
  const actionsStyles = useActionsStyles();

  const appearance = useTreeContext_unstable(ctx => ctx.appearance);

  const { actions, subtree, expandIcon, isActionsVisible: showActions, level } = state;

  state.root.className = mergeClasses(
    treeItemClassNames.root,
    isStaticallyDefinedLevel(level) && rootStyles[`level${level}` as StaticLevelProperty],
    state.root.className,
  );

  state.content.className = mergeClasses(
    treeItemClassNames.content,
    contentStyles.base,
    contentStyles[appearance],
    contentStyles.focusIndicator,
    state.isLeaf && contentStyles.leaf,
    state.content.className,
  );

  if (expandIcon) {
    expandIcon.className = mergeClasses(treeItemClassNames.expandIcon, expandIconStyles.base, expandIcon.className);
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

function isStaticallyDefinedLevel(level: number): level is StaticLevel {
  return level >= 1 && level <= 10;
}
