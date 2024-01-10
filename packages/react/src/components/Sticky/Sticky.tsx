import * as React from 'react';
import { initializeComponentRef } from '../../Utilities';
import { hiddenContentStyle } from '../../Styling';
import { ScrollablePaneContext } from '../ScrollablePane/ScrollablePane.types';
import { StickyPositionType } from './Sticky.types';
import type { IScrollablePaneContext } from '../ScrollablePane/ScrollablePane.types';
import type { IStickyProps } from './Sticky.types';
import { getScrollUtils } from './util/scroll';
import type { ScrollUtils } from './util/scroll';
import { isLessThanInRange } from './util/comparison';

export interface IStickyState {
  isStickyTop: boolean;
  isStickyBottom: boolean;
  distanceFromTop?: number;
}

// Pixels
const COMPARISON_RANGE = 1;

export class Sticky extends React.Component<IStickyProps, IStickyState> {
  public static defaultProps: IStickyProps = {
    stickyPosition: StickyPositionType.Both,
    isScrollSynced: true,
  };

  public static contextType = ScrollablePaneContext;

  private _root = React.createRef<HTMLDivElement>();
  private _stickyContentTop = React.createRef<HTMLDivElement>();
  private _stickyContentBottom = React.createRef<HTMLDivElement>();
  private _nonStickyContent = React.createRef<HTMLDivElement>();
  private _placeHolder = React.createRef<HTMLDivElement>();
  private _activeElement: HTMLElement | undefined;
  private _scrollUtils: ScrollUtils;

  constructor(props: IStickyProps) {
    super(props);

    initializeComponentRef(this);
    this.state = {
      isStickyTop: false,
      isStickyBottom: false,
      distanceFromTop: undefined,
    };
    this._activeElement = undefined;
    this._scrollUtils = getScrollUtils();
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
    return (
      this.props.stickyPosition === StickyPositionType.Both || this.props.stickyPosition === StickyPositionType.Header
    );
  }

  public get canStickyBottom(): boolean {
    return (
      this.props.stickyPosition === StickyPositionType.Both || this.props.stickyPosition === StickyPositionType.Footer
    );
  }

  public syncScroll = (container: HTMLElement): void => {
    const { nonStickyContent } = this;

    if (nonStickyContent && this.props.isScrollSynced) {
      nonStickyContent.scrollLeft = container.scrollLeft;
    }
  };

  public componentDidMount(): void {
    const { scrollablePane } = this._getContext();

    if (!scrollablePane) {
      return;
    }

    scrollablePane.subscribe(this._onScrollEvent);
    scrollablePane.addSticky(this);
  }

  public componentWillUnmount(): void {
    const { scrollablePane } = this._getContext();

    if (!scrollablePane) {
      return;
    }

    scrollablePane.unsubscribe(this._onScrollEvent);
    scrollablePane.removeSticky(this);
  }

  public componentDidUpdate(prevProps: IStickyProps, prevState: IStickyState): void {
    const { scrollablePane } = this._getContext();

    if (!scrollablePane) {
      return;
    }

    const { isStickyBottom, isStickyTop, distanceFromTop } = this.state;
    let syncScroll: boolean = false;
    if (prevState.distanceFromTop !== distanceFromTop) {
      scrollablePane.sortSticky(this, true /*sortAgain*/);
      syncScroll = true;
    }
    if (prevState.isStickyTop !== isStickyTop || prevState.isStickyBottom !== isStickyBottom) {
      if (this._activeElement) {
        this._activeElement.focus();
      }
      scrollablePane.updateStickyRefHeights();
      syncScroll = true;
    }
    if (syncScroll) {
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
      _isOffsetHeightDifferent(this._nonStickyContent, this._stickyContentTop) ||
      _isOffsetHeightDifferent(this._nonStickyContent, this._stickyContentBottom) ||
      _isOffsetHeightDifferent(this._nonStickyContent, this._placeHolder)) as boolean;
  }

  public render(): JSX.Element {
    const { isStickyTop, isStickyBottom } = this.state;
    const { stickyClassName, children } = this.props;

    if (!this.context.scrollablePane) {
      return <div>{this.props.children}</div>;
    }

    return (
      <div ref={this._root}>
        {this.canStickyTop && (
          <div ref={this._stickyContentTop} style={{ pointerEvents: isStickyTop ? 'auto' : 'none' }}>
            <div style={this._getStickyPlaceholderHeight(isStickyTop)} />
          </div>
        )}
        {this.canStickyBottom && (
          <div ref={this._stickyContentBottom} style={{ pointerEvents: isStickyBottom ? 'auto' : 'none' }}>
            <div style={this._getStickyPlaceholderHeight(isStickyBottom)} />
          </div>
        )}
        <div style={this._getNonStickyPlaceholderHeightAndWidth()} ref={this._placeHolder}>
          {(isStickyTop || isStickyBottom) && <span style={hiddenContentStyle as any}>{children}</span>}
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

  public addSticky(stickyContent: HTMLDivElement): void {
    if (this.nonStickyContent) {
      stickyContent.appendChild(this.nonStickyContent);
    }
  }

  public resetSticky(): void {
    if (this.nonStickyContent && this.placeholder) {
      this.placeholder.appendChild(this.nonStickyContent);
    }
  }

  public setDistanceFromTop(container: HTMLDivElement): void {
    const distanceFromTop = this._getNonStickyDistanceFromTop(container);
    this.setState({ distanceFromTop });
  }

  private _getContext = (): IScrollablePaneContext => this.context;

  private _getContentStyles(isSticky: boolean): React.CSSProperties {
    return {
      backgroundColor: this.props.stickyBackgroundColor || this._getBackground(),
      overflow: isSticky ? 'hidden' : '',
    };
  }

  private _getStickyPlaceholderHeight(isSticky: boolean): React.CSSProperties {
    const height = this.nonStickyContent ? this.nonStickyContent.offsetHeight : 0;
    return {
      visibility: isSticky ? 'hidden' : 'visible',
      height: isSticky ? 0 : height,
    };
  }

  private _getNonStickyPlaceholderHeightAndWidth(): React.CSSProperties {
    const { isStickyTop, isStickyBottom } = this.state;
    if (isStickyTop || isStickyBottom) {
      let height = 0;
      let width = 0;
      // Why is placeholder width needed?
      // ScrollablePane's content container is reponsible for providing scrollbars depending on content overflow.
      // - If the overflow is caused by content of sticky component when it is in non-sticky state, the container will
      //   provide horizontal scrollbar.
      // - If the component becomes sticky, i.e., when state.isStickyTop || state.isStickyBottom becomes true,
      //   its actual content is no longer inside the container, so the container will see no need for horizontal
      //   scrollbar (assuming no other content is causing overflow). The complete content of sticky component will
      //   not be viewable. So it is necessary to provide a placeholder of a certain width (height is already being set)
      //   in the container, to get a horizontal scrollbar & be able to view the complete content of sticky component.
      if (this.nonStickyContent && this.nonStickyContent.firstElementChild) {
        height = this.nonStickyContent.offsetHeight;
        // What value should be substituted for placeholder width?
        // Assumptions:
        //    1. Content inside <Sticky> should always be wrapped in a single div.
        //        <Sticky><div id={'firstElementChild'}>{intended_content}</div><Sticky/>
        //    2. -ve padding, margin, etc. are not be used.
        //    3. scrollWidth of a parent is greater than or equal to max of scrollWidths of its children, and same holds
        //       for children.
        // placeholder width should be computed in the best possible way to prevent overscroll/underscroll.
        width =
          this.nonStickyContent.firstElementChild.scrollWidth +
          ((this.nonStickyContent.firstElementChild as HTMLElement).offsetWidth -
            this.nonStickyContent.firstElementChild.clientWidth);
      }
      return {
        height,
        width,
      };
    } else {
      return {};
    }
  }

  private _onScrollEvent = (container: HTMLElement, footerStickyContainer: HTMLElement): void => {
    if (this.root && this.nonStickyContent) {
      const distanceFromTop = this._getNonStickyDistanceFromTop(container);
      let isStickyTop = false;
      let isStickyBottom = false;
      // eslint-disable-next-line no-restricted-globals
      const doc = (this._getContext().window ?? window)?.document;

      if (this.canStickyTop) {
        const distanceToStickTop = distanceFromTop - this._getStickyDistanceFromTop();
        const containerScrollTop = container.scrollTop;
        isStickyTop = isLessThanInRange(distanceToStickTop, containerScrollTop, COMPARISON_RANGE);
      }

      // Can sticky bottom if the scrollablePane - total sticky footer height is smaller than the sticky's distance
      // from the top of the pane
      if (this.canStickyBottom && container.clientHeight - footerStickyContainer.offsetHeight <= distanceFromTop) {
        isStickyBottom =
          distanceFromTop - this._scrollUtils.getScrollTopInRange(container, COMPARISON_RANGE) >=
          this._getStickyDistanceFromTopForFooter(container, footerStickyContainer);
      }

      if (
        doc?.activeElement &&
        this.nonStickyContent.contains(doc?.activeElement) &&
        (this.state.isStickyTop !== isStickyTop || this.state.isStickyBottom !== isStickyBottom)
      ) {
        this._activeElement = doc?.activeElement as HTMLElement;
      } else {
        this._activeElement = undefined;
      }

      this.setState({
        isStickyTop: this.canStickyTop && isStickyTop,
        isStickyBottom,
        distanceFromTop,
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

  private _getStickyDistanceFromTopForFooter = (
    container: HTMLElement,
    footerStickyVisibleContainer: HTMLElement,
  ): number => {
    let distance = 0;
    if (this.stickyContentBottom) {
      distance =
        container.clientHeight - footerStickyVisibleContainer.offsetHeight + this.stickyContentBottom.offsetTop;
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
    // eslint-disable-next-line no-restricted-globals
    const win = this._getContext().window ?? window;

    while (
      win.getComputedStyle(curr).getPropertyValue('background-color') === 'rgba(0, 0, 0, 0)' ||
      win.getComputedStyle(curr).getPropertyValue('background-color') === 'transparent'
    ) {
      if (curr.tagName === 'HTML') {
        // Fallback color if no element has a declared background-color attribute
        return undefined;
      }
      if (curr.parentElement) {
        curr = curr.parentElement;
      }
    }
    return win.getComputedStyle(curr).getPropertyValue('background-color');
  }
}

function _isOffsetHeightDifferent(a: React.RefObject<HTMLElement>, b: React.RefObject<HTMLDivElement>): boolean {
  return (a && b && a.current && b.current && a.current.offsetHeight !== b.current.offsetHeight) as boolean;
}
