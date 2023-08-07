import * as React from 'react';
import {
  FlatTree as Tree,
  TreeItem,
  // flattenTree_unstable,
  // TreeItemProps,
  TreeItemLayout,
  useHeadlessFlatTree_unstable,
  HeadlessFlatTreeItemProps,
} from '@fluentui/react-tree';
import {
  Button,
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  useRestoreFocusTarget,
} from '@fluentui/react-components';
import { Edit20Regular, MoreHorizontal20Regular } from '@fluentui/react-icons';

type FlatItem = HeadlessFlatTreeItemProps & { content: string };

const flatTreeItems: FlatItem[] = [
  { value: '1', content: 'Level 1, item 1' },
  { value: '1-1', parentValue: '1', content: 'Level 2, item 1' },
  { value: '1-2', parentValue: '1', content: 'Level 2, item 2' },
  { value: '1-3', parentValue: '1', content: 'Level 2, item 3' },
  { value: '2', content: 'Level 1, item 2' },
  { value: '2-1', parentValue: '2', content: 'Level 2, item 1' },
  { value: '2-1-1', parentValue: '2-1', content: 'Level 3, item 1' },
  { value: '2-1-1-1', parentValue: '2-1-1', content: 'Level 4, item 1' },
];

// // EXAMPLE OF NESTED TREE ITEMS BEING FLATTEN BY `flattenTree`:
// type Item = TreeItemProps & { content: React.ReactNode };

// const nestedTreeItems = [
//   {
//     value: '1',
//     content: <>level 1, item 1</>,
//     subtree: [
//       {
//         value: '1-1',
//         content: <>level 2, item 1</>,
//       },
//       {
//         value: '1-2',
//         content: <>level 2, item 2</>,
//       },
//       {
//         value: '1-3',
//         content: <>level 2, item 3</>,
//       },
//     ],
//   },
//   {
//     value: '2',
//     content: <>level 1, item 2</>,
//     subtree: [
//       {
//         value: '2-1',
//         content: <>level 2, item 1</>,
//         subtree: [
//           {
//             value: '2-1-1',
//             content: <>level 3, item 1</>,
//             subtree: [
//               {
//                 value: '2-1-1-1',
//                 content: <>level 4, item 1</>,
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   },
// ];

// const flatTreeItems = flattenTree_unstable<Item>(nestedTreeItems);

const ActionsExample = () => (
  <>
    <Button aria-label="Edit" appearance="subtle" icon={<Edit20Regular />} />
    <Menu>
      <MenuTrigger disableButtonEnhancement>
        <Button aria-label="More options" appearance="subtle" icon={<MoreHorizontal20Regular />} />
      </MenuTrigger>

      <MenuPopover>
        <MenuList>
          <MenuItem>New</MenuItem>
          <MenuItem>New Window</MenuItem>
          <MenuItem disabled>Open File</MenuItem>
          <MenuItem>Open Folder</MenuItem>
        </MenuList>
      </MenuPopover>
    </Menu>
  </>
);

export const FlatTree = () => {
  const flatTree = useHeadlessFlatTree_unstable(flatTreeItems);
  const focusTargetAttribute = useRestoreFocusTarget();

  return (
    <Tree {...flatTree.getTreeProps()} aria-label="Tree">
      {Array.from(flatTree.items(), flatTreeItem => {
        const { content, ...treeItemProps } = flatTreeItem.getTreeItemProps();
        return (
          <Menu key={flatTreeItem.value} positioning="below-end" openOnContext>
            <MenuTrigger disableButtonEnhancement>
              <TreeItem aria-description="has context menu" {...focusTargetAttribute} {...treeItemProps}>
                <TreeItemLayout actions={<ActionsExample />}>{content}</TreeItemLayout>
              </TreeItem>
            </MenuTrigger>
            <MenuPopover>
              <MenuList>
                <MenuItem>Edit</MenuItem>
                <MenuItem>New</MenuItem>
                <MenuItem>New Window</MenuItem>
                <MenuItem disabled>Open File</MenuItem>
                <MenuItem>Open Folder</MenuItem>
              </MenuList>
            </MenuPopover>
          </Menu>
        );
      })}
    </Tree>
  );
};

FlatTree.parameters = {
  docs: {
    description: {
      story: `The \`FlatTree\` component enables a more efficient and flexible way to manage tree structures by representing them in a flattened format. Unlike nested trees, flat trees simplify many common tasks such as searching or adding/removing items, and they are essential for supporting features like virtualization.

If you need to utilize a nested tree with \`FlatTree\`, simply convert it to the flat format using the \`flattenTree\` helper.`,
    },
  },
};
