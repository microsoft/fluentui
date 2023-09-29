import { GriffelStyle, makeResetStyles, makeStyles, mergeClasses } from '@griffel/react';
import type { TreeItemCSSProperties, TreeItemSlots, TreeItemState } from './TreeItem.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { tokens } from '@fluentui/react-theme';
import { createFocusOutlineStyle } from '@fluentui/react-tabster';
import { treeItemLevelToken } from '../../utils/tokens';

export const treeItemClassNames: SlotClassNames<TreeItemSlots> = {
  root: 'fui-TreeItem',
};

const useBaseStyles = makeResetStyles({
  position: 'relative',
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'column',
  boxSizing: 'border-box',
  backgroundColor: tokens.colorSubtleBackground,
  color: tokens.colorNeutralForeground2,
  paddingRight: tokens.spacingHorizontalNone,
  ...createFocusOutlineStyle(),
});

type StaticLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
type StaticLevelProperty = `level${StaticLevel}`;

const useStyles = makeStyles({
  ...(Object.fromEntries(
    Array.from<never, [StaticLevelProperty, TreeItemCSSProperties]>({ length: 10 }, (_, index) => [
      `level${(index + 1) as StaticLevel}`,
      { [treeItemLevelToken]: index + 1 },
    ]),
  ) as Record<StaticLevelProperty, GriffelStyle>),
});

/**
 * Apply styling to the TreeItem slots based on the state
 */
export const useTreeItemStyles_unstable = (state: TreeItemState): TreeItemState => {
  const baseStyles = useBaseStyles();
  const styles = useStyles();

  const { level } = state;

  state.root.className = mergeClasses(
    treeItemClassNames.root,
    baseStyles,
    isStaticallyDefinedLevel(level) && styles[`level${level}` as StaticLevelProperty],
    state.root.className,
  );

  return state;
};

function isStaticallyDefinedLevel(level: number): level is StaticLevel {
  return level >= 1 && level <= 10;
}
