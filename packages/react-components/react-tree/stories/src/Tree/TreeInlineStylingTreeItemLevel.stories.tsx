import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  Tree,
  TreeItem,
  TreeItemLayout,
  treeItemLevelToken,
  useSubtreeContext_unstable,
} from '@fluentui/react-components';

export const InlineStylingTreeItemLevel = (): JSXElement => {
  const { level } = useSubtreeContext_unstable();
  return level === 0 ? (
    <Tree aria-label="Inline Styling Tree Item Level">
      <InlineStylingTreeItemLevel />
    </Tree>
  ) : (
    <TreeItem value={level} itemType="branch" style={{ [treeItemLevelToken]: level }}>
      <TreeItemLayout>{`level ${level}, item 1`}</TreeItemLayout>
      <Tree>
        <InlineStylingTreeItemLevel />
      </Tree>
    </TreeItem>
  );
};

InlineStylingTreeItemLevel.parameters = {
  docs: {
    description: {
      story: `
The tree component generates static styles for the first 10 nesting levels (for performance reasons) and automatically falls back to an inline CSS variable for deeper levels, so arbitrarily deep trees indent correctly out of the box. Below is an example of how to apply custom inline styles to create dynamic tree item levels, overriding the default static styles.
      `,
    },
  },
};
