import * as React from 'react';
import {
  Async,
  EventGroup,
  classNamesFunction,
  divProperties,
  getNativeProps,
  getRTL,
  initializeComponentRef,
} from '../../Utilities';
import { ScrollablePaneContext } from './ScrollablePane.types';
import { Sticky } from '../../Sticky';
import type {
  IScrollablePane,
  IScrollablePaneContext,
  IScrollablePaneProps,
  IScrollablePaneStyleProps,
  IScrollablePaneStyles,
} from './ScrollablePane.types';
import { WindowContext } from '@fluentui/react-window-provider';
import { getWindowEx } from '../../utilities/dom';

export interface IScrollablePaneState {
  stickyTopHeight: number;
  stickyBottomHeight: number;
  scrollbarWidth: number;
  scrollbarHeight: number;
}

const getClassNames = classNamesFunction<IScrollablePaneStyleProps, IScrollablePaneStyles>();

export class ScrollablePaneBase
  extends React.Component<IScrollablePaneProps, IScrollablePaneState>
  implements IScrollablePane
{
  public static contextType = WindowContext;

  private _root = React.createRef<HTMLDivElement>();
  private _stickyAboveRef = React.createRef<HTMLDivElement>();
  private _stickyBelowRef = React.createRef<HTMLDivElement>();
  private _contentContainer = React.createRef<HTMLDivElement>();
  private _subscribers: Set<Function>;
  private _stickies: Set<Sticky>;
  private _mutationObserver: MutationObserver;
  private _notifyThrottled: () => void;
  private _async: Async;
  private _events: EventGroup;

  constructor(props: IScrollablePaneProps) {
    super(props);
    this._subscribers = new Set<Function>();
    this._stickies = new Set<Sticky>();

    initializeComponentRef(this);
    this._async = new Async(this);
    this._events = new EventGroup(this);

    this.state = {
      stickyTopHeight: 0,
      stickyBottomHeight: 0,
      scrollbarWidth: 0,
      scrollbarHeight: 0,
    };

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
    const win = getWindowEx(this.context);
    const { initialScrollPosition } = this.props;
    this._events.on(this.contentContainer, 'scroll', this._onScroll);
    this._events.on(win, 'resize', this._onWindowResize);
    if (this.contentContainer && initialScrollPosition) {
      this.contentContainer.scrollTop = initialScrollPosition;
    }

    // Set sticky distances from top property, then sort in correct order and notify subscribers
    this.setStickiesDistanceFromTop();
    this._stickies.forEach(sticky => {
      this.sortSticky(sticky);
    });
    this.notifySubscribers();

    if (win && 'MutationObserver' in win) {
      this._mutationObserver = new MutationObserver(mutation => {
        // Function to check if mutation is occuring in stickyAbove or stickyBelow
        function checkIfMutationIsSticky(mutationRecord: MutationRecord): boolean {
          if (this.stickyAbove !== null && this.stickyBelow !== null) {
            return this.stickyAbove.contains(mutationRecord.target) || this.stickyBelow.contains(mutationRecord.target);
          }
          return false;
        }

        // Compute the scrollbar height, which might have changed if the content's width changed and caused overflow
        const scrollbarHeight = this._getScrollbarHeight();
        // If the scrollbar height changed, update state so it's postioned correctly below sticky footer
        if (scrollbarHeight !== this.state.scrollbarHeight) {
          this.setState({
            scrollbarHeight,
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
          characterData: true,
        });
      }
    }
  }

  public componentWillUnmount() {
    this._events.dispose();
    this._async.dispose();

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
    if (
      this.contentContainer &&
      typeof initialScrollPosition === 'number' &&
      prevProps.initialScrollPosition !== initialScrollPosition
    ) {
      this.contentContainer.scrollTop = initialScrollPosition;
    }

    // Update subscribers when stickyTopHeight/stickyBottomHeight changes
    if (
      prevState.stickyTopHeight !== this.state.stickyTopHeight ||
      prevState.stickyBottomHeight !== this.state.stickyBottomHeight
    ) {
      this.notifySubscribers();
    }

    this._async.setTimeout(this._onWindowResize, 0);
  }

  public render(): JSX.Element {
    const { className, scrollContainerFocus, scrollContainerAriaLabel, theme, styles, onScroll } = this.props;
    const { stickyTopHeight, stickyBottomHeight } = this.state;
    const classNames = getClassNames(styles!, {
      theme: theme!,
      className,
      scrollbarVisibility: this.props.scrollbarVisibility,
    });

    const scrollContainerProps = scrollContainerFocus
      ? {
          role: 'group',
          tabIndex: 0,
          'aria-label': scrollContainerAriaLabel,
          onScroll,
        }
      : {
          onScroll,
        };

    return (
      <div
        {...getNativeProps(
          {
            ...this.props,
          },
          divProperties,
          // on React 17 onScroll is not being invoked on root element,
          // as a fix this method will be provided to the container element
          ['onScroll'],
        )}
        ref={this._root}
        className={classNames.root}
      >
        <div
          ref={this._stickyAboveRef}
          className={classNames.stickyAbove}
          style={this._getStickyContainerStyle(stickyTopHeight, true)}
        />
        <div
          ref={this._contentContainer}
          {...scrollContainerProps}
          className={classNames.contentContainer}
          data-is-scrollable={true}
        >
          <ScrollablePaneContext.Provider value={this._getScrollablePaneContext()}>
            {this.props.children}
          </ScrollablePaneContext.Provider>
        </div>
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

    stickyItems.forEach((sticky: Sticky) => {
      const { isStickyTop, isStickyBottom } = sticky.state;
      if (sticky.nonStickyContent) {
        if (isStickyTop) {
          stickyTopHeight += sticky.nonStickyContent.offsetHeight;
        }
        if (isStickyBottom) {
          stickyBottomHeight += sticky.nonStickyContent.offsetHeight;
        }
        this._checkStickyStatus(sticky);
      }
    });

    this.setState({
      stickyTopHeight,
      stickyBottomHeight,
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
    if (this.contentContainer) {
      return this.contentContainer.scrollTop;
    }

    return 0;
  };

  public syncScrollSticky = (sticky: Sticky): void => {
    if (sticky && this.contentContainer) {
      sticky.syncScroll(this.contentContainer);
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
      },
      window: getWindowEx(this.context),
    };
  };

  private _checkStickyStatus(sticky: Sticky): void {
    if (this.stickyAbove && this.stickyBelow && this.contentContainer && sticky.nonStickyContent) {
      // If sticky is sticky, then append content to appropriate container
      if (sticky.state.isStickyTop || sticky.state.isStickyBottom) {
        if (
          sticky.state.isStickyTop &&
          !this.stickyAbove.contains(sticky.nonStickyContent) &&
          sticky.stickyContentTop
        ) {
          sticky.addSticky(sticky.stickyContentTop);
        }

        if (
          sticky.state.isStickyBottom &&
          !this.stickyBelow.contains(sticky.nonStickyContent) &&
          sticky.stickyContentBottom
        ) {
          sticky.addSticky(sticky.stickyContentBottom);
        }
      } else if (!this.contentContainer.contains(sticky.nonStickyContent)) {
        // Reset sticky if it's not sticky and not in the contentContainer element
        sticky.resetSticky();
      }
    }
  }

  private _addToStickyContainer = (
    sticky: Sticky,
    stickyContainer: HTMLDivElement,
    stickyContentToAdd: HTMLDivElement,
  ): void => {
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
            const stickyContent =
              stickyContainer === this.stickyAbove ? item.stickyContentTop : item.stickyContentBottom;
            if (stickyContent) {
              return stickyChildrenElements.indexOf(stickyContent) > -1;
            }
            return false;
          });

        // Get first element that has a distance from top that is further than our sticky that is being added
        let targetStickyToAppendBefore: Sticky | undefined = undefined;
        for (const stickyListItem of stickyListSorted) {
          if ((stickyListItem.state.distanceFromTop || 0) >= (sticky.state.distanceFromTop || 0)) {
            targetStickyToAppendBefore = stickyListItem;
            break;
          }
        }

        // If target element to append before is known, grab respective stickyContentTop/Bottom element
        // and insert before
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
    const scrollbarWidth = this._getScrollbarWidth();
    const scrollbarHeight = this._getScrollbarHeight();

    this.setState({
      scrollbarWidth,
      scrollbarHeight,
    });

    this.notifySubscribers();
  };

  private _getStickyContainerStyle = (height: number, isTop: boolean): React.CSSProperties => {
    return {
      height,
      ...(getRTL(this.props.theme)
        ? {
            right: '0',
            left: `${this.state.scrollbarWidth || this._getScrollbarWidth() || 0}px`,
          }
        : {
            left: '0',
            right: `${this.state.scrollbarWidth || this._getScrollbarWidth() || 0}px`,
          }),
      ...(isTop
        ? {
            top: '0',
          }
        : {
            bottom: `${this.state.scrollbarHeight || this._getScrollbarHeight() || 0}px`,
          }),
    };
  };

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
      this._stickies.forEach((sticky: Sticky) => {
        sticky.syncScroll(contentContainer);
      });
    }

    this._notifyThrottled();
  };
}
