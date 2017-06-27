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
  stickyElemAbove: StickyHeader[];
  stickyElemBelow: StickyHeader[];
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
  private _framePending: boolean;
  private _subscribers: Function[];

  constructor(props: IScrollablePaneProps) {
    super(props);

    this.state = {
      contentAreasAbove: [],
      contentAreasVisible: [],
      contentAreasBelow: [],
      stickyElemAbove: [],
      stickyElemBelow: []
    };
    this._subscribers = [];
  }

  public componentWillMount() {
    debugger;
  }

  public componentDidMount() {
    this._scrollElement = findScrollableParent(this.refs.root);
    this._checkContentAreasPosition();
    if (this._scrollElement) {
      // this._events.on(this._scrollElement, 'scroll', this._checkContentAreasPosition);
      this._events.on(this._scrollElement, 'scroll', this._notifySubscribers);
    }
    this._resizeHeaderPane();
    this._events.on(window, 'resize', this._resizeHeaderPane);
  }

  @autobind
  public componentWillReceiveProps(newProps: IScrollablePaneProps) {
    // console.log('receive props');
  }

  public componentDidUpdate(prevProps: IScrollablePaneProps, prevState: IScrollablePaneState) {
    // console.log('udpate');
    this._resizeHeaderPane();
  }

  public render() {
    const {
      contentAreasAbove,
      contentAreasBelow,
      stickyElemAbove,
      stickyElemBelow
    } = this.state;
    const { className, contentAreas } = this.props;

    return (
      <div className={ css('ms-ScrollablePane', styles.root, className) }
        ref='root'>
        <div className={ styles.scrollCopy }
          ref='scrollCopy'>
          <div className={ styles.layerHostTop }>
            <div className={ styles.fixed } ref='topHeaders'>
              {
                stickyElemAbove.map((stickyElem: StickyHeader, index: number) => {
                  return stickyElem.props.children;
                })
              }
            </div>
          </div>
          <div className={ styles.layerHostBottom }>
            <div className={ styles.fixed } ref='bottomHeaders'>
              {
                stickyElemBelow.map((stickyElem: StickyHeader, index: number) => {
                  return stickyElem.props.children;
                })
              }
            </div>
          </div>
        </div>

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
  public addStickyHeader(header: StickyHeader) {
    let stickyAbove = this.state.stickyElemAbove.concat([]);
    if (stickyAbove.indexOf(header) < 0) {
      stickyAbove.push(header);
      this.setState({
        stickyElemAbove: stickyAbove
      }, () => {
        const scrollBounds: ClientRect = this._scrollElement.getBoundingClientRect();
        const topBound = scrollBounds.top + this.refs.topHeaders.clientHeight;
        this._topBound = topBound;
        header.setSticky(topBound);
      });
    }
  }

  @autobind
  public removeStickyHeader(header: StickyHeader) {
    debugger;
    let stickyAbove = this.state.stickyElemAbove.concat([]);
    const indexOfHeader = stickyAbove.indexOf(header);
    // header.setNotSticky();
    if (indexOfHeader >= 0) {
      stickyAbove.splice(indexOfHeader, 1);
      this.setState({
        stickyElemAbove: stickyAbove
      });
    }
  }

  @autobind
  public addStickyFooter(sticky: StickyHeader) {
    let stickyBelow = this.state.stickyElemBelow.concat([]);
    if (stickyBelow.indexOf(sticky) < 0) {
      stickyBelow.unshift(sticky);
      this.setState({
        stickyElemBelow: stickyBelow
      }, () => {
        const scrollBounds: ClientRect = this._scrollElement.getBoundingClientRect();
        const topBound = scrollBounds.top + this.refs.topHeaders.clientHeight;
        this._topBound = topBound;
        // header.setSticky();
      });
    }
  }

  private _resizeHeaderPane() {
    this.refs.scrollCopy.style.height = this._scrollElement.clientHeight + 'px';
    this.refs.scrollCopy.style.width = this.refs.root.clientWidth + 'px';
  }

  private _notifySubscribers() {
    // debugger;

    const scrollBounds: ClientRect = this._scrollElement.getBoundingClientRect();
    const topScrollBound = scrollBounds.top;
    console.log(topScrollBound, this.refs.root.scrollTop, this._scrollElement.scrollTop);
    this._subscribers.forEach((handle) => {
      handle(topScrollBound, this._scrollElement.scrollTop, this.refs.topHeaders.clientHeight);
    });
  }

  private _checkContentAreasPosition() {
    const { contentAreas } = this.props;
    let contentAreasAbove: IContentArea[] = [];
    let contentAreasVisible: IContentArea[] = [];
    let contentAreasBelow: IContentArea[] = [];
    const scrollBounds: ClientRect = this._scrollElement.getBoundingClientRect();
    const topBound = scrollBounds.top + this.refs.topHeaders.clientHeight;
    const bottomBound = scrollBounds.bottom - this.refs.bottomHeaders.clientHeight;
    this._topBound = topBound;
    this._bottomBound = bottomBound;
    contentAreas.forEach((content, idx) => {
      const currAreaBounds: ClientRect = this.refs[idx].getBoundingClientRect();
      if ((currAreaBounds.top < topBound && idx !== 0) || currAreaBounds.top < scrollBounds.top) {
        contentAreasAbove.push(content);
      } else if (currAreaBounds.bottom >= topBound && currAreaBounds.top <= scrollBounds.bottom) {
        contentAreasVisible.push(content);
      } else {
        contentAreasBelow.push(content);
      }
    });
    this.setState({
      contentAreasAbove: contentAreasAbove,
      contentAreasVisible: contentAreasVisible,
      contentAreasBelow: contentAreasBelow
    });
  }
}
