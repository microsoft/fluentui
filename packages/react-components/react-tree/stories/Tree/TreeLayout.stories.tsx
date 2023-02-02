import * as React from 'react';
import { Tree, TreeItem, TreeItemLayout } from '@fluentui/react-tree';
import {
  CalendarLtr20Regular,
  Flag20Regular,
  LockClosed20Regular,
  MoreHorizontal20Regular,
  SquareMultiple20Regular,
} from '@fluentui/react-icons';
import { Button } from '../../../react-button/src/Button';
import { CounterBadge } from '../../../react-badge/src/CounterBadge';
import { PresenceBadge } from '../../../react-badge/src/PresenceBadge';
// Warning24Filled
const RenderAside = () => (
  <>
    <PresenceBadge status="do-not-disturb" />
    <CounterBadge count={1} />
  </>
);

const Actions = () => (
  <>
    <Button appearance="subtle" icon={<Flag20Regular />} />
    <Button appearance="subtle" icon={<MoreHorizontal20Regular />} />
  </>
);

export const Layout = () => {
  return (
    <Tree aria-label="Tree">
      <TreeItem actions={<Actions />}>
        <TreeItemLayout
          iconBefore={<CalendarLtr20Regular />}
          iconAfter={
            <>
              <LockClosed20Regular />
              <SquareMultiple20Regular />
            </>
          }
          aside={<RenderAside />}
        >
          Content
        </TreeItemLayout>
        <Tree>
          <TreeItem>level 2, item 1</TreeItem>
          <TreeItem>level 2, item 2</TreeItem>
          <TreeItem>level 2, item 3</TreeItem>
        </Tree>
      </TreeItem>
      <TreeItem>
        level 1, item 2
        <Tree>
          <TreeItem>
            level 2, item 1
            <Tree>
              <TreeItem>level 3, item 1</TreeItem>
            </Tree>
          </TreeItem>
        </Tree>
      </TreeItem>
    </Tree>
  );
};
