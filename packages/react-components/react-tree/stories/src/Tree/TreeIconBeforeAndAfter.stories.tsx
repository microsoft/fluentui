import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Tree, TreeItem, TreeItemLayout } from '@fluentui/react-components';
import { ImageRegular, LockClosedRegular, PersonRegular, WarningRegular } from '@fluentui/react-icons';

export const IconBeforeAndAfter = (): JSXElement => {
  return (
    <Tree aria-label="Icon Before & After">
      <TreeItem itemType="branch">
        <TreeItemLayout iconBefore={<ImageRegular />} iconAfter={<LockClosedRegular />}>
          level 1, item 1
        </TreeItemLayout>
        <Tree>
          <TreeItem itemType="leaf">
            <TreeItemLayout iconBefore={<PersonRegular />}>icon before</TreeItemLayout>
          </TreeItem>
          <TreeItem itemType="leaf">
            <TreeItemLayout iconBefore={<PersonRegular />}>icon before</TreeItemLayout>
          </TreeItem>
        </Tree>
      </TreeItem>
      <TreeItem itemType="branch">
        <TreeItemLayout iconBefore={<ImageRegular />} iconAfter={<LockClosedRegular />}>
          level 1, item 2
        </TreeItemLayout>
        <Tree>
          <TreeItem itemType="leaf">
            <TreeItemLayout iconAfter={<WarningRegular />}>icon after</TreeItemLayout>
          </TreeItem>
        </Tree>
      </TreeItem>
    </Tree>
  );
};

IconBeforeAndAfter.parameters = {
  docs: {
    name: 'Icon Before/After',
    description: {
      story: `
\`TreeItemLayout\` component allows you to add icons before or after the content.`,
    },
  },
};
