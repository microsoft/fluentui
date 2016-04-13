import * as React from 'react';
import EventGroup from '../../utilities/eventGroup/EventGroup';
import Async from '../../utilities/async/Async';
import { ISelection, SELECTION_CHANGE } from '../../utilities/selection/interfaces';

export interface IListProps extends React.Props<List> {
  /** Items to render. */
  items?: any[];

  /** Method to call when trying to render an item. */
  onRenderCell?: (item?: any, index?: number) => React.ReactNode;

  /** Method to call to get how many items to render per page from specified index. */
  getItemCountForPage?: (itemIndex?: number, surfaceRect?: ClientRect) => number;

  /** How many items to render per page. */
  itemsPerPage?: number;

  selection?: ISelection;
}

const MIN_SCROLL_UPDATE_DELAY = 50;
const MAX_SCROLL_UPDATE_DELAY = 200;

export interface IListState {
  pages?: any[];
  containerRect?: IRect;
}

export interface IRect {
  top: number;
  left: number;
  width: number;
  height: number;
}

export default class List extends React.Component<IListProps, IListState> {
  public static defaultProps = {
    itemsPerPage: 10,
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

    // Ensure that scrolls and resizes are lazy updated.
    this._onScrollOrResize = this._async.debounce(
      this._onScrollOrResize,
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

    for (let el of scrollableElements) {
      this._events.on(el, 'scroll', this._onScrollOrResize);
    }

    this._events.on(window, 'scroll', this._onScrollOrResize);
    this._events.on(window, 'resize', this._onScrollOrResize);
  }

  public componentWillUnmount() {
    this._events.dispose();
    this._async.dispose();
  }

  public componentWillReceiveProps(newProps: IListProps) {
    this._updatePages(newProps.items);
  }

  public shouldComponentUpdate(newProps: IListProps, newState: IListState) {
    let { pages: oldPages, containerRect: oldContainerRect } = this.state;
    let { pages: newPages, containerRect: newContainerRect } = newState;
    let shouldComponentUpdate = false;

    if (
      newProps.items === this.props.items &&
      oldPages.length === newPages.length &&
      _areEqualSize(oldContainerRect, newContainerRect)) {
      for (let i = 0; i < oldPages.length; i++) {
        let oldPage = oldPages[i];
        let newPage = newPages[i];

        if ((oldPage.startIndex !== newPage.startIndex ||
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
    if (this._scrollingToIndex > -1) {
      if (this._isIndexRendered(this._scrollingToIndex)) {
        this._focusedIndex = this._scrollingToIndex;
        this._scrollingToIndex = -1;
      }
    }
  }

  public render() {
    let rootClass = 'ms-List';
    let { onRenderCell } = this.props;
    let { pages } = this.state;

    return (
      <div ref='root' className={ rootClass }>
        <div ref='surface' className='ms-List-surface'>
          { pages.map(page => (
            <div className='ms-List-page' key={ page.key } ref={ page.key } style={ page.style }>
              { page.items ? page.items.map((item, itemIndex) => (
                <div className='ms-List-cell' key={ (page.startIndex + itemIndex) }>
                  { onRenderCell(item, page.startIndex + itemIndex) }
                </div>
              )) : null }
            </div>
          )) }
        </div>
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
    let { selection } = this.props;
    let focusedIndex = selection.getFocusedIndex();
    let shouldScroll = !!(this._focusedIndex !== focusedIndex && selection.getIsFocusActive());

    if (shouldScroll) {
      this._scrollingToIndex = focusedIndex;
      if (!this.scrollTo(focusedIndex)) {
        this._focusedIndex = this._scrollingToIndex;
        this._scrollingToIndex = -1;
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

  private _onScrollOrResize() {
    this._updatePages();
  }

  private _updatePages(items?: any[]) {
    let containerRect = {
      top: -window.innerHeight,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight * 3
    };

    items = items || this.props.items;

    // Rebuild pages.
    this._updatePageMeasurements();

    this.setState({
      pages: this._buildPages(containerRect, items),
      containerRect: containerRect
    });
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

  private _buildPages(containerRect: any, items: any[]): any[] {
    let surfaceElement = this.refs.surface;
    let surfaceRect = surfaceElement.getBoundingClientRect();
    let visibleTop = containerRect.top - surfaceRect.top;
    let visibleBottom = visibleTop + containerRect.height;
    let itemsPerPage = 1;
    let pages = [];
    let pageTop = 0;
    let currentSpacer = null;
    let focusedIndex = this._focusedIndex;

    for (let itemIndex = 0; itemIndex < items.length; itemIndex += itemsPerPage) {
      itemsPerPage = this._getItemCountForPage(itemIndex, surfaceRect);

      let pageBottom = pageTop + this._getPageHeight(itemIndex, itemsPerPage) - 1;
      let pageIsVisible = pageBottom > visibleTop && pageTop < visibleBottom;

      // If the page contains the focusedIndex, render it.
      if (focusedIndex >= itemIndex && focusedIndex < (itemIndex + itemsPerPage)) {
        pageIsVisible = true;
      }

      // Only render whats visible
      if (pageIsVisible) {
        if (currentSpacer) {
          pages.push(currentSpacer);
          currentSpacer = null;
        }

        let itemsInPage = Math.min(itemsPerPage, items.length - itemIndex);

        pages.push(this._createPage(null, _slice(items, itemIndex, itemIndex + itemsInPage, null), itemIndex));
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

    return pages;
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

  private _createPage(pageKey: string, items: any[], startIndex?: number, count?: number, style?: any) {
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

function _areEqualSize(rect1: IRect, rect2: IRect) {
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