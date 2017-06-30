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
  stickyAbove: StickyHeader[];
  stickyBelow: StickyHeader[];
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
    topBound: PropTypes.number,
    bottomBound: PropTypes.number
  };

  public getChildContext() {
    return {
      subscribe: this.subscribe,
      addStickyHeader: this.addStickyHeader,
      removeStickyHeader: this.removeStickyHeader,
      addStickyFooter: this.addStickyFooter,
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
  private _subscribers: Function[];
  private _stickyAbove: string[];
  // private _stickyBelow: string[];
  private _topHeaderHeight: number;

  constructor(props: IScrollablePaneProps) {
    super(props);

    this.state = {
      contentAreasAbove: [],
      contentAreasVisible: [],
      contentAreasBelow: [],
      stickyAbove: [],
      stickyBelow: []
    };
    this._subscribers = [];
    this._stickyAbove = [];
    this._topHeaderHeight = 0;
  }

  public componentWillMount() {
    // debugger;
  }

  public componentDidMount() {
    this._scrollElement = findScrollableParent(this.refs.root);
    if (this._scrollElement) {
      const scrollBounds: ClientRect = this._scrollElement.getBoundingClientRect();
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
  public addStickyHeader(sticky: StickyHeader) {
    let { stickyAbove } = this.state;
    if (stickyAbove.indexOf(sticky) < 0) {
      stickyAbove.push(sticky);
      this.setState({
        stickyAbove: stickyAbove
      }, () => {
        console.log('STATE OF STICKY ABOVE', this.state.stickyAbove);
        this._notifyHeaders();
      });
      this._topHeaderHeight += sticky.refs.root.clientHeight;
    }
  }

  @autobind
  public removeStickyHeader(sticky: StickyHeader) {
    let { stickyAbove } = this.state;
    const indexOfHeader = stickyAbove.indexOf(sticky);
    if (indexOfHeader >= 0) {
      stickyAbove.splice(indexOfHeader, 1);
      this.setState({
        stickyAbove: stickyAbove
      }, () => {
        console.log('STATE OF STICKY ABOVE', this.state.stickyAbove);
        this._notifyHeaders();
      });
      this._topHeaderHeight -= sticky.refs.root.clientHeight;
    }
  }

  @autobind
  public addStickyFooter(sticky: StickyHeader) {
  }

  private _notifyHeaders() {
    const { stickyAbove } = this.state;
    let distance = 0;
    stickyAbove.forEach((sticky) => {
      sticky.setTopDistance(distance);
      distance += sticky.refs.root.clientHeight;
    });
  }

  private _notifySubscribers() {
    const scrollBounds: ClientRect = this._scrollElement.getBoundingClientRect();
    const topScrollBound = scrollBounds.top;
    this._subscribers.forEach((handle) => {
      handle(topScrollBound, this._topHeaderHeight, this._scrollElement.offsetTop);
    });
  }
}
