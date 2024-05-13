import * as React from 'react';
import {
  Async,
  EventGroup,
  canUseDOM,
  css,
  divProperties,
  findIndex,
  findScrollableParent,
  getNativeProps,
  getParent,
  getWindow,
  initializeComponentRef,
} from '../../Utilities';
import { ScrollToMode } from './List.types';
import { composeRenderFunction } from '../../Utilities';
import { getScrollHeight, getScrollYPosition, setScrollYPosition } from './utils/scroll';
import type { IRectangle, IRenderFunction } from '../../Utilities';
import type {
  IList,
  IListProps,
  IPage,
  IPageProps,
  IListOnRenderSurfaceProps,
  IListOnRenderRootProps,
} from './List.types';
import { WindowContext } from '@fluentui/react-window-provider';
import { getWindowEx } from '../../utilities/dom';
// import { ListDebugRenderer } from './utils/ListDebugRenderer';

const RESIZE_DELAY = 16;
const MIN_SCROLL_UPDATE_DELAY = 100;
const MAX_SCROLL_UPDATE_DELAY = 500;
const IDLE_DEBOUNCE_DELAY = 200;
// The amount of time to wait before declaring that the list isn't scrolling
const DONE_SCROLLING_WAIT = 500;
const DEFAULT_ITEMS_PER_PAGE = 10;
const DEFAULT_PAGE_HEIGHT = 30;
const DEFAULT_RENDERED_WINDOWS_BEHIND = 2;
const DEFAULT_RENDERED_WINDOWS_AHEAD = 2;
const PAGE_KEY_PREFIX = 'page-';
const SPACER_KEY_PREFIX = 'spacer-';
// Fraction of a page to have been scrolled before re-running expensive calculations
const SCROLL_RATIO = 1 / 3;

export interface IListState<T = any> {
  pages?: IPage<T>[];

  /** The last versionstamp for  */
  measureVersion?: number;
  isScrolling?: boolean;
  getDerivedStateFromProps(nextProps: IListProps<T>, previousState: IListState<T>): IListState<T>;

  pagesVersion?: {};
  hasMounted: boolean;
}

interface IPageCacheItem<T> {
  page: IPage<T>;
  pageElement?: JSX.Element;
}

interface IPageCache<T> {
  [key: string]: IPageCacheItem<T>;
}

const EMPTY_RECT = {
  top: -1,
  bottom: -1,
  left: -1,
  right: -1,
  width: 0,
  height: 0,
};

// Naming expensive measures so that they're named in profiles.
const _measurePageRect = (element: HTMLElement) => element.getBoundingClientRect();
const _measureSurfaceRect = _measurePageRect;
const _measureScrollRect = _measurePageRect;

/**
 * The List renders virtualized pages of items. Each page's item count is determined by the getItemCountForPage callback
 * if provided by the caller, or 10 as default. Each page's height is determined by the getPageHeight callback if
 * provided by the caller, or by cached measurements if available, or by a running average, or a default fallback.
 *
 * The algorithm for rendering pages works like this:
 *
 * 1. Predict visible pages based on "current measure data" (page heights, surface position, visible window)
 * 2. If changes are necessary, apply changes (add/remove pages)
 * 3. For pages that are added, measure the page heights if we need to using getBoundingClientRect
 * 4. If measurements don't match predictions, update measure data and goto step 1 asynchronously
 *
 * Measuring too frequently can pull performance down significantly. To compensate, we cache measured values so that
 * we can avoid re-measuring during operations that should not alter heights, like scrolling.
 *
 * To optimize glass rendering performance, onShouldVirtualize can be set. When onShouldVirtualize return false,
 * List will run in fast mode (not virtualized) to render all items without any measurements to improve page load time.
 * And we start doing measurements and rendering in virtualized mode when items grows larger than this threshold.
 *
 * However, certain operations can make measure data stale. For example, resizing the list, or passing in new props,
 * or forcing an update change cause pages to shrink/grow. When these operations occur, we increment a measureVersion
 * number, which we associate with cached measurements and use to determine if a remeasure should occur.
 */
export class List<T = any> extends React.Component<IListProps<T>, IListState<T>> implements IList {
  public static defaultProps = {
    startIndex: 0,
    onRenderCell: (item: any, index: number, containsFocus: boolean) => <>{(item && item.name) || ''}</>,
    onRenderCellConditional: undefined,
    renderedWindowsAhead: DEFAULT_RENDERED_WINDOWS_AHEAD,
    renderedWindowsBehind: DEFAULT_RENDERED_WINDOWS_BEHIND,
  };

  public static contextType = WindowContext;

  private _root = React.createRef<HTMLDivElement>();
  private _surface = React.createRef<HTMLDivElement>();
  private _pageRefs: Record<string, unknown> = {};
  private _async: Async;
  private _events: EventGroup;
  private _onAsyncScrollDebounced: () => void;
  private _onAsyncIdleDebounced: () => void;
  private _onScrollingDoneDebounced: () => void;
  private _onAsyncResizeDebounced: () => void;
  private _estimatedPageHeight: number;
  private _totalEstimates: number;
  private _cachedPageHeights: {
    [key: string]: {
      height: number;
      measureVersion: number;
    };
  };
  private _focusedIndex: number;
  private _scrollElement?: HTMLElement;
  private _hasCompletedFirstRender: boolean;

  // surface rect relative to window
  private _surfaceRect: IRectangle | undefined;

  // The visible rect that we're required to render given the current list state.
  private _requiredRect: IRectangle | null;

  // The visible rect that we're allowed to keep rendered. Pages outside of this rect will be removed.
  private _allowedRect: IRectangle;

  // The rect that is visible to the user
  private _visibleRect: IRectangle | undefined;

  // materialized rect around visible items, relative to surface
  private _materializedRect: IRectangle | null;

  private _requiredWindowsAhead: number;
  private _requiredWindowsBehind: number;

  private _measureVersion: number;
  private _scrollHeight?: number;
  private _scrollTop: number;
  private _pageCache: IPageCache<T>;

  // private _debugRenderer: ListDebugRenderer;
  // private _debugRafId: number | undefined = undefined;

  public static getDerivedStateFromProps<U = any>(
    nextProps: IListProps<U>,
    previousState: IListState<U>,
  ): IListState<U> {
    return previousState.getDerivedStateFromProps(nextProps, previousState);
  }

  constructor(props: IListProps<T>) {
    super(props);

    initializeComponentRef(this);

    this.state = {
      pages: [],
      isScrolling: false,
      getDerivedStateFromProps: this._getDerivedStateFromProps,
      hasMounted: false,
    };

    this._estimatedPageHeight = 0;
    this._totalEstimates = 0;
    this._requiredWindowsAhead = 0;
    this._requiredWindowsBehind = 0;

    // Track the measure version for everything.
    this._measureVersion = 0;

    this._cachedPageHeights = {};
    this._estimatedPageHeight = 0;
    this._focusedIndex = -1;
    this._pageCache = {};
  }

  public get pageRefs(): Readonly<Record<string, unknown>> {
    return this._pageRefs;
  }

  /**
   * Scroll to the given index. By default will bring the page the specified item is on into the view. If a callback
   * to measure the height of an individual item is specified, will only scroll to bring the specific item into view.
   *
   * Note: with items of variable height and no passed in `getPageHeight` method, the list might jump after scrolling
   * when windows before/ahead are being rendered, and the estimated height is replaced using actual elements.
   *
   * @param index - Index of item to scroll to
   * @param measureItem - Optional callback to measure the height of an individual item
   * @param scrollToMode - Optional defines where in the window the item should be positioned to when scrolling
   */
  public scrollToIndex(
    index: number,
    measureItem?: (itemIndex: number) => number,
    scrollToMode: ScrollToMode = ScrollToMode.auto,
  ): void {
    const startIndex = this.props.startIndex as number;
    const renderCount = this._getRenderCount();
    const endIndex = startIndex + renderCount;

    const allowedRect = this._allowedRect;

    let scrollTop = 0;

    let itemsPerPage = 1;
    for (let itemIndex = startIndex; itemIndex < endIndex; itemIndex += itemsPerPage) {
      const pageSpecification = this._getPageSpecification(this.props, itemIndex, allowedRect);

      const pageHeight = pageSpecification.height;
      itemsPerPage = pageSpecification.itemCount;

      const requestedIndexIsInPage = itemIndex <= index && itemIndex + itemsPerPage > index;
      if (requestedIndexIsInPage) {
        // We have found the page. If the user provided a way to measure an individual item, we will try to scroll in
        // just the given item, otherwise we'll only bring the page into view
        if (measureItem && this._scrollElement) {
          const scrollRect = _measureScrollRect(this._scrollElement);
          const scrollPosition = getScrollYPosition(this._scrollElement);
          const scrollWindow = {
            top: scrollPosition,
            bottom: scrollPosition + scrollRect.height,
          };

          // Adjust for actual item position within page
          const itemPositionWithinPage = index - itemIndex;
          for (let itemIndexInPage = 0; itemIndexInPage < itemPositionWithinPage; ++itemIndexInPage) {
            scrollTop += measureItem(itemIndex + itemIndexInPage);
          }
          const scrollBottom = scrollTop + measureItem(index);

          // If scrollToMode is set to something other than auto, we always want to
          // scroll the item into a specific position on the page.
          switch (scrollToMode) {
            case ScrollToMode.top:
              setScrollYPosition(this._scrollElement, scrollTop);
              return;
            case ScrollToMode.bottom:
              setScrollYPosition(this._scrollElement, scrollBottom - scrollRect.height);
              return;
            case ScrollToMode.center:
              setScrollYPosition(this._scrollElement, (scrollTop + scrollBottom - scrollRect.height) / 2);
              return;
            case ScrollToMode.auto:
            default:
              break;
          }

          const itemIsFullyVisible = scrollTop >= scrollWindow.top && scrollBottom <= scrollWindow.bottom;
          if (itemIsFullyVisible) {
            // Item is already visible, do nothing.
            return;
          }

          const itemIsPartiallyAbove = scrollTop < scrollWindow.top;
          const itemIsPartiallyBelow = scrollBottom > scrollWindow.bottom;

          if (itemIsPartiallyAbove) {
            //  We will just scroll to 'scrollTop'
            //  .------.   - scrollTop
            //  |Item  |
            //  | .----|-. - scrollWindow.top
            //  '------' |
            //    |      |
            //    '------'
          } else if (itemIsPartiallyBelow) {
            //  Adjust scrollTop position to just bring in the element
            // .------.  - scrollTop
            // |      |
            // | .------.
            // '-|----' | - scrollWindow.bottom
            //   | Item |
            //   '------' - scrollBottom
            scrollTop = scrollBottom - scrollRect.height;
          }
        }

        if (this._scrollElement) {
          setScrollYPosition(this._scrollElement, scrollTop);
        }
        return;
      }

      scrollTop += pageHeight;
    }
  }

  public getStartItemIndexInView(measureItem?: (itemIndex: number) => number): number {
    const pages = this.state.pages || [];
    for (const page of pages) {
      const isPageVisible =
        !page.isSpacer && (this._scrollTop || 0) >= page.top && (this._scrollTop || 0) <= page.top + page.height;
      if (isPageVisible) {
        if (!measureItem) {
          const rowHeight = Math.floor(page.height / page.itemCount);
          return page.startIndex + Math.floor((this._scrollTop - page.top) / rowHeight);
        } else {
          let totalRowHeight = 0;
          for (let itemIndex = page.startIndex; itemIndex < page.startIndex + page.itemCount; itemIndex++) {
            const rowHeight = measureItem(itemIndex);
            if (
              page.top + totalRowHeight <= this._scrollTop &&
              this._scrollTop < page.top + totalRowHeight + rowHeight
            ) {
              return itemIndex;
            } else {
              totalRowHeight += rowHeight;
            }
          }
        }
      }
    }
    return 0;
  }

  public componentDidMount(): void {
    this._async = new Async(this);
    this._events = new EventGroup(this);

    // Ensure that scrolls are lazy updated.
    this._onAsyncScrollDebounced = this._async.debounce(this._onAsyncScroll, MIN_SCROLL_UPDATE_DELAY, {
      leading: false,
      maxWait: MAX_SCROLL_UPDATE_DELAY,
    });

    this._onAsyncIdleDebounced = this._async.debounce(this._onAsyncIdle, IDLE_DEBOUNCE_DELAY, {
      leading: false,
    });

    this._onAsyncResizeDebounced = this._async.debounce(this._onAsyncResize, RESIZE_DELAY, {
      leading: false,
    });

    this._onScrollingDoneDebounced = this._async.debounce(this._onScrollingDone, DONE_SCROLLING_WAIT, {
      leading: false,
    });

    this._scrollElement = findScrollableParent(this._root.current) as HTMLElement;
    this._scrollTop = 0;
    this.setState({ ...this._updatePages(this.props, this.state), hasMounted: true });
    this._measureVersion++;

    const win = getWindowEx(this.context);

    this._events.on(win, 'resize', this._onAsyncResizeDebounced);
    if (this._root.current) {
      this._events.on(this._root.current, 'focus', this._onFocus, true);
    }
    if (this._scrollElement) {
      this._events.on(this._scrollElement, 'scroll', this._onScroll);
      this._events.on(this._scrollElement, 'scroll', this._onAsyncScrollDebounced);
    }

    // this._debugRenderer = new ListDebugRenderer();

    // const debugRender = () => {
    //   this._debugRenderer.render({
    //     visibleRect: this._visibleRect,
    //     allowedRect: this._allowedRect,
    //     requiredRect: this._requiredRect,
    //     materializedRect: this._materializedRect,
    //     surfaceRect: this._surfaceRect,
    //     totalListHeight: this.getTotalListHeight(),
    //     pages: this.state.pages,
    //     scrollTop: Math.abs(this._scrollTop - getScrollYPosition(this._scrollElement)),
    //     estimatedLine: this._estimatedPageHeight * SCROLL_RATIO,
    //     scrollY: getScrollYPosition(this._scrollElement),
    //   });
    //   this._debugRafId = requestAnimationFrame(debugRender);
    // };
    // debugRender();
  }

  public componentDidUpdate(previousProps: IListProps, previousState: IListState<T>): void {
    // Multiple updates may have been queued, so the callback will reflect all of them.
    // Re-fetch the current props and states to avoid using a stale props or state captured in the closure.
    const finalProps = this.props;
    const finalState = this.state;

    if (this.state.pagesVersion !== previousState.pagesVersion) {
      // If we weren't provided with the page height, measure the pages
      if (!finalProps.getPageHeight) {
        // If measured version is invalid since we've updated the DOM
        const heightsChanged = this._updatePageMeasurements(finalState.pages!);

        // On first render, we should re-measure so that we don't get a visual glitch.
        if (heightsChanged) {
          this._materializedRect = null;
          if (!this._hasCompletedFirstRender) {
            this._hasCompletedFirstRender = true;
            this.setState(this._updatePages(finalProps, finalState));
          } else {
            this._onAsyncScrollDebounced();
          }
        } else {
          // Enqueue an idle bump.
          this._onAsyncIdleDebounced();
        }
      } else {
        // Enqueue an idle bump
        this._onAsyncIdleDebounced();
      }

      // Notify the caller that rendering the new pages has completed
      if (finalProps.onPagesUpdated) {
        finalProps.onPagesUpdated(finalState.pages as IPage<T>[]);
      }
    }
  }

  public componentWillUnmount(): void {
    this._async?.dispose();
    this._events?.dispose();

    delete this._scrollElement;

    // this._debugRenderer.dispose();
    // if (this._debugRafId) {
    //   cancelAnimationFrame(this._debugRafId);
    //   this._debugRafId = undefined;
    // }
  }

  public shouldComponentUpdate(newProps: IListProps<T>, newState: IListState<T>): boolean {
    const { pages: oldPages } = this.state;
    const { pages: newPages } = newState;
    let shouldComponentUpdate = false;

    // Update if the page stops scrolling
    if (!newState.isScrolling && this.state.isScrolling) {
      return true;
    }

    if (newProps.version !== this.props.version) {
      return true;
    }

    if (newProps.className !== this.props.className) {
      return true;
    }

    if (newProps.items === this.props.items && oldPages!.length === newPages!.length) {
      for (let i = 0; i < oldPages!.length; i++) {
        const oldPage = oldPages![i];
        const newPage = newPages![i];

        if (oldPage.key !== newPage.key || oldPage.itemCount !== newPage.itemCount) {
          shouldComponentUpdate = true;
          break;
        }
      }
    } else {
      shouldComponentUpdate = true;
    }

    return shouldComponentUpdate;
  }

  public forceUpdate(): void {
    this._invalidatePageCache();
    // Ensure that when the list is force updated we update the pages first before render.
    this._updateRenderRects(this.props, this.state, true);
    this.setState(this._updatePages(this.props, this.state));
    this._measureVersion++;

    super.forceUpdate();
  }

  /**
   * Get the current height the list and it's pages.
   */
  public getTotalListHeight(): number {
    return this._surfaceRect!.height;
  }

  public render(): JSX.Element | null {
    const { className, role = 'list', onRenderSurface, onRenderRoot } = this.props;
    const { pages = [] } = this.state;
    const pageElements: JSX.Element[] = [];
    const divProps = getNativeProps<React.HTMLAttributes<HTMLDivElement>>(this.props, divProperties);

    for (const page of pages) {
      pageElements.push(this._renderPage(page));
    }

    const finalOnRenderSurface = onRenderSurface
      ? composeRenderFunction(onRenderSurface, this._onRenderSurface)
      : this._onRenderSurface;

    const finalOnRenderRoot = onRenderRoot
      ? composeRenderFunction(onRenderRoot, this._onRenderRoot)
      : this._onRenderRoot;

    return finalOnRenderRoot({
      rootRef: this._root,
      pages,
      surfaceElement: finalOnRenderSurface({
        surfaceRef: this._surface,
        pages,
        pageElements,
        divProps: {
          role: 'presentation',
          className: 'ms-List-surface',
        },
      }),
      divProps: {
        ...divProps,
        className: css('ms-List', className),
        role: pageElements.length > 0 ? role : undefined,
        'aria-label': pageElements.length > 0 ? divProps['aria-label'] : undefined,
      },
    });
  }

  private _getDerivedStateFromProps = (nextProps: IListProps<T>, previousState: IListState<T>): IListState<T> => {
    if (
      nextProps.items !== this.props.items ||
      nextProps.renderCount !== this.props.renderCount ||
      nextProps.startIndex !== this.props.startIndex ||
      nextProps.version !== this.props.version ||
      (!previousState.hasMounted && this.props.renderEarly && canUseDOM())
    ) {
      // We have received new items so we want to make sure that initially we only render a single window to
      // fill the currently visible rect, and then later render additional windows.
      this._resetRequiredWindows();
      this._requiredRect = null;

      this._measureVersion++;
      this._invalidatePageCache();

      return this._updatePages(nextProps, previousState);
    }

    return previousState;
  };

  private _shouldVirtualize(props: IListProps<T> = this.props): boolean {
    const { onShouldVirtualize } = props;
    return !onShouldVirtualize || onShouldVirtualize(props);
  }

  /**
   * when props.items change or forceUpdate called, throw away cached pages
   */
  private _invalidatePageCache(): void {
    this._pageCache = {};
  }

  private _renderPage(page: IPage<T>): JSX.Element {
    const { usePageCache } = this.props;
    let cachedPage;
    // if usePageCache is set and cached page element can be found, just return cached page
    if (usePageCache) {
      cachedPage = this._pageCache[page.key];
      if (cachedPage && cachedPage.pageElement) {
        return cachedPage.pageElement;
      }
    }

    const pageStyle = this._getPageStyle(page);

    const { onRenderPage = this._onRenderPage } = this.props;

    const pageElement = onRenderPage(
      {
        page,
        className: 'ms-List-page',
        key: page.key,
        ref: (newRef: unknown) => {
          this._pageRefs[page.key] = newRef;
        },
        style: pageStyle,
        role: 'presentation',
      },
      this._onRenderPage,
    );

    // cache the first page for now since it is re-rendered a lot times unnecessarily.
    // todo: a more aggresive caching mechanism is to cache pages constaining the items not changed.
    // now we re-render pages too frequently, for example, props.items increased from 30 to 60, although the
    // first 30 items did not change, we still re-rendered all of them in this props.items change.
    if (usePageCache && page.startIndex === 0) {
      this._pageCache[page.key] = {
        page,
        pageElement,
      };
    }
    return pageElement;
  }

  private _onRenderRoot = (props: IListOnRenderRootProps<T>): JSX.Element => {
    const { rootRef, surfaceElement, divProps } = props;

    return (
      <div ref={rootRef} {...divProps}>
        {surfaceElement}
      </div>
    );
  };

  private _onRenderSurface = (props: IListOnRenderSurfaceProps<T>): JSX.Element => {
    const { surfaceRef, pageElements, divProps } = props;

    return (
      <div ref={surfaceRef} {...divProps}>
        {pageElements}
      </div>
    );
  };

  /** Generate the style object for the page. */
  private _getPageStyle(page: IPage<T>): React.StyleHTMLAttributes<HTMLDivElement> {
    const { getPageStyle } = this.props;

    return {
      ...(getPageStyle ? getPageStyle(page) : {}),
      ...(!page.items
        ? {
            height: page.height,
          }
        : {}),
    };
  }

  private _onRenderPage = (pageProps: IPageProps<T>, defaultRender?: IRenderFunction<IPageProps<T>>): any => {
    const { onRenderCell, onRenderCellConditional, role } = this.props;

    const {
      page: { items = [], startIndex },
      ...divProps
    } = pageProps;

    // only assign list item role if no role is assigned
    const cellRole = role === undefined ? 'listitem' : 'presentation';
    const cells: React.ReactNode[] = [];

    for (let i = 0; i < items.length; i++) {
      const index = startIndex + i;
      const item = items[i];

      let itemKey = this.props.getKey ? this.props.getKey(item, index) : item && (item as any).key;

      if (itemKey === null || itemKey === undefined) {
        itemKey = index;
      }

      const renderCell = onRenderCellConditional ?? onRenderCell;

      const cell =
        renderCell?.(item, index, !this.props.ignoreScrollingState ? this.state.isScrolling : undefined) ?? null;

      if (!onRenderCellConditional || cell) {
        cells.push(
          <div
            role={cellRole}
            className={'ms-List-cell'}
            key={itemKey}
            data-list-index={index}
            data-automationid="ListCell"
          >
            {cell}
          </div>,
        );
      }
    }

    return <div {...divProps}>{cells}</div>;
  };

  /** Track the last item index focused so that we ensure we keep it rendered. */
  private _onFocus(ev: any): void {
    let target = ev.target as HTMLElement;

    while (target !== this._surface.current) {
      const indexString = target.getAttribute('data-list-index');

      if (indexString) {
        this._focusedIndex = Number(indexString);
        break;
      }

      target = getParent(target) as HTMLElement;
    }
  }

  /**
   * Called synchronously to reset the required render range to 0 on scrolling. After async scroll has executed,
   * we will call onAsyncIdle which will reset it back to it's correct value.
   */
  private _onScroll(): void {
    if (!this.state.isScrolling && !this.props.ignoreScrollingState) {
      this.setState({ isScrolling: true });
    }
    this._resetRequiredWindows();
    this._onScrollingDoneDebounced();
  }

  private _resetRequiredWindows(): void {
    this._requiredWindowsAhead = 0;
    this._requiredWindowsBehind = 0;
  }

  /**
   * Debounced method to asynchronously update the visible region on a scroll event.
   */
  private _onAsyncScroll(): void {
    this._updateRenderRects(this.props, this.state);

    // Only update pages when the visible rect falls outside of the materialized rect.
    if (!this._materializedRect || !_isContainedWithin(this._requiredRect as IRectangle, this._materializedRect)) {
      this.setState(this._updatePages(this.props, this.state));
    } else {
      // console.log('requiredRect contained in materialized', this._requiredRect, this._materializedRect);
    }
  }

  /**
   * This is an async debounced method that will try and increment the windows we render. If we can increment
   * either, we increase the amount we render and re-evaluate.
   */
  private _onAsyncIdle(): void {
    const { renderedWindowsAhead, renderedWindowsBehind } = this.props;
    const { _requiredWindowsAhead: requiredWindowsAhead, _requiredWindowsBehind: requiredWindowsBehind } = this;
    const windowsAhead = Math.min(renderedWindowsAhead as number, requiredWindowsAhead + 1);
    const windowsBehind = Math.min(renderedWindowsBehind as number, requiredWindowsBehind + 1);

    if (windowsAhead !== requiredWindowsAhead || windowsBehind !== requiredWindowsBehind) {
      // console.log('idling', windowsBehind, windowsAhead);

      this._requiredWindowsAhead = windowsAhead;
      this._requiredWindowsBehind = windowsBehind;
      this._updateRenderRects(this.props, this.state);
      this.setState(this._updatePages(this.props, this.state));
    }

    if (renderedWindowsAhead! > windowsAhead || renderedWindowsBehind! > windowsBehind) {
      // Async increment on next tick.
      this._onAsyncIdleDebounced();
    }
  }

  /**
   * Function to call when the list is done scrolling.
   * This function is debounced.
   */
  private _onScrollingDone(): void {
    if (!this.props.ignoreScrollingState) {
      this.setState({ isScrolling: false });
      this._onAsyncIdle();
    }
  }

  private _onAsyncResize(): void {
    this.forceUpdate();
  }

  private _updatePages(nextProps: IListProps<T>, previousState: IListState<T>): IListState<T> {
    // console.log('updating pages');

    if (!this._requiredRect) {
      this._updateRenderRects(nextProps, previousState);
    }

    const newListState = this._buildPages(nextProps, previousState);
    const oldListPages = previousState.pages!;

    this._notifyPageChanges(oldListPages, newListState.pages!, this.props);

    return {
      ...previousState,
      ...newListState,
      pagesVersion: {},
    };
  }

  /**
   * Notify consumers that the rendered pages have changed
   * @param oldPages - The old pages
   * @param newPages - The new pages
   * @param props - The props to use
   */
  private _notifyPageChanges(oldPages: IPage<T>[], newPages: IPage<T>[], props: IListProps<T>): void {
    const { onPageAdded, onPageRemoved } = props;

    if (onPageAdded || onPageRemoved) {
      const renderedIndexes: {
        [index: number]: IPage<T>;
      } = {};

      for (const page of oldPages) {
        if (page.items) {
          renderedIndexes[page.startIndex] = page;
        }
      }

      for (const page of newPages) {
        if (page.items) {
          if (!renderedIndexes[page.startIndex]) {
            this._onPageAdded(page);
          } else {
            delete renderedIndexes[page.startIndex];
          }
        }
      }

      for (const index in renderedIndexes) {
        if (renderedIndexes.hasOwnProperty(index)) {
          this._onPageRemoved(renderedIndexes[index]);
        }
      }
    }
  }

  private _updatePageMeasurements(pages: IPage<T>[]): boolean {
    let heightChanged = false;

    // when not in virtualize mode, we render all the items without page measurement
    if (!this._shouldVirtualize()) {
      return heightChanged;
    }

    for (let i = 0; i < pages.length; i++) {
      const page = pages[i];

      if (page.items) {
        heightChanged = this._measurePage(page) || heightChanged;
      }
    }

    return heightChanged;
  }

  /**
   * Given a page, measure its dimensions, update cache.
   * @returns True if the height has changed.
   */
  private _measurePage(page: IPage<T>): boolean {
    let hasChangedHeight = false;
    const pageElement = this._pageRefs[page.key] as HTMLElement;
    const cachedHeight = this._cachedPageHeights[page.startIndex];

    // console.log('   * measure attempt', page.startIndex, cachedHeight);

    if (
      pageElement &&
      this._shouldVirtualize() &&
      (!cachedHeight || cachedHeight.measureVersion !== this._measureVersion)
    ) {
      const newClientRect = {
        width: pageElement.clientWidth,
        height: pageElement.clientHeight,
      };

      if (newClientRect.height || newClientRect.width) {
        hasChangedHeight = page.height !== newClientRect.height;

        // console.warn(' *** expensive page measure', page.startIndex, page.height, newClientRect.height);

        page.height = newClientRect.height;

        this._cachedPageHeights[page.startIndex] = {
          height: newClientRect.height,
          measureVersion: this._measureVersion,
        };

        this._estimatedPageHeight = Math.round(
          (this._estimatedPageHeight * this._totalEstimates + newClientRect.height) / (this._totalEstimates + 1),
        );

        this._totalEstimates++;
      }
    }

    return hasChangedHeight;
  }

  /** Called when a page has been added to the DOM. */
  private _onPageAdded(page: IPage<T>): void {
    const { onPageAdded } = this.props;

    // console.log('page added', page.startIndex, this.state.pages.map(page => page.key).join(', '));

    if (onPageAdded) {
      onPageAdded(page);
    }
  }

  /** Called when a page has been removed from the DOM. */
  private _onPageRemoved(page: IPage<T>): void {
    const { onPageRemoved } = this.props;

    // console.log('  --- page removed', page.startIndex, this.state.pages.map(page => page.key).join(', '));

    if (onPageRemoved) {
      onPageRemoved(page);
    }
  }

  /** Build up the pages that should be rendered. */
  private _buildPages(props: IListProps<T>, state: IListState<T>): IListState<T> {
    let { renderCount } = props;
    const { items, startIndex, getPageHeight } = props;

    renderCount = this._getRenderCount(props);

    const materializedRect = { ...EMPTY_RECT };
    const pages: IPage<T>[] = [];

    let itemsPerPage = 1;
    let pageTop = 0;
    let currentSpacer = null;
    const focusedIndex = this._focusedIndex;
    const endIndex = startIndex! + renderCount;
    const shouldVirtualize = this._shouldVirtualize(props);

    // First render is very important to track; when we render cells, we have no idea of estimated page height.
    // So we should default to rendering only the first page so that we can get information.
    // However if the user provides a measure function, let's just assume they know the right heights.
    const isFirstRender = this._estimatedPageHeight === 0 && !getPageHeight;

    const allowedRect = this._allowedRect;

    for (let itemIndex = startIndex!; itemIndex < endIndex; itemIndex += itemsPerPage) {
      const pageSpecification = this._getPageSpecification(props, itemIndex, allowedRect);
      const pageHeight = pageSpecification.height;
      const pageData = pageSpecification.data;
      const key = pageSpecification.key;

      itemsPerPage = pageSpecification.itemCount;

      const pageBottom = pageTop + pageHeight - 1;

      const isPageRendered =
        findIndex(state.pages as IPage<T>[], (page: IPage<T>) => !!page.items && page.startIndex === itemIndex) > -1;
      const isPageInAllowedRange = !allowedRect || (pageBottom >= allowedRect.top && pageTop <= allowedRect.bottom!);
      const isPageInRequiredRange =
        !this._requiredRect || (pageBottom >= this._requiredRect.top && pageTop <= this._requiredRect.bottom!);

      const isPageVisible =
        (!isFirstRender && (isPageInRequiredRange || (isPageInAllowedRange && isPageRendered))) || !shouldVirtualize;
      const isPageFocused = focusedIndex >= itemIndex && focusedIndex < itemIndex + itemsPerPage;
      const isFirstPage = itemIndex === startIndex;

      // Only render whats visible, focused, or first page,
      // or when running in fast rendering mode (not in virtualized mode), we render all current items in pages
      if (isPageVisible || isPageFocused || isFirstPage) {
        if (currentSpacer) {
          pages.push(currentSpacer);
          currentSpacer = null;
        }

        const itemsInPage = Math.min(itemsPerPage, endIndex - itemIndex);
        const newPage = this._createPage(
          key,
          items!.slice(itemIndex, itemIndex + itemsInPage),
          itemIndex,
          undefined,
          undefined,
          pageData,
        );

        newPage.top = pageTop;
        newPage.height = pageHeight;
        if (this._visibleRect && this._visibleRect.bottom) {
          newPage.isVisible = pageBottom >= this._visibleRect.top && pageTop <= this._visibleRect.bottom;
        }

        pages.push(newPage);

        if (isPageInRequiredRange && this._allowedRect) {
          _mergeRect(materializedRect, {
            top: pageTop,
            bottom: pageBottom,
            height: pageHeight,
            left: allowedRect.left,
            right: allowedRect.right,
            width: allowedRect.width,
          });
        }
      } else {
        if (!currentSpacer) {
          currentSpacer = this._createPage(
            SPACER_KEY_PREFIX + itemIndex,
            undefined,
            itemIndex,
            0,
            undefined,
            pageData,
            true /*isSpacer*/,
          );
        }
        currentSpacer.height = (currentSpacer.height || 0) + (pageBottom - pageTop) + 1;
        currentSpacer.itemCount += itemsPerPage;
      }
      pageTop += pageBottom - pageTop + 1;

      // in virtualized mode, we render need to render first page then break and measure,
      // otherwise, we render all items without measurement to make rendering fast
      if (isFirstRender && shouldVirtualize) {
        break;
      }
    }

    if (currentSpacer) {
      currentSpacer.key = SPACER_KEY_PREFIX + 'end';
      pages.push(currentSpacer);
    }

    this._materializedRect = materializedRect;

    // console.log('materialized: ', materializedRect);
    return {
      ...state,
      pages,
      measureVersion: this._measureVersion,
    };
  }

  private _getPageSpecification(
    props: IListProps,
    itemIndex: number,
    visibleRect: IRectangle,
  ): {
    // These return values are now no longer optional.
    itemCount: number;
    height: number;
    data?: any;
    key?: string;
  } {
    const { getPageSpecification } = props;

    if (getPageSpecification) {
      const pageData = getPageSpecification(itemIndex, visibleRect, props.items);

      const { itemCount = this._getItemCountForPage(itemIndex, visibleRect) } = pageData;

      const { height = this._getPageHeight(itemIndex, visibleRect, itemCount) } = pageData;

      return {
        itemCount,
        height,
        data: pageData.data,
        key: pageData.key,
      };
    } else {
      const itemCount = this._getItemCountForPage(itemIndex, visibleRect);

      return {
        itemCount,
        height: this._getPageHeight(itemIndex, visibleRect, itemCount),
      };
    }
  }

  /**
   * Get the pixel height of a give page. Will use the props getPageHeight first, and if not provided, fallback to
   * cached height, or estimated page height, or default page height.
   */
  private _getPageHeight(itemIndex: number, visibleRect: IRectangle, itemsPerPage: number): number {
    if (this.props.getPageHeight) {
      return this.props.getPageHeight(itemIndex, visibleRect, itemsPerPage, this.props.items);
    } else {
      const cachedHeight = this._cachedPageHeights[itemIndex];

      return cachedHeight ? cachedHeight.height : this._estimatedPageHeight || DEFAULT_PAGE_HEIGHT;
    }
  }

  private _getItemCountForPage(itemIndex: number, visibileRect: IRectangle): number {
    const itemsPerPage = this.props.getItemCountForPage
      ? this.props.getItemCountForPage(itemIndex, visibileRect)
      : DEFAULT_ITEMS_PER_PAGE;

    return itemsPerPage ? itemsPerPage : DEFAULT_ITEMS_PER_PAGE;
  }

  private _createPage(
    pageKey: string | undefined,
    items: any[] | undefined,
    startIndex: number = -1,
    count: number = items ? items.length : 0,
    style: React.CSSProperties = {},
    data?: any,
    isSpacer?: boolean,
  ): IPage<T> {
    pageKey = pageKey || PAGE_KEY_PREFIX + startIndex;
    const cachedPage = this._pageCache[pageKey];
    if (cachedPage && cachedPage.page) {
      return cachedPage.page;
    }

    return {
      key: pageKey,
      startIndex,
      itemCount: count,
      items,
      style,
      top: 0,
      height: 0,
      data,
      isSpacer: isSpacer || false,
    };
  }

  private _getRenderCount(props?: IListProps<T>): number {
    const { items, startIndex, renderCount } = props || this.props;

    return renderCount === undefined ? (items ? items.length - startIndex! : 0) : renderCount;
  }

  /** Calculate the visible rect within the list where top: 0 and left: 0 is the top/left of the list. */
  private _updateRenderRects(props: IListProps<T>, state: IListState<T>, forceUpdate?: boolean): void {
    const { renderedWindowsAhead, renderedWindowsBehind } = props;
    const { pages } = state;
    // when not in virtualize mode, we render all items without measurement to optimize page rendering perf
    if (!this._shouldVirtualize(props)) {
      return;
    }

    let surfaceRect = this._surfaceRect || { ...EMPTY_RECT };
    const scrollHeight = getScrollHeight(this._scrollElement);
    const scrollTop = getScrollYPosition(this._scrollElement);

    // WARNING: EXPENSIVE CALL! We need to know the surface top relative to the window.
    // This needs to be called to recalculate when new pages should be loaded.
    // We check to see how far we've scrolled and if it's further than a third of a page we run it again.
    if (
      this._surface.current &&
      (forceUpdate ||
        !pages ||
        !this._surfaceRect ||
        !scrollHeight ||
        scrollHeight !== this._scrollHeight ||
        Math.abs(this._scrollTop - scrollTop) > this._estimatedPageHeight * SCROLL_RATIO)
    ) {
      surfaceRect = this._surfaceRect = _measureSurfaceRect(this._surface.current);
      this._scrollTop = scrollTop;
    }

    // If the scroll height has changed, something in the container likely resized and
    // we should redo the page heights incase their content resized.
    if (forceUpdate || !scrollHeight || scrollHeight !== this._scrollHeight) {
      this._measureVersion++;
    }

    this._scrollHeight = scrollHeight || 0;

    // If the surface is above the container top or below the container bottom, or if this is not the first
    // render return empty rect.
    // The first time the list gets rendered we need to calculate the rectangle. The width of the list is
    // used to calculate the width of the list items.
    const visibleTop = Math.max(0, -surfaceRect.top);
    const win = getWindow(this._root.current);
    const visibleRect = {
      top: visibleTop,
      left: surfaceRect.left,
      bottom: visibleTop + win!.innerHeight,
      right: surfaceRect.right,
      width: surfaceRect.width,
      height: win!.innerHeight,
    };

    // The required/allowed rects are adjusted versions of the visible rect.
    this._requiredRect = _expandRect(visibleRect, this._requiredWindowsBehind, this._requiredWindowsAhead);
    this._allowedRect = _expandRect(visibleRect, renderedWindowsBehind!, renderedWindowsAhead!);

    // store the visible rect for later use.
    this._visibleRect = visibleRect;
  }
}

function _expandRect(rect: IRectangle, pagesBefore: number, pagesAfter: number): IRectangle {
  const top = rect.top - pagesBefore * rect.height;
  const height = rect.height + (pagesBefore + pagesAfter) * rect.height;

  return {
    top,
    bottom: top + height,
    height,
    left: rect.left,
    right: rect.right,
    width: rect.width,
  };
}

function _isContainedWithin(innerRect: IRectangle, outerRect: IRectangle): boolean {
  return (
    innerRect.top >= outerRect.top &&
    innerRect.left >= outerRect.left &&
    innerRect.bottom! <= outerRect.bottom! &&
    innerRect.right! <= outerRect.right!
  );
}

function _mergeRect(targetRect: IRectangle, newRect: IRectangle): IRectangle {
  targetRect.top = newRect.top < targetRect.top || targetRect.top === -1 ? newRect.top : targetRect.top;
  targetRect.left = newRect.left < targetRect.left || targetRect.left === -1 ? newRect.left : targetRect.left;
  targetRect.bottom =
    newRect.bottom! > targetRect.bottom! || targetRect.bottom === -1 ? newRect.bottom : targetRect.bottom;
  targetRect.right = newRect.right! > targetRect.right! || targetRect.right === -1 ? newRect.right : targetRect.right;
  targetRect.width = targetRect.right! - targetRect.left + 1;
  targetRect.height = targetRect.bottom! - targetRect.top + 1;

  return targetRect;
}
