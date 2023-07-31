/** @jsxRuntime classic */
/** @jsx createElement */

import { MenuProvider } from '@fluentui/react-menu';
import type { TreeItemContextMenuContextValues, TreeItemContextMenuState } from './TreeItemContextMenu.types';
import { createElement } from '@fluentui/react-jsx-runtime';

/**
 * Render the final JSX of TreeItemContextMenu
 */
export const renderTreeItemContextMenu_unstable = (
  state: TreeItemContextMenuState,
  contextValues: TreeItemContextMenuContextValues,
) => <MenuProvider value={contextValues.menu}>{state.open && state.menuPopover}</MenuProvider>;
