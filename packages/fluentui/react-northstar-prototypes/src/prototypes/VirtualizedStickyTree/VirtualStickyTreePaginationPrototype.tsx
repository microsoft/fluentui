import * as React from 'react';
import { TriangleDownIcon, TreeTitleProps, TriangleEndIcon } from '@fluentui/react-northstar';
import { VirtualStickyTreePagination } from './VirtualStickyTreePagination';
import { splitItemsToPages } from './items';

const NUM_OF_PAGE = 5;
const FETCH_TIMEOUT = 3000;

const getNthPage = splitItemsToPages(NUM_OF_PAGE);
const initialItems = getNthPage(0);
let i = 1;

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
        items: getNthPage(i),
        hasNextPage: i < NUM_OF_PAGE - 1,
      };
      i++;
      resolve(result);
    }, FETCH_TIMEOUT),
  );
};

const VirtualStickyTreePaginationPrototype = () => {
  const [items, setItems] = React.useState(initialItems);
  const [isLoading, setIsLoading] = React.useState(false);
  const [hasNextPage, setHasNextPage] = React.useState(true);

  // control activeItemIds state to always load sticky header as expanded
  const [activeItemIds, setActiveItemIds] = React.useState(items.map(item => item.id));
  const handleActiveItemIdsChange = (_e, data) => setActiveItemIds(data.activeItemIds);

  const loadMoreRows = isLoading
    ? () => Promise.resolve()
    : async () => {
        setIsLoading(true);
        const result = await fetchData();
        setIsLoading(false);
        setHasNextPage(result.hasNextPage);

        // load sticky header as expanded
        const currSticky = items.map(item => item.id);
        const newlyLoadedSticky = result.items.map(item => item.id).filter(id => currSticky.indexOf(id) < 0);
        setActiveItemIds(prevActiveItemIds => [...prevActiveItemIds, ...newlyLoadedSticky]);

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
        paginationThreshold={2}
        activeItemIds={activeItemIds}
        onActiveItemIdsChange={handleActiveItemIdsChange}
      />
    </div>
  );
};
export default VirtualStickyTreePaginationPrototype;
