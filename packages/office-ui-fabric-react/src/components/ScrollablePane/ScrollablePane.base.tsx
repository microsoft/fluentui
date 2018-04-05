/* tslint:disable:no-unused-variable */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
/* tslint:enable:no-unused-variable */
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

export interface IScrollablePaneState {
  stickyTopHeight: number;
  stickyBottomHeight: number;
}

const getClassNames = classNamesFunction<IScrollablePaneStyleProps, IScrollablePaneStyles>();

@customizable('ScrollablePane', ['theme'])
export class ScrollablePaneBase extends BaseComponent<IScrollablePaneProps, IScrollablePaneState> implements IScrollablePane {
  public static childContextTypes: React.ValidationMap<IScrollablePaneContext> = {
    scrollablePane: PropTypes.object
  };

  private _root = createRef<HTMLDivElement>();
  private _stickyAboveRef = createRef<HTMLDivElement>();
  private _stickyBelowRef = createRef<HTMLDivElement>();
  private _contentContainer = createRef<HTMLDivElement>();
  private _subscribers: Set<Function>;
  private _stickies: Set<Sticky>;
  private _stickyAbove: Set<Sticky>;
  private _stickyBelow: Set<Sticky>;

  constructor(props: IScrollablePaneProps) {
    super(props);
    this._subscribers = new Set<Function>();
    this._stickyAbove = new Set<Sticky>();
    this._stickyBelow = new Set<Sticky>();
    this._stickies = new Set<Sticky>();

    this.state = {
      stickyTopHeight: 0,
      stickyBottomHeight: 0
    };
  }

  public get root(): HTMLDivElement | null {
    return this._root.value;
  }

  public get stickyAbove(): HTMLDivElement | null {
    return this._stickyAboveRef.value;
  }

  public get stickyBelow(): HTMLDivElement | null {
    return this._stickyBelowRef.value;
  }

  public getChildContext() {
    return {
      scrollablePane: {
        subscribe: this.subscribe2,
        unsubscribe: this.unsubscribe,
        addSticky: this.addSticky,
        updateStickyAboveHeight: this.updateStickyAboveHeight,
        notifySubscribers: this.notifySubscribers
      }
    };
  }

  public componentDidMount() {
    this._events.on(this._contentContainer.value, 'scroll', this.notifySubscribers);
    this._events.on(window, 'resize', this._onWindowResize);
  }

  public componentWillUnmount() {
    this._events.off(this._root.value);
    this._events.off(window);
  }

  public componentDidUpdate(prevProps: IScrollablePaneProps) {
    const initialScrollPosition = this.props.initialScrollPosition;
    if (this._root.value && initialScrollPosition && prevProps.initialScrollPosition !== initialScrollPosition) {
      this._root.value.scrollTop = initialScrollPosition;
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

    let stickyTopStyle = {};
    stickyTopStyle = {
      height: this.state.stickyTopHeight + 'px'
    };



    let stickyBottomStyle = {};
    stickyBottomStyle = {
      height: this.state.stickyBottomHeight + 'px'
    };



    return (
      <div
        { ...getNativeProps(this.props, divProperties) }
        ref={ this._root }
        className={ classNames.root }
      >
        <div ref={ this._stickyAboveRef }
          className={ classNames.stickyAbove }
          style={ stickyTopStyle }
        />
        <div ref={ this._stickyBelowRef }
          className={ classNames.stickyBelow }
          style={ stickyBottomStyle }
        />
        <div ref={ this._contentContainer }
          className={ classNames.contentContainer }
          data-is-scrollable={ true }>
          { this.props.children }
        </div>
      </div>
    );
  }

  public forceLayoutUpdate() {
    this._onWindowResize();
  }

  // public subscribe = (handler: (headerBound: ClientRect, footerBound: ClientRect) => void): void => {
  //   this._subscribers.add(handler);
  // }

  public subscribe2 = (handler: (container: HTMLElement) => void): void => {
    this._subscribers.add(handler);
  }

  public unsubscribe = (handler: (headerBound: ClientRect, footerBound: ClientRect) => void): void => {
    this._subscribers.delete(handler);
  }

  public addSticky = (sticky: Sticky): void => {
    console.log(sticky);
    if (this.stickyAbove && sticky.stickyContentTop.value) {
      this.stickyAbove.appendChild(sticky.stickyContentTop.value);
    }
    if (this.stickyBelow && sticky.stickyContentBottom.value) {
      this.stickyBelow.appendChild(sticky.stickyContentBottom.value);
    }
    this._stickies.add(sticky);
  }

  public updateStickyAboveHeight = (): void => {
    const stickyItems = this._stickies;

    let stickyTopHeight: number = 0;
    let stickyBottomHeight: number = 0;

    stickyItems.forEach((sticky: Sticky) => {
      if (sticky.state.isStickyTop && sticky.stickyContentTop && sticky.stickyContentTop.value) {
        stickyTopHeight += sticky.stickyContentTop.value.clientHeight;
      }
      if (sticky.state.isStickyBottom && sticky.stickyContentBottom && sticky.stickyContentBottom.value) {
        stickyTopHeight += sticky.stickyContentBottom.value.clientHeight;
      }
    });


    this.setState({
      stickyTopHeight: stickyTopHeight,
      stickyBottomHeight: stickyBottomHeight
    });
  }

  public notifySubscribers = (sort?: boolean): void => {
    this._subscribers.forEach((handle) => {
      // if (this._stickyAboveRef.value && this._stickyBelowRef.value) {
      if (this._contentContainer) {
        // handle(this._stickyAboveRef.value.getBoundingClientRect(), this._stickyBelowRef.value.getBoundingClientRect());
        handle(this._contentContainer.value);
      }
    });
    if (this._stickyAbove.size > 1) {
      this._sortStickies(this._stickyAbove, this._stickyAboveRef.value);
    }
    if (this._stickyBelow.size > 1) {
      this._sortStickies(this._stickyBelow, this._stickyBelowRef.value);
    }
  }

  public getScrollPosition = (): number => {
    if (this._root.value) {
      return this._root.value.scrollTop;
    }

    return 0;
  }

  private _onWindowResize = (): void => {
    this._async.setTimeout(() => {
      this.notifySubscribers();
    }, 5);
  }

  private _sortStickies = (stickyList: Set<Sticky>, container: HTMLElement | null): void => {
    // No sorting needed if there is no container
    if (!container) {
      return;
    }

    let stickyArr = Array.from(stickyList);
    stickyArr = stickyArr.sort((a, b) => {
      const aOffset = this._calculateOffsetParent(a.root.value);
      const bOffset = this._calculateOffsetParent(b.root.value);
      return aOffset - bOffset;
    });
    // Get number of elements that is already in order.
    let elementsInOrder = 0;
    while (elementsInOrder < container.children.length && elementsInOrder < stickyArr.length) {
      // if (container.children[elementsInOrder] === stickyArr[elementsInOrder].content) {
      //   ++elementsInOrder;
      // } else {
      //   break;
      // }
    }
    // Remove elements that is not in order if exist.
    for (let i = container.children.length - 1; i >= elementsInOrder; --i) {
      container.removeChild(container.children[i]);
    }
    // Append further elements if needed.
    for (let i = elementsInOrder; i < stickyArr.length; ++i) {
      // container.appendChild(stickyArr[i].content);
    }
  }

  private _calculateOffsetParent(ele: HTMLElement | null): number {
    let offset = 0;
    while (ele && this._root.value && ele.offsetParent !== this._root.value.offsetParent) {
      offset += ele.offsetTop;
      if (ele.parentElement) {
        ele = ele.parentElement;
      }
    }
    return offset;
  }
}
