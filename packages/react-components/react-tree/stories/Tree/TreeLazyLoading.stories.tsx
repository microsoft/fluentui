import * as React from 'react';
import {
  FlatTree,
  FlatTreeItem,
  TreeItemLayout,
  TreeOpenChangeData,
  TreeOpenChangeEvent,
  HeadlessFlatTreeItemProps,
  useHeadlessFlatTree_unstable,
  TreeItemValue,
} from '@fluentui/react-components';
import { makeStyles, Spinner, shorthands } from '@fluentui/react-components';

interface Result {
  results: { name: string }[];
}

type Entity = HeadlessFlatTreeItemProps & { name: string };

const useStyles = makeStyles({
  screenReadersOnly: {
    position: 'absolute',
    width: '1px',
    height: '1px',
    ...shorthands.margin('-1'),
    ...shorthands.overflow('hidden'),
    clip: 'rect(0,0,0,0)',
    whiteSpace: 'nowrap',
  },
});

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

  const [ariaMessage, setAriaMessage] = React.useState('');
  const itemToFocusRef = React.useRef<HTMLDivElement>(null);
  const [itemToFocusValue, setItemToFocusValue] = React.useState<TreeItemValue>();

  const handleOpenChange = async (_: TreeOpenChangeEvent, data: TreeOpenChangeData) => {
    if (data.open) {
      if (
        (data.value === 'people' || data.value === 'planets' || data.value === 'starships') &&
        !trees[data.value].isLoaded
      ) {
        setAriaMessage(`loading ${data.value} items...`);

        trees[data.value].query(
          async () => {
            const json = await mockFetch(data.value as string);
            return json.results.map<Entity>(entity => ({
              value: `${data.value}/${entity.name}`,
              parentValue: data.value,
              name: entity.name,
            }));
          },
          (entities: Entity[]) => {
            const firstItemValue = entities[0].value;
            if (firstItemValue) {
              setItemToFocusValue(firstItemValue);
              setAriaMessage(`${data.value} items loaded`);
            }
          },
        );
      }
    }
  };

  React.useEffect(() => {
    if (itemToFocusRef.current) {
      itemToFocusRef.current.focus();
      setItemToFocusValue(undefined);
    }
  }, [itemToFocusValue]);

  const flatTree = useHeadlessFlatTree_unstable(tree, { onOpenChange: handleOpenChange });
  const treeProps = flatTree.getTreeProps();
  return (
    <>
      <FlatTree {...treeProps} aria-label="Lazy Loading">
        {Array.from(flatTree.items(), item => {
          const { name, ...itemProps } = item.getTreeItemProps();
          const { isLoading = false } = trees[item.value as 'people' | 'planets' | 'starships'] ?? {};
          return (
            <FlatTreeItem
              key={item.value}
              {...itemProps}
              ref={item.value === itemToFocusValue ? itemToFocusRef : undefined}
            >
              <TreeItemLayout expandIcon={isLoading ? <Spinner size="tiny" /> : undefined}>{name}</TreeItemLayout>
            </FlatTreeItem>
          );
        })}
      </FlatTree>
      <AriaLive content={ariaMessage} />
    </>
  );
};

const AriaLive = ({ content }: { content: string | undefined }) => {
  const styles = useStyles();
  return (
    <div aria-live="polite" aria-atomic="true" className={styles.screenReadersOnly}>
      {content}
    </div>
  );
};

/**
 * This function is just for the sake of the example,
 * a library for fetching data (like react-query) might be a better option
 */
function useQuery<Value>(initialValue: Value) {
  const [queryResult, setQueryResult] = React.useState({ value: initialValue, isLoading: false, isLoaded: false });
  const query = (fn: () => Promise<Value> | Value, onDone?: (data: Value) => void) => {
    setQueryResult(curr => ({ ...curr, isLoading: true }));
    Promise.resolve(fn()).then(nextValue => {
      setQueryResult({ value: nextValue, isLoaded: true, isLoading: false });
      if (onDone) {
        onDone(nextValue);
      }
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
