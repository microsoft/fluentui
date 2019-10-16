import * as React from 'react';
import { BaseComponent, classNamesFunction, divProperties, getNativeProps, getRTL } from '../../Utilities';
import {
  IScrollablePane,
  IScrollablePaneContext,
  IScrollablePaneProps,
  IScrollablePaneStyleProps,
  IScrollablePaneStyles,
  ScrollablePaneContext
} from './ScrollablePane.types';
import { Sticky } from '../../Sticky';

export interface IScrollablePaneState {
  stickyTopHeight: number;
  stickyBottomHeight: number;
  scrollbarWidth: number;
  scrollbarHeight: number;
}

const getClassNames = classNamesFunction<IScrollablePaneStyleProps, IScrollablePaneStyles>();

export class ScrollablePaneBase extends BaseComponent<IScrollablePaneProps, IScrollablePaneState> implements IScrollablePane {
  private _root = React.createRef<HTMLDivElement>();
  private _stickyAboveRef = React.createRef<HTMLDivElement>();
  private _stickyBelowRef = React.createRef<HTMLDivElement>();
  private _contentContainer = React.createRef<HTMLDivElement>();
  private _subscribers: Set<Function>;
  private _stickies: Set<Sticky>;
  private _mutationObserver: MutationObserver;
  private _notifyThrottled: () => void;
  private _userHasInteracted: boolean;
  private _scrollLeft: number;

  constructor(props: IScrollablePaneProps) {
    super(props);
    this._subscribers = new Set<Function>();
    this._stickies = new Set<Sticky>();

    this.state = {
      stickyTopHeight: 0,
      stickyBottomHeight: 0,
      scrollbarWidth: 0,
      scrollbarHeight: 0
    };
    this._scrollLeft = 0;

    this._notifyThrottled = this._async.throttle(this.notifySubscribers, 50);
  }

  public get root(): HTMLDivElement | null {
    return _getRefObjectCurrent(this._root);
  }

  public get stickyAbove(): HTMLDivElement | null {
    return _getRefObjectCurrent(this._stickyAboveRef);
  }

  public get stickyBelow(): HTMLDivElement | null {
    return _getRefObjectCurrent(this._stickyBelowRef);
  }

  public get contentContainer(): HTMLDivElement | null {
    return _getRefObjectCurrent(this._contentContainer);
  }

  public componentDidMount() {
    const { contentContainer, props } = this;
    const initialScrollPosition = _getPropsInitialScrollPosition(props);
    this._events.on(contentContainer, 'scroll', this._onScroll);
    this._events.on(window, 'resize', this._onWindowResize);
    if (contentContainer && initialScrollPosition) {
      contentContainer.scrollTop = initialScrollPosition;
    }
    const optimizePerformace = this._perf();
    optimizePerformace &&
      this.setState({
        scrollbarHeight: _getScrollbarHeight(contentContainer),
        scrollbarWidth: _getScrollbarWidth(contentContainer)
      });
    // Set sticky distances from top property, then sort in correct order and notify subscribers
    !optimizePerformace && this.setStickiesDistanceFromTop();
    this._stickies.forEach(sticky => {
      this.sortSticky(sticky);
    });
    this.notifySubscribers();

    if ('MutationObserver' in window) {
      this._mutationObserver = new MutationObserver(mutation => {
        // Function to check if mutation is occuring in stickyAbove or stickyBelow
        function checkIfMutationIsSticky(mutationRecord: MutationRecord): boolean {
          if (this.stickyAbove !== null && this.stickyBelow !== null) {
            return this.stickyAbove.contains(mutationRecord.target) || this.stickyBelow.contains(mutationRecord.target);
          }
          return false;
        }

        // Compute the scrollbar height which might have changed due to change in width of the content which might cause overflow
        // If this._perf() is true, state already has non-zero scrollbarHeight & scrollbarWidth computed in componentDidMount()
        const scrollbarHeight = this._perf() ? _getStateScrollbarHeight(this.state) : _getScrollbarHeight(this.contentContainer);
        // check if the scroll bar height has changed and update the state so that it's postioned correctly below sticky footer
        if (scrollbarHeight !== _getStateScrollbarHeight(this.state)) {
          this.setState({
            scrollbarHeight: scrollbarHeight
          });
        }

        // Notify subscribers again to re-check whether Sticky should be Sticky'd or not
        this.notifySubscribers();

        // If mutation occurs in sticky header or footer, then update sticky top/bottom heights
        if (mutation.some(checkIfMutationIsSticky.bind(this))) {
          this.updateStickyRefHeights();
        } else {
          // If mutation occurs in scrollable region, then find Sticky it belongs to and force update
          const stickyList: Sticky[] = [];
          this._stickies.forEach(sticky => {
            if (sticky.root && sticky.root.contains(mutation[0].target)) {
              stickyList.push(sticky);
            }
          });
          if (stickyList.length) {
            stickyList.forEach(sticky => {
              sticky.forceUpdate();
            });
          }
        }
      });

      if (this.root) {
        this._mutationObserver.observe(this.root, {
          childList: true,
          attributes: true,
          subtree: true,
          characterData: true
        });
      }
    }
  }

  public componentWillUnmount() {
    this._events.off(this.contentContainer);
    this._events.off(window);

    if (this._mutationObserver) {
      this._mutationObserver.disconnect();
    }
  }

  // Only updates if props/state change, just to prevent excessive setState with updateStickyRefHeights
  public shouldComponentUpdate(nextProps: IScrollablePaneProps, nextState: IScrollablePaneState): boolean {
    const { props, state } = this;
    return (
      props.children !== nextProps.children ||
      _getPropsInitialScrollPosition(props) !== _getPropsInitialScrollPosition(nextProps) ||
      props.className !== nextProps.className ||
      _getStateStickyTopHeight(state) !== _getStateStickyTopHeight(nextState) ||
      _getStateStickyBottomHeight(state) !== _getStateStickyBottomHeight(nextState) ||
      _getStateScrollbarWidth(state) !== _getStateScrollbarWidth(nextState) ||
      _getStateScrollbarHeight(state) !== _getStateScrollbarHeight(nextState)
    );
  }

  public componentDidUpdate(prevProps: IScrollablePaneProps, prevState: IScrollablePaneState) {
    const initialScrollPosition = _getPropsInitialScrollPosition(this.props);
    const { contentContainer, state } = this;
    if (
      contentContainer &&
      typeof initialScrollPosition === 'number' &&
      _getPropsInitialScrollPosition(prevProps) !== initialScrollPosition
    ) {
      contentContainer.scrollTop = initialScrollPosition;
    }

    // Update subscribers when stickyTopHeight/stickyBottomHeight changes
    if (
      _getStateStickyTopHeight(prevState) !== _getStateStickyTopHeight(state) ||
      _getStateStickyBottomHeight(prevState) !== _getStateStickyBottomHeight(state)
    ) {
      this.notifySubscribers();
    }

    this._async.setTimeout(this._onWindowResize, 0);
  }

  public render(): JSX.Element {
    const { props, state, contentContainer } = this;
    const optimizePerformance = this._perf();
    const classNames = getClassNames(props.styles!, {
      theme: props.theme!,
      className: props.className,
      scrollbarVisibility: props.scrollbarVisibility,
      experimentalLayoutImprovements: optimizePerformance
    });
    const scrollbarHeight = _getStateScrollbarHeight(state) || _getScrollbarHeight(contentContainer);
    const scrollbarWidth = _getStateScrollbarWidth(state) || _getScrollbarWidth(contentContainer);
    return (
      <div {...getNativeProps(this.props, divProperties)} ref={this._root} className={classNames.root}>
        <div ref={this._contentContainer} className={classNames.contentContainer} data-is-scrollable={true}>
          <ScrollablePaneContext.Provider value={this._getScrollablePaneContext()}>{this.props.children}</ScrollablePaneContext.Provider>
        </div>
        <div
          ref={this._stickyAboveRef}
          className={classNames.stickyAbove}
          style={_getStickyContainerStyle(
            scrollbarHeight,
            scrollbarWidth,
            true,
            optimizePerformance ? undefined : _getStateStickyTopHeight(state)
          )}
        />
        <div
          className={classNames.stickyBelow}
          style={_getStickyContainerStyle(
            scrollbarHeight,
            scrollbarWidth,
            false,
            optimizePerformance ? undefined : _getStateStickyBottomHeight(state)
          )}
        >
          <div ref={this._stickyBelowRef} className={classNames.stickyBelowItems} />
        </div>
      </div>
    );
  }

  public setStickiesDistanceFromTop(): void {
    if (this.contentContainer) {
      this._stickies.forEach(sticky => {
        sticky.setDistanceFromTop(this.contentContainer as HTMLDivElement);
      });
    }
  }

  public forceLayoutUpdate() {
    this._onWindowResize();
  }

  public subscribe = (handler: Function): void => {
    this._subscribers.add(handler);
  };

  public unsubscribe = (handler: Function): void => {
    this._subscribers.delete(handler);
  };

  public addSticky = (sticky: Sticky): void => {
    this._stickies.add(sticky);
    const optimizePerformance = this._perf();
    // If ScrollablePane is mounted, then sort sticky in correct place
    if (this.contentContainer) {
      if (sticky.canStickyBottom && optimizePerformance) {
        sticky.setState({
          distanceFromTop: 0, // must set distanceFromTop to add stickyContent Ref to stickyContainer in sorted order.
          isStickyBottom: true
        });
      } else {
        if (!optimizePerformance) {
          sticky.setDistanceFromTop(this.contentContainer);
        }
        this.sortSticky(sticky);
      }
    }
  };

  public removeSticky = (sticky: Sticky): void => {
    this._stickies.delete(sticky);
    this._removeStickyFromContainers(sticky);
    this.notifySubscribers();
  };

  public sortSticky = (sticky: Sticky, sortAgain?: boolean): void => {
    if (this.stickyAbove && this.stickyBelow) {
      if (sortAgain) {
        this._removeStickyFromContainers(sticky);
      }
      if (sticky.canStickyTop && _getStickyContentTop(sticky)) {
        this._addToStickyContainer(sticky, this.stickyAbove, _getStickyContentTop(sticky)!);
      }

      if (sticky.canStickyBottom && _getStickyContentBottom(sticky)) {
        this._addToStickyContainer(sticky, this.stickyBelow, _getStickyContentBottom(sticky)!);
      }
    }
  };

  public updateStickyRefHeights = (): void => {
    if (this._perf()) {
      return;
    }

    const stickyItems = this._stickies;

    let stickyTopHeight = 0;
    let stickyBottomHeight = 0;

    stickyItems.forEach((sticky: Sticky) => {
      const { isStickyTop, isStickyBottom } = sticky.state;
      const nonStickyContent = _getNonStickyContent(sticky);
      if (nonStickyContent) {
        if (isStickyTop) {
          stickyTopHeight += _getOffsetHeight(nonStickyContent);
        }
        if (isStickyBottom) {
          stickyBottomHeight += _getOffsetHeight(nonStickyContent);
        }
        this._checkStickyStatus(sticky);
      }
    });

    this.setState({
      stickyTopHeight: stickyTopHeight,
      stickyBottomHeight: stickyBottomHeight
    });
  };

  public notifySubscribers = (): void => {
    if (this.contentContainer) {
      this._subscribers.forEach(handle => {
        // this.stickyBelow is passed in for calculating distance to determine Sticky status
        handle(this.contentContainer, this.stickyBelow);
      });
    }
  };

  public getScrollPosition = (): number => {
    const { contentContainer } = this;
    if (contentContainer) {
      return contentContainer.scrollTop;
    }

    return 0;
  };

  public syncScrollSticky = (sticky: Sticky): void => {
    const { contentContainer } = this;
    if (sticky && contentContainer) {
      sticky.syncScroll(contentContainer);
    }
  };

  private _getScrollablePaneContext = (): IScrollablePaneContext => {
    return {
      scrollablePane: {
        subscribe: this.subscribe,
        unsubscribe: this.unsubscribe,
        addSticky: this.addSticky,
        removeSticky: this.removeSticky,
        updateStickyRefHeights: this.updateStickyRefHeights,
        sortSticky: this.sortSticky,
        notifySubscribers: this.notifySubscribers,
        syncScrollSticky: this.syncScrollSticky,
        optimizePerformance: this._perf,
        userInteractionStatus: (): boolean => this._userHasInteracted,
        getHorizontalScrollPosition: (): number => this._scrollLeft
      }
    };
  };

  private _checkStickyStatus(sticky: Sticky): void {
    if (this.stickyAbove && this.stickyBelow && this.contentContainer && _getNonStickyContent(sticky)) {
      // If sticky is sticky, then append content to appropriate container
      if (sticky.state.isStickyTop || sticky.state.isStickyBottom) {
        if (sticky.state.isStickyTop && !this.stickyAbove.contains(_getNonStickyContent(sticky)) && _getStickyContentTop(sticky)) {
          sticky.addSticky(_getStickyContentTop(sticky)!);
        }

        if (sticky.state.isStickyBottom && !this.stickyBelow.contains(_getNonStickyContent(sticky)) && _getStickyContentBottom(sticky)) {
          sticky.addSticky(_getStickyContentBottom(sticky)!);
        }
      } else if (!this.contentContainer.contains(_getNonStickyContent(sticky))) {
        // Reset sticky if it's not sticky and not in the contentContainer element
        sticky.resetSticky();
      }
    }
  }

  private _addToStickyContainer = (sticky: Sticky, stickyContainer: HTMLDivElement, stickyContentToAdd: HTMLDivElement): void => {
    // If there's no children, append child to list, otherwise, sort though array and append at correct position
    if (!stickyContainer.children.length) {
      stickyContainer.appendChild(stickyContentToAdd);
    } else {
      // If stickyContentToAdd isn't a child element of target container, then append
      if (!stickyContainer.contains(stickyContentToAdd)) {
        const stickyChildrenElements: Element[] = [].slice.call(stickyContainer.children);
        const isStickyAboveContainer: boolean = stickyContainer === this.stickyAbove;
        const stickyList: Sticky[] = [];
        // Get stickies.  Filter by canStickyTop/Bottom, then sort by distance from top, and then
        // filter by elements that are in the stickyContainer already.
        this._stickies.forEach(stickyItem => {
          if (isStickyAboveContainer && sticky.canStickyTop) {
            stickyList.push(stickyItem);
          } else if (sticky.canStickyBottom) {
            stickyList.push(stickyItem);
          }
        });
        const optimizePerformance = this._perf();

        const stickyListSorted = stickyList
          .sort((a, b) => {
            return optimizePerformance
              ? (a.props.order || 0) - (b.props.order || 0)
              : (a.state.distanceFromTop || 0) - (b.state.distanceFromTop || 0);
          })
          .filter(item => {
            const stickyContent = isStickyAboveContainer ? _getStickyContentTop(item) : _getStickyContentBottom(item);
            if (stickyContent) {
              return stickyChildrenElements.indexOf(stickyContent) > -1;
            }
          });

        // Get first element that has a distance from top that is further than our sticky that is being added
        let targetStickyToAppendBefore: Sticky | undefined = undefined;
        for (const i in stickyListSorted) {
          if (
            optimizePerformance
              ? (stickyListSorted[i].props.order || 0) > (sticky.props.order || 0)
              : (stickyListSorted[i].state.distanceFromTop || 0) >= (sticky.state.distanceFromTop || 0)
          ) {
            targetStickyToAppendBefore = stickyListSorted[i];
            break;
          }
        }

        // If target element to append before is known, then grab respective stickyContentTop/Bottom element and insert before
        let targetContainer: HTMLDivElement | null = null;
        if (targetStickyToAppendBefore) {
          targetContainer = isStickyAboveContainer
            ? _getStickyContentTop(targetStickyToAppendBefore)
            : _getStickyContentBottom(targetStickyToAppendBefore);
        }
        stickyContainer.insertBefore(stickyContentToAdd, targetContainer);
      }
    }
  };

  private _removeStickyFromContainers = (sticky: Sticky): void => {
    if (this.stickyAbove && _getStickyContentTop(sticky) && this.stickyAbove.contains(_getStickyContentTop(sticky))) {
      this.stickyAbove.removeChild(_getStickyContentTop(sticky)!);
    }
    if (this.stickyBelow && _getStickyContentBottom(sticky) && this.stickyBelow.contains(_getStickyContentBottom(sticky))) {
      this.stickyBelow.removeChild(_getStickyContentBottom(sticky)!);
    }
  };

  private _perf = (): boolean => !!this.props.experimentalLayoutImprovements;

  private _onWindowResize = (): void => {
    const { contentContainer } = this;
    /**
     * Scrollbar height/width changes on window resize
     */
    this.setState({
      scrollbarWidth: _getScrollbarWidth(contentContainer),
      scrollbarHeight: _getScrollbarHeight(contentContainer)
    });

    this.notifySubscribers();
  };

  private _onScroll = () => {
    const { contentContainer } = this;

    if (contentContainer) {
      this._userHasInteracted = true;
      this._scrollLeft = contentContainer.scrollLeft;
      this._stickies.forEach((sticky: Sticky) => {
        sticky.syncScroll(contentContainer);
      });
    }

    this._notifyThrottled();
  };
}

function _getStickyContainerStyle(scrollbarHeight: number, scrollbarWidth: number, isTop: boolean, height?: number): React.CSSProperties {
  const isRtl = getRTL();
  const left = `${scrollbarWidth || 0}px`;
  const right = '0';
  return {
    ...(height !== undefined ? { height: height } : {}),
    right: isRtl ? right : left,
    left: isRtl ? left : right,
    ...(isTop
      ? {
          top: '0'
        }
      : {
          bottom: `${scrollbarHeight || 0}px`
        })
  };
}

function _getScrollbarWidth(contentContainer: HTMLDivElement | null): number {
  return contentContainer ? contentContainer.offsetWidth - contentContainer.clientWidth : 0;
}

function _getScrollbarHeight(contentContainer: HTMLDivElement | null): number {
  return contentContainer ? _getOffsetHeight(contentContainer) - contentContainer.clientHeight : 0;
}

/**
 * Returns state.scrollbarHeight
 * @param state Returns
 */
function _getStateScrollbarHeight(state: IScrollablePaneState): number {
  return state.scrollbarHeight;
}

/**
 * Returns state.scrollbarWidth
 * @param state Returns
 */
function _getStateScrollbarWidth(state: IScrollablePaneState): number {
  return state.scrollbarWidth;
}

/**
 * Returns state.stickyTopHeight
 * @param state
 */
function _getStateStickyTopHeight(state: IScrollablePaneState): number {
  return state.stickyTopHeight;
}

/**
 * Returns state.stickyBottomHeight
 * @param state
 */
function _getStateStickyBottomHeight(state: IScrollablePaneState): number {
  return state.stickyBottomHeight;
}

/**
 * Returns props.initialScrollPosition
 * @param props
 */
function _getPropsInitialScrollPosition(props: IScrollablePaneProps): number | undefined {
  return props.initialScrollPosition;
}

/**
 * Returns sticky.stickyContentTop
 * @param sticky
 */
function _getStickyContentTop(sticky: Sticky): HTMLDivElement | null {
  return sticky.stickyContentTop;
}

/**
 * Returns sticky.stickyContentBottom
 * @param sticky
 */
function _getStickyContentBottom(sticky: Sticky): HTMLDivElement | null {
  return sticky.stickyContentBottom;
}

/**
 * Returns sticky.nonStickyContent
 * @param sticky
 */
function _getNonStickyContent(sticky: Sticky): HTMLDivElement | null {
  return sticky.nonStickyContent;
}
/**
 * Returns reactRefObject.current
 * @param reactRefObject - React.RefObject
 */
function _getRefObjectCurrent<T>(reactRefObject: React.RefObject<T>): T | null {
  return reactRefObject.current;
}

/**
 * Returns elem.offsetHeight
 * @param elem - HTMLElement for which offsetHeight is to be calculated
 */
function _getOffsetHeight(elem: HTMLElement): number {
  return elem.offsetHeight;
}
