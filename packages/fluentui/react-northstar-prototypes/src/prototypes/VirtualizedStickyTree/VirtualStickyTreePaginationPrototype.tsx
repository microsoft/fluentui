import * as React from 'react';
import {
  TriangleDownIcon,
  TreeTitleProps,
  TriangleEndIcon,
  ObjectShorthandCollection,
  TreeItemProps,
} from '@fluentui/react-northstar';
import { VirtualStickyTreePagination, VirtualStickyTreePaginationHandle } from './VirtualStickyTreePagination';
import {
  initialItems,
  loadMoreItems,
  isStickyItemFinishedLoading,
  getHeaderIdFromLoaderId,
} from './paginationItemsGenerator';

const FETCH_TIMEOUT = 3000;

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

const fetchData = (currItems: ObjectShorthandCollection<TreeItemProps>, headers: string[]) => {
  return new Promise<{ items: any; hasNextPage: boolean }>(resolve =>
    setTimeout(() => {
      const items = loadMoreItems(currItems, headers);
      const result = {
        items,
        hasNextPage: items.filter(item => !isStickyItemFinishedLoading(item)).length > 0,
      };
      resolve(result);
    }, FETCH_TIMEOUT),
  );
};

const VirtualStickyTreePaginationPrototype = () => {
  const [items, setItems] = React.useState(initialItems);
  const [isLoading, setIsLoading] = React.useState(false);
  const [hasNextPage, setHasNextPage] = React.useState(true);

  const ref = React.useRef<VirtualStickyTreePaginationHandle>(null);

  const isItemLoaded = React.useCallback(
    (index: number) => {
      if (!hasNextPage) {
        return true;
      }
      if (!ref.current) {
        return true;
      }
      const { visibleItemIds, getItemRef } = ref.current;
      if (!visibleItemIds || !getItemRef) {
        if (process.env.NODE_ENV !== 'production') {
          // eslint-disable-next-line no-console
          console.error('<VirtualStickyTree>Invalid ref to VirtualStickyTreePagination. Imperative handles not found');
        }
        return true;
      }
      if (index < visibleItemIds.length) {
        const id = visibleItemIds[index];
        if (id.indexOf('loader') >= 0) {
          // item is a loader
          const loaderElement = getItemRef(id);
          if (loaderElement) {
            // loader is mounted
            const stickHeader = getItemRef(getHeaderIdFromLoaderId(id));
            if (
              stickHeader &&
              loaderElement.getBoundingClientRect().bottom > stickHeader.getBoundingClientRect().bottom
            ) {
              // if it is below it's sticky header
              // trying to load more items
              return false;
            }
          }
        }
        return true;
      }
      return false;
    },
    [hasNextPage],
  );

  const loadMoreRows = isLoading
    ? (_startIndex, _stopIndex) => Promise.resolve()
    : async startIndex => {
        setIsLoading(true);

        let headersToLoadMore = items[items.length - 1].id;
        if (ref.current?.visibleItemIds) {
          const visibleItemIds = ref.current?.visibleItemIds;
          if (startIndex < visibleItemIds?.length) {
            const headerId = getHeaderIdFromLoaderId(visibleItemIds?.[startIndex]);
            if (headerId) {
              headersToLoadMore = headerId;
            }
          }
        }

        const result = await fetchData(items, [headersToLoadMore]);
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
        isItemLoaded={isItemLoaded}
        paginationThreshold={20}
        ref={ref}
      />
    </div>
  );
};
export default VirtualStickyTreePaginationPrototype;
