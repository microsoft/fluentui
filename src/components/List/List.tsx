import * as React from 'react';
import EventGroup from '../../utilities/eventGroup/EventGroup';
import { IListProps } from './List.Props';
import { css } from '../../utilities/css';
import { assign } from '../../utilities/object';
import Async from '../../utilities/Async/Async';
import { SELECTION_CHANGE } from '../../utilities/selection/interfaces';

const MIN_SCROLL_UPDATE_DELAY = 40;
const MAX_SCROLL_UPDATE_DELAY = 200;

export interface IListState {
  pages?: IPage[];
  materializedRect?: ClientRect;
  surfaceRect?: ClientRect;
}

export interface IPage {
  key: string;
  items: any[];
  startIndex: number;
  itemCount: number;
  style: any;
  clientRect: ClientRect;
}

const EMPTY_RECT = {
  top: -1,
  bottom: -1,
  left: -1,
  right: -1,
  width: 0,
  height: 0
};

const ITEMS_PER_PAGE = 10;
const PAGE_BEHIND_COUNT = 1;
const PAGE_AHEAD_COUNT = 2;

export default class List extends React.Component<IListProps, IListState> {
  public static defaultProps = {
    startIndex: 0,
    itemsPerPage: ITEMS_PER_PAGE,
    onRenderCell: (item, index, containsFocus) => (<div>{ (item && item.name) || '' }</div>)
  };

  public refs: {
    [key: string]: React.ReactInstance,
    root: HTMLElement,
    surface: HTMLElement
  };

  private _estimatedItemHeight: number;
  private _cachedPageHeights: { [key: string]: number };
  private _scrollableElement: HTMLElement;
  private _events: EventGroup;
  private _focusedIndex: number;
  private _scrollingToIndex: number;
  private _async: Async;

  constructor(props: IListProps) {
    super(props);
    this.state = {
      pages: []
    };

    this._events = new EventGroup(this);
    this._async = new Async(this);

    // Ensure that scrolls are lazy updated.
    this._onScroll = this._async.debounce(
      this._onScroll,
      MIN_SCROLL_UPDATE_DELAY,
      {
        maxWait: MAX_SCROLL_UPDATE_DELAY
      });

    this._cachedPageHeights = {};
    this._estimatedItemHeight = 30;
    this._focusedIndex = -1;
    this._scrollingToIndex = -1;
    this._getItemCountForPage = props.getItemCountForPage || this._getItemCountForPage;

    if (props.selection) {
      this._events.on(props.selection, SELECTION_CHANGE, this._onSelectionChanged);
      this._focusedIndex = props.selection.getFocusedIndex();
    }
  }

  public componentDidMount() {
    let scrollableElements = this._getScrollableElements();

    this._scrollableElement = scrollableElements[0];

    this._updatePages();

    this._events.on(window, 'scroll', this._onScroll, true);
    this._events.on(window, 'resize', this._onResize);
  }

  public componentWillUnmount() {
    this._events.dispose();
    this._async.dispose();
  }

  public componentWillReceiveProps(newProps: IListProps) {
    this._updatePages(newProps.items, newProps.startIndex, newProps.renderCount);
  }

  public shouldComponentUpdate(newProps: IListProps, newState: IListState) {
    let { pages: oldPages, materializedRect: oldVisibleRect, surfaceRect: oldSurfaceRect } = this.state;
    let { pages: newPages, materializedRect: newVisibleRect, surfaceRect: newSurfaceRect } = newState;
    let shouldComponentUpdate = false;

    if (
      newProps.items === this.props.items &&
      oldPages.length === newPages.length &&
      _areEqualSize(oldSurfaceRect, newSurfaceRect) &&
      _areEqualSize(oldVisibleRect, newVisibleRect)) {
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

  public componentDidUpdate() {
    let { surfaceRect: lastSurfaceRect } = this.state;

    if (this._scrollingToIndex > -1) {
      if (this._isIndexRendered(this._scrollingToIndex)) {
        this._focusedIndex = this._scrollingToIndex;
        this._scrollingToIndex = -1;
      }
    }

    let newSurfaceRect = this.refs.surface.getBoundingClientRect();

    // If the surface height changes after a render, we need to re-evaluate the pages we're rendering.
    if (lastSurfaceRect.height !== newSurfaceRect.height || lastSurfaceRect.top !== newSurfaceRect.top) {
      this.forceUpdate();
    }
  }

  public forceUpdate() {
    // ensure that when the list is force updated we update the pages first before render.
    this._updatePages();

    super.forceUpdate();
  }

  public render() {
    let { className } = this.props;
    let { pages } = this.state;

    let pageElements = [];

    for (let i = 0; i < pages.length; i++) {
      pageElements.push(this.renderPage(pages[i]));
    }

    return (
      <div ref='root' className={ css('ms-List', className) } >
        <div ref='surface' className='ms-List-surface'>
          { pageElements }
        </div>
      </div>
    );
  }

  public renderPage(page: IPage): any {
    let { onRenderCell } = this.props;
    let cells = [];

    for (let i = 0; page.items && i < page.items.length; i++) {
      let item = page.items[i];

      cells.push(
        <div className='ms-List-cell' key={ (page.startIndex + i) } data-automationid='ListCell'>
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

  public scrollTo(index: number): boolean {
    let isIndexRendered = this._isIndexRendered(index);
    let didScroll = false;

    if (!isIndexRendered) {
      // Identify where the page would be.
      let pageTop = 0;
      let itemCount = 0;
      let { items } = this.props;

      for (let itemIndex = 0; items && itemIndex < items.length; itemIndex += itemCount) {
        let surfaceRect = this.refs.surface.getBoundingClientRect();

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

          let scrollRect = scrollElement.getBoundingClientRect();

          didScroll = true;
          scrollElement.scrollTop = surfaceRect.top - scrollRect.top + scrollElement.scrollTop + pageTop;
          break;
        }

        pageTop += + this._getPageHeight(itemIndex, itemCount);
      }
    }

    return didScroll;
  }

  private _onSelectionChanged() {
    let { selection, startIndex } = this.props;
    let focusedIndex = selection.getFocusedIndex();
    let isIndexOwnedByList = focusedIndex >= startIndex && focusedIndex < (startIndex + this._getRenderCount());
    let shouldScroll = !!(this._focusedIndex !== focusedIndex && selection.getIsFocusActive()) && isIndexOwnedByList;

    if (shouldScroll) {
      this._scrollingToIndex = focusedIndex;
      if (!this.scrollTo(focusedIndex)) {
        this._focusedIndex = this._scrollingToIndex;
        this._scrollingToIndex = -1;
        this._updatePages();
      }
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

  private _onScroll() {
    // Only update pages when the visible rect falls outside of the materialized rect.
    if (!_isContainedWithin(this._getVisibleRect(), this.state.materializedRect)) {
      this._updatePages();
    }
  }

  private _onResize() {
    this._updatePages();
  }

  private _updatePages(items?: any[], startIndex?: number, renderCount?: number) {
    items = items || this.props.items;
    startIndex = startIndex || this.props.startIndex;
    renderCount = renderCount || this._getRenderCount();

    // Rebuild current page measurements.
    this._updatePageMeasurements();

    this.setState(this._buildPages(this._getVisibleRect(), items, startIndex, renderCount));
  }

  private _updatePageMeasurements() {
    let { pages } = this.state;
    let totalHeight = 0;
    let renderedItemCount = 0;

    for (let page of pages) {
      if (page.items) {
        let pageElement = this.refs[page.key] as HTMLElement;

        if (pageElement) {
          page.clientRect = pageElement.getBoundingClientRect();
          totalHeight += page.clientRect.height;
          renderedItemCount += page.itemCount;
          this._cachedPageHeights[page.startIndex] = page.clientRect.height;
        }
      }
    }

    if (!this._estimatedItemHeight) {
      this._estimatedItemHeight = totalHeight / renderedItemCount;
    }
  }

  /** Calculate the visible rect within the list where top: 0 and left: 0 is the top/left of the list. */
  private _getVisibleRect(): ClientRect {
    let containerRect: ClientRect = {
      top: -window.innerHeight * PAGE_BEHIND_COUNT,
      left: 0,
      bottom: window.innerHeight * PAGE_AHEAD_COUNT,
      right: window.innerWidth,
      width: window.innerWidth,
      height: window.innerHeight * (PAGE_AHEAD_COUNT + PAGE_BEHIND_COUNT + 1)
    };
    let surfaceRect = this.refs.surface.getBoundingClientRect();

    // If the surface is above the container top or below the container bottom, return empty rect.
    if (
      surfaceRect.bottom < containerRect.top ||
      surfaceRect.top > containerRect.bottom) {
      return EMPTY_RECT;
    }

    // Clamp the dimensions so that we constrain visible range to the real range.
    let visibleTop = Math.max(0, containerRect.top - surfaceRect.top);
    let visibleLeft = Math.max(0, containerRect.left - surfaceRect.left);

    return {
      top: visibleTop,
      left: visibleLeft,
      bottom: visibleTop + containerRect.height - 1,
      right: visibleLeft + surfaceRect.width - 1,
      width: surfaceRect.width,
      height: containerRect.height
    };
  }

  /** Build up the pages that should be rendered. */
  private _buildPages(visibleRect: ClientRect, items: any[], startIndex: number, renderCount: number): IListState {
    let materializedRect = assign({}, EMPTY_RECT) as ClientRect;
    let itemsPerPage = 1;
    let pages = [];
    let pageTop = 0;
    let currentSpacer = null;
    let focusedIndex = this._focusedIndex;
    let endIndex = startIndex + renderCount;

    for (let itemIndex = startIndex; itemIndex < endIndex; itemIndex += itemsPerPage) {
      itemsPerPage = this._getItemCountForPage(itemIndex, visibleRect);

      let pageBottom = pageTop + this._getPageHeight(itemIndex, itemsPerPage) - 1;
      let pageIsVisible = pageBottom >= visibleRect.top && pageTop <= visibleRect.bottom;
      let pageIsFocused = focusedIndex >= itemIndex && focusedIndex < (itemIndex + itemsPerPage);

      // Only render whats visible
      if (pageIsVisible || pageIsFocused) {
        if (currentSpacer) {
          pages.push(currentSpacer);
          currentSpacer = null;
        }

        let itemsInPage = Math.min(itemsPerPage, endIndex - itemIndex);
        let newPage = this._createPage(null, _slice(items, itemIndex, itemIndex + itemsInPage, null), itemIndex);

        newPage.clientRect = {
          top: pageTop,
          left: visibleRect.left,
          bottom: pageBottom,
          right: visibleRect.right,
          width: visibleRect.width,
          height: pageBottom - pageTop + 1
        };
        pages.push(newPage);

        if (pageIsVisible) {
          _mergeRect(materializedRect, newPage.clientRect);
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

    return {
      pages: pages,
      materializedRect: materializedRect,
      surfaceRect: this.refs.surface.getBoundingClientRect()
    };
  }

  private _getPageHeight(itemIndex: number, itemsPerPage: number) {
    let pageHeight = this._cachedPageHeights[itemIndex];

    if (!pageHeight) {
      // TODO: estimate page height based on previous render size
      pageHeight = this._estimatedItemHeight * itemsPerPage;
    }

    return pageHeight;
  }

  private _getItemCountForPage(itemIndex: number, surfaceRect: ClientRect): number {
    return this.props.itemsPerPage;
  }

  private _getRenderCount() {
    let { items, renderCount, startIndex } = this.props;

    return renderCount || (items ? items.length - startIndex : 0);
  }

  private _getScrollableElements() {
    let el = this.refs.root;
    let elements = [];

    while (el !== document.body) {
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
      clientRect: null,
      startIndex: startIndex === undefined ? -1 : startIndex,
      itemCount: (count === undefined) ? (items ? items.length : 0) : count,
      items: items,
      style: style || {}
    };
  }

}

function _areEqualSize(rect1: ClientRect, rect2: ClientRect) {
  return !!(rect1 && rect2 && rect1.width === rect2.width && rect1.height === rect2.height);
}

function _slice(array, index, endIndex, defaultValue) {
  let newArray = [];

  while (index < endIndex) {
    let val = array[index++];

    newArray.push(val === undefined ? defaultValue : val);
  }

  return newArray;
}

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