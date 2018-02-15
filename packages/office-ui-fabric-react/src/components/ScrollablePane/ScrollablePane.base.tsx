/* tslint:disable:no-unused-variable */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
/* tslint:enable:no-unused-variable */
import * as PropTypes from 'prop-types';
import {
  autobind,
  BaseComponent,
  classNamesFunction,
  customizable
} from '../../Utilities';
import {
  IScrollablePane,
  IScrollablePaneProps,
  IScrollablePaneStyles,
  IScrollablePaneStyleProps
} from './ScrollablePane.types';
import { Sticky } from '../../Sticky';

export interface IScrollablePaneContext {
  scrollablePane: PropTypes.Requireable<object>;
}

const getClassNames = classNamesFunction<IScrollablePaneStyleProps, IScrollablePaneStyles>();

@customizable('ScrollablePane', ['theme'])
export class ScrollablePaneBase extends BaseComponent<IScrollablePaneProps, {}> implements IScrollablePane {
  public static childContextTypes: React.ValidationMap<IScrollablePaneContext> = {
    scrollablePane: PropTypes.object
  };

  private _rootRef: HTMLDivElement;
  private _stickyContainerRef: HTMLDivElement;
  private _stickyAboveRef: HTMLDivElement;
  private _stickyBelowRef: HTMLDivElement;

  private _subscribers: Set<Function>;
  private _stickyAbove: Set<Sticky>;
  private _stickyBelow: Set<Sticky>;

  constructor(props: IScrollablePaneProps) {
    super(props);
    this._subscribers = new Set<Function>();
    this._stickyAbove = new Set<Sticky>();
    this._stickyBelow = new Set<Sticky>();
  }

  public getChildContext() {
    return {
      scrollablePane: {
        subscribe: this.subscribe,
        unsubscribe: this.unsubscribe,
        addStickyHeader: this.addStickyHeader,
        removeStickyHeader: this.removeStickyHeader,
        addStickyFooter: this.addStickyFooter,
        removeStickyFooter: this.removeStickyFooter,
        notifySubscribers: this.notifySubscribers
      }
    };
  }

  public componentDidMount() {
    this._events.on(this._rootRef, 'scroll', this.notifySubscribers);
    this._events.on(window, 'resize', this._onWindowResize);
    this._async.setTimeout(() => {
      this._resizeContainer();
      if (this._stickyContainerRef.parentElement && this._rootRef.parentElement) {
        this._stickyContainerRef.parentElement.removeChild(this._stickyContainerRef);
        this._rootRef.parentElement.insertBefore(this._stickyContainerRef, this._rootRef.nextSibling);
        this.notifySubscribers();
      }
    }, 500);
  }

  public componentWillUnmount() {
    this._events.off(this._rootRef);
    this._events.off(window);
    if (this._stickyContainerRef.parentElement) {
      this._stickyContainerRef.parentElement.removeChild(this._stickyContainerRef);
    }
  }

  public render() {
    const { className, theme, getStyles } = this.props;
    const classNames = getClassNames(getStyles!,
      {
        theme: theme!,
        className
      }
    );

    return (
      <div
        ref={ el => this._rootRef = el! }
        className={ classNames.root }
        data-is-scrollable={ true }
      >
        <div ref={ el => this._stickyContainerRef = el! } className={ classNames.stickyContainer }>
          <div ref={ el => this._stickyAboveRef = el! } className={ classNames.stickyAbove }/>
          <div ref={ el => this._stickyBelowRef = el! } className={ classNames.stickyBelow }/>
        </div>
        { this.props.children }
      </div>
    );
  }

  public forceLayoutUpdate() {
    this._onWindowResize();
  }

  @autobind
  public subscribe(handler: (headerBound: ClientRect, footerBound: ClientRect) => void) {
    this._subscribers.add(handler);
  }

  @autobind
  public unsubscribe(handler: (headerBound: ClientRect, footerBound: ClientRect) => void) {
    this._subscribers.delete(handler);
  }

  @autobind
  public addStickyHeader(sticky: Sticky) {
    this._addSticky(sticky, this._stickyAbove, this._stickyAboveRef, () => {
      this._stickyAboveRef.appendChild(sticky.content);
    });
  }

  @autobind
  public addStickyFooter(sticky: Sticky) {
    this._addSticky(sticky, this._stickyBelow, this._stickyBelowRef, () => {
      this._stickyBelowRef.insertBefore(sticky.content, this._stickyBelowRef.firstChild);
    });
  }

  @autobind
  public removeStickyHeader(sticky: Sticky) {
    this._removeSticky(sticky, this._stickyAbove, this._stickyAboveRef);
  }

  @autobind
  public removeStickyFooter(sticky: Sticky) {
    this._removeSticky(sticky, this._stickyBelow, this._stickyBelowRef);
  }

  @autobind
  public notifySubscribers(sort?: boolean): void {
    this._subscribers.forEach((handle) => {
      handle(this._stickyAboveRef.getBoundingClientRect(), this._stickyBelowRef.getBoundingClientRect());
    });
    if (this._stickyAbove.size > 1) {
      this._sortStickies(this._stickyAbove, this._stickyAboveRef);
    }
    if (this._stickyBelow.size > 1) {
      this._sortStickies(this._stickyBelow, this._stickyBelowRef);
    }
  }

  @autobind
  private _addSticky(sticky: Sticky, stickyList: Set<Sticky>, container: HTMLElement, addStickyToContainer: () => void) {
    if (!stickyList.has(sticky)) {
      stickyList.add(sticky);
      addStickyToContainer();
      sticky.content.addEventListener('transitionend',
        this._setPlaceholderHeights.bind(null, stickyList),
        false);
      if (sticky.props.stickyClassName) {
        this._async.setTimeout(() => {
          if (sticky.props.stickyClassName) {
            sticky.content.children[0].classList.add(sticky.props.stickyClassName);
          }
        }, 1);
      }
      this.notifySubscribers();
      this._setPlaceholderHeights(stickyList);
    }
  }

  private _removeSticky(sticky: Sticky, stickyList: Set<Sticky>, container: HTMLElement) {
    if (stickyList.has(sticky)) {
      sticky.content.removeEventListener('transitionend',
        this._setPlaceholderHeights.bind(null, stickyList, container));
      stickyList.delete(sticky);
    }
  }

  @autobind
  private _onWindowResize() {
    this._async.setTimeout(() => {
      this._resizeContainer();
      this.notifySubscribers();
      this._setPlaceholderHeights(this._stickyAbove);
      this._setPlaceholderHeights(this._stickyBelow);
    }, 5);
  }

  private _resizeContainer() {
    const {borderTopWidth, borderLeftWidth} = getComputedStyle(this._rootRef);
    this._stickyContainerRef.style.height = this._rootRef.clientHeight + 'px';
    this._stickyContainerRef.style.width = this._rootRef.clientWidth + 'px';
    if (borderTopWidth) {
      this._stickyContainerRef.style.top = this._rootRef.offsetTop + parseInt(borderTopWidth, 10) + 'px';
    }
    if (borderLeftWidth) {
      this._stickyContainerRef.style.left = this._rootRef.offsetLeft + parseInt(borderLeftWidth, 10) + 'px';
    }
  }

  @autobind
  private _setPlaceholderHeights(stickies: Set<Sticky>) {
    stickies.forEach((sticky, idx) => {
      sticky.setPlaceholderHeight(sticky.content.clientHeight);
    });
  }

  private _sortStickies(stickyList: Set<Sticky>, container: HTMLElement): void {
    let stickyArr = Array.from(stickyList);
    stickyArr = stickyArr.sort((a, b) => {
      const aOffset = this._calculateOffsetParent(a.refs.root);
      const bOffset = this._calculateOffsetParent(b.refs.root);
      return aOffset - bOffset;
    });
    while (container.lastChild) {
      container.removeChild(container.lastChild);
    }
    stickyArr.forEach((sticky) => {
      container.appendChild(sticky.content);
    });
  }

  private _calculateOffsetParent(ele: HTMLElement): number {
    let offset = 0;
    while (ele.offsetParent !== this._rootRef.offsetParent) {
      offset += ele.offsetTop;
      if (ele.parentElement) {
        ele = ele.parentElement;
      }
    }
    return offset;
  }
}
