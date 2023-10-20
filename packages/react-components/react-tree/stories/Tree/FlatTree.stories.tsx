import * as React from 'react';
import {
  FlatTree,
  FlatTreeItem,
  TreeItemLayout,
  TreeItemValue,
  TreeOpenChangeData,
  TreeOpenChangeEvent,
} from '@fluentui/react-components';

export const FlatTreeStory = () => {
  const [openItems, setOpenItems] = React.useState<Set<TreeItemValue>>(() => new Set());
  const handleOpenChange = (event: TreeOpenChangeEvent, data: TreeOpenChangeData) => {
    setOpenItems(data.openItems);
  };
  return (
    <FlatTree openItems={openItems} onOpenChange={handleOpenChange} aria-label="Flat Tree">
      <FlatTreeItem value="1" aria-level={1} aria-setsize={2} aria-posinset={1} itemType="branch">
        <TreeItemLayout>Item 1, level 1</TreeItemLayout>
      </FlatTreeItem>
      {openItems.has('1') && (
        <>
          <FlatTreeItem parentValue="1" value="1-1" aria-level={2} aria-setsize={2} aria-posinset={1} itemType="leaf">
            <TreeItemLayout>Item 1, level 2</TreeItemLayout>
          </FlatTreeItem>
          <FlatTreeItem parentValue="1" value="1-2" aria-level={2} aria-setsize={2} aria-posinset={2} itemType="leaf">
            <TreeItemLayout>Item 1, level 2</TreeItemLayout>
          </FlatTreeItem>
        </>
      )}
      <FlatTreeItem value="2" aria-level={1} aria-setsize={2} aria-posinset={1} itemType="branch">
        <TreeItemLayout>Item 1, level 1</TreeItemLayout>
      </FlatTreeItem>
      {openItems.has('2') && (
        <>
          <FlatTreeItem parentValue="2" value="2-1" aria-level={2} aria-setsize={3} aria-posinset={1} itemType="leaf">
            <TreeItemLayout>Item 1, level 2</TreeItemLayout>
          </FlatTreeItem>
          <FlatTreeItem parentValue="2" value="2-2" aria-level={2} aria-setsize={3} aria-posinset={2} itemType="leaf">
            <TreeItemLayout>Item 2, level 2</TreeItemLayout>
          </FlatTreeItem>
          <FlatTreeItem parentValue="2" value="2-3" aria-level={2} aria-setsize={3} aria-posinset={3} itemType="leaf">
            <TreeItemLayout>Item 3, level 2</TreeItemLayout>
          </FlatTreeItem>
        </>
      )}
    </FlatTree>
  );
};

FlatTreeStory.parameters = {
  docs: {
    description: {
      story: `
The \`FlatTree\` component is a simplified version of \`Tree\`. It enables a more efficient and flexible way to manage tree structures by representing them in a flattened format. Unlike nested trees, flat trees simplify many common tasks such as searching or adding/removing items, and they are essential for supporting features like virtualization.

To ensure a \`FlatTree\` works accordingly a few more properties should be provided for each \`TreeItem\`:

- [\`aria-posinset\`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-posinset): the position of the treeitem in the current level of the tree.
- [\`aria-setsize\`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-setsize): the number of siblings in a level of the tree.
- [\`aria-level\`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-level): the current level of the treeitem.
- \`parentValue\`: the \`value\` property of the parent item of the current item.

> \`FlatTreeItem\` component is available to ensure those properties are properly provided (it's equivalent to \`TreeItem\` but with those properties listed above as required).

Another limitation of the \`FlatTree\` is that it becomes the user's responsibility to ensure proper open items are visible,
Since in a flat structure there's no proper way to assume if an item is visible or not by context.

> Take a look at the [\`useHeadlessFlatTree\`](#use-headless-flat-tree) hook to delegate the responsibility of filtering visible items and also to ensure proper properties are added to each \`TreeItem\`.

> If you need to utilize a nested tree with \`FlatTree\`, simply convert it to the flat format using the \`flattenTree\` helper.
      `,
    },
  },
};
