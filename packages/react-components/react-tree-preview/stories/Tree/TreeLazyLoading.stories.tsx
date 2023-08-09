import * as React from 'react';
import {
  FlatTree as Tree,
  TreeItem,
  TreeItemLayout,
  TreeOpenChangeData,
  TreeOpenChangeEvent,
  HeadlessFlatTreeItemProps,
  useHeadlessFlatTree_unstable,
} from '@fluentui/react-tree-preview';
import { Spinner } from '@fluentui/react-components';

interface Result {
  results: { name: string }[];
}

type Entity = HeadlessFlatTreeItemProps & { name: string };

export const LazyLoading = () => {
  const peopleTree = useQuery<Entity[]>([]);
  const planetsTree = useQuery<Entity[]>([]);
  const starshipsTree = useQuery<Entity[]>([]);
  const trees = {
    people: peopleTree,
    planets: planetsTree,
    starships: starshipsTree,
  };

  const tree = React.useMemo<Entity[]>(
    () => [
      {
        name: 'People',
        value: 'people',
        itemType: 'branch',
      },
      ...peopleTree.value,
      {
        name: 'Planets',
        value: 'planets',
        itemType: 'branch',
      },
      ...planetsTree.value,
      {
        name: 'Starship',
        value: 'starships',
        itemType: 'branch',
      },
      ...starshipsTree.value,
    ],
    [peopleTree, planetsTree, starshipsTree],
  );

  const handleOpenChange = (_: TreeOpenChangeEvent, data: TreeOpenChangeData) => {
    if (data.open) {
      if (
        (data.value === 'people' || data.value === 'planets' || data.value === 'starships') &&
        !trees[data.value].isLoaded
      ) {
        trees[data.value].query(() =>
          mockFetch(data.value as string).then((json: Result) =>
            json.results.map<Entity>(entity => ({
              value: `${data.value}/${entity.name}`,
              parentValue: data.value,
              name: entity.name,
            })),
          ),
        );
      }
    }
  };

  const flatTree = useHeadlessFlatTree_unstable(tree, { onOpenChange: handleOpenChange });
  const treeProps = flatTree.getTreeProps();
  return (
    <Tree {...treeProps} aria-label="Tree">
      {Array.from(flatTree.items(), item => {
        const { name, ...itemProps } = item.getTreeItemProps();
        const { isLoading = false } = trees[item.value as 'people' | 'planets' | 'starships'] ?? {};
        return (
          <TreeItem key={item.value} {...itemProps}>
            <TreeItemLayout expandIcon={isLoading ? <Spinner size="tiny" /> : undefined}>{name}</TreeItemLayout>
          </TreeItem>
        );
      })}
    </Tree>
  );
};

/**
 * This function is just for the sake of the example,
 * a library for fetching data (like react-query) might be a better option
 */
function useQuery<Value>(initialValue: Value) {
  const [queryResult, setQueryResult] = React.useState({ value: initialValue, isLoading: false, isLoaded: false });
  const query = (fn: () => Promise<Value> | Value) => {
    setQueryResult(curr => ({ ...curr, isLoading: true }));
    Promise.resolve(fn()).then(nextValue => {
      setQueryResult({ value: nextValue, isLoaded: true, isLoading: false });
    });
  };
  return { ...queryResult, query } as const;
}

const mockFetch = (type: string) => {
  return new Promise<Result>(resolve => {
    setTimeout(() => {
      const mockData: Result = {
        results: Array.from({ length: 10 }, (_, index) => ({
          name: `${type.charAt(0).toUpperCase() + type.slice(1)} ${index + 1}`,
        })),
      };
      resolve(mockData);
    }, 1000);
  });
};

LazyLoading.parameters = {
  docs: {
    description: {
      story: `
This example shows lazy loading in a flat tree, where data is loaded on-demand to optimize rendering time and performance. Items are dynamically loaded when necessary.
      `,
    },
  },
};
