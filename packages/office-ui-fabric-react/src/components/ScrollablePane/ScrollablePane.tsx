/* tslint:disable:no-unused-variable */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
/* tslint:enable:no-unused-variable */
import * as PropTypes from 'prop-types';
import {
  BaseComponent,
  autobind,
  css,
  findScrollableParent
  // getId
} from '../../Utilities';
import { IScrollablePaneProps, IContentArea } from './ScrollablePane.Props';
import * as stylesImport from './ScrollablePane.scss';
import { StickyHeader } from '../../StickyHeader';
const styles: any = stylesImport;

export interface IScrollablePaneState {
  contentAreasAbove: IContentArea[];
  contentAreasVisible: IContentArea[];
  contentAreasBelow: IContentArea[];
}

export class ScrollablePane extends BaseComponent<IScrollablePaneProps, IScrollablePaneState> {
  public static defaultProps: IScrollablePaneProps = {
    contentAreas: []
  };

  public static childContextTypes = {
    subscribe: PropTypes.func,
    addStickyHeader: PropTypes.func,
    removeStickyHeader: PropTypes.func,
    addStickyFooter: PropTypes.func,
    scrollContainer: PropTypes.element,
    topBound: PropTypes.number,
    bottomBound: PropTypes.number
  };

  public getChildContext() {
    return {
      subscribe: this.subscribe,
      addStickyHeader: this.addStickyHeader,
      removeStickyHeader: this.removeStickyHeader,
      addStickyFooter: this.addStickyFooter,
      scrollContainer: this._scrollElement,
      topBound: this._topBound,
      bottomBound: this._bottomBound
    };
  }

  public refs: {
    root: HTMLElement;
    stickyContainer: HTMLElement;
    scrollCopy: HTMLElement;
    topHeaders: HTMLElement;
    bottomHeaders: HTMLElement;
  };

  private _scrollElement: HTMLElement;
  private _topBound: number;
  private _bottomBound: number;
  private _subscribers: ((topScrollBound: number, scrollDistance: number, topHeaderHeight: number) => void)[];
  private _stickyAbove: string[];
  // private _stickyBelow: string[];
  private _topHeaderHeight: number;

  constructor(props: IScrollablePaneProps) {
    super(props);

    this.state = {
      contentAreasAbove: [],
      contentAreasVisible: [],
      contentAreasBelow: []
    };
    this._subscribers = [];
    this._stickyAbove = [];
    // this._stickyBelow = [];
    this._topHeaderHeight = 0;
  }

  public componentWillMount() {
    // debugger;
  }

  public componentDidMount() {
    this._scrollElement = findScrollableParent(this.refs.root);
    this._checkContentAreasPosition();
    if (this._scrollElement) {
      this._events.on(this._scrollElement, 'scroll', this._notifySubscribers);
    }
  }

  public render() {
    const {
      contentAreasAbove,
      contentAreasBelow
    } = this.state;
    const { className, contentAreas } = this.props;

    return (
      <div className={ css('ms-ScrollablePane', styles.root, className) }
        ref='root'>
        <div className={ styles.scrollRegion }>
          { contentAreas.map((contentArea: IContentArea, index: number) => {
            return (
              <div
                ref={ index.toString() }
                className={ styles.contentArea }
                key={ index }>
                { contentArea.content }
              </div>
            );
          }) }
        </div>

      </div>
    );
  }

  @autobind
  public subscribe(handler) {
    this._subscribers = this._subscribers.concat(handler);
  }

  @autobind
  public addStickyHeader(id: string, height: number) {
    if (this._stickyAbove.indexOf(id) < 0) {
      this._stickyAbove.push(id);
      this._topHeaderHeight += height;
    }
  }

  @autobind
  public removeStickyHeader(id: string, height: number) {
    const indexOfHeader = this._stickyAbove.indexOf(id);
    if (this._stickyAbove.indexOf(id) >= 0) {
      this._stickyAbove.splice(indexOfHeader, 1);
      this._topHeaderHeight -= height;
    }
  }

  @autobind
  public addStickyFooter(sticky: StickyHeader) {
  }

  private _notifySubscribers() {
    const scrollBounds: ClientRect = this._scrollElement.getBoundingClientRect();
    const topScrollBound = scrollBounds.top;
    console.log(topScrollBound, this.refs.root.scrollTop, this._scrollElement.scrollTop);
    this._subscribers.forEach((handle) => {
      handle(topScrollBound, this._scrollElement.scrollTop, this._topHeaderHeight);
    });
  }

  private _checkContentAreasPosition() {
    const { contentAreas } = this.props;
    let contentAreasAbove: IContentArea[] = [];
    let contentAreasVisible: IContentArea[] = [];
    let contentAreasBelow: IContentArea[] = [];
    const scrollBounds: ClientRect = this._scrollElement.getBoundingClientRect();
    // const topBound = scrollBounds.top + this.refs.topHeaders.clientHeight;
    // const bottomBound = scrollBounds.bottom - this.refs.bottomHeaders.clientHeight;
    // this._topBound = topBound;
    // this._bottomBound = bottomBound;
    // contentAreas.forEach((content, idx) => {
    //   const currAreaBounds: ClientRect = this.refs[idx].getBoundingClientRect();
    //   if ((currAreaBounds.top < topBound && idx !== 0) || currAreaBounds.top < scrollBounds.top) {
    //     contentAreasAbove.push(content);
    //   } else if (currAreaBounds.bottom >= topBound && currAreaBounds.top <= scrollBounds.bottom) {
    //     contentAreasVisible.push(content);
    //   } else {
    //     contentAreasBelow.push(content);
    //   }
    // });
    this.setState({
      contentAreasAbove: contentAreasAbove,
      contentAreasVisible: contentAreasVisible,
      contentAreasBelow: contentAreasBelow
    });
  }
}
