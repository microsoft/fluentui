import * as React from 'react';
import * as PropTypes from 'prop-types';
import { BaseComponent } from '../../Utilities';
import { IStickyProps, StickyPositionType } from './Sticky.types';
import { IScrollablePaneContext } from '../ScrollablePane/ScrollablePane.base';

export interface IStickyState {
  isStickyTop: boolean;
  isStickyBottom: boolean;
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

  public distanceFromTop: number;

  private _root = React.createRef<HTMLDivElement>();
  private _stickyContentTop = React.createRef<HTMLDivElement>();
  private _stickyContentBottom = React.createRef<HTMLDivElement>();
  private _nonStickyContent = React.createRef<HTMLDivElement>();
  private _placeHolder = React.createRef<HTMLDivElement>();

  constructor(props: IStickyProps) {
    super(props);
    this.state = {
      isStickyTop: false,
      isStickyBottom: false
    };
    this.distanceFromTop = 0;
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

    if (nonStickyContent && this.props.isScrollSynced) {
      nonStickyContent.scrollLeft = container.scrollLeft;
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

    if (prevState.isStickyTop !== this.state.isStickyTop || prevState.isStickyBottom !== this.state.isStickyBottom) {
      scrollablePane.updateStickyRefHeights();
      // Sync Sticky scroll position with content container on each update
      scrollablePane.syncScrollSticky(this);
    }
  }

  public shouldComponentUpdate(nextProps: IStickyProps, nextState: IStickyState): boolean {
    if (!this.context.scrollablePane) {
      return true;
    }

    const { isStickyTop, isStickyBottom } = this.state;

    return (isStickyTop !== nextState.isStickyTop ||
      isStickyBottom !== nextState.isStickyBottom ||
      this.props.stickyPosition !== nextProps.stickyPosition ||
      this.props.children !== nextProps.children ||
      _isOffsetHeightDifferent(this._nonStickyContent, this._stickyContentTop) ||
      _isOffsetHeightDifferent(this._nonStickyContent, this._stickyContentBottom) ||
      _isOffsetHeightDifferent(this._nonStickyContent, this._placeHolder) ||
      _isScrollWidthDifferent(this._nonStickyContent, this._placeHolder)) as boolean;
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
          <div ref={this._stickyContentTop} aria-hidden={!isStickyTop} style={{ pointerEvents: isStickyTop ? 'auto' : 'none' }}>
            <div style={this._getStickyPlaceholderHeight(isStickyTop)} />
          </div>
        )}
        {this.canStickyBottom && (
          <div ref={this._stickyContentBottom} aria-hidden={!isStickyBottom} style={{ pointerEvents: isStickyBottom ? 'auto' : 'none' }}>
            <div style={this._getStickyPlaceholderHeight(isStickyBottom)} />
          </div>
        )}
        <div style={this._getNonStickyPlaceholderHeightAndWidth()} ref={this._placeHolder}>
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
    this._setDistanceFromTop(this._getNonStickyDistanceFromTop(container));
  }

  private _setDistanceFromTop(distance: number): void {
    const { scrollablePane } = this.context;

    if (this.distanceFromTop !== distance && scrollablePane) {
      this.distanceFromTop = distance;
      scrollablePane.sortSticky(this, true);
      this.forceUpdate();
      scrollablePane.syncScrollSticky(this);
    }
  }

  private _getContentStyles(isSticky: boolean): React.CSSProperties {
    return {
      backgroundColor: this.props.stickyBackgroundColor || this._getBackground(),
      overflow: isSticky ? 'hidden' : ''
    };
  }

  private _getStickyPlaceholderHeight(isSticky: boolean): React.CSSProperties {
    const height = this.nonStickyContent ? this.nonStickyContent.offsetHeight : 0;
    return {
      visibility: isSticky ? 'hidden' : 'visible',
      height: isSticky ? 0 : height
    };
  }

  private _getNonStickyPlaceholderHeightAndWidth(): React.CSSProperties {
    const { isStickyTop, isStickyBottom } = this.state;
    if (isStickyTop || isStickyBottom) {
      let height = 0,
        width = 0;
      if (this.nonStickyContent) {
        height = this.nonStickyContent.offsetHeight;
        width = this.nonStickyContent.scrollWidth;
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
    if (this.root && this.nonStickyContent) {
      this._setDistanceFromTop(this._getNonStickyDistanceFromTop(container));
      let isStickyTop = false;
      let isStickyBottom = false;

      if (this.canStickyTop) {
        const distanceToStickTop = this.distanceFromTop - this._getStickyDistanceFromTop();
        isStickyTop = distanceToStickTop < container.scrollTop;
      }

      // Can sticky bottom if the scrollablePane - total sticky footer height is smaller than the sticky's distance from the top of the pane
      if (this.canStickyBottom && container.clientHeight - footerStickyContainer.offsetHeight <= this.distanceFromTop) {
        isStickyBottom =
          this.distanceFromTop - Math.floor(container.scrollTop) >=
          this._getStickyDistanceFromTopForFooter(container, footerStickyContainer);
      }

      this.setState({
        isStickyTop: this.canStickyTop && isStickyTop,
        isStickyBottom: isStickyBottom
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
}

function _isOffsetHeightDifferent(a: React.RefObject<HTMLElement>, b: React.RefObject<HTMLDivElement>): boolean {
  return (a && b && a.current && b.current && a.current.offsetHeight !== b.current.offsetHeight) as boolean;
}

function _isScrollWidthDifferent(a: React.RefObject<HTMLElement>, b: React.RefObject<HTMLDivElement>): boolean {
  return (a && b && a.current && b.current && a.current.scrollWidth !== b.current.scrollWidth) as boolean;
}
