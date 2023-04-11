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
];

const getTreeAddButton = (buttonId: string, parentId: string, addNewItem: () => void) => [
  {
    id: buttonId,
    parentId,
    children: <TreeItemLayout onClick={addNewItem}>Add new item</TreeItemLayout>,
  },
];

const TreeItemActions = ({ onRemove }: { onRemove: () => void }) => (
  <Button aria-label="Remove item" appearance="subtle" onClick={onRemove} icon={<Delete20Regular />} />
);

type RemoveableTreeItemProps = TreeItemProps & {
  id: string;
  onRemove: (id: string) => void;
};
const RemoveableTreeItem = ({ id, onRemove, ...rest }: RemoveableTreeItemProps) => {
  const handleRemove = () => onRemove(id);

  return <TreeItem id={id} {...rest} actions={<TreeItemActions onRemove={handleRemove} />} />;
};

export const AddRemoveTreeItem = () => {
  const [firstTree, setFirstTree] = React.useState(firstItems);
  const [secondTree, setSecondTree] = React.useState(secondItems);

  const flatTree = useFlatTree_unstable(
    [
      ...firstTree,
      ...getTreeAddButton('1-btn', '1', () => handleAddItem(firstTree, setFirstTree)),
      ...secondTree,
      ...getTreeAddButton('2-btn', '2', () => handleAddItem(secondTree, setSecondTree)),
    ],
    { defaultOpenItems: ['1', '2'] },
  );

  const handleAddItem = (tree: FlatTreeItemProps[], setTree: (items: FlatTreeItemProps[]) => void) => {
    const lastItem = tree[tree.length - 1];
    const lastItemIdParts = lastItem.id.split('-');
    const newItemId =
      lastItemIdParts.length > 1
        ? lastItemIdParts
            .slice(0, -1)
            .concat(String(Number(lastItemIdParts.slice(-1)[0]) + 1))
            .join('-')
        : `${lastItem.id}-1`;

    const newItem: FlatTreeItemProps = {
      id: newItemId,
      parentId: lastItem.parentId ? lastItem.parentId : lastItem.id,
      children: <TreeItemLayout>New item {newItemId}</TreeItemLayout>,
    };

    setTree([...tree, newItem]);
  };

  const handleRemoveItem = (itemId: string) => {
    const isFirstTree = itemId.startsWith('1');
    const tree = isFirstTree ? firstTree : secondTree;
    const updatedItems = tree.filter(item => item.id !== itemId);
    (isFirstTree ? setFirstTree : setSecondTree)([...updatedItems]);
  };

  return (
    <Tree {...flatTree.getTreeProps()} aria-label="Tree">
      {Array.from(flatTree.items(), item =>
        item.id.length === 1 || item.id.includes('btn') ? (
          <TreeItem {...item.getTreeItemProps()} key={item.id} />
        ) : (
          <RemoveableTreeItem {...item.getTreeItemProps()} key={item.id} onRemove={handleRemoveItem} />
        ),
      )}
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
