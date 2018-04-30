import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  BaseComponent,
  classNamesFunction,
  customizable,
  divProperties,
  getNativeProps,
  createRef
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

  private _root = createRef<HTMLDivElement>();
  private _stickyAboveRef = createRef<HTMLDivElement>();
  private _stickyBelowRef = createRef<HTMLDivElement>();
  private _subscribers: Set<Function>;
  private _stickyAbove: Set<Sticky>;
  private _stickyBelow: Set<Sticky>;

  constructor(props: IScrollablePaneProps) {
    super(props);
    this._subscribers = new Set<Function>();
    this._stickyAbove = new Set<Sticky>();
    this._stickyBelow = new Set<Sticky>();
  }

  public get root(): HTMLDivElement | null {
    return this._root.current;
  }

  public get stickyAbove(): HTMLDivElement | null {
    return this._stickyAboveRef.current;
  }

  public get stickyBelow(): HTMLDivElement | null {
    return this._stickyBelowRef.current;
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

  public componentDidMount(): void {
    this._events.on(this._root.current, 'scroll', this.notifySubscribers);
    this._events.on(window, 'resize', this._onWindowResize);
  }

  public componentWillUnmount() {
    this._events.off(this._root.current);
    this._events.off(window);
  }

  public componentDidUpdate(prevProps: IScrollablePaneProps) {
    const initialScrollPosition = this.props.initialScrollPosition;
    if (this._root.current && initialScrollPosition && prevProps.initialScrollPosition !== initialScrollPosition) {
      this._root.current.scrollTop = initialScrollPosition;
    }
  }

  public render(): JSX.Element {
    const { className, theme, getStyles } = this.props;
    const classNames = getClassNames(getStyles!,
      {
        theme: theme!,
        className
      }
    );

    return (
      <div
        { ...getNativeProps(this.props, divProperties) }
        ref={ this._root }
        className={ classNames.root }
        data-is-scrollable={ true }
      >
        <div ref={ this._stickyAboveRef } className={ classNames.stickyAbove } />
        <div ref={ this._stickyBelowRef } className={ classNames.stickyBelow } />
        { this.props.children }
      </div>
    );
  }

  public forceLayoutUpdate() {
    this._onWindowResize();
  }

  public subscribe = (handler: (headerBound: ClientRect, footerBound: ClientRect) => void): void => {
    this._subscribers.add(handler);
  }

  public unsubscribe = (handler: (headerBound: ClientRect, footerBound: ClientRect) => void): void => {
    this._subscribers.delete(handler);
  }

  public addStickyHeader = (sticky: Sticky): void => {
    this._addSticky(sticky, this._stickyAbove, () => {
      if (this._stickyAboveRef.current) {
        this._stickyAboveRef.current.appendChild(sticky.content);
      }
    });
  }

  public addStickyFooter = (sticky: Sticky): void => {
    this._addSticky(sticky, this._stickyBelow, () => {
      if (this._stickyBelowRef.current) {
        this._stickyBelowRef.current.insertBefore(sticky.content, this._stickyBelowRef.current.firstChild);
      }
    });
  }

  public removeStickyHeader = (sticky: Sticky): void => {
    this._removeSticky(sticky, this._stickyAbove, this._stickyAboveRef.current);
  }

  public removeStickyFooter = (sticky: Sticky): void => {
    this._removeSticky(sticky, this._stickyBelow, this._stickyBelowRef.current);
  }

  public notifySubscribers = (sort?: boolean): void => {
    this._subscribers.forEach((handle) => {
      if (this._stickyAboveRef.current && this._stickyBelowRef.current) {
        handle(this._stickyAboveRef.current.getBoundingClientRect(), this._stickyBelowRef.current.getBoundingClientRect());
      }
    });
    if (this._stickyAbove.size > 1) {
      this._sortStickies(this._stickyAbove, this._stickyAboveRef.current);
    }
    if (this._stickyBelow.size > 1) {
      this._sortStickies(this._stickyBelow, this._stickyBelowRef.current);
    }
  }

  public getScrollPosition = (): number => {
    if (this._root.current) {
      return this._root.current.scrollTop;
    }

    return 0;
  }

  private _addSticky(sticky: Sticky, stickyList: Set<Sticky>, addStickyToContainer: () => void): void {
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
      this._setPlaceholderHeights(stickyList);
    }
  }

  private _removeSticky(sticky: Sticky, stickyList: Set<Sticky>, container: HTMLElement | null): void {
    if (container && stickyList.has(sticky)) {
      sticky.content.removeEventListener('transitionend',
        this._setPlaceholderHeights.bind(null, stickyList, container));
      stickyList.delete(sticky);
    }
  }

  private _onWindowResize(): void {
    this._async.setTimeout(() => {
      this.notifySubscribers();
      this._setPlaceholderHeights(this._stickyAbove);
      this._setPlaceholderHeights(this._stickyBelow);
    }, 5);
  }

  private _setPlaceholderHeights = (stickies: Set<Sticky>): void => {
    stickies.forEach((sticky, idx) => {
      sticky.setPlaceholderHeight(sticky.content.clientHeight);
    });
  }

  private _sortStickies(stickyList: Set<Sticky>, container: HTMLElement | null): void {
    // No sorting needed if there is no container
    if (!container) {
      return;
    }

    let stickyArr = Array.from(stickyList);
    stickyArr = stickyArr.sort((a, b) => {
      const aOffset = this._calculateOffsetParent(a.root.current);
      const bOffset = this._calculateOffsetParent(b.root.current);
      return aOffset - bOffset;
    });
    // Get number of elements that is already in order.
    let elementsInOrder = 0;
    while (elementsInOrder < container.children.length && elementsInOrder < stickyArr.length) {
      if (container.children[elementsInOrder] === stickyArr[elementsInOrder].content) {
        ++elementsInOrder;
      } else {
        break;
      }
    }
    // Remove elements that is not in order if exist.
    for (let i = container.children.length - 1; i >= elementsInOrder; --i) {
      container.removeChild(container.children[i]);
    }
    // Append further elements if needed.
    for (let i = elementsInOrder; i < stickyArr.length; ++i) {
      container.appendChild(stickyArr[i].content);
    }
  }

  private _calculateOffsetParent(ele: HTMLElement | null): number {
    let offset = 0;
    while (ele && this._root.current && ele.offsetParent !== this._root.current.offsetParent) {
      offset += ele.offsetTop;
      if (ele.parentElement) {
        ele = ele.parentElement;
      }
    }
    return offset;
  }
}
