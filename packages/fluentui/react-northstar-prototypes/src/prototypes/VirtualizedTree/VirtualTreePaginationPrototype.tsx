import * as React from 'react';
import {
  TriangleDownIcon,
  TreeTitleProps,
  TriangleEndIcon,
  ObjectShorthandCollection,
  TreeItemProps,
} from '@fluentui/react-northstar';
import { VirtualTreePagination, VirtualTreePaginationHandle } from './VirtualTreePagination';
import {
  initialItems,
  fetchMoreItems,
  isHeaderItemFinishedLoading,
  getHeaderIdFromLoaderId,
} from '../VirtualizedStickyTree/paginationItemsGenerator';
import { flattenTree } from '@fluentui/react-northstar/src/components/Tree/hooks/flattenTree';

const FETCH_TIMEOUT = 3000;

const fetchData = (currItems: ObjectShorthandCollection<TreeItemProps>, headersToFetchMore: string[]) => {
  console.log('fetch', headersToFetchMore);
  return new Promise<{ newItems: any; hasNextPage: boolean }>(resolve =>
    setTimeout(() => {
      const items = fetchMoreItems(currItems, headersToFetchMore);
      const result = {
        newItems: items,
        hasNextPage: items.filter(item => !isHeaderItemFinishedLoading(item)).length > 0,
      };
      resolve(result);
    }, FETCH_TIMEOUT),
  );
};

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

// const isItemLoaded = ({ hasNextPage, visibleItemIds, getItemRef }) => (index: number) => {
//   if (!hasNextPage) {
//     return true;
//   }
//   // if (!ref.current) {
//   //   return true;
//   // }
//   // if (!visibleItemIds || !getItemRef) {
//   //   if (process.env.NODE_ENV !== 'production') {
//   //     // eslint-disable-next-line no-console
//   //     console.error('<VirtualTree>Invalid ref to VirtualTreePagination. Imperative handles not found');
//   //   }
//   //   return true;
//   // }
//   if (index < visibleItemIds.length) {
//     const id = visibleItemIds[index];
//     if (id.indexOf('loader') >= 0) {
//       // item is a loader
//       const loaderElement = getItemRef(id);
//       if (loaderElement) {
//         // loader is mounted
//         const header = getItemRef(getHeaderIdFromLoaderId(id));
//         if (header && loaderElement.getBoundingClientRect().bottom > header.getBoundingClientRect().bottom) {
//           // if it is below its header
//           // trying to load more items
//           return false;
//         }
//       }
//     }
//     return true;
//   }
//   return false;
// };

const VirtualTreePaginationPrototype = () => {
  const [items, setItems] = React.useState(initialItems);
  return (
    <div style={{ width: 400 }}>
      <VirtualTreePagination
        items={items}
        setItems={setItems}
        fetchItems={fetchData}
        //
        renderItemTitle={CustomTreeTitle}
        estimatedItemSize={20}
        height={500}
        itemToString={itemToString}
        paginationThreshold={20}
      />
    </div>
  );
};
export default VirtualTreePaginationPrototype;
