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
  private _stickyBelowContainerRef = createRef<HTMLDivElement>();
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

  public get stickyBelowContainer(): HTMLDivElement | null {
    return this._stickyBelowContainerRef.value;
  }

  public get stickyBelow(): HTMLDivElement | null {
    return this._stickyBelowRef.value;
  }

  public getChildContext() {
    return {
      scrollablePane: {
        subscribe: this.subscribe,
        unsubscribe: this.unsubscribe,
        addSticky: this.addSticky,
        updateStickyRefHeights: this.updateStickyRefHeights,
        notifySubscribers: this.notifySubscribers
      }
    };
  }

  public componentDidMount() {
    this._events.on(this._contentContainer.value, 'scroll', this.notifySubscribers);
    this._events.on(window, 'resize', this._onWindowResize);
    this.notifySubscribers();
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
        <div
          ref={ this._stickyAboveRef }
          className={ classNames.stickyAbove }
          style={ stickyTopStyle }
        />
        <div
          ref={ this._stickyBelowContainerRef }
          className={ classNames.stickyBelow }
          style={ stickyBottomStyle }
        >
          <div
            ref={ this._stickyBelowRef }
            className={ classNames.stickyBelowItems }
          />
        </div>
        <div
          ref={ this._contentContainer }
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

  public subscribe = (handler: Function): void => {
    this._subscribers.add(handler);
  }

  public unsubscribe = (handler: Function): void => {
    this._subscribers.delete(handler);
  }

  public addSticky = (sticky: Sticky): void => {
    this._stickies.add(sticky);
    if (this.stickyAbove && sticky.stickyContentTop.value) {
      this.stickyAbove.appendChild(sticky.stickyContentTop.value);
    }
    if (this.stickyBelow && sticky.stickyContentBottom.value) {
      this.stickyBelow.appendChild(sticky.stickyContentBottom.value);
    }
  }

  public updateStickyRefHeights = (): void => {
    const stickyItems = this._stickies;

    let stickyTopHeight: number = 0;
    let stickyBottomHeight: number = 0;

    stickyItems.forEach((sticky: Sticky) => {
      if (sticky.state.isStickyTop && sticky.stickyContentTop && sticky.stickyContentTop.value) {
        stickyTopHeight += sticky.stickyContentTop.value.offsetHeight;
      }
      if (sticky.state.isStickyBottom && sticky.stickyContentBottom && sticky.stickyContentBottom.value) {
        stickyBottomHeight += sticky.stickyContentBottom.value.offsetHeight;
      }
    });

    this.setState({
      stickyTopHeight: stickyTopHeight,
      stickyBottomHeight: stickyBottomHeight
    });
  }

  public notifySubscribers = (sort?: boolean): void => {
    this._subscribers.forEach((handle) => {
      if (this._contentContainer && this.stickyBelowContainer) {
        handle(this._contentContainer.value, this.stickyBelowContainer, this.stickyBelow);
      }
    });
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
}