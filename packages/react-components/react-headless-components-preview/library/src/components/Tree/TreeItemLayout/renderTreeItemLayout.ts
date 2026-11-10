import { renderTreeItemLayout_unstable } from '@fluentui/react-tree';
import type { JSXElement } from '@fluentui/react-utilities';

import type { TreeItemLayoutState } from './TreeItemLayout.types';

/**
 * Renders the final JSX of the TreeItemLayout component, given the state.
 */
export const renderTreeItemLayout: (state: TreeItemLayoutState) => JSXElement = renderTreeItemLayout_unstable;
