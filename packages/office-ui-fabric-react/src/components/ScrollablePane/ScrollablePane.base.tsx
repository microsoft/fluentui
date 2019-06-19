import * as React from 'react';
import { BaseComponent, classNamesFunction, divProperties, getNativeProps, getRTL } from '../../Utilities';
import {
  IScrollablePane,
  IScrollablePaneContext,
  IScrollablePaneProps,
  IScrollablePaneStyleProps,
  IScrollablePaneStyles,
  ScrollablePaneContext,
  PlaceholderPosition,
  ScrollbarVisibility
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
  private _scrollLeft: number;
  private _scrollTop: number;
  private _isMounted: boolean;
  private _listeningToEvents: boolean;
  private _root = React.createRef<HTMLDivElement>();
  private _stickyAboveRef = React.createRef<HTMLDivElement>();
  private _stickyBelowRef = React.createRef<HTMLDivElement>();
  private _contentContainer = React.createRef<HTMLDivElement>();
  private _subscribers: Set<Function>;
  private _stickies: Set<Sticky>;
  private _mutationObserver: MutationObserver;
  private _notifyThrottled: () => void;

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
    this._scrollLeft = this._scrollTop = 0;
    this._notifyThrottled = this._async.throttle(this.notifySubscribers, 50);
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

  public get contentContainer(): HTMLDivElement | null {
    return this._contentContainer.current;
  }

  public componentDidMount() {
    const { initialScrollPosition, scrollbarVisibility } = this.props;
    if (scrollbarVisibility === ScrollbarVisibility.always) {
      // after first render, scrollbars are visible
      // it is needed to position stickyContainers correctly
      this.setState({
        scrollbarHeight: this._getScrollbarHeight(),
        scrollbarWidth: this._getScrollbarWidth()
      });
    }
    if (this._stickies.size) {
      this._events.on(this.contentContainer, 'scroll', this._onScroll);
      this._events.on(window, 'resize', this._onWindowResize);
      this._listeningToEvents = true;
    }
    if (this.contentContainer && initialScrollPosition) {
      this.contentContainer.scrollTop = initialScrollPosition;
    }

    // Set sticky distances from top property, then sort in correct order and notify subscribers
    this.setStickiesDistanceFromTop();
    this._stickies.forEach(sticky => {
      this.sortSticky(sticky);
    });
    this.notifySubscribers();
    if (this._stickies.size) {
      this._listenToEventsAndObserveMutations();
    }
    this._isMounted = true;
  }

  public componentWillUnmount() {
    this._isMounted = false;
    this._listeningToEvents = false;
    this._events.off(this.contentContainer);
    this._events.off(window);

    if (this._mutationObserver) {
      this._mutationObserver.disconnect();
    }
  }

  // Only updates if props/state change, just to prevent excessive setState with updateStickyRefHeights
  public shouldComponentUpdate(nextProps: IScrollablePaneProps, nextState: IScrollablePaneState): boolean {
    return (
      this.props.children !== nextProps.children ||
      this.props.initialScrollPosition !== nextProps.initialScrollPosition ||
      this.props.className !== nextProps.className ||
      this.state.stickyTopHeight !== nextState.stickyTopHeight ||
      this.state.stickyBottomHeight !== nextState.stickyBottomHeight ||
      this.state.scrollbarWidth !== nextState.scrollbarWidth ||
      this.state.scrollbarHeight !== nextState.scrollbarHeight
    );
  }

  public componentDidUpdate(prevProps: IScrollablePaneProps, prevState: IScrollablePaneState) {
    const initialScrollPosition = this.props.initialScrollPosition;
    if (this.contentContainer && typeof initialScrollPosition === 'number' && prevProps.initialScrollPosition !== initialScrollPosition) {
      this.contentContainer.scrollTop = initialScrollPosition;
    }

    // Update subscribers when stickyTopHeight/stickyBottomHeight changes
    if (prevState.stickyTopHeight !== this.state.stickyTopHeight || prevState.stickyBottomHeight !== this.state.stickyBottomHeight) {
      this.notifySubscribers();
    }
    if (this._mutationObserver || this._stickies.size) {
      this._async.setTimeout(this._onWindowResize, 0);
    }
  }

  public render(): JSX.Element {
    const { className, theme, styles } = this.props;
    const { stickyTopHeight, stickyBottomHeight } = this.state;
    const classNames = getClassNames(styles!, {
      theme: theme!,
      className,
      scrollbarVisibility: this.props.scrollbarVisibility
    });

    return (
      <div {...getNativeProps(this.props, divProperties)} ref={this._root} className={classNames.root}>
        <div ref={this._contentContainer} className={classNames.contentContainer} data-is-scrollable={true}>
          <ScrollablePaneContext.Provider value={this._getScrollablePaneContext()}>{this.props.children}</ScrollablePaneContext.Provider>
        </div>
        <div ref={this._stickyAboveRef} className={classNames.stickyAbove} style={this._getStickyContainerStyle(stickyTopHeight, true)} />
        <div className={classNames.stickyBelow} style={this._getStickyContainerStyle(stickyBottomHeight, false)}>
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
    if (this._isMounted) {
      this._listenToEventsAndObserveMutations();
    }
    const { stickyPosition } = sticky.props;
    const { stickyAboveContainerBehavior, stickyBelowContainerBehavior } = this.props;
    if (
      !stickyPosition &&
      stickyAboveContainerBehavior &&
      stickyBelowContainerBehavior &&
      stickyAboveContainerBehavior.notUsePlaceHolder !== stickyBelowContainerBehavior.notUsePlaceHolder
    ) {
      throw `If Sticky component has stickyPosition 'Both', stickyAboveContainerBehavior & stickyBelowContainerBehavior must be same`;
    }

    this._stickies.add(sticky);

    // If ScrollablePane is mounted, then sort sticky in correct place
    if (this.contentContainer) {
      sticky.setDistanceFromTop(this.contentContainer);
      this.sortSticky(sticky);
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
      if (sticky.canStickyTop && sticky.stickyContentTop) {
        this._addToStickyContainer(sticky, this.stickyAbove, sticky.stickyContentTop);
      }

      if (sticky.canStickyBottom && sticky.stickyContentBottom) {
        this._addToStickyContainer(sticky, this.stickyBelow, sticky.stickyContentBottom);
      }
    }
  };

  public updateStickyRefHeights = (): void => {
    const stickyItems = this._stickies;

    let stickyTopHeight = 0;
    let stickyBottomHeight = 0;
    const placeholderUsedForStickyContentTop = this.usePlaceholderForSticky('top');
    const placeholderUsedForStickyContentBottom = this.usePlaceholderForSticky('bottom');

    if (placeholderUsedForStickyContentBottom || placeholderUsedForStickyContentTop) {
      stickyItems.forEach((sticky: Sticky) => {
        const { isStickyTop, isStickyBottom } = sticky.state;
        if (sticky.nonStickyContent) {
          if (isStickyTop && placeholderUsedForStickyContentTop) {
            stickyTopHeight += sticky.nonStickyContent.offsetHeight;
          }
          if (isStickyBottom && placeholderUsedForStickyContentBottom) {
            stickyBottomHeight += sticky.nonStickyContent.offsetHeight;
          }
          this._checkStickyStatus(sticky);
        }
      });

      this.setState({
        stickyTopHeight: stickyTopHeight,
        stickyBottomHeight: stickyBottomHeight
      });
    }
  };

  public notifySubscribers = (): void => {
    if (this.contentContainer) {
      this._subscribers.forEach(handle => {
        // this.stickyBelow is passed in for calculating distance to determine Sticky status
        handle(this.contentContainer, this.stickyBelow);
      });
    }
  };

  public getScrollPosition = (horizontal?: boolean): number => {
    if (this.contentContainer) {
      return horizontal ? this._scrollLeft : this._scrollTop;
    }

    return 0;
  };

  public syncScrollSticky = (sticky: Sticky): void => {
    if (sticky && this.contentContainer) {
      sticky.syncScroll(this.contentContainer);
    }
  };

  public usePlaceholderForSticky = (placeholderPosition: PlaceholderPosition): boolean => {
    const { stickyBelowContainerBehavior, stickyAboveContainerBehavior } = this.props;
    // if stickyContainerBehavior is not defined, use placeholder (default behavior)
    const usePlaceholderForStickyTop: boolean = !stickyAboveContainerBehavior || !stickyAboveContainerBehavior.notUsePlaceHolder;
    const usePlaceholderForStickyBottom: boolean = !stickyBelowContainerBehavior || !stickyBelowContainerBehavior.notUsePlaceHolder;

    return placeholderPosition === 'top' ? usePlaceholderForStickyTop : usePlaceholderForStickyBottom;
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
        usePlaceholderForSticky: this.usePlaceholderForSticky,
        getScrollPosition: this.getScrollPosition
      }
    };
  };

  private _checkStickyStatus(sticky: Sticky): void {
    const placeholderUsedForStickyContentTop = sticky.canStickyTop && this.usePlaceholderForSticky('top');
    const placeholderUsedForStickyContentBottom = sticky.canStickyBottom && this.usePlaceholderForSticky('bottom');

    if (this.stickyAbove && this.stickyBelow && this.contentContainer && sticky.nonStickyContent) {
      // If Sticky is sticky, then append content to appropriate container
      const { isStickyBottom, isStickyTop } = sticky.state;
      if (isStickyTop || isStickyBottom) {
        if (
          placeholderUsedForStickyContentTop &&
          isStickyTop &&
          !this.stickyAbove.contains(sticky.nonStickyContent) &&
          sticky.stickyContentTop
        ) {
          sticky.addSticky(sticky.stickyContentTop, 'top');
        }

        if (
          placeholderUsedForStickyContentBottom &&
          isStickyBottom &&
          !this.stickyBelow.contains(sticky.nonStickyContent) &&
          sticky.stickyContentBottom
        ) {
          sticky.addSticky(sticky.stickyContentBottom, 'bottom');
        }
      } else if (
        (placeholderUsedForStickyContentBottom || placeholderUsedForStickyContentTop) &&
        !this.contentContainer.contains(sticky.nonStickyContent)
      ) {
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

        const stickyList: Sticky[] = [];
        // Get stickies.  Filter by canStickyTop/Bottom, then sort by distance from top, and then
        // filter by elements that are in the stickyContainer already.
        this._stickies.forEach(stickyItem => {
          if (stickyContainer === this.stickyAbove && sticky.canStickyTop) {
            stickyList.push(stickyItem);
          } else if (sticky.canStickyBottom) {
            stickyList.push(stickyItem);
          }
        });

        const stickyListSorted = stickyList
          .sort((a, b) => {
            return (a.state.distanceFromTop || 0) - (b.state.distanceFromTop || 0);
          })
          .filter(item => {
            const stickyContent = stickyContainer === this.stickyAbove ? item.stickyContentTop : item.stickyContentBottom;
            if (stickyContent) {
              return stickyChildrenElements.indexOf(stickyContent) > -1;
            }
          });

        // Get first element that has a distance from top that is further than our sticky that is being added
        let targetStickyToAppendBefore: Sticky | undefined = undefined;
        for (const i in stickyListSorted) {
          if ((stickyListSorted[i].state.distanceFromTop || 0) >= (sticky.state.distanceFromTop || 0)) {
            targetStickyToAppendBefore = stickyListSorted[i];
            break;
          }
        }

        // If target element to append before is known, then grab respective stickyContentTop/Bottom element and insert before
        let targetContainer: HTMLDivElement | null = null;
        if (targetStickyToAppendBefore) {
          targetContainer =
            stickyContainer === this.stickyAbove
              ? targetStickyToAppendBefore.stickyContentTop
              : targetStickyToAppendBefore.stickyContentBottom;
        }
        stickyContainer.insertBefore(stickyContentToAdd, targetContainer);
      }
    }
  };

  private _removeStickyFromContainers = (sticky: Sticky): void => {
    if (this.stickyAbove && sticky.stickyContentTop && this.stickyAbove.contains(sticky.stickyContentTop)) {
      this.stickyAbove.removeChild(sticky.stickyContentTop);
    }
    if (this.stickyBelow && sticky.stickyContentBottom && this.stickyBelow.contains(sticky.stickyContentBottom)) {
      this.stickyBelow.removeChild(sticky.stickyContentBottom);
    }
  };

  private _onWindowResize = (): void => {
    const { scrollbarHeight, scrollbarWidth } = this.state;
    let newScrollbarWidth: number = scrollbarHeight;
    let newScrollbarHeight: number = scrollbarWidth;
    if (this.props.scrollbarVisibility !== ScrollbarVisibility.always) {
      newScrollbarHeight = this._getScrollbarHeight();
      newScrollbarWidth = this._getScrollbarWidth();
    }
    this.setState({
      scrollbarHeight: newScrollbarHeight,
      scrollbarWidth: newScrollbarWidth
    });

    this.notifySubscribers();
  };

  private _getStickyContainerStyle = (height: number, isTop: boolean): React.CSSProperties => {
    const stickyContainerHeight = this._setStickyContainerHeight(isTop) ? height : undefined;
    return {
      ...(stickyContainerHeight !== undefined ? { height: height } : {}),
      ...(getRTL()
        ? {
            right: '0',
            left: `${this.state.scrollbarWidth || this._getScrollbarWidth() || 0}px`
          }
        : {
            left: '0',
            right: `${this.state.scrollbarWidth || this._getScrollbarWidth() || 0}px`
          }),
      ...(isTop
        ? {
            top: '0'
          }
        : {
            bottom: `${this.state.scrollbarHeight || this._getScrollbarHeight() || 0}px`
          })
    };
  };

  private _setStickyContainerHeight(isTop: boolean): boolean {
    return this.usePlaceholderForSticky(isTop ? 'top' : 'bottom');
  }

  private _getScrollbarWidth(): number {
    const { contentContainer } = this;
    return contentContainer ? contentContainer.offsetWidth - contentContainer.clientWidth : 0;
  }

  private _getScrollbarHeight(): number {
    const { contentContainer } = this;
    return contentContainer ? contentContainer.offsetHeight - contentContainer.clientHeight : 0;
  }

  private _onScroll = () => {
    const { contentContainer } = this;

    if (contentContainer) {
      // sync Sticky scroll if contentContainer has scrolled horizontally
      if (this._scrollLeft !== contentContainer.scrollLeft) {
        this._scrollLeft = contentContainer.scrollLeft;
        this._stickies.forEach((sticky: Sticky) => {
          sticky.syncScroll(contentContainer);
        });
      }
      if (this._scrollTop !== contentContainer.scrollTop) {
        this._scrollTop = contentContainer.scrollTop;
        this._notifyThrottled();
      }
    }
  };

  private _listenToEventsAndObserveMutations() {
    if (!this._listeningToEvents) {
      this._listeningToEvents = true;
      this._events.on(this.contentContainer, 'scroll', this._onScroll);
      this._events.on(window, 'resize', this._onWindowResize);
    }
    if (!this._mutationObserver && 'MutationObserver' in window) {
      this._mutationObserver = new MutationObserver(mutation => {
        // Function to check if mutation is occuring in stickyAbove or stickyBelow
        function checkIfMutationIsSticky(mutationRecord: MutationRecord): boolean {
          if (this.stickyAbove !== null && this.stickyBelow !== null) {
            return this.stickyAbove.contains(mutationRecord.target) || this.stickyBelow.contains(mutationRecord.target);
          }
          return false;
        }
        if (this.props.scrollbarVisibility !== ScrollbarVisibility.always) {
          // Compute the scrollbar height which might have changed due to change in width of the content which might cause overflow
          const scrollbarHeight = this._getScrollbarHeight();
          const scrollbarWidth = this._getScrollbarWidth();
          // check if the scroll bar height has changed and update the state so that it's postioned correctly below sticky footer
          if (scrollbarHeight !== this.state.scrollbarHeight || scrollbarWidth !== this.state.scrollbarWidth) {
            this.setState({
              scrollbarHeight: scrollbarHeight,
              scrollbarWidth: scrollbarWidth
            });
          }
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
}
