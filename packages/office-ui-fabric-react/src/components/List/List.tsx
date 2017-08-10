import * as React from 'react';
import {
  BaseComponent,
  IRectangle,
  assign,
  css,
  findIndex,
  findScrollableParent,
  getParent,
  divProperties,
  getNativeProps
} from '../../Utilities';
import { IList, IListProps, IPage } from './List.Props';

const RESIZE_DELAY = 16;
const MIN_SCROLL_UPDATE_DELAY = 100;
const MAX_SCROLL_UPDATE_DELAY = 500;
const IDLE_DEBOUNCE_DELAY = 200;
const DEFAULT_ITEMS_PER_PAGE = 10;
const DEFAULT_PAGE_HEIGHT = 30;
const DEFAULT_RENDERED_WINDOWS_BEHIND = 2;
const DEFAULT_RENDERED_WINDOWS_AHEAD = 2;

export interface IListState {
  pages?: IPage[];

  /** The last versionstamp for  */
  measureVersion?: number;
}

interface IPageCacheItem {
  page: IPage;
  pageElement?: JSX.Element;
}

interface IPageCache {
  [key: string]: IPageCacheItem;
}

const EMPTY_RECT = {
  top: -1,
  bottom: -1,
  left: -1,
  right: -1,
  width: 0,
  height: 0
};

// Naming expensive measures so that they're named in profiles.
const _measurePageRect = (element: HTMLElement) => element.getBoundingClientRect();
const _measureSurfaceRect = _measurePageRect;
const _measureScrollRect = _measurePageRect;

/**
 * The List renders virtualized pages of items. Each page's item count is determined by the getItemCountForPage callback if
 * provided by the caller, or 10 as default. Each page's height is determined by the getPageHeight callback if provided by
 * the caller, or by cached measurements if available, or by a running average, or a default fallback.
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
 * To optimize glass rendering performance, fastRenderingItemCount can be set. When items is smaller or equal to this
 * number, List will run in fast mode to render all items without any measurements to improve page load time. And we
 * start doing measurements when items grows larger than this threshold.
 *
 * However, certain operations can make measure data stale. For example, resizing the list, or passing in new props,
 * or forcing an update change cause pages to shrink/grow. When these operations occur, we increment a measureVersion
 * number, which we associate with cached measurements and use to determine if a remeasure should occur.
 */
export class List extends BaseComponent<IListProps, IListState> implements IList {
  public static defaultProps = {
    startIndex: 0,
    onRenderCell: (item: any, index: number, containsFocus: boolean) => (<div>{(item && item.name) || ''}</div>),
    renderedWindowsAhead: DEFAULT_RENDERED_WINDOWS_AHEAD,
    renderedWindowsBehind: DEFAULT_RENDERED_WINDOWS_BEHIND
  };

  public refs: {
    [key: string]: React.ReactInstance,
    root: HTMLElement,
    surface: HTMLElement
  };

  private _estimatedPageHeight: number;
  private _totalEstimates: number;
  private _cachedPageHeights: {
    [key: string]: {
      height: number,
      measureVersion: number
    }
  };
  private _focusedIndex: number;
  private _scrollElement: HTMLElement;
  private _scrollingToIndex: number;
  private _hasCompletedFirstRender: boolean;

  // surface rect relative to window
  private _surfaceRect: IRectangle;

  // The visible rect that we're required to render given the current list state.
  private _requiredRect: IRectangle | null;

  // The visible rect that we're allowed to keep rendered. Pages outside of this rect will be removed.
  private _allowedRect: IRectangle;

  // materialized rect around visible items, relative to surface
  private _materializedRect: IRectangle | null;

  private _requiredWindowsAhead: number;
  private _requiredWindowsBehind: number;

  private _measureVersion: number;
  private _scrollHeight: number;
  private _scrollTop: number;
  private _pageCache: IPageCache;
  private _fastRenderingItemCount: number;

  constructor(props: IListProps) {
    super(props);

    this.state = {
      pages: []
    };

    this._estimatedPageHeight = 0;
    this._totalEstimates = 0;
    this._requiredWindowsAhead = 0;
    this._requiredWindowsBehind = 0;

    // Track the measure version for everything.
    this._measureVersion = 0;

    // Ensure that scrolls are lazy updated.
    this._onAsyncScroll = this._async.debounce(
      this._onAsyncScroll,
      MIN_SCROLL_UPDATE_DELAY,
      {
        leading: false,
        maxWait: MAX_SCROLL_UPDATE_DELAY
      });

    this._onAsyncIdle = this._async.debounce(
      this._onAsyncIdle,
      IDLE_DEBOUNCE_DELAY, {
        leading: false
      });

    this._onAsyncResize = this._async.debounce(
      this._onAsyncResize,
      RESIZE_DELAY,
      {
        leading: false
      });

    this._cachedPageHeights = {};
    this._estimatedPageHeight = 0;
    this._focusedIndex = -1;
    this._scrollingToIndex = -1;
    this._pageCache = {};
    const {
      fastRenderingItemCount
    } = props;
    this._fastRenderingItemCount = fastRenderingItemCount || 0;
  }

  /**
   * Scroll to the given index. By default will bring the page the specified item is on into the view. If a callback
   * to measure the height of an individual item is specified, will only scroll to bring the specific item into view.
   *
   * Note: with items of variable height and no passed in `getPageHeight` method, the list might jump after scrolling
   * when windows before/ahead are being rendered, and the estimated height is replaced using actual elements.
   *
   * @param index Index of item to scroll to
   * @param measureItem Optional callback to measure the height of an individual item
   */
  public scrollToIndex(index: number, measureItem?: (itemIndex: number) => number): void {
    const startIndex = this.props.startIndex as number;
    const renderCount = this._getRenderCount();
    const endIndex = startIndex + renderCount;

    let scrollTop = 0;

    let itemsPerPage = 1;
    for (let itemIndex = startIndex; itemIndex < endIndex; itemIndex += itemsPerPage) {
      itemsPerPage = this._getItemCountForPage(itemIndex, this._allowedRect);

      const requestedIndexIsInPage = itemIndex <= index && (itemIndex + itemsPerPage) > index;
      if (requestedIndexIsInPage) {
        // We have found the page. If the user provided a way to measure an individual item, we will try to scroll in just
        // the given item, otherwise we'll only bring the page into view
        if (measureItem) {
          // Adjust for actual item position within page
          const itemPositionWithinPage = index - itemIndex;
          for (let itemIndexInPage = 0; itemIndexInPage < itemPositionWithinPage; ++itemIndexInPage) {
            scrollTop += measureItem(itemIndex + itemIndexInPage);
          }
          const scrollBottom = scrollTop + measureItem(index);

          const scrollRect = _measureScrollRect(this._scrollElement);
          const scrollWindow = {
            top: this._scrollElement.scrollTop,
            bottom: this._scrollElement.scrollTop + scrollRect.height
          };

          const itemIsFullyVisible = scrollTop >= scrollWindow.top && scrollBottom <= scrollWindow.bottom;
          if (itemIsFullyVisible) {
            // Item is already visible, do nothing.
            return;
          }

          const itemIsPartiallyAbove = scrollTop < scrollWindow.top;
          const itemIsPartiallyBelow = scrollBottom > scrollWindow.bottom;

          if (itemIsPartiallyAbove) {
            // We will just scroll to 'scrollTop'
            //  ______
            // |Item  |   - scrollTop
            // |  ____|_
            // |_|____| | - scrollWindow.top
            //   |      |
            //   |______|
          } else if (itemIsPartiallyBelow) {
            // Adjust scrollTop position to just bring in the element
            //  ______   - scrollTop
            // |      |
            // |  ____|_  - scrollWindow.bottom
            // |_|____| |
            //   | Item |
            //   |______| - scrollBottom
            scrollTop = this._scrollElement.scrollTop + (scrollBottom - scrollWindow.bottom);
          }
        }

        this._scrollElement.scrollTop = scrollTop;
        break;
      }

      scrollTop += this._getPageHeight(itemIndex, itemsPerPage, this._surfaceRect);
    }
  }

  public componentDidMount() {

    this._updatePages();
    this._measureVersion++;
    this._scrollElement = findScrollableParent(this.refs.root) as HTMLElement;

    this._events.on(window, 'resize', this._onAsyncResize);
    this._events.on(this.refs.root, 'focus', this._onFocus, true);
    if (this._scrollElement) {
      this._events.on(this._scrollElement, 'scroll', this._onScroll);
      this._events.on(this._scrollElement, 'scroll', this._onAsyncScroll);
    }
  }

  public componentWillReceiveProps(newProps: IListProps) {
    if (newProps.items !== this.props.items ||
      newProps.renderCount !== this.props.renderCount ||
      newProps.startIndex !== this.props.startIndex) {

      // We have received new items so we want to make sure that initially we only render a single window to
      // fill the currently visible rect, and then later render additional windows.
      this._resetRequiredWindows();
      this._requiredRect = null;

      this._measureVersion++;
      this._invalidatePageCache();
      this._updatePages(newProps);
    }
  }

  public shouldComponentUpdate(newProps: IListProps, newState: IListState) {
    let { renderedWindowsAhead, renderedWindowsBehind } = this.props;
    let { pages: oldPages } = this.state;
    let { pages: newPages, measureVersion } = newState;
    let shouldComponentUpdate = false;

    if (
      this._measureVersion === measureVersion &&
      newProps.renderedWindowsAhead === renderedWindowsAhead,
      newProps.renderedWindowsBehind === renderedWindowsBehind,
      newProps.items === this.props.items &&
      oldPages!.length === newPages!.length) {
      for (let i = 0; i < oldPages!.length; i++) {
        let oldPage = oldPages![i];
        let newPage = newPages![i];

        if ((oldPage.key !== newPage.key ||
          oldPage.itemCount !== newPage.itemCount)) {
          shouldComponentUpdate = true;
          break;
        }
      }
    } else {
      shouldComponentUpdate = true;
    }

    return shouldComponentUpdate;
  }

  public forceUpdate() {
    this._invalidatePageCache();
    // Ensure that when the list is force updated we update the pages first before render.
    this._updateRenderRects(this.props, true);
    this._updatePages();
    this._measureVersion++;

    super.forceUpdate();
  }

  public render() {
    let { className, role } = this.props;
    let { pages } = this.state;
    let pageElements = [];
    let divProps = getNativeProps(this.props, divProperties);

    // assign list if no role
    role = (role === undefined) ? 'list' : role;

    for (let i = 0; i < pages!.length; i++) {
      pageElements.push(this._renderPage(pages![i]));
    }

    // console.log(`Page elements ${pageElements.length}`);

    return (
      <div ref='root' { ...divProps } role={role} className={css('ms-List', className)} >
        <div ref='surface' className='ms-List-surface' role='presentation'>
          {pageElements}
        </div>
      </div>
    );
  }

  /**
   * when props.items change or forceUpdate called, throw away cached pages
   */
  private _invalidatePageCache() {
    this._pageCache = {};
  }

  private _renderPage(page: IPage): any {
    let { onRenderCell, role, usePageCache } = this.props;
    let cachedPage;
    // if usePageCache is set and cached page element can be found, just return cached page
    if (usePageCache) {
      cachedPage = this._pageCache[page.key];
      if (cachedPage && cachedPage.pageElement) {
        return cachedPage.pageElement;
      }
    }

    let cells = [];
    let pageStyle = this._getPageStyle(page);

    // only assign list item role if no role is assigned
    role = (role === undefined) ? 'listitem' : 'presentation';

    for (let i = 0; page.items && i < page.items.length; i++) {
      let item = page.items[i];
      const index = page.startIndex + i;
      let itemKey =
        this.props.getKey
          ? this.props.getKey(item, index)
          : item && item.key;

      if (itemKey === null || itemKey === undefined) {
        itemKey = index;
      }

      cells.push(
        <div role={role} className='ms-List-cell' key={itemKey} data-list-index={i + page.startIndex} data-automationid='ListCell'>
          {onRenderCell!(item, page.startIndex + i)}
        </div>
      );
    }

    const pageElement = (
      <div className='ms-List-page' key={page.key} ref={page.key} style={pageStyle} role='presentation'>
        {cells}
      </div>
    );
    // cache the first page for now since it is re-rendered a lot times unncessarily.
    // todo: a more aggresive caching mechanism is to cache pages constaining the items not changed.
    // now we re-render pages too frequently, for example, props.items increased from 30 to 60, although the 
    // first 30 items did not change, we still re-rendered all of them in this props.items change.
    if (usePageCache && page.startIndex === 0) {
      if (cachedPage) {
        cachedPage.pageElement = pageElement;
      } else {
        this._pageCache[page.key] = {
          page: page,
          pageElement: pageElement
        };
      }
    }
    return pageElement;
  }

  /** Generate the style object for the page. */
  private _getPageStyle(page: IPage) {
    let style;
    let { getPageStyle } = this.props;

    if (getPageStyle) {
      style = getPageStyle(page);
    }

    if (!page.items) {
      style = style || {};
      style.height = page.height;
    }

    return style;
  }

  /** Track the last item index focused so that we ensure we keep it rendered. */
  private _onFocus(ev: any) {
    let target = ev.target as HTMLElement;

    while (target !== this.refs.surface) {
      let indexString = target.getAttribute('data-list-index');

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
  private _onScroll() {
    this._resetRequiredWindows();
  }

  private _resetRequiredWindows() {
    this._requiredWindowsAhead = 0;
    this._requiredWindowsBehind = 0;
  }

  /**
   * Debounced method to asynchronously update the visible region on a scroll event.
   */
  private _onAsyncScroll() {
    this._updateRenderRects();

    // Only update pages when the visible rect falls outside of the materialized rect.
    if (!this._materializedRect || !_isContainedWithin(this._requiredRect as IRectangle, this._materializedRect)) {
      this._updatePages();
    } else {
      // console.log('requiredRect contained in materialized', this._requiredRect, this._materializedRect);
    }
  }

  /**
   * This is an async debounced method that will try and increment the windows we render. If we can increment
   * either, we increase the amount we render and re-evaluate.
   */
  private _onAsyncIdle() {
    const { renderedWindowsAhead, renderedWindowsBehind } = this.props;
    const {
      _requiredWindowsAhead: requiredWindowsAhead,
      _requiredWindowsBehind: requiredWindowsBehind
    } = this;
    const windowsAhead = Math.min(renderedWindowsAhead as number, requiredWindowsAhead + 1);
    const windowsBehind = Math.min(renderedWindowsBehind as number, requiredWindowsBehind + 1);

    if (windowsAhead !== requiredWindowsAhead || windowsBehind !== requiredWindowsBehind) {

      // console.log('idling', windowsBehind, windowsAhead);

      this._requiredWindowsAhead = windowsAhead;
      this._requiredWindowsBehind = windowsBehind;
      this._updateRenderRects();
      this._updatePages();
    }

    if (renderedWindowsAhead! > windowsAhead || renderedWindowsBehind! > windowsBehind) {
      // Async increment on next tick.
      this._onAsyncIdle();
    }
  }

  private _onAsyncResize() {
    this.forceUpdate();
  }

  private _updatePages(props?: IListProps) {
    let { items, startIndex, renderCount } = (props || this.props);

    renderCount = this._getRenderCount(props);

    // console.log('updating pages');

    if (!this._requiredRect) {
      this._updateRenderRects(props);
    }

    let newListState = this._buildPages(items as any[], startIndex as number, renderCount);
    let oldListPages = this.state.pages;

    this.setState(newListState, () => {
      // If measured version is invalid since we've updated the DOM
      const heightsChanged = this._updatePageMeasurements(oldListPages as IPage[], newListState.pages as IPage[]);

      // On first render, we should re-measure so that we don't get a visual glitch.
      if (heightsChanged) {
        this._materializedRect = null;
        if (!this._hasCompletedFirstRender) {
          this._hasCompletedFirstRender = true;
          this._updatePages();
        } else {
          this._onAsyncScroll();
        }
      } else {
        // Enqueue an idle bump.
        this._onAsyncIdle();
      }
    });
  }

  private _updatePageMeasurements(oldPages: IPage[], newPages: IPage[]) {
    let renderedIndexes = {};
    let heightChanged = false;
    let renderCount = this._getRenderCount();

    // when doing fast rendering, we render all the items without page measurement
    if (this._doFastRendering()) {
      return heightChanged;
    }

    for (let i = 0; i < oldPages.length; i++) {
      let page = oldPages[i];

      if (page.items) {
        (renderedIndexes as any)[page.startIndex] = page;
      }
    }

    for (let i = 0; i < newPages.length; i++) {
      let page = newPages[i];

      if (page.items) {
        heightChanged = this._measurePage(page) || heightChanged;

        if (!(renderedIndexes as any)[page.startIndex]) {
          this._onPageAdded(page);
        } else {
          delete (renderedIndexes as any)[page.startIndex];
        }
      }
    }

    for (let index in renderedIndexes) {
      if (renderedIndexes.hasOwnProperty(index)) {
        this._onPageRemoved((renderedIndexes as any)[index]);
      }
    }

    return heightChanged;
  }

  /**
   * Given a page, measure its dimensions, update cache.
   * @returns True if the height has changed.
   */
  private _measurePage(page: IPage): boolean {
    let hasChangedHeight = false;
    let pageElement = this.refs[page.key] as HTMLElement;
    let cachedHeight = this._cachedPageHeights[page.startIndex];

    // console.log('   * measure attempt', page.startIndex, cachedHeight);

    if (pageElement && !this._doFastRendering() && (!cachedHeight || cachedHeight.measureVersion !== this._measureVersion)) {
      let newClientRect = {
        width: pageElement.clientWidth,
        height: pageElement.clientHeight
      };

      if (newClientRect.height || newClientRect.width) {
        hasChangedHeight = page.height !== newClientRect.height;

        // console.warn(' *** expensive page measure', page.startIndex, page.height, newClientRect.height);

        page.height = newClientRect.height;

        this._cachedPageHeights[page.startIndex] = {
          height: newClientRect.height,
          measureVersion: this._measureVersion
        };

        this._estimatedPageHeight = Math.round(
          ((this._estimatedPageHeight * this._totalEstimates) + newClientRect.height) /
          (this._totalEstimates + 1));

        this._totalEstimates++;
      }
    }

    return hasChangedHeight;
  }

  /** Called when a page has been added to the DOM. */
  private _onPageAdded(page: IPage) {
    let { onPageAdded } = this.props;

    // console.log('page added', page.startIndex, this.state.pages.map(page => page.key).join(', '));

    if (onPageAdded) {
      onPageAdded(page);
    }
  }

  /** Called when a page has been removed from the DOM. */
  private _onPageRemoved(page: IPage) {
    let { onPageRemoved } = this.props;

    // console.log('  --- page removed', page.startIndex, this.state.pages.map(page => page.key).join(', '));

    if (onPageRemoved) {
      onPageRemoved(page);
    }
  }

  /** Build up the pages that should be rendered. */
  private _buildPages(items: any[], startIndex: number, renderCount: number): IListState {
    let materializedRect = assign({}, EMPTY_RECT) as IRectangle;
    let itemsPerPage = 1;
    let pages = [];
    let pageTop = 0;
    let currentSpacer = null;
    let focusedIndex = this._focusedIndex;
    let endIndex = startIndex + renderCount;
    const fastRendering = this._doFastRendering();

    // First render is very important to track; when we render cells, we have no idea of estimated page height.
    // So we should default to rendering only the first page so that we can get information.
    // However if the user provides a measure function, let's just assume they know the right heights.
    let isFirstRender = this._estimatedPageHeight === 0 && !this.props.getPageHeight;

    for (let itemIndex = startIndex; itemIndex < endIndex; itemIndex += itemsPerPage) {
      itemsPerPage = this._getItemCountForPage(itemIndex, this._allowedRect);

      let pageHeight = this._getPageHeight(itemIndex, itemsPerPage, this._surfaceRect);
      let pageBottom = pageTop + pageHeight - 1;

      let isPageRendered = findIndex(this.state.pages as IPage[], (page) => page.items && page.startIndex === itemIndex) > -1;
      let isPageInAllowedRange = !this._allowedRect || pageBottom >= this._allowedRect.top && pageTop <= this._allowedRect.bottom!;
      let isPageInRequiredRange = !this._requiredRect || pageBottom >= this._requiredRect!.top && pageTop <= this._requiredRect!.bottom!;
      let isPageVisible = !isFirstRender && (isPageInRequiredRange || (isPageInAllowedRange && isPageRendered)) || fastRendering;
      let isPageFocused = focusedIndex >= itemIndex && focusedIndex < (itemIndex + itemsPerPage);
      let isFirstPage = itemIndex === startIndex;

      // console.log('building page', itemIndex, 'pageTop: ' + pageTop, 'inAllowed: ' + isPageInAllowedRange, 'inRequired: ' + isPageInRequiredRange);

      // Only render whats visible, focused, or first page, 
      // or when running in fast rendering mode, we render all current items in pages
      if (isPageVisible || isPageFocused || isFirstPage) {
        if (currentSpacer) {
          pages.push(currentSpacer);
          currentSpacer = null;
        }

        let itemsInPage = Math.min(itemsPerPage, endIndex - itemIndex);
        let newPage = this._createPage(null, items.slice(itemIndex, itemIndex + itemsInPage), itemIndex);

        newPage.top = pageTop;
        newPage.height = pageHeight;

        pages.push(newPage);

        if (isPageInRequiredRange && this._allowedRect) {
          _mergeRect(materializedRect, {
            top: pageTop,
            bottom: pageBottom,
            height: pageHeight,
            left: this._allowedRect.left,
            right: this._allowedRect.right,
            width: this._allowedRect.width
          });
        }

      } else {
        if (!currentSpacer) {
          currentSpacer = this._createPage('spacer-' + itemIndex, null, itemIndex, 0);
        }
        currentSpacer.height = (currentSpacer.height || 0) + (pageBottom - pageTop) + 1;
        currentSpacer.itemCount += itemsPerPage;
      }
      pageTop += (pageBottom - pageTop + 1);

      // when running in faster rendering mode, we render all items without measurement so no need to stop at the first page
      if (isFirstRender && !fastRendering) {
        break;
      }
    }

    if (currentSpacer) {
      currentSpacer.key = 'spacer-end';
      pages.push(currentSpacer);
    }

    this._materializedRect = materializedRect;

    // console.log('materialized: ', materializedRect);
    return {
      pages: pages,
      measureVersion: this._measureVersion
    };
  }

  /**
   * Get the pixel height of a give page. Will use the props getPageHeight first, and if not provided, fallback to
   * cached height, or estimated page height, or default page height.
   */
  private _getPageHeight(itemIndex: number, itemsPerPage: number, visibleRect: IRectangle): number {
    if (this.props.getPageHeight) {
      return this.props.getPageHeight(itemIndex, visibleRect);
    } else {
      let cachedHeight = (this._cachedPageHeights[itemIndex]);

      return cachedHeight ? cachedHeight.height : (this._estimatedPageHeight || DEFAULT_PAGE_HEIGHT);
    }
  }

  private _getItemCountForPage(itemIndex: number, visibileRect: IRectangle): number {
    let itemsPerPage = this.props.getItemCountForPage ? this.props.getItemCountForPage(itemIndex, visibileRect) : DEFAULT_ITEMS_PER_PAGE;

    return itemsPerPage ? itemsPerPage : DEFAULT_ITEMS_PER_PAGE;
  }

  private _createPage(pageKey: string | null, items: any[] | null, startIndex?: number, count?: number, style?: any): IPage {
    pageKey = pageKey || ('page-' + startIndex);
    const cachedPage = this._pageCache[pageKey];
    if (cachedPage && cachedPage.page) {
      return cachedPage.page;
    }

    // Fill undefined cells because array.map will ignore undefined cells.
    if (items) {
      for (let i = 0; i < items.length; i++) {
        items[i] = items[i] || null;
      }
    }

    const page = {
      key: pageKey,
      startIndex: startIndex === undefined ? -1 : startIndex,
      itemCount: (count === undefined) ? (items ? items.length : 0) : count,
      items: items as any[],
      style: style || {},
      top: 0,
      height: 0
    };
    if (pageKey.lastIndexOf('spacer', 0) === -1) {
      if (cachedPage) {
        cachedPage.page = page;
      } else {
        // todo
        this._pageCache[pageKey] = {
          page: page,
          pageElement: undefined
        };
      }
    }
    return page;
  }

  private _getRenderCount(props?: IListProps): number {
    let { items, startIndex, renderCount } = props || this.props;

    return (renderCount === undefined ? (items ? items.length - startIndex! : 0) : renderCount);
  }

  private _doFastRendering(): boolean {
    return this._getRenderCount(this.props) <= this._fastRenderingItemCount;
  }

  /** Calculate the visible rect within the list where top: 0 and left: 0 is the top/left of the list. */
  private _updateRenderRects(props?: IListProps, forceUpdate?: boolean) {
    const { renderedWindowsAhead, renderedWindowsBehind } = (props || this.props);
    const { pages } = this.state;
    const renderCount = this._getRenderCount(props);
    // when running in faster rendering mode, we render all items without measurement to optimize page rendering perf
    if (this._doFastRendering()) {
      return;
    }

    let surfaceRect = this._surfaceRect;
    let scrollHeight = this._scrollElement && this._scrollElement.scrollHeight;
    let scrollTop = this._scrollElement ? this._scrollElement.scrollTop : 0;

    // WARNING: EXPENSIVE CALL! We need to know the surface top relative to the window.
    // This needs to be called to recalculate when new pages should be loaded.
    // We check to see how far we've scrolled and if it's further than a third of a page we run it again.
    if (
      forceUpdate ||
      !pages ||
      !this._surfaceRect ||
      !scrollHeight ||
      scrollHeight !== this._scrollHeight ||
      Math.abs(this._scrollTop - scrollTop) > this._estimatedPageHeight / 3) {
      surfaceRect = this._surfaceRect = _measureSurfaceRect(this.refs.surface);
      this._scrollTop = scrollTop;
    }

    // If the scroll height has changed, something in the container likely resized and
    // we should redo the page heights incase their content resized.
    if (forceUpdate ||
      !scrollHeight ||
      scrollHeight !== this._scrollHeight) {
      this._measureVersion++;
    }

    this._scrollHeight = scrollHeight;

    // If the surface is above the container top or below the container bottom, or if this is not the first
    // render return empty rect.
    // The first time the list gets rendered we need to calculate the rectangle. The width of the list is
    // used to calculate the width of the list items.
    const visibleTop = Math.max(0, -surfaceRect.top);
    const visibleRect = {
      top: visibleTop,
      left: surfaceRect.left,
      bottom: visibleTop + window.innerHeight,
      right: surfaceRect.right,
      width: surfaceRect.width,
      height: window.innerHeight
    };

    // The required/allowed rects are adjusted versions of the visible rect.
    this._requiredRect = _expandRect(visibleRect, this._requiredWindowsBehind, this._requiredWindowsAhead);
    this._allowedRect = _expandRect(visibleRect, renderedWindowsBehind!, renderedWindowsAhead!);
  }
}

function _expandRect(rect: IRectangle, pagesBefore: number, pagesAfter: number): IRectangle {
  const top = rect.top - (pagesBefore * rect.height);
  const height = rect.height + ((pagesBefore + pagesAfter) * rect.height);

  return {
    top: top,
    bottom: top + height,
    height: height,
    left: rect.left,
    right: rect.right,
    width: rect.width
  };
}

function _isContainedWithin(innerRect: IRectangle, outerRect: IRectangle): boolean {
  return (
    innerRect.top >= outerRect.top &&
    innerRect.left >= outerRect.left &&
    innerRect.bottom! <= outerRect.bottom! &&
    innerRect.right! <= outerRect.right!);
}

function _mergeRect(targetRect: IRectangle, newRect: IRectangle): IRectangle {
  targetRect.top = (newRect.top < targetRect.top || targetRect.top === -1) ? newRect.top : targetRect.top;
  targetRect.left = (newRect.left < targetRect.left || targetRect.left === -1) ? newRect.left : targetRect.left;
  targetRect.bottom = (newRect.bottom! > targetRect.bottom! || targetRect.bottom === -1) ? newRect.bottom : targetRect.bottom;
  targetRect.right = (newRect.right! > targetRect.right! || targetRect.right === -1) ? newRect.right : targetRect.right;
  targetRect.width = targetRect.right! - targetRect.left + 1;
  targetRect.height = targetRect.bottom! - targetRect.top + 1;

  return targetRect;
}