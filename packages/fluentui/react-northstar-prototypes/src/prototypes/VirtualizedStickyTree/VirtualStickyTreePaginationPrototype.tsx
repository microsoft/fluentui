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
  STICKY_HEADERS,
  initialItems,
  getLoaderId,
  loadMoreItems,
  isStickyItemFinishedLoading,
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
      console.log('fetch result', result);
      resolve(result);
    }, FETCH_TIMEOUT),
  );
};

const stickyItemSize = 20;
const VirtualStickyTreePaginationPrototype = () => {
  const [items, setItems] = React.useState(initialItems);
  const [isLoading, setIsLoading] = React.useState(false);
  const [hasNextPage, setHasNextPage] = React.useState(true);

  const ref = React.useRef<VirtualStickyTreePaginationHandle>(null);

  const outerRef = React.useRef(null);
  const scrollDirection = React.useRef<'backward' | 'forward' | undefined>();
  const prevScrollOffset = React.useRef(0);
  const updateScrollDirection: EventListener = React.useCallback(event => {
    if (!event.currentTarget) {
      return;
    }
    const { clientHeight, scrollHeight, scrollTop } = event.currentTarget as HTMLElement;
    const scrollOffset = Math.max(0, Math.min(scrollTop, scrollHeight - clientHeight));
    scrollDirection.current = prevScrollOffset.current < scrollOffset ? 'forward' : 'backward';
    prevScrollOffset.current = scrollOffset;
    console.log('amber', 'scrollDirection', scrollDirection.current);
  }, []);
  React.useEffect(() => {
    const node = outerRef.current;
    if (node) {
      node?.addEventListener('scroll', updateScrollDirection);
    }
    return () => node?.removeEventListener('scroll', updateScrollDirection);
  }, [updateScrollDirection]);

  const getLastItemIdStickToTop = React.useCallback(() => {
    const getItemRef = ref.current?.getItemRef;
    if (!getItemRef) {
      return items[0].id;
    }
    const firstItem = getItemRef(items[0].id);
    if (!firstItem) {
      return items[0].id;
    }

    const treeTop = firstItem.getBoundingClientRect().top;
    const lastItemStickToTop = items
      .map(item => item.id)
      .reverse()
      .find((id, index, arr) => {
        const itemRef = getItemRef(id);
        if (!itemRef) {
          return false;
        }
        return itemRef.getBoundingClientRect().top - treeTop === stickyItemSize * (arr.length - index - 1);
      });
    if (!lastItemStickToTop) {
      return items[0].id;
    }
    return lastItemStickToTop;
  }, [items]);

  const loadMoreRows = isLoading
    ? () => Promise.resolve()
    : async () => {
        setIsLoading(true);

        const headersToLoadMore = [];

        // first check if there's any loader mounted, they may be visible to user
        STICKY_HEADERS.forEach((header, i) => {
          const loaderId = getLoaderId(header);
          const loaderRef = ref.current?.getItemRef(loaderId);
          if (loaderRef) {
            // loader is mounted
            // check if loader's sticky header's right sibling is sticked to top, which means the loader is scrolled out of visible area
            const nextHeaderRef = STICKY_HEADERS[i + 1] && ref.current?.getItemRef(STICKY_HEADERS[i + 1]);
            const treeTop = ref.current?.getItemRef(STICKY_HEADERS[0])?.getBoundingClientRect().top;
            if (nextHeaderRef && nextHeaderRef.getBoundingClientRect().top - treeTop === stickyItemSize * (i + 1)) {
              // in this case, do not try to fetch more page of this header when scroll forward or click to pull up sticky header
              if (scrollDirection.current !== 'backward') {
                return;
              }
            }
            // otherwise try to fetch next page for this header
            headersToLoadMore.push(header);
          }
        });

        // no loader found, load the last header sticked to top
        if (!headersToLoadMore.length) {
          const lastItemIdStickToTop = getLastItemIdStickToTop();
          const index = items.findIndex(item => item.id === lastItemIdStickToTop);
          if (!isStickyItemFinishedLoading(items[index])) {
            // last header sticked to top has not finished loading yet, load next page of it
            headersToLoadMore.push(lastItemIdStickToTop);
          } else {
            // last header sticked to top is fully loaded, find another item after it, that has not finished loading yet
            for (let i = index + 1; i < items.length; ++i) {
              if (!isStickyItemFinishedLoading(items[i])) {
                headersToLoadMore.push(items[i].id);
                break;
              }
            }
          }
        }

        const result = await fetchData(items, headersToLoadMore);
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
        stickyItemSize={stickyItemSize}
        height={500}
        itemToString={itemToString}
        hasNextPage={hasNextPage}
        isNextPageLoading={isLoading}
        onLoadNextPage={loadMoreRows}
        paginationThreshold={20}
        ref={ref}
        outerRef={outerRef}
      />
    </div>
  );
};
export default VirtualStickyTreePaginationPrototype;
