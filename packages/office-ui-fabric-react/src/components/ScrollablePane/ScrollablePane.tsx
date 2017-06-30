/* tslint:disable:no-unused-variable */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
/* tslint:enable:no-unused-variable */
import * as PropTypes from 'prop-types';
import {
  autobind,
  BaseComponent,
  css,
  findScrollableParent
} from '../../Utilities';
import { IScrollablePaneProps } from './ScrollablePane.Props';
import * as stylesImport from './ScrollablePane.scss';
import { StickyHeader } from '../../StickyHeader';
const styles: any = stylesImport;

export interface IScrollablePaneState {
  stickyAbove: StickyHeader[];
  stickyBelow: StickyHeader[];
}

export class ScrollablePane extends BaseComponent<IScrollablePaneProps, IScrollablePaneState> {
  public static childContextTypes = {
    subscribe: PropTypes.func,
    addStickyHeader: PropTypes.func,
    removeStickyHeader: PropTypes.func,
    addStickyFooter: PropTypes.func
  };

  public refs: {
    root: HTMLElement;
  };

  private _scrollElement: HTMLElement;
  private _subscribers: Function[];
  private _topHeaderHeight: number;

  public getChildContext() {
    return {
      subscribe: this.subscribe,
      addStickyHeader: this.addStickyHeader,
      removeStickyHeader: this.removeStickyHeader,
      addStickyFooter: this.addStickyFooter
    };
  }

  constructor(props: IScrollablePaneProps) {
    super(props);

    this.state = {
      stickyAbove: [],
      stickyBelow: []
    };
    this._subscribers = [];
    this._topHeaderHeight = 0;
  }

  public componentDidMount() {
    this._scrollElement = findScrollableParent(this.refs.root);
    if (this._scrollElement) {
      this._events.on(this._scrollElement, 'scroll', this._notifySubscribers);
      this._events.on(window, 'resize', () => {
        this._notifyHeaders();
        this._notifySubscribers();
      });
    }
  }

  public render() {
    const { className } = this.props;

    return (
      <div className={ css('ms-ScrollablePane', className) }
        ref='root'>
        { this.props.children }
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
    stickyAbove = stickyAbove.concat([]);
    if (stickyAbove.indexOf(sticky) < 0) {
      stickyAbove.push(sticky);
      this._setHeaders(stickyAbove);
    }
  }

  @autobind
  public removeStickyHeader(sticky: StickyHeader) {
    let { stickyAbove } = this.state;
    stickyAbove = stickyAbove.concat([]);
    const indexOfHeader = stickyAbove.indexOf(sticky);
    if (indexOfHeader >= 0) {
      stickyAbove.splice(indexOfHeader, 1);
      this._setHeaders(stickyAbove);
    }
  }

  @autobind
  public addStickyFooter(sticky: StickyHeader) {
    console.log('sticky' + sticky);
  }

  private _setHeaders(headers: StickyHeader[]) {
    this.setState({
      stickyAbove: headers
    }, () => {
      this._notifyHeaders();
    });
  }

  private _notifyHeaders() {
    const { stickyAbove } = this.state;
    let distance = 0;
    stickyAbove.forEach((sticky) => {
      sticky.setTopDistance(distance);
      distance += sticky.refs.root.clientHeight;
    });
    this._topHeaderHeight = distance;
  }

  private _notifySubscribers() {
    const { top } = this._scrollElement.getBoundingClientRect();
    this._subscribers.forEach((handle) => {
      handle(top, this._topHeaderHeight, this._scrollElement.offsetTop);
    });
  }
}