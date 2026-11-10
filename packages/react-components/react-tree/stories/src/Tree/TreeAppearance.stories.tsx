import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Avatar, Tree, TreeItem, TreeItemLayout, TreeItemPersonaLayout } from '@fluentui/react-components';

export const Appearance = (): JSXElement => {
  return (
    <>
      <Tree aria-label="Default Appearance">
        <TreeItem itemType="branch">
          <TreeItemLayout>Default appearance</TreeItemLayout>
          <Tree>
            <TreeItem itemType="leaf">
              <TreeItemLayout>level 2, item 1</TreeItemLayout>
            </TreeItem>
            <TreeItem itemType="leaf">
              <TreeItemLayout>level 2, item 2</TreeItemLayout>
            </TreeItem>
          </Tree>
        </TreeItem>
      </Tree>
      <Tree aria-label="Subtle Alpha Appearance" appearance="subtle-alpha">
        <TreeItem itemType="branch">
          <TreeItemLayout>Subtle-alpha appearance</TreeItemLayout>
          <Tree>
            <TreeItem itemType="leaf">
              <TreeItemLayout>level 2, item 1</TreeItemLayout>
            </TreeItem>
            <TreeItem itemType="leaf">
              <TreeItemLayout>level 2, item 2</TreeItemLayout>
            </TreeItem>
          </Tree>
        </TreeItem>
      </Tree>
      <Tree aria-label="Transparent Appearance" appearance="transparent">
        <TreeItem itemType="branch">
          <TreeItemLayout>Transparent appearance</TreeItemLayout>
          <Tree>
            <TreeItem itemType="leaf">
              <TreeItemLayout>level 2, item 1</TreeItemLayout>
            </TreeItem>
            <TreeItem itemType="leaf">
              <TreeItemLayout>level 2, item 2</TreeItemLayout>
            </TreeItem>
          </Tree>
        </TreeItem>
      </Tree>
      <hr />
      <Tree aria-label="Default Appearance">
        <TreeItem itemType="branch">
          <TreeItemPersonaLayout
            media={<Avatar name="Default" aria-label="Default appearance avatar placeholder" color="colorful" />}
          >
            Default appearance
          </TreeItemPersonaLayout>
          <Tree>
            <TreeItem itemType="leaf">
              <TreeItemPersonaLayout media={<Avatar aria-label="Avatar placeholder" color="colorful" />}>
                level 2, item 1
              </TreeItemPersonaLayout>
            </TreeItem>
            <TreeItem itemType="leaf">
              <TreeItemPersonaLayout media={<Avatar aria-label="Avatar placeholder" color="colorful" />}>
                level 2, item 2
              </TreeItemPersonaLayout>
            </TreeItem>
          </Tree>
        </TreeItem>
      </Tree>
      <Tree aria-label="Subtle Alpha Appearance" appearance="subtle-alpha">
        <TreeItem itemType="branch">
          <TreeItemPersonaLayout
            media={
              <Avatar aria-label="Subtle-alpha appearance avatar placeholder" name="Subtle Alpha" color="colorful" />
            }
          >
            Subtle-alpha appearance
          </TreeItemPersonaLayout>
          <Tree>
            <TreeItem itemType="leaf">
              <TreeItemPersonaLayout media={<Avatar aria-label="Avatar placeholder" color="colorful" />}>
                level 2, item 1
              </TreeItemPersonaLayout>
            </TreeItem>
            <TreeItem itemType="leaf">
              <TreeItemPersonaLayout media={<Avatar aria-label="Avatar placeholder" color="colorful" />}>
                level 2, item 2
              </TreeItemPersonaLayout>
            </TreeItem>
          </Tree>
        </TreeItem>
      </Tree>
      <Tree aria-label="Transparent Appearance" appearance="transparent">
        <TreeItem itemType="branch">
          <TreeItemPersonaLayout
            media={
              <Avatar aria-label="Transparent appearance avatar placeholder" name="Transparent" color="colorful" />
            }
          >
            Transparent appearance
          </TreeItemPersonaLayout>
          <Tree>
            <TreeItem itemType="leaf">
              <TreeItemPersonaLayout media={<Avatar aria-label="Avatar placeholder" color="colorful" />}>
                level 2, item 1
              </TreeItemPersonaLayout>
            </TreeItem>
            <TreeItem itemType="leaf">
              <TreeItemPersonaLayout media={<Avatar aria-label="Avatar placeholder" color="colorful" />}>
                level 2, item 2
              </TreeItemPersonaLayout>
            </TreeItem>
          </Tree>
        </TreeItem>
      </Tree>
    </>
  );
};

Appearance.parameters = {
  docs: {
    description: {
      story: `
A tree can have the following \`appearance\` variants:
- \`subtle\`: the default appearance.
- \`subtle-alpha\`: minimizes emphasis on hovered or focused states.
- \`transparent\`: no background color.

Both \`TreeItemLayout\` and \`TreeItemPersonaLayout\` will respond to the appearance variants.
      `,
    },
  },
};
