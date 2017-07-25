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
import { Sticky } from '../../Sticky';
import * as stylesImport from './ScrollablePane.scss';
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
    stickyContainer: HTMLElement;
    stickyAbove: HTMLElement;
    stickyBelow: HTMLElement;
  };

  private _stickyContainer: HTMLElement;
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
    const { stickyAbove, stickyBelow, root, stickyContainer } = this.refs;

    this._scrollElement = findScrollableParent(root);
    if (this._scrollElement) {
      this._stickyContainer = stickyContainer;
      this._events.on(this._scrollElement, 'scroll', this._notifySubscribers);
      this._events.on(window, 'resize', () => {
        setTimeout(() => {
          this._resizeContainer();
          this._notifySubscribers();
          this._setDistances(this._stickyAbove, stickyAbove);
          this._setDistances(this._stickyBelow, stickyBelow);
        }, 5);
      });
      setTimeout(() => {
        this._resizeContainer();
        this._stickyContainer.parentElement.removeChild(this._stickyContainer);
        this._scrollElement.parentElement.insertBefore(this._stickyContainer, this._scrollElement.nextSibling);
        this._notifySubscribers();
        this._sortFooters();
      }, 500);
    } else {
      throw new TypeError('Expected ScrollablePane to be within a parent element with data-is-scrollable=true');
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
        <div ref='stickyContainer' className={ styles.stickyContainer }>
          <div ref='stickyAbove' className={ styles.stickyAbove } />
          <div ref='stickyBelow' className={ styles.stickyBelow } />
        </div>
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
    const { stickyAbove } = this.refs;
    if (this._stickyAbove.indexOf(sticky) < 0) {
      this._stickyAbove.push(sticky);
      stickyAbove.appendChild(sticky.content);
      setTimeout(() => {
        sticky.content.children[0].classList.add(sticky.props.stickyClassName);
      }, 1);
      this._setDistances(this._stickyAbove, stickyAbove);
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
    const { stickyBelow } = this.refs;
    if (this._stickyBelow.indexOf(sticky) < 0) {
      this._stickyBelow.push(sticky);
      stickyBelow.insertBefore(sticky.content, stickyBelow.firstChild);
      setTimeout(() => {
        sticky.content.children[0].classList.add(sticky.props.stickyClassName);
      }, 1);
      this._setDistances(this._stickyBelow, stickyBelow);
    }
  }

  @autobind
  public removeStickyFooter(sticky: Sticky) {
    const indexOfFooter = this._stickyBelow.indexOf(sticky);
    if (indexOfFooter >= 0) {
      this._stickyBelow.splice(indexOfFooter, 1);
    }
  }

  private _resizeContainer() {
    this._stickyContainer.style.height = this._scrollElement.clientHeight + 'px';
    this._stickyContainer.style.width = this.refs.root.clientWidth + 'px';
    this._stickyContainer.style.top = this._scrollElement.offsetTop + 'px';
  }

  private _setDistances(stickies: Sticky[], element: HTMLElement) {
    const { stickyAbove, stickyBelow } = this.refs;
    stickies.forEach((sticky, idx) => {
      sticky.setPlaceholderHeight(element.children[idx].clientHeight);
    });
    this._topHeaderHeight = stickyAbove.clientHeight;
    this._bottomFooterHeight = stickyBelow.clientHeight;
  }

  private _sortFooters(): void {
    this._stickyBelow.sort((a, b) => {
      return a.refs.root.offsetTop - b.refs.root.offsetTop;
    });
    while (this.refs.stickyBelow.hasChildNodes()) {
      this.refs.stickyBelow.removeChild(this.refs.stickyBelow.lastChild);
    }
    this._stickyBelow.forEach((sticky) => {
      this.refs.stickyBelow.appendChild(sticky.content);
    });
  }

  private _notifySubscribers() {
    const { stickyAbove, stickyBelow } = this.refs;
    this._subscribers.forEach((handle) => {
      handle(stickyAbove.getBoundingClientRect(), stickyBelow.getBoundingClientRect());
    });
  }
}