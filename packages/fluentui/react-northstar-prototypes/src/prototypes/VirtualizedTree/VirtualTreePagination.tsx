import * as React from 'react';
import { treeBehavior } from '@fluentui/accessibility';
import {
  useUnhandledProps,
  getElementType,
  useAccessibility,
  useStyles,
  useFluentContext,
} from '@fluentui/react-bindings';
import * as _ from 'lodash';
import {
  rtlTextContainer,
  TreeItem,
  Tree,
  treeClassName,
  TreeStylesProps,
  useVirtualTree,
  ObjectShorthandCollection,
  TreeItemProps,
  UseVirtualTreeResult,
  TreeContext,
  TreeRenderContextValue,
} from '@fluentui/react-northstar';
import { VariableSizeList, ListChildComponentProps } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import { VirtualItemData, VirtualTreeProps } from './VirtualTree';
import {
  isHeaderItemFinishedLoading,
  getHeaderIdFromLoaderId,
} from '../VirtualizedStickyTree/paginationItemsGenerator';

export type UsePaginationUtilsOptions = Pick<UseVirtualTreeResult, 'visibleItemIds' | 'getItemRef' | 'listRef'> & {
  items: ObjectShorthandCollection<TreeItemProps>;
  setItems: React.Dispatch<React.SetStateAction<ObjectShorthandCollection<TreeItemProps>>>;
  fetchItems: (
    currItems: ObjectShorthandCollection<TreeItemProps>,
    headersToFetchMore: string[],
  ) => Promise<{
    newItems: ObjectShorthandCollection<TreeItemProps>;
    hasNextPage: boolean;
  }>;
};

export type UsePaginationUtilsResults = {
  isItemLoaded: (index: number) => boolean;
  loadMoreItems: (startIndex: number, stopIndex: number) => Promise<void>;
  itemCount: number;
};

export interface VirtualTreePaginationProps extends VirtualTreeProps {
  paginationThreshold?: number;
  setItems: React.Dispatch<React.SetStateAction<ObjectShorthandCollection<TreeItemProps>>>;
  fetchItems: (
    currItems: ObjectShorthandCollection<TreeItemProps>,
    headersToFetchMore: string[],
  ) => Promise<{
    newItems: ObjectShorthandCollection<TreeItemProps>;
    hasNextPage: boolean;
  }>;
}

const usePaginationUtils = ({
  items,
  setItems,
  visibleItemIds,
  getItemRef,
  listRef,
  fetchItems,
}: UsePaginationUtilsOptions): UsePaginationUtilsResults => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [hasNextPage, setHasNextPage] = React.useState(true);

  const checkLoaderItem = React.useCallback(
    id => {
      const loaderElement = getItemRef(id);
      if (loaderElement) {
        // loader is mounted
        const header = getItemRef(getHeaderIdFromLoaderId(id));
        if (
          !header ||
          (header && loaderElement.getBoundingClientRect().bottom > header.getBoundingClientRect().bottom)
        ) {
          // if it is below its header
          // trying to load more items
          console.log('isItemLoaded false', id);
          return false;
        }
      }
      return true;
    },
    [getItemRef],
  );

  const isItemLoaded = React.useCallback(
    (index: number) => {
      if (!hasNextPage) {
        return true;
      }

      if (index < visibleItemIds.length) {
        const id = visibleItemIds[index];
        if (id.indexOf('loader') >= 0) {
          // item is a loader in between
          return checkLoaderItem(id);
        }
        return true;
      }
      if (index === visibleItemIds.length && visibleItemIds[index - 1].indexOf('loader') >= 0) {
        // requested index is over visibleItemIds.length, and the last item in the list is a loader.
        // this could happen when user scroll within threshold, so the infinite loader is trying to load more items while the last loader is not mounted.
        //
        // For example, if there's header-0 and header-1, neither has finished loading all children.
        // when user scrolls down to load more header-1, the loader at the end of header-1 is not mounted,
        // it will cause infinite loader to check index visibleItemIds.length.
        //
        // if we loadMoreRows based on index >= visibleItemIds.length, the newly loaded row will be header-0's children.
        // This is because, we have no reliable way to know which header to load, so we load the 1st header that has not finished loading.
        //
        // But in this case, header-1's children should be loaded instead.
        // So when we detect this situation, do not request infinite loader to load more items (by return true).
        // And only request more items (return false) when the loader is mounted.
        return checkLoaderItem(visibleItemIds[index - 1]);
      }

      console.log('isItemLoaded false', 'index < visibleItemIds.length');
      return false;
    },
    [checkLoaderItem, hasNextPage, visibleItemIds],
  );

  const loadMoreRows = React.useCallback(
    async (startIndex: number) => {
      setIsLoading(true);

      let headersToLoadMore;
      if (startIndex < visibleItemIds.length && visibleItemIds[startIndex].indexOf('loader') >= 0) {
        // found a loader, try to load more item in this section
        const headerId = getHeaderIdFromLoaderId(visibleItemIds?.[startIndex]);
        if (headerId) {
          console.log('loader found for', headerId);
          headersToLoadMore = headerId;
        }
      }

      if (!headersToLoadMore) {
        console.log('no loader found');
        // no loader found, try to load more item for the 1st section that has unloaded items
        headersToLoadMore = items.find(item => !isHeaderItemFinishedLoading(item)).id;
      }

      const result = await fetchItems(items, [headersToLoadMore]);
      setIsLoading(false);
      setHasNextPage(result.hasNextPage);
      setItems(result.newItems);
    },
    [fetchItems, items, setItems, visibleItemIds],
  );

  const loadMoreItems = React.useCallback(
    (startIndex: number, stopIndex: number) => {
      const indexBeforeNextPage = visibleItemIds.length;
      if (isLoading) {
        return Promise.resolve();
      }
      return loadMoreRows(startIndex).then(() => {
        if (listRef.current) {
          listRef.current.resetAfterIndex(indexBeforeNextPage, true);
        }
      });
    },
    [visibleItemIds.length, isLoading, loadMoreRows, listRef],
  );

  const itemCount = hasNextPage ? visibleItemIds.length + 1 : visibleItemIds.length;

  return { isItemLoaded, loadMoreItems, itemCount };
};

export const VirtualTreePagination = (props: VirtualTreePaginationProps) => {
  const context = useFluentContext();

  const {
    children,
    className,
    design,
    styles,
    variables,
    height,
    estimatedItemSize,
    items,
    defaultActiveItemIds,
  } = props;

  const ElementType = getElementType(props);
  const unhandledProps = useUnhandledProps(
    [
      ...Tree.handledProps,
      'estimatedItemSize',
      'itemSize',
      'itemToString',
      'hasNextPage',
      'isNextPageLoading',
      'isItemLoaded',
      'onLoadNextPage',
      'paginationThreshold',
    ],
    props,
  );

  const getA11yProps = useAccessibility(props.accessibility, {
    debugName: VirtualTreePagination.displayName,
    rtl: context.rtl,
  });

  const { classes } = useStyles<TreeStylesProps>(Tree.displayName, {
    className: treeClassName,
    mapPropsToInlineStyles: () => ({
      className,
      design,
      styles,
      variables,
    }),
    rtl: context.rtl,
  });

  const headerItemIds = React.useMemo(() => items.map(item => item.id) || [], [items]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const stable_headerItemIds = React.useMemo(() => headerItemIds, [headerItemIds.join()]);

  const {
    visibleItemIds,
    getItemById,
    registerItemRef,
    toggleItemActive,
    focusItemById,
    expandSiblings,
    listRef,
    getToFocusIDByFirstCharacter,
    getItemRef,
  } = useVirtualTree({ ...props, defaultActiveItemIds: defaultActiveItemIds || stable_headerItemIds });

  const contextValue: TreeRenderContextValue = React.useMemo(
    () => ({
      getItemById,
      registerItemRef,
      toggleItemActive,
      focusItemById,
      expandSiblings,
      toggleItemSelect: _.noop,
      getToFocusIDByFirstCharacter,
    }),
    [getItemById, registerItemRef, toggleItemActive, focusItemById, expandSiblings, getToFocusIDByFirstCharacter],
  );

  // always use item id as key instead of index (react-window's default)
  const getItemKey = React.useCallback((index: number, data: VirtualItemData) => data.visibleItemIds[index], []);

  const getItemSize = (index: number) => {
    const id = visibleItemIds[index];
    return getItemById(id).item.itemSize || estimatedItemSize;
  };
  React.useLayoutEffect(() => {
    listRef.current.resetAfterIndex(0);
  }, [listRef, visibleItemIds]); // when item collapsed/expanded (visibleItemIds change), refresh react-window itemSize cache

  const createTreeItem = React.useCallback<VirtualItemData['createTreeItem']>(
    (id, style) => {
      const item = getItemById(id);
      if (item) {
        const { expanded, parent, level, index, treeSize } = item;
        const { itemSize, ...rest } = item.item;
        return TreeItem.create(rest, {
          defaultProps: () =>
            getA11yProps('item', {
              renderItemTitle: props.renderItemTitle,
            }),
          overrideProps: {
            style, // came from react-window
            expanded,
            parent,
            key: id,
            level,
            index,
            treeSize,
            selectable: false,
          },
        });
      }
      return null;
    },
    [getA11yProps, getItemById, props.renderItemTitle],
  );

  const { paginationThreshold, setItems, fetchItems } = props;
  const { isItemLoaded, loadMoreItems, itemCount } = usePaginationUtils({
    items,
    setItems,
    visibleItemIds,
    getItemRef,
    listRef,
    fetchItems,
  });

  const element = (
    <TreeContext.Provider value={contextValue}>
      {getA11yProps.unstable_wrapWithFocusZone(
        <ElementType
          {...getA11yProps('root', {
            className: classes.root,
            ...rtlTextContainer.getAttributes({ forElements: [children] }),
            ...unhandledProps,
          })}
        >
          <InfiniteLoader
            isItemLoaded={isItemLoaded}
            itemCount={itemCount}
            loadMoreItems={loadMoreItems}
            threshold={paginationThreshold}
          >
            {({ onItemsRendered, ref }) => (
              <VariableSizeList
                width={-1} // width is not used for vertical list
                ref={listRef}
                height={height}
                estimatedItemSize={estimatedItemSize}
                itemSize={getItemSize}
                itemKey={getItemKey}
                itemData={{ visibleItemIds, createTreeItem }}
                itemCount={visibleItemIds.length}
                outerElementType={OuterElementType}
                innerElementType={InnerElementType}
                innerRef={ref}
                onItemsRendered={onItemsRendered}
              >
                {ItemWrapper}
              </VariableSizeList>
            )}
          </InfiniteLoader>
        </ElementType>,
      )}
    </TreeContext.Provider>
  );
  return element;
};

const InnerElementType = React.forwardRef<HTMLDivElement>((props, ref) => <div ref={ref} {...props} role="none" />);
const OuterElementType = React.forwardRef<HTMLDivElement>((props, ref) => <div ref={ref} {...props} role="none" />);

// memorize to avoid unnecessary re-renders, for example on scrolling
// recommended approach by react-window: https://react-window.now.sh/#/api/FixedSizeList
const ItemWrapper = React.memo<ListChildComponentProps & { data: VirtualItemData }>(({ index, style, data }) => {
  const { visibleItemIds, createTreeItem } = data;
  return createTreeItem(visibleItemIds[index], style);
});

VirtualTreePagination.displayName = 'VirtualTree';

VirtualTreePagination.defaultProps = {
  accessibility: treeBehavior,
  estimatedItemSize: 50,
};
