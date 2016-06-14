import * as React from 'react';
import { BaseComponent } from '../../common/BaseComponent';
import { IListProps, IPage } from './List.Props';
import { css } from '../../utilities/css';
import { assign } from '../../utilities/object';

const MIN_SCROLL_UPDATE_DELAY = 50;
const MAX_SCROLL_UPDATE_DELAY = 200;

const DEFAULT_ITEMS_PER_PAGE = 10;
const DEFAULT_PAGE_HEIGHT = 30;

const DEFAULT_RENDERED_WINDOWS_BEHIND = 2;
const DEFAULT_RENDERED_WINDOWS_AHEAD = 2;

let _instance = 0;

export interface IListState {
  pages?: IPage[];

  /** The last versionstamp for  */
  measureVersion?: number;
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
 * However, certain operations can make measure data stale. For example, resizing the list, or passing in new props,
 * or forcing an update change cause pages to shrink/grow. When these operations occur, we increment a measureVersion
 * number, which we associate with cached measurements and use to determine if a remeasure should occur.
 */
export class List extends BaseComponent<IListProps, IListState> {
  public static defaultProps = {
    startIndex: 0,
    onRenderCell: (item, index, containsFocus) => (<div>{ (item && item.name) || '' }</div>),
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
  private _cachedPageHeights: { [key: string]: {
    height: number,
    measureVersion: number
  } };
  private _scrollableElement: HTMLElement;
  private _focusedIndex: number;
  private _scrollingToIndex: number;

  // surface rect relative to window
  private _surfaceRect: ClientRect;

  // visible rect relative to surface
  private _visibleRect: ClientRect;

  // materialized rect around visible items, relative to surface
  private _materializedRect: ClientRect;

  private _id: number;
  private _measureVersion: number;

  constructor(props: IListProps) {
    super(props);
    this.state = {
      pages: []
    };
    this._id = _instance++;

    this._estimatedPageHeight = 0;
    this._totalEstimates = 0;

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

    this._cachedPageHeights = {};
    this._estimatedPageHeight = 0;
    this._focusedIndex = -1;
    this._scrollingToIndex = -1;
  }

  public componentDidMount() {
    let scrollableElements = this._getScrollableElements();

    this._scrollableElement = scrollableElements[0];

    this._updatePages();
    this._measureVersion++;

    this._events.on(window, 'resize', this._onResize);
    this._events.on(this.refs.root, 'focus', this._onFocus, true);

    this._registerScrollListener();
  }

  public _registerScrollListener() {
    let scrollElement: any = this.refs.root;

    while (scrollElement) {
      if (scrollElement.getAttribute('data-is-scrollable') === 'true') {
        this._events.on(scrollElement, 'scroll', this._onAsyncScroll);
        break;
      }

      if (scrollElement === document.body) {
        this._events.on(window, 'scroll', this._onAsyncScroll, true);
        break;
      }

      scrollElement = scrollElement.parentNode;
    }
  }

  public componentWillReceiveProps(newProps: IListProps) {
    if (newProps.items !== this.props.items ||
      newProps.renderCount !== this.props.renderCount ||
      newProps.startIndex !== this.props.startIndex) {

      this._updatePages(newProps);
    }
  }

  public shouldComponentUpdate(newProps: IListProps, newState: IListState) {
    let { pages: oldPages } = this.state;
    let { pages: newPages, measureVersion } = newState;
    let shouldComponentUpdate = false;

    if (
      this._measureVersion === measureVersion &&
      newProps.renderedWindowsAhead === this.props.renderedWindowsAhead &&
      newProps.renderedWindowsBehind === this.props.renderedWindowsBehind &&
      newProps.items === this.props.items &&
      oldPages.length === newPages.length) {
      for (let i = 0; i < oldPages.length; i++) {
        let oldPage = oldPages[i];
        let newPage = newPages[i];

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
    // Ensure that when the list is force updated we update the pages first before render.
    this._updateVisibleRect();
    this._updatePages();
    this._measureVersion++;

    super.forceUpdate();
  }

  public scrollTo(index: number): boolean {
    let isIndexRendered = this._isIndexRendered(index);
    let didScroll = false;

    if (!isIndexRendered) {
      // Identify where the page would be.
      let pageTop = 0;
      let itemCount = 0;
      let { items } = this.props;
      let surfaceRect = _measureSurfaceRect(this.refs.surface);

      for (let itemIndex = 0; items && itemIndex < items.length; itemIndex += itemCount) {

        itemCount = this._getItemCountForPage(itemIndex, surfaceRect);

        if (itemIndex <= index && (itemIndex + itemCount) > index) {
          let allScrollables = this._getScrollableElements();
          let scrollElement = allScrollables[0] || document.body;

          for (let scrollable of allScrollables) {
            if (scrollable.clientHeight < scrollable.scrollHeight) {
              scrollElement = scrollable;
              break;
            }
          }

          let scrollRect = _measureScrollRect(scrollElement);

          didScroll = true;
          scrollElement.scrollTop = surfaceRect.top - scrollRect.top + scrollElement.scrollTop + pageTop;
          break;
        }

        pageTop += this._getPageHeight(itemIndex, itemCount, surfaceRect);
      }
    }

    return didScroll;
  }

  public render() {
    let { className } = this.props;
    let { pages } = this.state;
    let pageElements = [];

    for (let i = 0; i < pages.length; i++) {
      pageElements.push(this._renderPage(pages[i]));
    }

    return (
      <div ref='root' className={ css('ms-List', className) } >
        <div ref='surface' className='ms-List-surface'>
          { pageElements }
        </div>
      </div>
    );
  }

  private _renderPage(page: IPage): any {
    let { onRenderCell } = this.props;
    let cells = [];

    for (let i = 0; page.items && i < page.items.length; i++) {
      let item = page.items[i];

      cells.push(
        <div className='ms-List-cell' key={ (page.startIndex + i) } data-list-index={ i + page.startIndex } data-automationid='ListCell'>
          { onRenderCell(item, page.startIndex + i) }
        </div>
      );
    }

    return (
      <div className='ms-List-page' key={ page.key } ref={ page.key } style={ page.style }>
        { cells }
      </div>
    );
  }

  /** Track the last item index focused so that we ensure we keep it rendered. */
  private _onFocus(ev) {
    let target = ev.target as HTMLElement;

    while (target !== this.refs.surface) {
      let indexString = target.getAttribute('data-list-index');

      if (indexString) {
        this._focusedIndex = Number(indexString);
        break;
      }

      target = target.parentElement;
    }
  }

  private _isIndexRendered(index: number): boolean {
    let { pages } = this.state;
    let isIndexRendered = false;

    for (let page of pages) {
      if (page.items && page.startIndex <= index && (page.startIndex + page.itemCount) > index) {
        isIndexRendered = true;
        break;
      }
    }

    return isIndexRendered;
  }

  private _onAsyncScroll() {
    this._updateVisibleRect();

    // Only update pages when the visible rect falls outside of the materialized rect.
    if (!this._materializedRect || !_isContainedWithin(this._visibleRect, this._materializedRect)) {
      this._updatePages();
    }
  }

  private _onResize() {
    this.forceUpdate();
  }

  private _updatePages(props?: IListProps) {
// console.log('updating pages');

    let { items, startIndex, renderCount } = (props || this.props);

    renderCount = renderCount || (items ? items.length - startIndex : 0);

    if (!this._visibleRect) {
      this._updateVisibleRect(props);
    }

    let newListState = this._buildPages(items, startIndex, renderCount);
    let oldListPages = this.state.pages;

    this.setState(newListState, () => {
      // If measured version is invalid since we've updated the DOM
      const heightsChanged = this._updatePageMeasurements(oldListPages, newListState.pages);

      if (heightsChanged) { //  || this._measureVersion !== this.state.measureVersion) {
// console.log('re-enqueuing update', 'heightsChanged = ' + heightsChanged);
        this._materializedRect = null;
        this._onAsyncScroll();
      }
    });
  }

  private _updatePageMeasurements(oldPages: IPage[], newPages: IPage[]) {
    let renderedIndexes = {};
    let heightChanged = false;

    for (let i = 0; i < oldPages.length; i++) {
      let page = oldPages[i];

      if (page.items) {
        renderedIndexes[page.startIndex] = page;
      }
    }

    for (let i = 0; i < newPages.length; i++) {
      let page = newPages[i];

      if (page.items) {
        heightChanged = this._measurePage(page) || heightChanged;

        if (!renderedIndexes[page.startIndex]) {
          this._onPageAdded(page);
        } else {
          delete renderedIndexes[page.startIndex];
        }
      }
    }

    for (let index in renderedIndexes) {
      if (renderedIndexes.hasOwnProperty(index)) {
        this._onPageRemoved(renderedIndexes[index]);
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

// // console.log('   * measure attempt', page.startIndex, cachedHeight);

    if (pageElement && (!cachedHeight || cachedHeight.measureVersion !== this._measureVersion)) {
      let newClientRect = _measurePageRect(pageElement);

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

    return hasChangedHeight;
  }

  /** Called when a page has been added to the DOM. */
  private _onPageAdded(page: IPage) {
    let { onPageAdded } = this.props;

// console.log('page added', page.startIndex, this.state.pages.map(page=>page.key).join(', '));

    if (onPageAdded) {
      onPageAdded(page);
    }
  }

  /** Called when a page has been removed from the DOM. */
  private _onPageRemoved(page: IPage) {
    let { onPageRemoved } = this.props;

    // console.log('  --- page removed', page.startIndex, this.state.pages.map(page=>page.key).join(', '));

    if (onPageRemoved) {
      onPageRemoved(page);
    }
  }

  /** Build up the pages that should be rendered. */
  private _buildPages(items: any[], startIndex: number, renderCount: number): IListState {
    let visibleRect = this._visibleRect;
  //  let surfaceRect = this._surfaceRect;
    let materializedRect = assign({}, EMPTY_RECT) as ClientRect;
    let itemsPerPage = 1;
    let pages = [];
    let pageTop = 0;
    let currentSpacer = null;
    let focusedIndex = this._focusedIndex;
    let endIndex = startIndex + renderCount;

    // First render is very important to track; when we render cells, we have no idea of estimated page height.
    // So we should default to rendering only the first page so that we can get information.
    // However if the user provides a measure function, let's just assume they know the right heights.
    let isFirstRender = this._estimatedPageHeight === 0 && !this.props.getPageHeight;

    for (let itemIndex = startIndex; itemIndex < endIndex; itemIndex += itemsPerPage) {
      itemsPerPage = this._getItemCountForPage(itemIndex, visibleRect);

      let pageHeight = this._getPageHeight(itemIndex, itemsPerPage, visibleRect);
      let pageBottom = pageTop + pageHeight - 1;
      let isPageVisible = !isFirstRender && pageBottom >= visibleRect.top && pageTop <= visibleRect.bottom;
      let isPageFocused = focusedIndex >= itemIndex && focusedIndex < (itemIndex + itemsPerPage);
      let isFirstPage = itemIndex === startIndex;

      // Only render whats visible, focused, or first page.
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

        if (isPageVisible) {
          _mergeRect(materializedRect, {
            top: pageTop,
            bottom: pageBottom,
            height: pageHeight,
            left: visibleRect.left,
            right: visibleRect.right,
            width: visibleRect.width
          });

        }
      } else {
        if (!currentSpacer) {
          currentSpacer = this._createPage('spacer-' + itemIndex, null, itemIndex, 0);
        }
        currentSpacer.style.height = (currentSpacer.style.height || 0) + (pageBottom - pageTop) + 1;
        currentSpacer.itemCount += itemsPerPage;
      }
      pageTop += (pageBottom - pageTop + 1);
    }

    if (currentSpacer) {
      currentSpacer.key = 'spacer-end';
      pages.push(currentSpacer);
    }

    this._materializedRect = materializedRect;

    return {
      pages: pages,
      measureVersion: this._measureVersion
    };
  }

  /**
   * Get the pixel height of a give page. Will use the props getPageHeight first, and if not provided, fallback to
   * cached height, or estimated page height, or default page height.
   */
  private _getPageHeight(itemIndex: number, itemsPerPage: number, visibleRect: ClientRect): number {
    if (this.props.getPageHeight) {
      return this.props.getPageHeight(itemIndex, visibleRect);
    } else {
      let cachedHeight = (this._cachedPageHeights[itemIndex]);

      return cachedHeight ? cachedHeight.height : (this._estimatedPageHeight || DEFAULT_PAGE_HEIGHT);
    }
  }

  private _getItemCountForPage(itemIndex: number, visibileRect: ClientRect): number {
    return this.props.getItemCountForPage ? this.props.getItemCountForPage(itemIndex, visibileRect) : DEFAULT_ITEMS_PER_PAGE;
  }

  private _getScrollableElements() {
    let el = this.refs.root;
    let elements = [];

    while (el && el !== document.body) {
      let style = getComputedStyle(el);

      if (style.overflowY === 'auto' || style.overflowY === 'scroll') {
        elements.push(el);
      }

      el = el.parentElement;
    }

    return elements;
  }

  private _createPage(pageKey: string, items: any[], startIndex?: number, count?: number, style?: any): IPage {
    pageKey = pageKey || ('page-' + startIndex);

    // Fill undefined cells because array.map will ignore undefined cells.
    if (items) {
      for (let i = 0; i < items.length; i++) {
        items[i] = items[i] || null;
      }
    }

    return {
      key: pageKey,
      startIndex: startIndex === undefined ? -1 : startIndex,
      itemCount: (count === undefined) ? (items ? items.length : 0) : count,
      items: items,
      style: style || {},
      top: 0,
      height: 0
    };
  }

  /** Calculate the visible rect within the list where top: 0 and left: 0 is the top/left of the list. */
  private _updateVisibleRect(props?: IListProps): ClientRect {
    const { renderedWindowsAhead, renderedWindowsBehind } = (props || this.props);
    let containerRect: ClientRect = {
      top: -window.innerHeight * renderedWindowsBehind,
      left: 0,
      bottom: window.innerHeight * (renderedWindowsAhead + 1),
      right: window.innerWidth,
      width: window.innerWidth,
      height: window.innerHeight * (renderedWindowsAhead + renderedWindowsBehind + 1)
    };

    // WARNING: EXPENSIVE CALL!
    // console.warn('expensive measure of surface');
    const surfaceRect = this._surfaceRect = _measureSurfaceRect(this.refs.surface);

    // If the surface is above the container top or below the container bottom, return empty rect.
    if (
      surfaceRect.bottom < containerRect.top ||
      surfaceRect.top > containerRect.bottom) {
      return EMPTY_RECT;
    }

    // Clamp the dimensions so that we constrain visible range to the real range.
    let visibleTop = Math.max(0, containerRect.top - surfaceRect.top);
    let visibleLeft = Math.max(0, containerRect.left - surfaceRect.left);

    this._visibleRect = {
      top: visibleTop,
      left: visibleLeft,
      bottom: visibleTop + containerRect.height - 1,
      right: visibleLeft + surfaceRect.width - 1,
      width: surfaceRect.width,
      height: containerRect.height
    };
  }
}

/*
function _areEqualSize(rect1: ClientRect, rect2: ClientRect) {
  return !!(rect1 && rect2 && rect1.width === rect2.width && rect1.height === rect2.height);
}
*/

function _isContainedWithin(innerRect: ClientRect, outerRect: ClientRect): boolean {
  return (
    innerRect.top >= outerRect.top &&
    innerRect.left >= outerRect.left &&
    innerRect.bottom <= outerRect.bottom &&
    innerRect.right <= outerRect.right);
}

function _mergeRect(targetRect: ClientRect, newRect: ClientRect): ClientRect {
  targetRect.top = (newRect.top < targetRect.top || targetRect.top === -1) ? newRect.top : targetRect.top;
  targetRect.left = (newRect.left < targetRect.left || targetRect.left === -1) ? newRect.left : targetRect.left;
  targetRect.bottom = (newRect.bottom > targetRect.bottom || targetRect.bottom === -1) ? newRect.bottom : targetRect.bottom;
  targetRect.right = (newRect.right > targetRect.right || targetRect.right === -1) ? newRect.right : targetRect.right;
  targetRect.width = targetRect.right - targetRect.left + 1;
  targetRect.height = targetRect.bottom - targetRect.top + 1;

  return targetRect;
}