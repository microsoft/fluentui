import * as React from 'react';
import { Tree, TreeItem, TreeItemLayout } from '@fluentui/react-tree';
import {
  Image20Regular,
  Important16Regular,
  LockClosed20Regular,
  SquareMultiple20Regular,
} from '@fluentui/react-icons';
import { CounterBadge } from '@fluentui/react-components';
import story from './TreeItemLayout.md';

export const Layout = () => (
  <Tree aria-label="Tree">
    <TreeItem itemType="branch" aria-description="Private, 1 message">
      <TreeItemLayout
        aside={
          <>
            <Important16Regular primaryFill="red" />
            <CounterBadge count={1} color="danger" size="small" />
          </>
        }
        iconBefore={<Image20Regular />}
        iconAfter={
          <>
            <LockClosed20Regular />
            <SquareMultiple20Regular />
          </>
        }
      >
        Content
      </TreeItemLayout>
      <Tree>
        <TreeItem itemType="branch">
          <TreeItemLayout>Tree Item</TreeItemLayout>
          <Tree>
            <TreeItem itemType="leaf">
              <TreeItemLayout>level 2, item 1</TreeItemLayout>
            </TreeItem>
            <TreeItem itemType="leaf">
              <TreeItemLayout>level 2, item 2</TreeItemLayout>
            </TreeItem>
            <TreeItem itemType="leaf">
              <TreeItemLayout>level 2, item 3</TreeItemLayout>
            </TreeItem>
          </Tree>
        </TreeItem>
        <TreeItem itemType="leaf">
          <TreeItemLayout>level 2, item 2</TreeItemLayout>
        </TreeItem>
        <TreeItem itemType="leaf">
          <TreeItemLayout>level 2, item 3</TreeItemLayout>
        </TreeItem>
      </Tree>
    </TreeItem>
    <TreeItem itemType="branch" aria-description="Private">
      <TreeItemLayout
        aside={<Important16Regular primaryFill="red" />}
        iconBefore={<Image20Regular />}
        iconAfter={
          <>
            <LockClosed20Regular />
            <SquareMultiple20Regular />
          </>
        }
      >
        Content
      </TreeItemLayout>
      <Tree>
        <TreeItem itemType="branch">
          <TreeItemLayout>level 2, item 1</TreeItemLayout>
          <Tree>
            <TreeItem itemType="leaf">
              <TreeItemLayout>level 3, item 1</TreeItemLayout>
            </TreeItem>
          </Tree>
        </TreeItem>
      </Tree>
    </TreeItem>
  </Tree>
);

Layout.parameters = {
  docs: {
    description: {
      story,
    },
  },
};
