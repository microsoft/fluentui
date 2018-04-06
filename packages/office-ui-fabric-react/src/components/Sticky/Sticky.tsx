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
  placeholderHeight?: number;
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
      updateStickyRefHeights: () => void;
      notifySubscribers: (sort?: boolean) => void;
    }
  };

  public root = createRef<HTMLDivElement>();
  public stickyContentTop = createRef<HTMLDivElement>();
  public stickyContentBottom = createRef<HTMLDivElement>();
  public nonStickyContent = createRef<HTMLDivElement>();

  constructor(props: IStickyProps) {
    super(props);
    this.state = {
      isStickyTop: false,
      isStickyBottom: false
    };
  }

  public componentDidMount(): void {
    if (!this.context.scrollablePane) {
      throw new TypeError('Expected Sticky to be mounted within ScrollablePane');
    }
    const { scrollablePane } = this.context;
    scrollablePane.subscribe(this._onScrollEvent2);
    scrollablePane.addSticky(this);


    this.context.scrollablePane.notifySubscribers(true);
  }

  public componentWillUnmount(): void {
    const { isStickyTop, isStickyBottom } = this.state;
    const { scrollablePane } = this.context;
    scrollablePane.unsubscribe(this._onScrollEvent2);
  }

  public componentDidUpdate(prevProps: IStickyProps, prevState: IStickyState): void {
    const { isStickyTop, isStickyBottom } = this.state;
    const { scrollablePane } = this.context;

  }

  public shouldComponentUpdate(nextProps: IStickyProps, nextState: IStickyState): boolean {
    const { isStickyTop, isStickyBottom, placeholderHeight } = this.state;
    return isStickyTop !== nextState.isStickyTop ||
      isStickyBottom !== nextState.isStickyBottom ||
      placeholderHeight !== nextState.placeholderHeight ||
      this.props.children !== nextProps.children;
  }

  public setPlaceholderHeight(height: number): void {
    this.setState({
      placeholderHeight: height
    });
  }

  public render(): JSX.Element {
    const { isStickyTop, isStickyBottom, placeholderHeight } = this.state;
    const isSticky = isStickyTop || isStickyBottom;

    let isStickyStyleTop = {};
    if (isStickyTop) {
      isStickyStyleTop = {
        opacity: '1'
      };
    } else {
      isStickyStyleTop = {
        opacity: '0'
      };
    }

    let isStickyStyleBottom = {};
    if (isStickyBottom) {
      isStickyStyleBottom = {
        opacity: '1'
      };
    } else {
      isStickyStyleBottom = {
        opacity: '0'
      };
    }

    return (
      <div ref={ this.root }>
        <div ref={ this.stickyContentTop }
          style={ isStickyStyleTop }
        >
          { this.props.children }
        </div>
        <div ref={ this.stickyContentBottom }
          style={ isStickyStyleBottom }
        >
          { this.props.children }
        </div>
        <div ref={ this.nonStickyContent }>
          { this.props.children }
        </div>
      </div>
    );
  }

  private _onScrollEvent2 = (container: HTMLElement, bottomStickyContainer: HTMLElement, footerStickyVisible: HTMLElement): void => {
    const { scrollablePane } = this.context;

    if (container && this.root.value && this.nonStickyContent.value && this.stickyContentBottom.value) {
      const distanceFromTop = this._getNonStickyDistanceFromTop(container);

      const stickyDistanceFromTop = this._getStickyDistanceFromTop();
      let distanceToStickTop = distanceFromTop - stickyDistanceFromTop;
      if (container.scrollTop <= distanceToStickTop) {
        this.setState({
          isStickyTop: false
        });
      } else {
        this.setState({
          isStickyTop: true
        });
      }

      // Can sticky bottom if the scrollablePane height is smaller than the sticky's distance from the top of the pane
      if (container.clientHeight <= distanceFromTop) {
        if (distanceFromTop - container.scrollTop > this._getStickyDistanceFromTopForFooter(container, footerStickyVisible)) {
          this.setState({
            isStickyBottom: true
          });
        } else {
          this.setState({
            isStickyBottom: false
          });
        }
      }

      scrollablePane.updateStickyRefHeights();
    }
  }

  private _getStickyDistanceFromTop = (): number => {
    let distance: number = 0;
    if (this.stickyContentTop.value) {
      distance = this.stickyContentTop.value.offsetTop;
    }

    return distance;
  }

  private _getStickyDistanceFromTopForFooter = (container: HTMLElement, footerStickyVisibleContainer: HTMLElement): number => {
    let distance: number = 0;
    if (this.stickyContentBottom.value) {
      distance = container.clientHeight - footerStickyVisibleContainer.offsetHeight + this.stickyContentBottom.value.offsetTop;
    }

    return distance;
  }

  private _getNonStickyDistanceFromTop = (container: HTMLElement): number => {
    let distance: number = 0;
    let currElem = this.root.value;

    if (currElem) {
      if (currElem.offsetParent === container) {
        return currElem.offsetTop;
      }

      if (currElem.offsetParent) {
        do {
          distance += currElem.offsetTop;
          if (currElem) {
            currElem = currElem.offsetParent as HTMLDivElement;
          }
        } while (currElem && currElem.offsetParent !== container)
      }
    }
    return distance;
  }

  // Gets background of nearest parent element that has a declared background-color attribute
  private _getBackground(): string | null {
    if (!this.root.value) {
      return null;
    }

    let curr: HTMLElement = this.root.value;

    while (window.getComputedStyle(curr).getPropertyValue('background-color') === 'rgba(0, 0, 0, 0)' ||
      window.getComputedStyle(curr).getPropertyValue('background-color') === 'transparent') {
      if (curr.tagName === 'HTML') {
        // Fallback color if no element has a declared background-color attribute
        return null;
      }
      if (curr.parentElement) {
        curr = curr.parentElement;
      }
    }
    return window.getComputedStyle(curr).getPropertyValue('background-color');
  }
}
