import * as React from 'react';
import * as PropTypes from 'prop-types';
import { BaseComponent, createRef } from '../../Utilities';
import { IStickyProps, StickyPositionType } from './Sticky.types';

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

  public context: {
    scrollablePane: {
      subscribe: (handler: Function) => void;
      unsubscribe: (handler: Function) => void;
      addSticky: (sticky: Sticky) => void;
      removeSticky: (sticky: Sticky) => void;
      updateStickyRefHeights: () => void;
      sortSticky: (sticky: Sticky) => void;
      notifySubscribers: (sort?: boolean) => void;
    };
  };

  public distanceFromTop: number;
  private _root = createRef<HTMLDivElement>();
  private _stickyContentTop = createRef<HTMLDivElement>();
  private _stickyContentBottom = createRef<HTMLDivElement>();
  private _nonStickyContent = createRef<HTMLDivElement>();

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

  public componentDidMount(): void {
    if (!this.context.scrollablePane) {
      throw new TypeError('Expected Sticky to be mounted within ScrollablePane');
    }
    const { scrollablePane } = this.context;
    scrollablePane.subscribe(this._onScrollEvent);
    scrollablePane.addSticky(this);
  }

  public componentWillUnmount(): void {
    const { scrollablePane } = this.context;
    scrollablePane.unsubscribe(this._onScrollEvent);
    scrollablePane.removeSticky(this);
  }

  public componentDidUpdate(prevProps: IStickyProps, prevState: IStickyState): void {
    const { scrollablePane } = this.context;
    if (prevState.isStickyTop !== this.state.isStickyTop || prevState.isStickyBottom !== this.state.isStickyBottom) {
      scrollablePane.updateStickyRefHeights();
    }
  }

  public shouldComponentUpdate(nextProps: IStickyProps, nextState: IStickyState): boolean {
    const { isStickyTop, isStickyBottom } = this.state;
    return (
      isStickyTop !== nextState.isStickyTop ||
      isStickyBottom !== nextState.isStickyBottom ||
      this.props.stickyPosition !== nextProps.stickyPosition ||
      this.props.children !== nextProps.children
    );
  }

  public render(): JSX.Element {
    const { isStickyTop, isStickyBottom } = this.state;

    return (
      <div ref={this._root}>
        {this.canStickyTop && (
          <div
            className={this.props.stickyClassName}
            ref={this._stickyContentTop}
            aria-hidden={!isStickyTop}
            style={this._getStickyContainerStyle()}
          >
            <div style={this._getStickyPlaceholderHeight(isStickyTop)} />
          </div>
        )}
        {this.canStickyBottom && (
          <div
            className={this.props.stickyClassName}
            ref={this._stickyContentBottom}
            aria-hidden={!isStickyBottom}
            style={this._getStickyContainerStyle()}
          >
            <div style={this._getStickyPlaceholderHeight(isStickyBottom)} />
          </div>
        )}
        <div style={this._getNonStickyPlaceholderHeight()} />
        <div
          ref={this._nonStickyContent}
          className={isStickyTop || isStickyBottom ? this.props.stickyClassName : undefined}
          style={this._getContentStyles(isStickyTop || isStickyBottom)}
        >
          {this.props.children}
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
    if (this.nonStickyContent && this.root) {
      this.root.appendChild(this.nonStickyContent);
    }
  }

  public setDistanceFromTop(container: HTMLDivElement): void {
    this.distanceFromTop = this._getNonStickyDistanceFromTop(container);
  }

  private _getContentStyles(isSticky: boolean): React.CSSProperties {
    return {
      backgroundColor: this.props.stickyBackgroundColor || this._getBackground()
    };
  }

  private _getStickyContainerStyle(): React.CSSProperties {
    const { isScrollSynced } = this.props;
    return {
      overflow: isScrollSynced ? 'hidden' : 'auto'
    };
  }

  private _getStickyPlaceholderHeight(isSticky: boolean): React.CSSProperties {
    const height = this.nonStickyContent ? this.nonStickyContent.offsetHeight : 0;

    return {
      visibility: isSticky ? 'hidden' : 'visible',
      height: isSticky ? 0 : height
    };
  }

  private _getNonStickyPlaceholderHeight(): React.CSSProperties {
    const { isStickyTop, isStickyBottom } = this.state;
    if (isStickyTop || isStickyBottom) {
      const height = this.nonStickyContent ? this.nonStickyContent.offsetHeight : 0;
      return {
        height: height
      };
    } else {
      return {
        position: 'absolute'
      };
    }
  }

  private _onScrollEvent = (container: HTMLElement, footerStickyContainer: HTMLElement): void => {
    if (this.root && this.nonStickyContent) {
      this.distanceFromTop = this._getNonStickyDistanceFromTop(container);
      let isStickyTop = false;
      let isStickyBottom = false;

      if (this.props.isScrollSynced) {
        this._syncScroll(container);
      }

      if (this.canStickyTop) {
        const distanceToStickTop = this.distanceFromTop - this._getStickyDistanceFromTop();
        isStickyTop = distanceToStickTop < container.scrollTop;
      }

      // Can sticky bottom if the scrollablePane - total sticky footer height is smaller than the sticky's distance from the top of the pane
      if (this.canStickyBottom && container.clientHeight - footerStickyContainer.offsetHeight <= this.distanceFromTop) {
        isStickyBottom =
          this.distanceFromTop - container.scrollTop >
          this._getStickyDistanceFromTopForFooter(container, footerStickyContainer);
      }

      this.setState({
        isStickyTop: this.canStickyTop && isStickyTop,
        isStickyBottom: isStickyBottom
      });
    }
  };

  private _syncScroll = (container: HTMLElement): void => {
    if (this.root) {
      let scrollLeft = 0;
      let scrollTop = 0;
      let curr = this.root as HTMLElement;
      while (curr !== container) {
        scrollLeft += curr.scrollLeft;
        scrollTop += curr.scrollTop;
        curr = curr.parentElement as HTMLElement;
      }

      if (this.stickyContentTop) {
        this.stickyContentTop.scrollLeft = scrollLeft;
        this.stickyContentTop.scrollTop = scrollTop;
      }
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
    footerStickyVisibleContainer: HTMLElement
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
      while (currElem.offsetParent !== container) {
        distance += currElem.offsetTop;
        currElem = currElem.offsetParent as HTMLDivElement;
      }

      if (currElem.offsetParent === container) {
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
