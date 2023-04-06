import * as React from 'react';
import {
  FlatTreeItemProps,
  Tree,
  TreeItem,
  TreeItemLayout,
  TreeItemProps,
  useFlatTree_unstable,
} from '@fluentui/react-tree';
import { Delete20Regular } from '@fluentui/react-icons';
import { Button } from '@fluentui/react-components';
import story from './TreeItemAddRemove.md';

const firstItems: FlatTreeItemProps[] = [
  {
    id: '1',
    children: <TreeItemLayout>Level 1, item 1</TreeItemLayout>,
  },
  {
    id: '1-1',
    parentId: '1',
    children: <TreeItemLayout>Level 2, item 1</TreeItemLayout>,
  },
  {
    id: '1-2',
    parentId: '1',
    children: <TreeItemLayout>Level 2, item 2</TreeItemLayout>,
  },
  {
    id: '1-3',
    parentId: '1',
    children: <TreeItemLayout>Level 2, item 3</TreeItemLayout>,
  },
];

const secondItems: FlatTreeItemProps[] = [
  {
    id: '2',
    children: <TreeItemLayout>Level 1, item 2</TreeItemLayout>,
  },
  {
    id: '2-1',
    parentId: '2',
    children: <TreeItemLayout>Level 2, item 1</TreeItemLayout>,
  },
  {
    id: '2-2',
    parentId: '2',
    children: <TreeItemLayout>Level 2, item 2</TreeItemLayout>,
  },
];

const getTreeAddButton = (lastItemId: string, parentId?: string) => {
  const array = lastItemId.split('-');
  const ida = Number(array[array.length - 1]) + 1;
  const id = `${parentId}-${String(ida)}`;
  return [
    {
      id,
      parentId,
      children: <Button>Add new item</Button>,
    },
  ];
};

const TreeItemActions = ({ onAdd, onRemove }: { onAdd: () => void; onRemove: () => void }) => (
  <Button aria-label="Remove item menu" appearance="subtle" onClick={onRemove} icon={<Delete20Regular />} />
);

type RemoveableTreeItemProps = TreeItemProps & {
  id: string;
  onAdd: (id: string) => void;
  onRemove: (id: string) => void;
};
const RemoveableTreeItem = ({ id, onAdd, onRemove, ...rest }: RemoveableTreeItemProps) => {
  const handleAdd = () => onAdd(id);
  const handleRemove = () => onRemove(id);
  return <TreeItem id={id} {...rest} actions={<TreeItemActions onAdd={handleAdd} onRemove={handleRemove} />} />;
};

export const AddRemoveTreeItem = () => {
  const [firstTree, setFirstTree] = React.useState(firstItems);
  const [secondTree, setSecondTree] = React.useState(secondItems);

  const flatTree = useFlatTree_unstable([
    ...firstTree,
    ...getTreeAddButton(firstTree[firstTree.length - 1].id, `${firstTree[firstTree.length - 1].parentId}-btn`),
    ...secondTree,
    // ...getTreeAddButton(secondTree[secondTree.length - 1].id, `${secondTree[secondTree.length - 1].parentId}-btn`),
  ]);

  // const handleAddItem = items => {
  //   const item = items.find(i => i.id === itemId);
  //   if (item) {
  //     const updatedItems = [
  //       ...items,
  //       {
  //         id: `${item.parentId}-1`,
  //         parentId: itemId,
  //         children: <TreeItemLayout>New item</TreeItemLayout>,
  //       },
  //     ];
  //     setItems([...updatedItems]);
  //   }
  // };

  const handleRemoveItem = (itemId: string) => {
    const isFirstTree = itemId.startsWith('1');
    const tree = isFirstTree ? firstTree : secondTree;
    const updatedItems = tree.filter(item => item.id !== itemId);
    (isFirstTree ? setFirstTree : setSecondTree)([...updatedItems]);
  };

  return (
    <Tree {...flatTree.getTreeProps()} aria-label="Tree">
      {Array.from(flatTree.items(), item => (
        <RemoveableTreeItem
          {...item.getTreeItemProps()}
          key={item.id}
          onAdd={() => false}
          onRemove={handleRemoveItem}
        />
      ))}
    </Tree>
  );
};

AddRemoveTreeItem.parameters = {
  docs: {
    description: {
      story,
    },
  },
};
