import * as React from 'react';
import {
  TriangleDownIcon,
  TreeTitleProps,
  TriangleEndIcon,
  ObjectShorthandCollection,
  TreeItemProps,
  Loader,
} from '@fluentui/react-northstar';
import { VirtualStickyTreePagination } from './VirtualStickyTreePagination';
import { getAllStickyHeaders, splitItemsToPages } from './paginationItemsGenerator';

const NUM_OF_PAGE = 5;
let pageIndex = 1;

const FETCH_TIMEOUT = 3000;
const allStickyHeaders: ObjectShorthandCollection<Omit<TreeItemProps, 'items'>> = getAllStickyHeaders();

const getLoader = (id: string) => ({
  id,
  title: {
    content: <Loader />,
    style: { display: 'flex', height: '100%' },
  },
});

/**
 * During pagination, it can happen that some sticky headers are not loaded.
 * In this case, we still render the unloaded sticky headers, with a loader as child item.
 * The loader item will be replaced with real items on load.
 * @param currItems
 */
const addUnloadesStickyItems = (currItems: ObjectShorthandCollection<TreeItemProps>) => {
  const lastLoadedSticky = currItems[currItems.length - 1];
  lastLoadedSticky.items.push(getLoader(`loader-${lastLoadedSticky.id}`));

  allStickyHeaders.forEach(stickyHeader => {
    if (!currItems.filter(item => item.id === stickyHeader.id).length) {
      currItems.push({ ...stickyHeader, items: [getLoader(`loader-${stickyHeader.id}`)] });
    }
  });
};

const getNthPage = (pageIndex: number) => {
  const currItems = splitItemsToPages(NUM_OF_PAGE)(pageIndex);
  if (pageIndex < NUM_OF_PAGE - 1) {
    addUnloadesStickyItems(currItems);
  }
  return currItems;
};
const initialItems = getNthPage(0);

const CustomTreeTitle = (
  Component: React.ElementType<TreeTitleProps>,
  { content, expanded, hasSubtree, ...restProps }: TreeTitleProps,
) => (
  <Component expanded={expanded} hasSubtree={hasSubtree} {...restProps}>
    {hasSubtree && (expanded ? <TriangleDownIcon /> : <TriangleEndIcon />)}
    {content}
  </Component>
);

const itemToString = item => item.title;

const fetchData = () => {
  return new Promise<{ items: any; hasNextPage: boolean }>(resolve =>
    setTimeout(() => {
      const result = {
        items: getNthPage(pageIndex),
        hasNextPage: pageIndex < NUM_OF_PAGE - 1,
      };
      pageIndex++;
      resolve(result);
    }, FETCH_TIMEOUT),
  );
};

const VirtualStickyTreePaginationPrototype = () => {
  const [items, setItems] = React.useState(initialItems);
  const [isLoading, setIsLoading] = React.useState(false);
  const [hasNextPage, setHasNextPage] = React.useState(true);

  const loadMoreRows = isLoading
    ? () => Promise.resolve()
    : async () => {
        setIsLoading(true);
        const result = await fetchData();
        setIsLoading(false);
        setHasNextPage(result.hasNextPage);
        setItems(result.items);
      };

  return (
    <div style={{ width: 400 }}>
      <VirtualStickyTreePagination
        items={items}
        renderItemTitle={CustomTreeTitle}
        itemSize={30}
        stickyItemSize={20}
        height={500}
        itemToString={itemToString}
        hasNextPage={hasNextPage}
        isNextPageLoading={isLoading}
        onLoadNextPage={loadMoreRows}
        paginationThreshold={20}
      />
    </div>
  );
};
export default VirtualStickyTreePaginationPrototype;
