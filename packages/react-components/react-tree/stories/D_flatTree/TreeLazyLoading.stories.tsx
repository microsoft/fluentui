import * as React from 'react';
import {
  FlatTreeItemProps,
  Tree,
  TreeItem,
  TreeItemLayout,
  TreeOpenChangeData,
  TreeOpenChangeEvent,
  useFlatTree_unstable,
} from '@fluentui/react-tree';
import story from './TreeLazyLoading.md';
import { Spinner } from '@fluentui/react-components';

interface Result {
  results: { name: string }[];
}

type Entity = FlatTreeItemProps & { name: string };

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
        leaf: false,
      },
      ...peopleTree.value,
      {
        name: 'Planets',
        value: 'planets',
        leaf: false,
      },
      ...planetsTree.value,
      {
        name: 'Starship',
        value: 'starships',
        leaf: false,
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
          fetch(`https://swapi.dev/api/${data.value}`)
            .then(result => result.json())
            .then((json: Result) =>
              json.results.map<Entity>(people => ({
                value: `${data.value}/${people.name}`,
                parentValue: data.value,
                name: people.name,
              })),
            ),
        );
      }
    }
  };

  const flatTree = useFlatTree_unstable(tree, { onOpenChange: handleOpenChange });
  const treeProps = flatTree.getTreeProps();
  return (
    <Tree {...treeProps} aria-label="Tree">
      {Array.from(flatTree.items(), item => {
        const { name, ...itemProps } = item.getTreeItemProps();
        const { isLoading = false } = trees[item.value as 'people' | 'planets' | 'starships'] ?? {};
        return (
          <TreeItem expandIcon={isLoading ? <Spinner size="tiny" /> : undefined} key={item.value} {...itemProps}>
            <TreeItemLayout>{name}</TreeItemLayout>
          </TreeItem>
        );
      })}
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
