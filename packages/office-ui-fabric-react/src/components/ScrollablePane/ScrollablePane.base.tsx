import * as React from 'react';
import * as PropTypes from 'prop-types';
import { BaseComponent, classNamesFunction, divProperties, getNativeProps, getRTL } from '../../Utilities';
import {
  IScrollablePane,
  IScrollablePaneProps,
  IScrollablePaneStyles,
  IScrollablePaneStyleProps,
  StickyContainerBehaviorType,
  ScrollbarVisibility,
  PlaceholderPosition,
  StickyContainerPosition
} from './ScrollablePane.types';
import { Sticky, StickyPositionType } from '../../Sticky';

export interface IScrollablePaneContext {
  scrollablePane?: {
    subscribe: (handler: (container: HTMLElement, stickyContainer: HTMLElement) => void) => void;
    unsubscribe: (handler: (container: HTMLElement, stickyContainer: HTMLElement) => void) => void;
    addSticky: (sticky: Sticky) => void;
    removeSticky: (sticky: Sticky) => void;
    updateStickyRefHeights: () => void;
    sortSticky: (sticky: Sticky, sortAgain?: boolean) => void;
    notifySubscribers: (sort?: boolean) => void;
    syncScrollSticky: (sticky: Sticky) => void;
    usePlaceholderForSticky: (placeholderPosition: PlaceholderPosition) => boolean;
    verifyStickyContainerBehavior: (
      stickyContainerPosition: StickyContainerPosition,
      stickyContainerBehavior: StickyContainerBehaviorType
    ) => boolean;
    getUserInteractionStatus: () => boolean;
    getScrollPosition: (horizontal?: boolean) => number;
  };
}

export interface IScrollablePaneState {
  stickyTopHeight: number;
  stickyBottomHeight: number;
  scrollbarWidth: number;
  scrollbarHeight: number;
}

const getClassNames = classNamesFunction<IScrollablePaneStyleProps, IScrollablePaneStyles>();

export class ScrollablePaneBase extends BaseComponent<IScrollablePaneProps, IScrollablePaneState> implements IScrollablePane {
  public static childContextTypes: React.ValidationMap<IScrollablePaneContext> = {
    scrollablePane: PropTypes.object
  };

  private _userInteractionStarted: boolean;
  private _scrollLeft: number;
  private _scrollTop: number;
  private _isMounted: boolean;
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
    this._userInteractionStarted = false;
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

  public getChildContext(): IScrollablePaneContext {
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
        verifyStickyContainerBehavior: this.verifyStickyContainerBehavior,
        getUserInteractionStatus: this.getUserInteractionStatus,
        getScrollPosition: this.getScrollPosition
      }
    };
  }

  public componentDidMount() {
    const { initialScrollPosition, scrollbarVisibility } = this.props;
    if (scrollbarVisibility === ScrollbarVisibility.always) {
      // after first render, scrollbars are visible
      const scrollbarHeight = this._getScrollbarHeight();
      const scrollbarWidth = this._getScrollbarWidth();
      this.setState({
        scrollbarHeight: scrollbarHeight,
        scrollbarWidth: scrollbarWidth
      });
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

    if (this._stickies.size > 0 && !this._mutationObserver) {
      this._listenToEventsAndObserveMutations();
    }

    this._isMounted = true;
  }

  public componentWillUnmount() {
    this._isMounted = false;
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
          {this.props.children}
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
        const { stickyPosition } = sticky.props;
        if (!stickyPosition || !this._sortBasedOnOrder(stickyPosition === StickyPositionType.Header ? 'above' : 'below')) {
          sticky.setDistanceFromTop(this.contentContainer as HTMLDivElement);
        }
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
    // this method is called once per sticky lifecycle

    if (this._isMounted && !this._mutationObserver) {
      this._listenToEventsAndObserveMutations();
    }

    const { stickyBelowContainerBehavior, stickyAboveContainerBehavior } = this.props;
    const stickiesTopBehaviorType: StickyContainerBehaviorType | undefined =
      stickyAboveContainerBehavior && stickyAboveContainerBehavior.containerBehavior;
    const stickiesBottomBehaviorType: StickyContainerBehaviorType | undefined =
      stickyBelowContainerBehavior && stickyBelowContainerBehavior.containerBehavior;
    const { stickyPosition, order } = sticky.props;
    if (!stickyPosition && (stickiesBottomBehaviorType || stickiesTopBehaviorType)) {
      throw `Sticky cannot have StickyPositionType.Both if ScrollablePane has stickyAboveContainerBehavior
      or stickyBelowContainerBehavior containerBehavior as StickyOnScroll or StickyAlways`;
    }
    if (order === undefined && stickyPosition && this._sortBasedOnOrder(stickyPosition === StickyPositionType.Header ? 'above' : 'below')) {
      throw `Sticky order prop is not defined but corresponding stickyContainerBehavior is arrangeStickiesBasedOnOrder`;
    }

    let stickyBehaviorType: StickyContainerBehaviorType = StickyContainerBehaviorType.Default;
    if (stickyPosition === StickyPositionType.Header) {
      stickyBehaviorType = stickiesTopBehaviorType ? stickiesTopBehaviorType : stickyBehaviorType;
    } else if (stickyPosition === StickyPositionType.Footer) {
      stickyBehaviorType = stickiesBottomBehaviorType ? stickiesBottomBehaviorType : stickyBehaviorType;
    }
    // Adding sticky to _stickies is required to
    // 1. sync scrollLeft for horizontal scroll
    this._stickies.add(sticky);
    // If ScrollablePane is mounted, then sort sticky in correct place
    if (this.contentContainer) {
      if (stickyBehaviorType === StickyContainerBehaviorType.StickyAlways) {
        sticky.setState({
          distanceFromTop: 0, // must set distanceFromTop to add stickyContent Ref to stickyContainer in sorted order.
          isStickyBottom: stickyPosition === StickyPositionType.Footer,
          // initial values of isStickyTop & isStickyBottom are false, set from constructor
          // must set isStickyTop or isStickyBottom to place nonStickyContent as a child of stickyContent Ref.
          isStickyTop: stickyPosition === StickyPositionType.Header
        });
      } else if (stickyBehaviorType === StickyContainerBehaviorType.StickyOnScroll) {
        // sorting during the mount phase will be done based on 'order' prop (perf)
        this.sortSticky(sticky);
      } else {
        sticky.setDistanceFromTop(this.contentContainer);
        this.sortSticky(sticky);
      }
    }
    // else ScrollablePane is yet to be mounted
    // when scrollablePane mounts, it calls notifySubscribers() which
    // 1. sets distanceFromTop to add stickyContent Ref to stickyContainer in sorted order.
    // 2. sets isStickyTop or isStickyBottom to place nonStickyContent as a child of stickyContent Ref.
  };

  public removeSticky = (sticky: Sticky): void => {
    this._stickies.delete(sticky);
    this._removeStickyFromContainers(sticky);
    this.notifySubscribers();
  };

  public sortSticky = (sticky: Sticky, sortAgain?: boolean): void => {
    if (this.stickyAbove && this.stickyBelow) {
      // When is sorting needed?
      // 1. not a part of stickyContainer & to be added first time
      // 2. part of stickyContainer and not sorted based on order
      // 3. stickyPosition is 'Both'
      const isPartOfStickyAboveContainer = this._stickyContainerContainsStickyContent(sticky, true);
      const isPartOfStickyBelowContainer = this._stickyContainerContainsStickyContent(sticky, false);
      const { stickyPosition } = sticky.props;
      if (stickyPosition && (isPartOfStickyAboveContainer || isPartOfStickyBelowContainer)) {
        const alreadySortedBasedOnOrder = this._sortBasedOnOrder(stickyPosition === StickyPositionType.Header ? 'above' : 'below');
        if (alreadySortedBasedOnOrder) {
          return;
        }
      }

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
    // stickyContainers- stickyAbove & stickyBelow heights 've to be updated
    // 1. if placeholder is used, or
    // 2. if sticky conatinerBehavior type is not 'StickyAlways'
    const { stickyBelowContainerBehavior, stickyAboveContainerBehavior } = this.props;
    const stickiesTopBehaviorType: StickyContainerBehaviorType | undefined =
      stickyAboveContainerBehavior && stickyAboveContainerBehavior.containerBehavior;
    const stickiesBottomBehaviorType: StickyContainerBehaviorType | undefined =
      stickyBelowContainerBehavior && stickyBelowContainerBehavior.containerBehavior;
    const stickyItems = this._stickies;
    const placeholderUsedForStickyContentTop = this.usePlaceholderForSticky('top');
    const placeholderUsedForStickyContentBottom = this.usePlaceholderForSticky('bottom');
    const stickiesTopAlways = stickiesTopBehaviorType === StickyContainerBehaviorType.StickyAlways;
    const stickiesBottomAlways = stickiesBottomBehaviorType === StickyContainerBehaviorType.StickyAlways;

    let stickyTopHeight = 0;
    let stickyBottomHeight = 0;

    if (placeholderUsedForStickyContentTop || placeholderUsedForStickyContentBottom) {
      stickyItems.forEach((sticky: Sticky) => {
        const { isStickyTop, isStickyBottom } = sticky.state;
        if (sticky.nonStickyContent) {
          if (isStickyTop && placeholderUsedForStickyContentTop && !stickiesTopAlways) {
            stickyTopHeight += sticky.nonStickyContent.offsetHeight;
          }
          if (isStickyBottom && placeholderUsedForStickyContentBottom && !stickiesBottomAlways) {
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

  public verifyStickyContainerBehavior = (
    stickyContainerPosition: StickyContainerPosition,
    stickyContainerBehavior: StickyContainerBehaviorType
  ): boolean => {
    const { stickyBelowContainerBehavior, stickyAboveContainerBehavior } = this.props;
    const stickiesTopBehaviorType: StickyContainerBehaviorType | undefined =
      stickyAboveContainerBehavior && stickyAboveContainerBehavior.containerBehavior;
    const stickiesBottomBehaviorType: StickyContainerBehaviorType | undefined =
      stickyBelowContainerBehavior && stickyBelowContainerBehavior.containerBehavior;
    return stickyContainerPosition === 'above'
      ? stickiesTopBehaviorType === stickyContainerBehavior
      : stickiesBottomBehaviorType === stickyContainerBehavior;
  };

  public getUserInteractionStatus = (): boolean => {
    return this._userInteractionStarted;
  };

  private _checkStickyStatus(sticky: Sticky): void {
    // this function is called only from updateStickyRefHeights()
    const placeholderUsedForStickyContentTop = this.usePlaceholderForSticky('top');
    const placeholderUsedForStickyContentBottom = this.usePlaceholderForSticky('bottom');

    if (this.stickyAbove && this.stickyBelow && this.contentContainer && sticky.nonStickyContent) {
      // If sticky is sticky, then append content to appropriate container
      const { isStickyBottom, isStickyTop } = sticky.state;
      if (isStickyTop || isStickyBottom) {
        if (
          placeholderUsedForStickyContentTop &&
          isStickyTop &&
          sticky.stickyContentTop &&
          // if placeHolder is used & current state is sticky, nonStickyContent is to be added to stickyAbove
          !this.stickyAbove.contains(sticky.nonStickyContent)
        ) {
          sticky.addSticky(sticky.stickyContentTop, true);
        }

        if (
          placeholderUsedForStickyContentBottom &&
          isStickyBottom &&
          sticky.stickyContentBottom &&
          // if placeHolder is used & current state is sticky, nonStickyContent is to be added to stickyBelow
          !this.stickyBelow.contains(sticky.nonStickyContent)
        ) {
          sticky.addSticky(sticky.stickyContentBottom, false);
        }
      } else if (
        (placeholderUsedForStickyContentTop || placeholderUsedForStickyContentBottom) &&
        !this.contentContainer.contains(sticky.nonStickyContent)
      ) {
        // Reset sticky if it's not sticky and not in the contentContainer element
        sticky.resetSticky();
      }
    }
  }

  private _listenToEventsAndObserveMutations() {
    if (!this._mutationObserver) {
      this._events.on(this.contentContainer, 'scroll', this._onScroll);
      this._events.on(window, 'resize', this._onWindowResize);
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
          if (this.props.scrollbarVisibility !== ScrollbarVisibility.always) {
            const scrollbarHeight: number = this._getScrollbarHeight();
            const scrollbarWidth: number = this._getScrollbarWidth();

            // check if the scroll bar height has changed and update the state so that it's positioned correctly below sticky footer
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

  private _isTargetContainer(a: Sticky, b: Sticky, sortBasedOnOrder: boolean): boolean {
    if (sortBasedOnOrder) {
      return (a.props.order || 0) > (b.props.order || 0);
    } else {
      return (a.state.distanceFromTop || 0) >= (b.state.distanceFromTop || 0);
    }
  }

  private _sortStickyList(stickyList: Sticky[], sortBasedOnOrder: boolean): Sticky[] {
    if (sortBasedOnOrder) {
      return stickyList.sort((a, b) => {
        return (a.props.order || 0) - (b.props.order || 0);
      });
    } else {
      return stickyList.sort((a, b) => {
        return (a.state.distanceFromTop || 0) - (b.state.distanceFromTop || 0);
      });
    }
  }

  private _sortBasedOnOrder(stickyContainerPosition: StickyContainerPosition): boolean {
    const stickyContainerBehavior =
      stickyContainerPosition === 'above' ? this.props.stickyAboveContainerBehavior : this.props.stickyBelowContainerBehavior;

    return !!stickyContainerBehavior && stickyContainerBehavior.arrangeStickiesBasedOnOrder;
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
        const isStickyAboveContainer: boolean = stickyContainer === this.stickyAbove;
        // Get stickies.  Filter by canStickyTop/Bottom, then sort by distance from top, and then
        // filter by elements that are in the stickyContainer already.
        this._stickies.forEach(stickyItem => {
          if (isStickyAboveContainer && sticky.canStickyTop) {
            stickyList.push(stickyItem);
          } else if (sticky.canStickyBottom) {
            stickyList.push(stickyItem);
          }
        });
        const sortBasedOnOrder: boolean = this._sortBasedOnOrder(isStickyAboveContainer ? 'above' : 'below');
        const stickyListSorted = this._sortStickyList(stickyList, sortBasedOnOrder).filter(item => {
          const stickyContent = isStickyAboveContainer ? item.stickyContentTop : item.stickyContentBottom;
          if (stickyContent) {
            return stickyChildrenElements.indexOf(stickyContent) > -1;
          }
        });

        // Get first element that has a distance from top that is further than our sticky that is being added
        let targetStickyToAppendBefore: Sticky | undefined = undefined;
        for (const i in stickyListSorted) {
          if (this._isTargetContainer(stickyListSorted[i], sticky, sortBasedOnOrder)) {
            targetStickyToAppendBefore = stickyListSorted[i];
            break;
          }
        }

        // If target element to append before is known, then grab respective stickyContentTop/Bottom element and insert before
        let targetContainer: HTMLDivElement | null = null;
        if (targetStickyToAppendBefore) {
          targetContainer = isStickyAboveContainer
            ? targetStickyToAppendBefore.stickyContentTop
            : targetStickyToAppendBefore.stickyContentBottom;
        }
        stickyContainer.insertBefore(stickyContentToAdd, targetContainer);
      }
    }
  };

  private _removeStickyFromContainers = (sticky: Sticky): void => {
    if (this._stickyContainerContainsStickyContent(sticky, true /** stickyAboveConatiner */)) {
      this.stickyAbove!.removeChild(sticky.stickyContentTop!);
    }
    if (this._stickyContainerContainsStickyContent(sticky, false /** stickyBelowConatiner */)) {
      this.stickyBelow!.removeChild(sticky.stickyContentBottom!);
    }
  };

  private _stickyContainerContainsStickyContent(sticky: Sticky, isTop: boolean): boolean {
    if (isTop) {
      return !!this.stickyAbove && !!sticky.stickyContentTop && this.stickyAbove.contains(sticky.stickyContentTop);
    }
    return !!this.stickyBelow && !!sticky.stickyContentBottom && this.stickyBelow.contains(sticky.stickyContentBottom);
  }

  private _onWindowResize = (): void => {
    let newScrollbarWidth: number = 0;
    let newScrollbarHeight: number = 0;
    const { scrollbarVisibility } = this.props;
    const { scrollbarHeight, scrollbarWidth } = this.state;
    if (scrollbarVisibility === ScrollbarVisibility.always) {
      newScrollbarHeight = scrollbarHeight;
      newScrollbarWidth = scrollbarWidth;
    }
    newScrollbarHeight = newScrollbarHeight || this._getScrollbarHeight();
    newScrollbarWidth = newScrollbarWidth || this._getScrollbarWidth();

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
    const { stickyBelowContainerBehavior, stickyAboveContainerBehavior } = this.props;
    const stickiesTopBehaviorType: StickyContainerBehaviorType | undefined =
      stickyAboveContainerBehavior && stickyAboveContainerBehavior.containerBehavior;
    const stickiesBottomBehaviorType: StickyContainerBehaviorType | undefined =
      stickyBelowContainerBehavior && stickyBelowContainerBehavior.containerBehavior;
    return (
      this.usePlaceholderForSticky(isTop ? 'top' : 'bottom') ||
      (isTop
        ? stickiesTopBehaviorType !== StickyContainerBehaviorType.StickyAlways
        : stickiesBottomBehaviorType !== StickyContainerBehaviorType.StickyAlways)
    );
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
      // sync Sticky scroll if contentContainer has scrolled horizontally and Sticky component is in sticky state
      if (this._scrollLeft !== contentContainer.scrollLeft) {
        this._scrollLeft = contentContainer.scrollLeft;
        this._stickies.forEach((sticky: Sticky) => {
          sticky.syncScroll(contentContainer);
        });
      }

      if (this._scrollTop !== contentContainer.scrollTop) {
        this._scrollTop = contentContainer.scrollTop;
        this._userInteractionStarted = true;
        this._notifyThrottled();
      }
    }
  };
}
