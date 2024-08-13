import * as React from 'react';
import {
  Tree,
  TreeItem,
  TreeItemLayout,
  treeItemLevelToken,
  useSubtreeContext_unstable,
} from '@fluentui/react-components';

export const InlineStylingTreeItemLevel = () => {
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
The tree component supports nested styling up to 10 levels, limited by performance considerations. For more than 10 levels of nesting, use dynamic styling instead. Below is an example of how to apply custom inline styles to create dynamic tree item levels, overriding the default static styles.
      `,
    },
  },
};
