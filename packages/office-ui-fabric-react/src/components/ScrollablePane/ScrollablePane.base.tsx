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

  constructor(props: IScrollablePaneProps) {
    super(props);
    this._subscribers = new Set<Function>();
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

  public get contentContainer(): HTMLDivElement | null {
    return this._contentContainer.value;
  }

  public getChildContext() {
    return {
      scrollablePane: {
        subscribe: this.subscribe,
        unsubscribe: this.unsubscribe,
        addSticky: this.addSticky,
        removeSticky: this.removeSticky,
        updateStickyRefHeights: this.updateStickyRefHeights,
        notifySubscribers: this.notifySubscribers
      }
    };
  }

  public componentDidMount() {
    this._events.on(this.contentContainer, 'scroll', this.notifySubscribers);
    this._events.on(window, 'resize', this._onWindowResize);
    this.notifySubscribers();
  }

  public componentWillUnmount() {
    this._events.off(this.contentContainer);
    this._events.off(window);
  }

  public componentDidUpdate(prevProps: IScrollablePaneProps) {
    const initialScrollPosition = this.props.initialScrollPosition;
    if (this.root && initialScrollPosition && prevProps.initialScrollPosition !== initialScrollPosition) {
      this.root.scrollTop = initialScrollPosition;
    }

    // Update subscribers when DOM changes
    if (prevProps.children !== this.props.children) {
      this.notifySubscribers();
    }
  }

  public render() {
    const { className, theme, getStyles } = this.props;
    const { stickyTopHeight, stickyBottomHeight } = this.state;
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
      >
        <div
          ref={ this._stickyAboveRef }
          className={ classNames.stickyAbove }
          style={ this._getStickyContainerStyle(stickyTopHeight) }
        />
        <div
          className={ classNames.stickyBelow }
          style={ this._getStickyContainerStyle(stickyBottomHeight) }
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
    this.notifySubscribers();
  }

  public removeSticky = (sticky: Sticky): void => {
    this._stickies.delete(sticky);
    if (this.stickyAbove && sticky.stickyContentTop.value) {
      this.stickyAbove.removeChild(sticky.stickyContentTop.value);
    }
    if (this.stickyBelow && sticky.stickyContentBottom.value) {
      this.stickyBelow.removeChild(sticky.stickyContentBottom.value);
    }
    this.notifySubscribers();
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

  public notifySubscribers = (): void => {
    this._subscribers.forEach((handle) => {
      if (this.contentContainer) {
        handle(this.contentContainer, this.stickyBelow);
      }
    });
  }

  public getScrollPosition = (): number => {
    if (this.root) {
      return this.root.scrollTop;
    }

    return 0;
  }

  private _onWindowResize = (): void => {
    this._async.setTimeout(() => {
      this.notifySubscribers();
    }, 5);
  }

  private _getStickyContainerStyle = (height: number): React.CSSProperties => {
    return {
      height: height
    }
  }
}