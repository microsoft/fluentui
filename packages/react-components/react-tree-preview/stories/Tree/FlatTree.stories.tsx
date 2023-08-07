import * as React from 'react';
import {
  FlatTree as Tree,
  TreeItem,
  // flattenTree_unstable,
  // TreeItemProps,
  TreeItemLayout,
  useHeadlessFlatTree_unstable,
  HeadlessFlatTreeItemProps,
} from '@fluentui/react-tree-preview';

type FlatItem = HeadlessFlatTreeItemProps & { layout: string };

const flatTreeItems: FlatItem[] = [
  { value: '1', layout: 'Level 1, item 1' },
  { value: '1-1', parentValue: '1', layout: 'Level 2, item 1' },
  { value: '1-2', parentValue: '1', layout: 'Level 2, item 2' },
  { value: '1-3', parentValue: '1', layout: 'Level 2, item 3' },
  { value: '2', layout: 'Level 1, item 2' },
  { value: '2-1', parentValue: '2', layout: 'Level 2, item 1' },
  { value: '2-1-1', parentValue: '2-1', layout: 'Level 3, item 1' },
  { value: '2-1-1-1', parentValue: '2-1-1', layout: 'Level 4, item 1' },
];

// // EXAMPLE OF NESTED TREE ITEMS BEING FLATTEN BY `flattenTree`:
// type Item = TreeItemProps & { layout: React.ReactNode };

// const nestedTreeItems = [
//   {
//     value: '1',
//     layout: <>level 1, item 1</>,
//     subtree: [
//       {
//         value: '1-1',
//         layout: <>level 2, item 1</>,
//       },
//       {
//         value: '1-2',
//         layout: <>level 2, item 2</>,
//       },
//       {
//         value: '1-3',
//         layout: <>level 2, item 3</>,
//       },
//     ],
//   },
//   {
//     value: '2',
//     layout: <>level 1, item 2</>,
//     subtree: [
//       {
//         value: '2-1',
//         layout: <>level 2, item 1</>,
//         subtree: [
//           {
//             value: '2-1-1',
//             layout: <>level 3, item 1</>,
//             subtree: [
//               {
//                 value: '2-1-1-1',
//                 layout: <>level 4, item 1</>,
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   },
// ];

// const flatTreeItems = flattenTree_unstable<Item>(nestedTreeItems);

export const FlatTree = () => {
  const virtualTree = useHeadlessFlatTree_unstable(flatTreeItems);
  return (
    <Tree {...virtualTree.getTreeProps()} aria-label="Tree">
      {Array.from(virtualTree.items(), item => {
        const { layout, ...itemProps } = item.getTreeItemProps();
        return (
          <TreeItem {...itemProps} key={item.value}>
            <TreeItemLayout>{layout}</TreeItemLayout>
          </TreeItem>
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
