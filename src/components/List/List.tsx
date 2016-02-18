import * as React from 'react';
import ContextualMenu from '../ContextualMenu/index';
import EventGroup from '../../utilities/eventGroup/EventGroup';

export interface IListProps {
  items?: any[];
  layoutData?: any[];
  onRenderCell?: (item?: any, index?: number, layoutData?: any) => any;
  itemsPerPage?: number;
}

export interface IListState {
  pages?: any[];
  surfaceStyle?: { [ key: string ]: any };
}

export default class List extends React.Component<IListProps, any> {
  public static defaultProps = {
    itemsPerPage: 10,
    onRenderCell: (item, index, layoutData) => (<div>{ item.name }</div>)
  };

  private _estimatedItemHeight: number;
  private _cachedPageHeights: { [key: string]: number };
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
     this._updatePages();

     this._events.on(window, 'scroll', this._updatePages);
     this._events.on(window, 'resize', this._updatePages);
  }

  public componentDidUpdate() {
     //this._updatePages();
  }

  public componentWillUnmount() {
    this._events.dispose();
  }

  public render() {
    let rootClass = 'ms-List';
    let { layoutData, onRenderCell } = this.props;
    let { pages, surfaceStyle } = this.state;

    return (
      <div className={ rootClass }>
        <div ref='surface' className='ms-List-surface' style={ surfaceStyle }>
        { pages.map(page => (
          <div className='ms-List-page' key={ page.key } ref={ page.key } style={ page.style }>
          { page.items ? page.items.map((item, itemIndex) => (
            <div className='ms-List-cell' key={ item.key }>
              { onRenderCell(item, itemIndex, layoutData) }
            </div>
          )) : null }
          </div>
        )) }
        </div>
      </div>
    );
  }

  private _updatePages() {
    let { items, itemsPerPage } = this.props;
    let { pages, surfaceStyle } = this.state;
    let hasUpdatedState = false;

    // If no items, no-op.
    if (!items || !items.length) {
      return;
    }

    // Rebuild pages.
    this._updatePageMeasurements();

    pages = this._buildPages();

    if (true /* hasUpdatedState */) {
      surfaceStyle = {};

      this.setState({
        pages: pages,
        surfaceStyle: surfaceStyle
      });
    }
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

  private _buildPages(): any[] {

    let containerRect = this._getScrollableContainerRect();
    let { items } = this.props;
    let startHeight = 0;
    let endHeight = 0;
    let surfaceElement = this.refs['surface'] as HTMLElement;
    let surfaceRect = surfaceElement.getBoundingClientRect();
    let visibleTop = containerRect.top - surfaceRect.top;
    let visibleBottom = visibleTop + containerRect.height;
    let itemsPerPage = 1;
    let startSpacer = this._createPage('startSpacer', null, 0, 0);
    let endSpacer = this._createPage('endSpacer', null, 0, 0);
    let pages = [ startSpacer ];
    let pageTop = 0;

    for (let itemIndex = 0; itemIndex < items.length; itemIndex += itemsPerPage) {
      itemsPerPage = this._getItemCountForPage(0);

      let pageBottom = pageTop + this._getPageHeight(itemIndex, itemsPerPage) - 1;

      // Only render whats visible
      if (pageBottom > visibleTop && pageTop < visibleBottom) {
        pages.push(this._createPage(null, items.slice(itemIndex, itemIndex + itemsPerPage), itemIndex));
      } else {
        let spacer = (pages.length === 1) ? startSpacer : endSpacer;

        spacer.style.height = pageBottom + 1;
        spacer.itemCount += itemsPerPage;
      }
      pageTop += (pageBottom - pageTop + 1);
    }

    pages.push(endSpacer);


    return pages;
  }

  private _getCellStyle(itemIndex: number) {
    return null;
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

  private _getScrollableContainerRect() {
    // If we are using body scroll, 0 to window.innerHeight is the constraint;
    // Otherwise, it's relative to the scrollable container which needs to be found.

    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight
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
