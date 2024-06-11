import * as React from 'react';
import {
  FlatTree,
  FlatTreeItem,
  TreeItemLayout,
  HeadlessFlatTreeItemProps,
  useHeadlessFlatTree_unstable,
  TreeItemValue,
} from '@fluentui/react-components';
import { makeStyles, Spinner } from '@fluentui/react-components';

const ITEMS_PER_PAGE = 10;
const MAX_PAGES = 4;

const pinnedItems = [
  { value: 'pinned', name: 'Pinned', id: 'pinned' },
  { value: 'pinned-item-1', parentValue: 'pinned', name: 'Pinned item 1' },
  { value: 'pinned-item-2', parentValue: 'pinned', name: 'Pinned item 2' },
  { value: 'pinned-item-3', parentValue: 'pinned', name: 'Pinned item 3' },
];

interface FetchResult {
  results: { name: string }[];
}

type CustomItem = HeadlessFlatTreeItemProps & { name: string | React.ReactNode };

const useStyles = makeStyles({
  container: {
    height: '400px',
    paddingBottom: '10px',
    overflow: 'auto',
  },
  screenReadersOnly: {
    position: 'absolute',
    width: '1px',
    height: '1px',
    margin: '-1',
    overflow: 'hidden',
    clip: 'rect(0,0,0,0)',
    whiteSpace: 'nowrap',
  },
});

export const InfiniteScrolling = () => {
  const [page, setPage] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(false);

  const [ariaMessage, setAriaMessage] = React.useState('');
  const itemToFocusRef = React.useRef<HTMLDivElement>(null);
  const [itemToFocusValue, setItemToFocusValue] = React.useState<TreeItemValue>();

  const peopleItems = useQuery<CustomItem[]>([
    { value: 'people', name: 'People' },
    ...Array.from({ length: ITEMS_PER_PAGE }, (_, index) => ({
      value: `person-${index + 1}`,
      parentValue: 'people',
      name: `Person ${index + 1}`,
    })),
  ]);

  const items = React.useMemo<CustomItem[]>(
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

  const fetchMoreItems = async () => {
    setIsLoading(true);
    setAriaMessage(`loading more people...`);

    const json = await mockFetchPeople(page);
    const fetchedItems = json.results.map<CustomItem>(person => ({
      value: `person-${person.name}`,
      parentValue: 'people',
      name: person.name,
    }));
    const firstNewItemValue = fetchedItems[0].value;

    await peopleItems.query(() => [...peopleItems.value, ...fetchedItems]);

    setIsLoading(false);
    setPage(prev => prev + 1);
    setAriaMessage(`${fetchedItems.length} new people loaded`);
    setItemToFocusValue(firstNewItemValue);
  };

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
    const hasReachedEnd = scrollHeight - scrollTop === clientHeight;

    if (!isLoading && hasReachedEnd && page < MAX_PAGES) {
      fetchMoreItems();
    }
  };

  React.useEffect(() => {
    if (itemToFocusRef.current) {
      itemToFocusRef.current.focus();
      setItemToFocusValue(undefined);
    }
  }, [itemToFocusValue]);

  return (
    <>
      <FlatTree
        {...flatTree.getTreeProps()}
        aria-label="Infinite Scrolling"
        onScroll={handleScroll}
        className={styles.container}
      >
        {Array.from(flatTree.items(), flatTreeItem => {
          const { name, value, ...treeItemProps } = flatTreeItem.getTreeItemProps();
          return (
            <FlatTreeItem
              {...treeItemProps}
              key={value}
              value={value}
              ref={value === itemToFocusValue ? itemToFocusRef : undefined}
            >
              <TreeItemLayout>{name}</TreeItemLayout>
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
  const query = (fn: () => Promise<Value> | Value) => {
    setQueryResult(curr => ({ ...curr, isLoading: true }));
    Promise.resolve(fn()).then(nextValue => {
      setQueryResult({ value: nextValue, isLoaded: true, isLoading: false });
    });
  };
  return { ...queryResult, query } as const;
}

function mockFetchPeople(page: number): Promise<FetchResult> {
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
      story: `
This example takes the previous lazy loading concept a step further by adding infinite scrolling. As the user navigates through the tree, additional items are loaded incrementally, enhancing the responsiveness and scalability of the tree.
      `,
    },
  },
};
