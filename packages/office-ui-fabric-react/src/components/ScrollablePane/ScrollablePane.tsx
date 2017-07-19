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
import { Sticky } from '../../Sticky';
const styles: any = stylesImport;

export class ScrollablePane extends BaseComponent<IScrollablePaneProps, {}> {
  public static childContextTypes = {
    subscribe: PropTypes.func,
    addStickyHeader: PropTypes.func,
    removeStickyHeader: PropTypes.func,
    addStickyFooter: PropTypes.func,
    removeStickyFooter: PropTypes.func
  };

  public refs: {
    root: HTMLElement;
  };

  private _scrollElement: HTMLElement;
  private _subscribers: Function[];
  private _topHeaderHeight: number;
  private _bottomFooterHeight: number;
  private _stickyAbove: Sticky[];
  private _stickyBelow: Sticky[];

  public getChildContext() {
    return {
      subscribe: this.subscribe,
      addStickyHeader: this.addStickyHeader,
      removeStickyHeader: this.removeStickyHeader,
      addStickyFooter: this.addStickyFooter,
      removeStickyFooter: this.removeStickyFooter,
    };
  }

  constructor(props: IScrollablePaneProps) {
    super(props);
    this._subscribers = [];
    this._topHeaderHeight = 0;
    this._bottomFooterHeight = 0;
    this._stickyAbove = [];
    this._stickyBelow = [];
  }

  public componentDidMount() {
    this._scrollElement = findScrollableParent(this.refs.root);
    if (this._scrollElement) {
      this._events.on(this._scrollElement, 'scroll', this._notifySubscribers);
      this._events.on(window, 'resize', () => {
        setTimeout(() => {
          this._notifySubscribers();
          this._setDistances(this._stickyAbove, true, false);
          this._setDistances(this._stickyBelow, false, false);
        }, 5);
      });
      this._notifySubscribers();
    }
  }

  public componentWillUnmount() {
    this._events.off(this._scrollElement);
    this._events.off(window);
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
  public subscribe(handler: (handler: Function) => void) {
    this._subscribers = this._subscribers.concat(handler);
  }

  @autobind
  public addStickyHeader(sticky: Sticky) {
    if (this._stickyAbove.indexOf(sticky) < 0) {
      this._stickyAbove.push(sticky);
      this._setDistances(this._stickyAbove, true, true);
    }
  }

  @autobind
  public removeStickyHeader(sticky: Sticky) {
    const indexOfHeader = this._stickyAbove.indexOf(sticky);
    if (indexOfHeader >= 0) {
      this._stickyAbove.splice(indexOfHeader, 1);
    }
  }

  @autobind
  public addStickyFooter(sticky: Sticky) {
    if (this._stickyBelow.indexOf(sticky) < 0) {
      this._stickyBelow.push(sticky);
      this._stickyBelow.sort((a, b) => {
        return b.refs.root.offsetTop - a.refs.root.offsetTop;
      });
      this._setDistances(this._stickyBelow, false, true);
    }
  }

  @autobind
  public removeStickyFooter(sticky: Sticky) {
    const indexOfFooter = this._stickyBelow.indexOf(sticky);
    if (indexOfFooter >= 0) {
      this._stickyBelow.splice(indexOfFooter, 1);
    }
  }

  private _setDistances(stickies: Sticky[], headers: boolean, notifyStickies: boolean) {
    let distance = 0;
    stickies.forEach((sticky) => {
      if (headers) {
        sticky.setTopDistance(distance);
      } else {
        sticky.setBottomDistance(distance);
      }
      distance += sticky.refs.root.clientHeight;
    });
    headers ? this._topHeaderHeight = distance : this._bottomFooterHeight = distance;
    if (notifyStickies) {
      this._notifySubscribers();
    }
  }

  private _notifySubscribers() {
    const { top, bottom } = this._scrollElement.getBoundingClientRect();
    this._subscribers.forEach((handle) => {
      handle(top, this._topHeaderHeight, this._scrollElement.offsetTop, bottom, this._bottomFooterHeight, this._scrollElement.offsetTop + this._scrollElement.clientHeight);
    });
  }
}