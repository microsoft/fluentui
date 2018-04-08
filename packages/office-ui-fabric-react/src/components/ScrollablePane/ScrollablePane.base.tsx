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
        sortSticky: this.sortSticky,
        notifySubscribers: this.notifySubscribers
      }
    };
  }

  public componentDidMount() {
    const { initialScrollPosition } = this.props;
    this._events.on(this.contentContainer, 'scroll', this.notifySubscribers);
    this._events.on(window, 'resize', this._onWindowResize);
    if (this.contentContainer && initialScrollPosition) {
      this.contentContainer.scrollTop = initialScrollPosition;
    }

    this.notifySubscribers();
  }

  public componentWillUnmount() {
    this._events.off(this.contentContainer);
    this._events.off(window);
  }

  // Only updates if props/state change, just to prevent excessive setState with updateStickyRefHeights
  public shouldComponentUpdate(nextProps: IScrollablePaneProps, nextState: IScrollablePaneState): boolean {
    return this.props.children !== nextProps.children ||
      this.props.initialScrollPosition !== nextProps.initialScrollPosition ||
      this.props.className !== nextProps.className ||
      this.state.stickyTopHeight !== nextState.stickyTopHeight ||
      this.state.stickyBottomHeight !== nextState.stickyBottomHeight;
  }

  public componentDidUpdate(prevProps: IScrollablePaneProps, prevState: IScrollablePaneState) {
    const initialScrollPosition = this.props.initialScrollPosition;
    if (this.contentContainer && initialScrollPosition && prevProps.initialScrollPosition !== initialScrollPosition) {
      this.contentContainer.scrollTop = initialScrollPosition;
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
    this.notifySubscribers();
  }

  public removeSticky = (sticky: Sticky): void => {
    this._stickies.delete(sticky);
    this._removeStickyFromContainers(sticky);
    this.notifySubscribers();
  }

  public sortSticky = (sticky: Sticky): void => {
    if (this.stickyAbove && this.stickyBelow) {
      if (sticky.canStickyTop && sticky.stickyContentTop.value) {
        if (!this.stickyAbove.children.length) {
          this.stickyAbove.appendChild(sticky.stickyContentTop.value);
        } else if (!this.stickyAbove.contains(sticky.stickyContentTop.value)) {
          this._addToStickyContainer(sticky, this.stickyAbove);
        }
      }

      if (sticky.canStickyBottom && sticky.stickyContentBottom.value) {
        if (!this.stickyBelow.children.length) {
          this.stickyBelow.appendChild(sticky.stickyContentBottom.value);
        } else if (!this.stickyBelow.contains(sticky.stickyContentBottom.value)) {
          this._addToStickyContainer(sticky, this.stickyBelow);
        }
      }
    }
  }

  public updateStickyRefHeights = (): void => {
    const stickyItems = this._stickies;

    let stickyTopHeight: number = 0;
    let stickyBottomHeight: number = 0;

    stickyItems.forEach((sticky: Sticky) => {
      if (sticky.state.isStickyTop && sticky.canStickyTop && sticky.stickyContentTop.value) {
        stickyTopHeight += sticky.stickyContentTop.value.offsetHeight;
      }
      if (sticky.state.isStickyBottom && sticky.canStickyBottom && sticky.stickyContentBottom.value) {
        stickyBottomHeight += sticky.stickyContentBottom.value.offsetHeight;
      }
    });

    this.setState({
      stickyTopHeight: stickyTopHeight,
      stickyBottomHeight: stickyBottomHeight
    });
  }

  public notifySubscribers = (): void => {
    if (this.contentContainer) {
      this._subscribers.forEach((handle) => {
        handle(this.contentContainer, this.stickyBelow);
      });
    }
  }

  public getScrollPosition = (): number => {
    if (this.root) {
      return this.root.scrollTop;
    }

    return 0;
  }

  private _addToStickyContainer = (sticky: Sticky, stickyContainer: HTMLDivElement): void => {
    if (stickyContainer) {
      const stickyChildrenElements = Array.from(stickyContainer.children) as HTMLElement[];
      const stickyListSorted = Array.from(this._stickies).sort((a, b) => {
        return a.distanceFromTop - b.distanceFromTop;
      }).filter((item) => {
        const stickyContent = (stickyContainer === this.stickyAbove) ? item.stickyContentTop.value : item.stickyContentBottom.value;
        if (stickyContent) {
          return stickyChildrenElements.indexOf(stickyContent) > -1;
        }
      }).filter((item) => {
        if (stickyContainer === this.stickyAbove) {
          return item.canStickyTop;
        } else {
          return item.canStickyBottom;
        }
      });

      const first = stickyListSorted.filter((sticky, idx) => {
        return sticky.distanceFromTop > sticky.distanceFromTop
      })[0];
      let targetContainer: HTMLDivElement | null = null;
      if (first) {
        if (stickyContainer === this.stickyAbove) {
          targetContainer = first.stickyContentTop.value;
        } else {
          targetContainer = first.stickyContentBottom.value;
        }
      }

      let stickyContent: HTMLDivElement | undefined = undefined;
      if (stickyContainer === this.stickyAbove && sticky.stickyContentTop.value) {
        stickyContent = sticky.stickyContentTop.value;
      }
      if (stickyContainer === this.stickyBelow && sticky.stickyContentBottom.value) {
        stickyContent = sticky.stickyContentBottom.value;
      }

      if (stickyContent) {
        stickyContainer.insertBefore(stickyContent, targetContainer);
      }
    }
  }

  private _removeStickyFromContainers = (sticky: Sticky): void => {
    if (this.stickyAbove && this.stickyBelow && sticky.stickyContentTop.value && sticky.stickyContentBottom.value) {
      this.stickyAbove.removeChild(sticky.stickyContentTop.value);
      this.stickyBelow.removeChild(sticky.stickyContentBottom.value);
    }
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