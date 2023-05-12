import { GriffelStyle, makeStyles, mergeClasses } from '@griffel/react';
import type { TreeItemCSSProperties, TreeItemSlots, TreeItemState } from './TreeItem.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { tokens } from '@fluentui/react-theme';
import { createFocusOutlineStyle } from '@fluentui/react-tabster';
import { treeItemLevelToken } from '../../utils/tokens';

export const treeItemClassNames: SlotClassNames<TreeItemSlots> = {
  root: 'fui-TreeItem',
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
  base: {
    position: 'relative',
    cursor: 'pointer',
    display: 'grid',
    boxSizing: 'border-box',
    gridTemplateRows: 'auto auto',
    gridTemplateColumns: 'minmax(0, 100%) minmax(0px, min-content)',
    gridTemplateAreas: `
    "layout  aside"
    "subtree subtree"
    `,
    backgroundColor: tokens.colorSubtleBackground,
    color: tokens.colorNeutralForeground2,
    paddingRight: tokens.spacingHorizontalNone,
  },
  focusIndicator: createFocusOutlineStyle(),
});

/**
 * Apply styling to the TreeItem slots based on the state
 */
export const useTreeItemStyles_unstable = (state: TreeItemState): TreeItemState => {
  const rootStyles = useRootStyles();

  const { level } = state;

  state.root.className = mergeClasses(
    treeItemClassNames.root,
    isStaticallyDefinedLevel(level) && rootStyles[`level${level}` as StaticLevelProperty],
    rootStyles.base,
    rootStyles.focusIndicator,
    state.root.className,
  );

  return state;
};

function isStaticallyDefinedLevel(level: number): level is StaticLevel {
  return level >= 1 && level <= 10;
}
