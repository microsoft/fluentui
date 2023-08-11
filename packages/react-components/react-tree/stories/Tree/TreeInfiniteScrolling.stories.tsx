import * as React from 'react';
import {
  FlatTree as Tree,
  TreeItem,
  TreeItemLayout,
  HeadlessFlatTreeItemProps,
  useHeadlessFlatTree_unstable,
} from '@fluentui/react-tree';
import { makeStyles, shorthands, Spinner } from '@fluentui/react-components';

const ITEMS_PER_PAGE = 10;
const MAX_PAGES = 4;

const pinnedItems = [
  { value: 'pinned', name: 'Pinned', id: 'pinned' },
  { value: 'pinned-item-1', parentValue: 'pinned', name: 'Pinned item 1' },
  { value: 'pinned-item-2', parentValue: 'pinned', name: 'Pinned item 2' },
  { value: 'pinned-item-3', parentValue: 'pinned', name: 'Pinned item 3' },
];

interface Result {
  results: { name: string }[];
}

type Item = HeadlessFlatTreeItemProps & { name: string | React.ReactNode };

const useStyles = makeStyles({
  container: {
    height: '400px',
    paddingBottom: '10px',
    ...shorthands.overflow('auto'),
  },
});

export const InfiniteScrolling = () => {
  const [page, setPage] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(false);
  const peopleItems = useQuery<Item[]>([
    { value: 'people', name: 'People' },
    ...Array.from({ length: ITEMS_PER_PAGE }, (_, index) => ({
      value: `person-${index + 1}`,
      parentValue: 'people',
      name: `Person ${index + 1}`,
    })),
  ]);

  const items = React.useMemo<Item[]>(
    () => [
      ...pinnedItems,
      ...peopleItems.value,
      ...(isLoading
        ? [
            {
              value: 'loading-people',
              parentValue: 'people',
              name: <Spinner aria-label="Loading more people" size="tiny" />,
            },
          ]
        : []),
    ],
    [isLoading, peopleItems],
  );

  const styles = useStyles();

  const flatTree = useHeadlessFlatTree_unstable(items, { defaultOpenItems: ['pinned', 'people'] });

  const fetchMoreItems = () => {
    setIsLoading(true);

    mockFetchPeople(page).then((json: Result) => {
      const fetchedItems = json.results.map<Item>(person => ({
        value: `person-${person.name}`,
        parentValue: 'people',
        name: person.name,
      }));

      setIsLoading(false);
      setPage(prev => prev + 1);
      peopleItems.query(() => [...peopleItems.value, ...fetchedItems]);
    });
  };

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
    const hasReachedEnd = scrollHeight - scrollTop === clientHeight;

    if (!isLoading && hasReachedEnd && page < MAX_PAGES) {
      fetchMoreItems();
    }
  };

  return (
    <Tree {...flatTree.getTreeProps()} aria-label="Tree" onScroll={handleScroll} className={styles.container}>
      {Array.from(flatTree.items(), flatTreeItem => {
        const { name, ...treeItemProps } = flatTreeItem.getTreeItemProps();
        return (
          <TreeItem {...treeItemProps} key={flatTreeItem.value}>
            <TreeItemLayout>{name}</TreeItemLayout>
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

function mockFetchPeople(page: number): Promise<Result> {
  return new Promise(resolve => {
    setTimeout(() => {
      const startIndex = page * ITEMS_PER_PAGE + 1;
      const results = Array.from({ length: ITEMS_PER_PAGE }, (_, index) => ({
        name: `Person ${startIndex + index}`,
      }));

      resolve({ results });
    }, 1000);
  });
}

InfiniteScrolling.parameters = {
  docs: {
    description: {
      story:
        'This example takes the previous lazy loading concept a step further by adding infinite scrolling. As the user navigates through the tree, additional items are loaded incrementally, enhancing the responsiveness and scalability of the tree.',
    },
  },
};
