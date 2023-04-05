import * as React from 'react';
import {
  Tree,
  TreeItem,
  TreeItemLayout,
  TreeItemProps,
  flattenTree_unstable,
  useFlatTree_unstable,
} from '@fluentui/react-tree';
import { Delete20Regular } from '@fluentui/react-icons';
import { Button, Menu, MenuItem, MenuList, MenuPopover, MenuTrigger } from '@fluentui/react-components';
import story from './TreeItemAddRemove.md';

type RemoveableTreeItemProps = TreeItemProps & {
  id: string;
  onRemove: (id: string) => void;
};

const data = [
  {
    name: 'level 1, item 1',
    children: [
      {
        name: 'level 2, item 1',
        children: [],
      },
      {
        name: 'level 2, item 2',
        children: [],
      },
      {
        name: 'level 2, item 3',
        children: [],
      },
    ],
  },
  {
    name: 'level 1, item 2',
    children: [
      {
        name: 'level 2, item 1',
        children: [
          {
            name: 'level 3, item 1',
            children: [
              {
                name: 'level 4, item 1',
                children: [],
              },
            ],
          },
        ],
      },
    ],
  },
];

const defaultItems = flattenTree_unstable([
  {
    children: <TreeItemLayout>level 1, item 1</TreeItemLayout>,
    subtree: [
      {
        children: <TreeItemLayout>level 2, item 1</TreeItemLayout>,
      },
      {
        children: <TreeItemLayout>level 2, item 2</TreeItemLayout>,
      },
      {
        children: <TreeItemLayout>level 2, item 3</TreeItemLayout>,
      },
    ],
  },
  {
    children: <TreeItemLayout>level 1, item 2</TreeItemLayout>,
    subtree: [
      {
        children: <TreeItemLayout>level 2, item 1</TreeItemLayout>,
        subtree: [
          {
            children: <TreeItemLayout>level 3, item 1</TreeItemLayout>,
            subtree: [
              {
                children: <TreeItemLayout>level 4, item 1</TreeItemLayout>,
              },
            ],
          },
        ],
      },
    ],
  },
]);

const TreeItemActions = ({ onRemove }: { onRemove: () => void }) => {
  return (
    <Menu>
      <MenuTrigger>
        <Button appearance="subtle" aria-label="Remove item menu" icon={<Delete20Regular />} />
      </MenuTrigger>
      <MenuPopover>
        <MenuList>
          <MenuItem onClick={onRemove}>Remove item</MenuItem>
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};

const RemoveableTreeItem = ({ id, onRemove, ...rest }: RemoveableTreeItemProps) => {
  const handleRemove = () => onRemove(id);
  return <TreeItem id={id} {...rest} actions={<TreeItemActions onRemove={handleRemove} />} />;
};

export const AddRemoveTreeItem = () => {
  const [items, setItems] = React.useState(defaultItems);
  const flatTree = useFlatTree_unstable(items);

  const handleAddItem = () => {
    // TODO: add item
  };

  const handleRemoveItem = (itemId: string) => {
    const updatedItems = items.filter(item => item.id !== itemId);
    setItems([...updatedItems]);
  };

  return (
    <>
      <Button onClick={handleAddItem}>Add item</Button>
      <Tree {...flatTree.getTreeProps()} aria-label="Tree">
        {Array.from(flatTree.items(), item => (
          <RemoveableTreeItem {...item.getTreeItemProps()} key={item.id} onRemove={handleRemoveItem} />
        ))}
      </Tree>
    </>
  );
};

AddRemoveTreeItem.parameters = {
  docs: {
    description: {
      story,
    },
  },
};
