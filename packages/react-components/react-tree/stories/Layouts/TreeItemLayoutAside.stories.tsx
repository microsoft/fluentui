import * as React from 'react';
import { Tree, TreeItem, TreeItemLayout } from '@fluentui/react-tree';
import { Button, CounterBadge } from '@fluentui/react-components';
import { Edit20Regular, FluentIconsProps, Important16Regular, MoreHorizontal20Regular } from '@fluentui/react-icons';
import story from './TreeItemLayoutAside.md';

const iconStyleProps: FluentIconsProps = {
  primaryFill: 'red',
};

const RenderAside = () => (
  <>
    <Important16Regular {...iconStyleProps} />
    <CounterBadge count={1} color="danger" size="small" />
  </>
);

const Actions = () => (
  <>
    <Button appearance="subtle" icon={<Edit20Regular />} />
    <Button appearance="subtle" icon={<MoreHorizontal20Regular />} />
  </>
);

export const Aside = () => (
  <Tree aria-label="Tree">
    <TreeItem>
      <TreeItemLayout aside={<RenderAside />}>level 1, item 1</TreeItemLayout>
      <Tree>
        <TreeItem actions={<Actions />}>
          <TreeItemLayout aside={<RenderAside />}>level 2, item 1</TreeItemLayout>
        </TreeItem>
        <TreeItem actions={<Actions />}>
          <TreeItemLayout aside={<RenderAside />}>level 2, item 2</TreeItemLayout>
        </TreeItem>
        <TreeItem actions={<Actions />}>
          <TreeItemLayout aside={<RenderAside />}>level 2, item 3</TreeItemLayout>
        </TreeItem>
      </Tree>
    </TreeItem>
    <TreeItem>
      <TreeItemLayout aside={<RenderAside />}>level 1, item 2</TreeItemLayout>
      <Tree>
        <TreeItem actions={<Actions />}>
          <TreeItemLayout aside={<RenderAside />}>level 2, item 1</TreeItemLayout>
          <Tree>
            <TreeItem actions={<Actions />}>
              <TreeItemLayout aside={<RenderAside />}>level 3, item 1</TreeItemLayout>
            </TreeItem>
          </Tree>
        </TreeItem>

        <TreeItem actions={<Actions />}>
          <TreeItemLayout aside={<RenderAside />}>level 2, item 2</TreeItemLayout>
          <Tree>
            <TreeItem actions={<Actions />}>
              <TreeItemLayout aside={<RenderAside />}>level 3, item 1</TreeItemLayout>
            </TreeItem>
            <TreeItem actions={<Actions />}>
              <TreeItemLayout aside={<RenderAside />}>level 3, item 2</TreeItemLayout>
            </TreeItem>
            <TreeItem actions={<Actions />}>
              <TreeItemLayout aside={<RenderAside />}>level 3, item 3</TreeItemLayout>
            </TreeItem>
          </Tree>
        </TreeItem>
      </Tree>
    </TreeItem>
  </Tree>
);

Aside.parameters = {
  docs: {
    description: {
      story,
    },
  },
};
