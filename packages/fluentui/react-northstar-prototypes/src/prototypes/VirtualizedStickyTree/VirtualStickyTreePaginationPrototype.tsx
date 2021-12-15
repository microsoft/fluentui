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
  fetchMoreItems,
  isHeaderItemFinishedLoading,
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

const fetchData = (currItems: ObjectShorthandCollection<TreeItemProps>, headersToFetchMore: string[]) => {
  console.log('fetch', headersToFetchMore);
  return new Promise<{ items: any; hasNextPage: boolean }>(resolve =>
    setTimeout(() => {
      const items = fetchMoreItems(currItems, headersToFetchMore);
      const result = {
        items,
        hasNextPage: items.filter(item => !isHeaderItemFinishedLoading(item)).length > 0,
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

  const checkLoaderItem = React.useCallback((id, getItemRef) => {
    // item is a loader
    const loaderElement = getItemRef(id);
    if (loaderElement) {
      // loader is mounted
      const stickHeader = getItemRef(getHeaderIdFromLoaderId(id));
      if (stickHeader && loaderElement.getBoundingClientRect().bottom > stickHeader.getBoundingClientRect().bottom) {
        // if it is below it's sticky header
        // trying to load more items
        console.log('--- isItemLoaded false', id);
        return false;
      }
    }
    return true;
  }, []);

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
          return checkLoaderItem(id, getItemRef);
        }
        return true;
      }
      if (index === visibleItemIds.length && visibleItemIds[index - 1].indexOf('loader') >= 0) {
        return checkLoaderItem(visibleItemIds[index - 1], getItemRef);
      }
      console.log('--- isItemLoaded false', 'index < visibleItemIds.length');
      return false;
    },
    [checkLoaderItem, hasNextPage],
  );

  const loadMoreRows = async (startIndex: number) => {
    setIsLoading(true);

    let headersToLoadMore;
    if (ref.current?.visibleItemIds) {
      const visibleItemIds = ref.current?.visibleItemIds;
      if (startIndex < visibleItemIds?.length) {
        const headerId = getHeaderIdFromLoaderId(visibleItemIds?.[startIndex]);
        if (headerId) {
          console.log('+++ loader found for', headerId);
          headersToLoadMore = headerId;
        }
      }
    }

    if (!headersToLoadMore) {
      console.log('+++ no loader found');
      // no loader found, try to load more item for the 1st section that has unloaded items
      headersToLoadMore = items.find(item => !isHeaderItemFinishedLoading(item)).id;
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
