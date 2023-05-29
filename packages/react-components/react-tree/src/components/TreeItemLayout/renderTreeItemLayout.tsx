/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';
import { assertSlots } from '@fluentui/react-utilities';
import type { TreeItemLayoutState, TreeItemLayoutSlots } from './TreeItemLayout.types';

/**
 * Render the final JSX of TreeItemLayout
 */
export const renderTreeItemLayout_unstable = (state: TreeItemLayoutState) => {
  assertSlots<TreeItemLayoutSlots>(state);
  return (
    <state.root>
      {state.expandIcon && <state.expandIcon />}
      {state.iconBefore && <state.iconBefore />}
      {state.root.children}
      {state.iconAfter && <state.iconAfter />}
    </state.root>
  );
};
