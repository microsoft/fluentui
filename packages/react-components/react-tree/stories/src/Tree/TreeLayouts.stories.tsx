import * as React from 'react';
import { Tree, TreeItem, TreeItemLayout, TreeItemPersonaLayout } from '@fluentui/react-components';
import { Avatar } from '@fluentui/react-components';

export const Layouts = () => {
  return (
    <>
      <Tree aria-label="Default Layout">
        <TreeItem itemType="branch">
          <TreeItemLayout>Tree using TreeItemLayout</TreeItemLayout>
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
      </Tree>

      <Tree aria-label="Persona Layout">
        <TreeItem itemType="branch">
          <TreeItemPersonaLayout media={<Avatar image={{ alt: 'avatar' }} />}>
            Tree using TreeItemPersonaLayout
          </TreeItemPersonaLayout>
          <Tree>
            <TreeItem itemType="leaf">
              <TreeItemPersonaLayout media={<Avatar image={{ alt: 'avatar' }} />} description="with description">
                level 2, item 1
              </TreeItemPersonaLayout>
            </TreeItem>
            <TreeItem itemType="leaf">
              <TreeItemPersonaLayout
                media={<Avatar image={{ alt: 'avatar' }} shape="square" />}
                description="square shape media"
              >
                level 2, item 2
              </TreeItemPersonaLayout>
            </TreeItem>
            <TreeItem itemType="leaf">
              <TreeItemPersonaLayout description="without media">level 2, item 3</TreeItemPersonaLayout>
            </TreeItem>
          </Tree>
        </TreeItem>
      </Tree>
    </>
  );
};

Layouts.parameters = {
  docs: {
    description: {
      story: `
Tree items support two layout components: \`TreeItemLayout\` and \`TreeItemPersonaLayout\`. Both of these layouts come with specific sets of properties, making them suitable for different use cases.

Please refer to the table at the top of this page for a detailed comparison of the properties available for both \`TreeItemLayout\` and \`TreeItemPersonaLayout\`. Notably, some properties like \`iconBefore\`, \`iconAfter\`, \`media\`, and \`description\` are unique to one layout or the other, enabling more specialized customization depending on your needs.
`,
    },
  },
};
