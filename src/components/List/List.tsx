import * as React from 'react';
import EventGroup from '../../utilities/eventGroup/EventGroup';
import withContainsFocus from '../../utilities/decorators/withContainsFocus';

export interface IListProps {
  items?: any[];
  onRenderCell?: (item?: any, index?: number, containsFocus?: boolean) => any;
  itemsPerPage?: number;

  containsFocus?: boolean;

  ref?: string;
}

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

@withContainsFocus
export default class List extends React.Component<IListProps, any> {
  public static defaultProps = {
    itemsPerPage: 10,
    onRenderCell: (item, index, containsFocus) => (<div>{ item.name }</div>)
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

  constructor() {
    super();
    this.state = {
      pages: [],
      surfaceStyle: {}
    };

    this._events = new EventGroup(this);
    this._cachedPageHeights = {};
    this._estimatedItemHeight = 30;
  }

  public componentDidMount() {
    let scrollableElements = this._getScrollableElements();

    this._scrollableElement = scrollableElements[0];

    this._updatePages();

    for (let el of scrollableElements) {
      this._events.on(el, 'scroll', this._updatePages);
    }
    this._events.on(window, 'scroll', this._updatePages);
    this._events.on(window, 'resize', this._updatePages);
  }

  public componentWillUnmount() {
    this._events.dispose();
  }

  public shouldComponentUpdate(newProps: IListProps, newState: IListState) {
    let { pages: oldPages, containerRect: oldContainerRect } = this.state;
    let { pages: newPages, containerRect: newContainerRect } = newState;
    let shouldComponentUpdate = false;

    if (newProps.containsFocus === this.props.containsFocus &&
      oldPages.length === newPages.length &&
      areEqualSize(oldContainerRect, newContainerRect)) {
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

  public render() {
    let rootClass = 'ms-List';
    let { onRenderCell, containsFocus } = this.props;
    let { pages, surfaceStyle } = this.state;

    return (
      <div ref='root' className={ rootClass }>
        <div ref='surface' className='ms-List-surface' style={ surfaceStyle }>
        { pages.map(page => (
          <div className='ms-List-page' key={ page.key } ref={ page.key } style={ page.style }>
          { page.items ? page.items.map((item, itemIndex) => (
            <div className='ms-List-cell' key={ item.key }>
              { onRenderCell(item, page.startIndex + itemIndex, containsFocus) }
              </div>
          )) : null }
            </div>
        )) }
          </div>
        </div>
    );
  }

  public scrollTo(index: number) {
    let { pages } = this.state;

    if (pages && pages.length > 2) {
      let firstPage = pages[0];
      let lastPage = pages[1];

      if (firstPage.startIndex <= index && lastPage.endIndex) {
        return;
      }
    }

    console.log('scroll to ' + index);
  }

  private _updatePages() {
    let { items } = this.props;
    let { pages } = this.state;
    let containerRect = this._getScrollableContainerRect();

    // If no items, no-op.
    if (!items || !items.length) {
      return;
    }

    // Rebuild pages.
    this._updatePageMeasurements();

    pages = this._buildPages(containerRect);

    this.setState({
      pages: pages,
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

  private _buildPages(containerRect: any): any[] {
    let { items } = this.props;
    let surfaceElement = this.refs.surface;
    let surfaceRect = surfaceElement.getBoundingClientRect();
    let visibleTop = containerRect.top - surfaceRect.top;
    let visibleBottom = visibleTop + containerRect.height;
    let itemsPerPage = 1;
    let startSpacer = this._createPage('startSpacer', null, 0, 0);
    let endSpacer = this._createPage('endSpacer', null, 0, 0);
    let pages = [startSpacer];
    let pageTop = 0;

    for (let itemIndex = 0; itemIndex < items.length; itemIndex += itemsPerPage) {
      itemsPerPage = this._getItemCountForPage(itemIndex);

      let pageBottom = pageTop + this._getPageHeight(itemIndex, itemsPerPage) - 1;

      // Only render whats visible
      if (pageBottom > visibleTop && pageTop < visibleBottom) {
        pages.push(this._createPage(null, items.slice(itemIndex, itemIndex + itemsPerPage), itemIndex));
      } else {
        let spacer = (pages.length === 1) ? startSpacer : endSpacer;

        spacer.style.height = (spacer.style.height || 0) + (pageBottom - pageTop) + 1;
        spacer.itemCount += itemsPerPage;
      }
      pageTop += (pageBottom - pageTop + 1);
    }

    pages.push(endSpacer);

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

  private _getItemCountForPage(itemIndex: number): number {
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

  private _getScrollableContainerRect() {
    // If we are using body scroll, 0 to window.innerHeight is the constraint;
    // Otherwise, it's relative to the scrollable container which needs to be found.

    return {
      top: -window.innerHeight,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight * 3
    };
  }

  private _createPage(pageKey: string, items: any[], startIndex?: number, count?: number, style?: any) {
    pageKey = pageKey || ('page-' + startIndex);

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

function areEqualSize(rect1: IRect, rect2: IRect) {
  return !!(rect1 && rect2 && rect1.width === rect2.width && rect1.height === rect2.height);
}
