import * as React from 'react';
import * as PropTypes from 'prop-types';
import { BaseComponent } from '../../Utilities';
import { IStickyProps, StickyPositionType } from './Sticky.types';
import { IScrollablePaneContext } from '../ScrollablePane/ScrollablePane.base';
import { StickyContainerBehaviorType } from '../ScrollablePane/ScrollablePane.types';

export interface IStickyState {
  isStickyTop: boolean;
  isStickyBottom: boolean;
  distanceFromTop?: number;
}

export interface IStickyContext {
  scrollablePane: PropTypes.Requireable<object>;
}

export class Sticky extends BaseComponent<IStickyProps, IStickyState> {
  public static defaultProps: IStickyProps = {
    stickyPosition: StickyPositionType.Both,
    isScrollSynced: true
  };

  public static contextTypes: IStickyContext = {
    scrollablePane: PropTypes.object
  };

  public context: IScrollablePaneContext;

  private _root = React.createRef<HTMLDivElement>();
  private _stickyContentTop = React.createRef<HTMLDivElement>();
  private _stickyContentBottom = React.createRef<HTMLDivElement>();
  private _nonStickyContent = React.createRef<HTMLDivElement>();
  private _placeHolder = React.createRef<HTMLDivElement>();
  private _activeElement: HTMLElement | undefined;

  constructor(props: IStickyProps) {
    super(props);
    this.state = {
      isStickyTop: false,
      isStickyBottom: false,
      distanceFromTop: undefined
    };
    this._activeElement = undefined;
  }

  public get root(): HTMLDivElement | null {
    return this._root.current;
  }

  public get placeholder(): HTMLDivElement | null {
    return this._placeHolder.current;
  }

  public get stickyContentTop(): HTMLDivElement | null {
    return this._stickyContentTop.current;
  }

  public get stickyContentBottom(): HTMLDivElement | null {
    return this._stickyContentBottom.current;
  }

  public get nonStickyContent(): HTMLDivElement | null {
    return this._nonStickyContent.current;
  }

  public get canStickyTop(): boolean {
    return this.props.stickyPosition === StickyPositionType.Both || this.props.stickyPosition === StickyPositionType.Header;
  }

  public get canStickyBottom(): boolean {
    return this.props.stickyPosition === StickyPositionType.Both || this.props.stickyPosition === StickyPositionType.Footer;
  }

  public syncScroll = (container: HTMLElement): void => {
    const { nonStickyContent } = this;
    const { isStickyBottom, isStickyTop } = this.state;
    const { scrollablePane } = this.context;
    // scroll sync is needed only if current state is sticky
    if (!scrollablePane || !(isStickyBottom || isStickyTop)) {
      return;
    }

    if (isStickyTop && !scrollablePane.usePlaceholderForSticky('top' /** StickyContentTop */) && this.stickyContentTop) {
      this.stickyContentTop.children[0].scrollLeft = scrollablePane.getScrollPosition(true);
    } else if (isStickyBottom && !scrollablePane.usePlaceholderForSticky('bottom' /** StickyContentBottom */) && this.stickyContentBottom) {
      this.stickyContentBottom.children[0].scrollLeft = scrollablePane.getScrollPosition(true);
    } else if (nonStickyContent && this.props.isScrollSynced && scrollablePane) {
      nonStickyContent.scrollLeft = scrollablePane.getScrollPosition(true);
    }
  };

  public componentDidMount(): void {
    const { scrollablePane } = this.context;

    if (!scrollablePane) {
      return;
    }

    scrollablePane.subscribe(this._onScrollEvent);
    scrollablePane.addSticky(this);
  }

  public componentWillUnmount(): void {
    const { scrollablePane } = this.context;

    if (!scrollablePane) {
      return;
    }

    scrollablePane.unsubscribe(this._onScrollEvent);
    scrollablePane.removeSticky(this);
  }

  public componentDidUpdate(prevProps: IStickyProps, prevState: IStickyState): void {
    const { scrollablePane } = this.context;

    if (!scrollablePane) {
      return;
    }

    const { isStickyBottom, isStickyTop, distanceFromTop } = this.state;
    if (prevState.distanceFromTop !== distanceFromTop) {
      scrollablePane.sortSticky(this, true /*sortAgain*/);
    }
    if (prevState.isStickyTop !== isStickyTop || prevState.isStickyBottom !== isStickyBottom) {
      if (this._activeElement) {
        this._activeElement.focus();
      }
      scrollablePane.updateStickyRefHeights();
    }
    // horizontal scroll has to be synced only if component is sticky
    if ((isStickyBottom || isStickyTop) && scrollablePane.getScrollPosition(true)) {
      // Sync Sticky scroll position with content container on each update
      scrollablePane.syncScrollSticky(this);
    }
  }

  public shouldComponentUpdate(nextProps: IStickyProps, nextState: IStickyState): boolean {
    if (!this.context.scrollablePane) {
      return true;
    }

    const { isStickyTop, isStickyBottom, distanceFromTop } = this.state;

    return (isStickyTop !== nextState.isStickyTop ||
      isStickyBottom !== nextState.isStickyBottom ||
      this.props.stickyPosition !== nextProps.stickyPosition ||
      this.props.children !== nextProps.children ||
      distanceFromTop !== nextState.distanceFromTop ||
      this._isOffsetHeightDifferent()) as boolean;
  }

  public render(): JSX.Element {
    const { isStickyTop, isStickyBottom } = this.state;
    const { stickyClassName, children } = this.props;
    const { scrollablePane } = this.context;
    if (!scrollablePane) {
      return <div>{this.props.children}</div>;
    }
    // decide if actual element is to be replicated or placeholder is be to used.
    const usePlaceholderForStickyContentTop = scrollablePane.usePlaceholderForSticky('top');
    const usePlaceholderForStickyContentBottom = scrollablePane.usePlaceholderForSticky('bottom');

    return (
      <div ref={this._root}>
        {this.canStickyTop && (
          <div ref={this._stickyContentTop} aria-hidden={!isStickyTop} style={{ pointerEvents: isStickyTop ? 'auto' : 'none' }}>
            {usePlaceholderForStickyContentTop ? (
              <div style={this._getStickyPlaceholderHeight(isStickyTop)} />
            ) : (
              <div className={isStickyTop ? stickyClassName : undefined} style={this._getStickyContentStyles(isStickyTop)}>
                {children}
              </div>
            )}
          </div>
        )}
        {this.canStickyBottom && (
          <div ref={this._stickyContentBottom} aria-hidden={!isStickyBottom} style={{ pointerEvents: isStickyBottom ? 'auto' : 'none' }}>
            {usePlaceholderForStickyContentBottom ? (
              <div style={this._getStickyPlaceholderHeight(isStickyBottom)} />
            ) : (
              <div className={isStickyBottom ? stickyClassName : undefined} style={this._getStickyContentStyles(isStickyBottom)}>
                {children}
              </div>
            )}
          </div>
        )}
        <div
          style={this._getNonStickyPlaceholderHeightAndWidth(usePlaceholderForStickyContentTop, usePlaceholderForStickyContentBottom)}
          ref={this._placeHolder}
        >
          <div
            ref={this._nonStickyContent}
            className={isStickyTop || isStickyBottom ? stickyClassName : undefined}
            style={this._getContentStyles(isStickyTop || isStickyBottom)}
          >
            {children}
          </div>
        </div>
      </div>
    );
  }

  public addSticky(stickyContent: HTMLDivElement, isStickyContentTop: boolean): void {
    const placeholderUsedForStickyContent = this._usePlaceHolderForContent(true /** sticky content */, isStickyContentTop);
    if (placeholderUsedForStickyContent && this.nonStickyContent) {
      stickyContent.appendChild(this.nonStickyContent);
    }
  }

  public resetSticky(): void {
    const placeholderUsedForContent = this._usePlaceHolderForContent(false /** actual position */, false);
    if (placeholderUsedForContent && this.nonStickyContent && this.placeholder) {
      this.placeholder.appendChild(this.nonStickyContent);
    }
  }

  public setDistanceFromTop(container: HTMLDivElement): void {
    const distanceFromTop = this._getNonStickyDistanceFromTop(container);
    this.setState({ distanceFromTop: distanceFromTop });
  }

  private _getContentStyles(isSticky: boolean): React.CSSProperties {
    const { scrollablePane } = this.context;
    if (!scrollablePane) {
      return {};
    }
    const isVisible = isSticky ? scrollablePane.usePlaceholderForSticky('top') || scrollablePane.usePlaceholderForSticky('bottom') : true;

    return {
      backgroundColor: this.props.stickyBackgroundColor || this._getBackground(),
      overflow: isSticky ? 'hidden' : '',
      visibility: isVisible ? 'visible' : 'hidden'
    };
  }

  private _getStickyPlaceholderHeight(isSticky: boolean): React.CSSProperties {
    const height = this.nonStickyContent ? this.nonStickyContent.offsetHeight : 0;
    return {
      visibility: isSticky ? 'hidden' : 'visible',
      height: isSticky ? 0 : height
    };
  }

  private _getStickyContentStyles(isSticky: boolean): React.CSSProperties {
    return {
      visibility: isSticky ? 'visible' : 'hidden',
      pointerEvents: isSticky ? 'auto' : 'none',
      backgroundColor: this.props.stickyBackgroundColor || this._getBackground(),
      overflow: 'hidden'
    };
  }

  private _getNonStickyPlaceholderHeightAndWidth(
    usePlaceholderForStickyTop: boolean,
    usePlaceholderForStickyBottom: boolean
  ): React.CSSProperties {
    const { isStickyTop, isStickyBottom } = this.state;
    if ((isStickyTop && usePlaceholderForStickyTop) || (isStickyBottom && usePlaceholderForStickyBottom)) {
      let height = 0,
        width = 0;
      // Why is placeHolder width needed?
      // ScrollablePane content--container is reponsible for providing scrollbars depending on content overflow.
      // If the overflow is caused by content of sticky component when it is in non-sticky state,
      // ScrollablePane content--conatiner will provide horizontal scrollbar.
      // If the component becomes sticky, i.e., when state.isStickyTop || state.isStickyBottom becomes true,
      // it's actual content is no more inside ScrollablePane content--container.
      // ScrollablePane content--conatiner will see no need for horizontal scrollbar. (Assuming no other content is causing overflow)
      // The complete content of sticky component will not be viewable.
      // It is necessary to provide a placeHolder of a certain width (height is already being set) in the content--container,
      // to get a horizontal scrollbar & be able to view the complete content of sticky component.
      if (this.nonStickyContent && this.nonStickyContent.firstElementChild) {
        height = this.nonStickyContent.offsetHeight;
        // What value should be substituted for placeHolder width?
        // Assumption:
        //    1. Content inside <Sticky> should always be wrapped in a single div.
        //        <Sticky><div id={'firstElementChild'}>{intended_content}</div><Sticky/>
        //    2. -ve padding, margin, etc. are not be used.
        //    3. scrollWidth of a parent is greater than or equal to max of scrollWidths of it's children and same holds for children.
        // placeHolder width should be computed in the best possible way to prevent overscroll/underscroll.
        width =
          this.nonStickyContent.firstElementChild.scrollWidth +
          ((this.nonStickyContent.firstElementChild as HTMLElement).offsetWidth - this.nonStickyContent.firstElementChild.clientWidth);
      }
      return {
        height: height,
        width: width
      };
    } else {
      return {};
    }
  }

  private _onScrollEvent = (container: HTMLElement, footerStickyContainer: HTMLElement): void => {
    const { scrollablePane } = this.context;
    if (!(this.root && this.nonStickyContent && scrollablePane)) {
      return;
    }
    const { stickyPosition } = this.props;
    const isHeader = stickyPosition === StickyPositionType.Header;
    if (scrollablePane.verifyStickyContainerBehavior(isHeader ? 'above' : 'below', StickyContainerBehaviorType.StickyAlways)) {
      // 1. ScrollablePane is mounted and has called notifySubscriber
      // 2. stickyAlways has to re-render if mutation could 've affected it's offsetHeight.
      this.setState({
        isStickyTop: isHeader,
        isStickyBottom: !isHeader,
        distanceFromTop: 0 // must so that sorting happens.
      });
    } else if (
      scrollablePane.verifyStickyContainerBehavior(isHeader ? 'above' : 'below', StickyContainerBehaviorType.StickyOnScroll) &&
      !scrollablePane.getUserInteractionStatus()
    ) {
      // user interaction has not started
      // 1. ScrollablePane is mounted and has called notifySubscriber, sort is required.
      // 2. StickyOnScroll has to re-render if mutation could 've affected it's offsetHeight.
      const { isStickyBottom, isStickyTop } = this.state;
      scrollablePane.sortSticky(this, false);
      this.setState({
        isStickyBottom: isStickyBottom,
        isStickyTop: isStickyTop
      });
    } else {
      const distanceFromTop = this._getNonStickyDistanceFromTop(container);
      let isStickyTop = false;
      let isStickyBottom = false;

      if (this.canStickyTop) {
        const distanceToStickTop = distanceFromTop - this._getStickyDistanceFromTop();
        isStickyTop = distanceToStickTop < container.scrollTop;
      }

      // Can sticky bottom if the scrollablePane -
      // total sticky footer height is smaller than the sticky's distance from the top of the pane
      if (this.canStickyBottom && container.clientHeight - footerStickyContainer.offsetHeight <= distanceFromTop) {
        isStickyBottom =
          distanceFromTop - Math.floor(container.scrollTop) >= this._getStickyDistanceFromTopForFooter(container, footerStickyContainer);
      }

      if (
        document.activeElement &&
        this.nonStickyContent.contains(document.activeElement) &&
        (this.state.isStickyTop !== isStickyTop || this.state.isStickyBottom !== isStickyBottom)
      ) {
        this._activeElement = document.activeElement as HTMLElement;
      } else {
        this._activeElement = undefined;
      }

      this.setState({
        isStickyTop: this.canStickyTop && isStickyTop,
        isStickyBottom: isStickyBottom,
        distanceFromTop: distanceFromTop
      });
    }
  };

  private _getStickyDistanceFromTop = (): number => {
    let distance = 0;
    if (this.stickyContentTop) {
      distance = this.stickyContentTop.offsetTop;
    }

    return distance;
  };

  private _getStickyDistanceFromTopForFooter = (container: HTMLElement, footerStickyVisibleContainer: HTMLElement): number => {
    let distance = 0;
    if (this.stickyContentBottom) {
      distance = container.clientHeight - footerStickyVisibleContainer.offsetHeight + this.stickyContentBottom.offsetTop;
    }

    return distance;
  };

  private _getNonStickyDistanceFromTop = (container: HTMLElement): number => {
    let distance = 0;
    let currElem = this.root;

    if (currElem) {
      while (currElem && currElem.offsetParent !== container) {
        distance += currElem.offsetTop;
        currElem = currElem.offsetParent as HTMLDivElement;
      }

      if (currElem && currElem.offsetParent === container) {
        distance += currElem.offsetTop;
      }
    }
    return distance;
  };

  // Gets background of nearest parent element that has a declared background-color attribute
  private _getBackground(): string | undefined {
    if (!this.root) {
      return undefined;
    }

    let curr: HTMLElement = this.root;

    while (
      window.getComputedStyle(curr).getPropertyValue('background-color') === 'rgba(0, 0, 0, 0)' ||
      window.getComputedStyle(curr).getPropertyValue('background-color') === 'transparent'
    ) {
      if (curr.tagName === 'HTML') {
        // Fallback color if no element has a declared background-color attribute
        return undefined;
      }
      if (curr.parentElement) {
        curr = curr.parentElement;
      }
    }
    return window.getComputedStyle(curr).getPropertyValue('background-color');
  }

  private _isOffsetHeightDifferent(): boolean {
    const { scrollablePane } = this.context;
    if (!scrollablePane) {
      return false;
    }
    // decide if actual element is to be replicated or placeholder is be to used.
    const usePlaceholderForStickyContentTop = scrollablePane.usePlaceholderForSticky('top');
    const usePlaceholderForStickyContentBottom = scrollablePane.usePlaceholderForSticky('bottom');

    return (
      (usePlaceholderForStickyContentTop && _isOffsetHeightDifferent(this._nonStickyContent, this._stickyContentTop)) ||
      (usePlaceholderForStickyContentBottom && _isOffsetHeightDifferent(this._nonStickyContent, this._stickyContentBottom)) ||
      ((usePlaceholderForStickyContentBottom || usePlaceholderForStickyContentTop) &&
        _isOffsetHeightDifferent(this._nonStickyContent, this._placeHolder))
    );
  }

  private _usePlaceHolderForContent(stickyContentPlaceholder: boolean, isStickyContentTop: boolean): boolean {
    const { scrollablePane } = this.context;
    if (!scrollablePane) {
      return true;
    }

    const usePlaceholderForStickyContentTop = scrollablePane.usePlaceholderForSticky('top');
    const usePlaceholderForStickyContentBottom = scrollablePane.usePlaceholderForSticky('bottom');

    if (stickyContentPlaceholder) {
      return isStickyContentTop ? usePlaceholderForStickyContentTop : usePlaceholderForStickyContentBottom;
    } else {
      return usePlaceholderForStickyContentTop || usePlaceholderForStickyContentBottom;
    }
  }
}

function _isOffsetHeightDifferent(a: React.RefObject<HTMLElement>, b: React.RefObject<HTMLDivElement>): boolean {
  return (a && b && a.current && b.current && a.current.offsetHeight !== b.current.offsetHeight) as boolean;
}
