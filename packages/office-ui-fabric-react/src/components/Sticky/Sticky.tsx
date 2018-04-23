/* tslint:disable:no-unused-variable */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
/* tslint:enable:no-unused-variable */

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
    stickyPosition: StickyPositionType.Both
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
    }
  };

  public root = createRef<HTMLDivElement>();
  public stickyContentTop = createRef<HTMLDivElement>();
  public stickyContentBottom = createRef<HTMLDivElement>();
  public nonStickyContent = createRef<HTMLDivElement>();
  public distanceFromTop: number;

  constructor(props: IStickyProps) {
    super(props);
    this.state = {
      isStickyTop: false,
      isStickyBottom: false
    };
    this.distanceFromTop = 0;
  }

  public get canStickyTop(): boolean {
    return this.props.stickyPosition === StickyPositionType.Both || this.props.stickyPosition === StickyPositionType.Header;
  }

  public get canStickyBottom(): boolean {
    return this.props.stickyPosition === StickyPositionType.Both || this.props.stickyPosition === StickyPositionType.Footer;
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
    return isStickyTop !== nextState.isStickyTop ||
      isStickyBottom !== nextState.isStickyBottom ||
      this.props.stickyPosition !== nextProps.stickyPosition ||
      this.props.children !== nextProps.children;
  }

  public render(): JSX.Element {
    const { isStickyTop, isStickyBottom } = this.state;

    return (
      <div ref={ this.root }>
        {
          this.canStickyTop &&
          <div
            className={ this.props.stickyClassName }
            ref={ this.stickyContentTop }
            aria-hidden={ !isStickyTop }
          >
            <div style={ this._getStickyPlaceholderHeight(isStickyTop) } />
          </div>
        }
        {
          this.canStickyBottom &&
          <div
            className={ this.props.stickyClassName }
            ref={ this.stickyContentBottom }
            aria-hidden={ !isStickyBottom }
          >
            <div style={ this._getStickyPlaceholderHeight(isStickyBottom) } />
          </div>
        }
        <div style={ this._getNonStickyPlaceholderHeight() }
        />
        <div
          ref={ this.nonStickyContent }
          className={ isStickyTop || isStickyBottom ? this.props.stickyClassName : undefined }
          style={ this._getContentStyles() }
        >
          { this.props.children }
        </div>
      </div>
    );
  }

  public addSticky(stickyContent: HTMLDivElement): void {
    if (this.nonStickyContent.current) {
      stickyContent.appendChild(this.nonStickyContent.current);
    }
  }

  public resetSticky(): void {
    if (this.nonStickyContent.current && this.root.current) {
      this.root.current.appendChild(this.nonStickyContent.current);
    }
  }

  public setDistanceFromTop(container: HTMLDivElement): void {
    this.distanceFromTop = this._getNonStickyDistanceFromTop(container);
  }

  private _getContentStyles(): React.CSSProperties {
    return {
      backgroundColor: this.props.stickyBackgroundColor || this._getBackground()
    }
  }

  private _getStickyPlaceholderHeight(isSticky: boolean): React.CSSProperties {
    const height = this.nonStickyContent.current ? this.nonStickyContent.current.offsetHeight : 0;

    return {
      visibility: isSticky ? 'hidden' : 'visible',
      height: isSticky ? 0 : height
    };
  }

  private _getNonStickyPlaceholderHeight(): React.CSSProperties {
    const { isStickyTop, isStickyBottom, } = this.state;
    const height = this.nonStickyContent.current ? this.nonStickyContent.current.offsetHeight : 0;

    return {
      display: isStickyTop || isStickyBottom ? 'block' : 'none',
      height: height
    };
  }

  private _onScrollEvent = (container: HTMLElement, footerStickyContainer: HTMLElement): void => {
    const { scrollablePane } = this.context;

    if (this.root.current && this.nonStickyContent.current) {
      this.distanceFromTop = this._getNonStickyDistanceFromTop(container);
      let isStickyTop = false;
      let isStickyBottom = false;

      if (this.canStickyTop) {
        const distanceToStickTop = this.distanceFromTop - this._getStickyDistanceFromTop();
        isStickyTop = distanceToStickTop <= container.scrollTop;
      }

      // Can sticky bottom if the scrollablePane - total sticky footer height is smaller than the sticky's distance from the top of the pane
      if (this.canStickyBottom && container.clientHeight - footerStickyContainer.offsetHeight <= this.distanceFromTop) {
        isStickyBottom = this.distanceFromTop - container.scrollTop > this._getStickyDistanceFromTopForFooter(container, footerStickyContainer);
      }

      this.setState({
        isStickyTop: this.canStickyTop && isStickyTop,
        isStickyBottom: isStickyBottom
      });
    }
  }

  private _getStickyDistanceFromTop = (): number => {
    let distance = 0;
    if (this.stickyContentTop.current) {
      distance = this.stickyContentTop.current.offsetTop;
    }

    return distance;
  }

  private _getStickyDistanceFromTopForFooter = (container: HTMLElement, footerStickyVisibleContainer: HTMLElement): number => {
    let distance = 0;
    if (this.stickyContentBottom.current) {
      distance = container.clientHeight - footerStickyVisibleContainer.offsetHeight + this.stickyContentBottom.current.offsetTop;
    }

<<<<<<< HEAD
    return distance;
  }

  private _getNonStickyDistanceFromTop = (container: HTMLElement): number => {
    let distance = 0;
    let currElem = this.root.current;

    if (currElem) {
      while (currElem.offsetParent !== container) {
        distance += currElem.offsetTop;
        currElem = currElem.offsetParent as HTMLDivElement;
=======
    setTimeout((): void => {
      if (this.props.stickyClassName) {
        this.content.children[0].classList.remove(this.props.stickyClassName);
>>>>>>> 57d14eb7535d07348628c034bff03646c0851bd2
      }

      if (currElem.offsetParent === container) {
        distance += currElem.offsetTop;
      }
    }
    return distance;
  }

  // Gets background of nearest parent element that has a declared background-color attribute
  private _getBackground(): string | undefined {
    if (!this.root.current) {
      return undefined;
    }

    let curr: HTMLElement = this.root.current;

    while (window.getComputedStyle(curr).getPropertyValue('background-color') === 'rgba(0, 0, 0, 0)' ||
      window.getComputedStyle(curr).getPropertyValue('background-color') === 'transparent') {
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
