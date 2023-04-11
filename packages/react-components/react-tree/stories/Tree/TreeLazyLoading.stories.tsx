import * as React from 'react';
import {
  FlatTreeItem,
  FlatTreeItemProps,
  Tree,
  TreeItem,
  TreeItemId,
  TreeItemLayout,
  TreeOpenChangeData,
  TreeOpenChangeEvent,
  useFlatTree_unstable,
} from '@fluentui/react-tree';
import { Spinner } from '@fluentui/react-components';
import story from './TreeLazyLoading.md';

const defaultItems: FlatTreeItemProps[] = [
  {
    id: '1',
    children: <TreeItemLayout>Level 1, item 1</TreeItemLayout>,
  },

  {
    id: '2',
    children: <TreeItemLayout>Level 1, item 2</TreeItemLayout>,
  },
];

const firstTree = [
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

const secondTree = [
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

interface LazyTreeItemProps {
  item: FlatTreeItem;
  setTree: React.Dispatch<React.SetStateAction<FlatTreeItemProps[]>>;
  isOpen: boolean;
  leaf?: boolean;
}

const LazyTreeItem = ({ item, setTree, isOpen, leaf = false }: LazyTreeItemProps) => {
  const [loading, setLoading] = React.useState(false);
  const [isLoaded, setIsLoaded] = React.useState(false);

  const loadSubtree = async (itemId: string) => {
    if (!isOpen && !leaf) {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setLoading(false);
      setTree(prevTree => [
        ...prevTree.reduce<FlatTreeItemProps[]>((accumulator, itm) => {
          accumulator.push(itm);
          if (itemId === '1' && itm.id === '1') {
            accumulator.push(...firstTree);
          } else if (itemId === '2' && itm.id === '2') {
            accumulator.push(...secondTree);
          }
          return accumulator;
        }, []),
      ]);
      setIsLoaded(true);
    }
  };

  const handleClick = () => {
    if (!loading && !isLoaded) {
      loadSubtree(item.id);
    }
  };

  return (
    <TreeItem
      {...item.getTreeItemProps()}
      key={item.id}
      leaf={leaf}
      onClick={handleClick}
      expandIcon={loading ? <Spinner size="tiny" /> : undefined}
    />
  );
};

export const LazyLoading = () => {
  const [openItems, setOpenItems] = React.useState<TreeItemId[]>([]);
  const handleOpenChange = (_e: TreeOpenChangeEvent, data: TreeOpenChangeData) => {
    setOpenItems(curr => (data.open ? [...curr, data.target.id] : curr.filter(id => id !== data.target.id)));
  };
  const [tree, setTree] = React.useState(defaultItems);
  const flatTree = useFlatTree_unstable([...tree], {
    openItems,
    onOpenChange: handleOpenChange,
  });

  return (
    <Tree {...flatTree.getTreeProps()} aria-label="Tree">
      {Array.from(flatTree.items(), item => (
        <LazyTreeItem
          key={item.id}
          item={item}
          setTree={setTree}
          leaf={item.id.length !== 1}
          isOpen={openItems.includes(item.id)}
        />
      ))}
    </Tree>
  );
};

LazyLoading.parameters = {
  docs: {
    description: {
      story,
    },
  },
};
