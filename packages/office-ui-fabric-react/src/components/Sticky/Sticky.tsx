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
      addStickyHeader: (sticky: Sticky) => void;
      removeStickyHeader: (sticky: Sticky) => void;
      addStickyFooter: (sticky: Sticky) => void;
      removeStickyFooter: (sticky: Sticky) => void;
      notifySubscribers: (sort?: boolean) => void;
    }
  };

  public content: HTMLElement;
  public root = createRef<HTMLDivElement>();

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
    scrollablePane.subscribe(this._onScrollEvent);
    this.content = document.createElement('div');
    this.content.style.background = this.props.stickyBackgroundColor || this._getBackground();
    ReactDOM.render(<div>{ this.props.children }</div>, this.content);
    if (this.root.current) {
      this.root.current.appendChild(this.content);
    }
    this.context.scrollablePane.notifySubscribers(true);
  }

  public componentWillUnmount(): void {
    const { isStickyTop, isStickyBottom } = this.state;
    const { scrollablePane } = this.context;
    if (isStickyTop) {
      this._resetSticky(() => {
        scrollablePane.removeStickyHeader(this);
      });
    }
    if (isStickyBottom) {
      this._resetSticky(() => {
        scrollablePane.removeStickyFooter(this);
      });
    }
    scrollablePane.unsubscribe(this._onScrollEvent);
  }

  public componentDidUpdate(prevProps: IStickyProps, prevState: IStickyState): void {
    const { isStickyTop, isStickyBottom } = this.state;
    const { scrollablePane } = this.context;

    if (this.props.children !== prevProps.children) {
      ReactDOM.render(<div>{ this.props.children }</div>, this.content);
    }

    if (isStickyTop && !prevState.isStickyTop) {
      this._setSticky(() => {
        scrollablePane.addStickyHeader(this);
      });
    } else if (!isStickyTop && prevState.isStickyTop) {
      this._resetSticky(() => {
        scrollablePane.removeStickyHeader(this);
      });
    }

    if (isStickyBottom && !prevState.isStickyBottom) {
      this._setSticky(() => {
        scrollablePane.addStickyFooter(this);
      });
    } else if (!isStickyBottom && prevState.isStickyBottom) {
      this._resetSticky(() => {
        scrollablePane.removeStickyFooter(this);
      });
    }
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

    return (
      <div ref={ this.root }>
        <div style={ { height: (isSticky ? placeholderHeight : 0) } } />
      </div>
    );
  }

  private _onScrollEvent = (headerBound: ClientRect, footerBound: ClientRect): void => {
    if (!this.root.current) {
      return;
    }

    const { top, bottom } = this.root.current.getBoundingClientRect();
    const { isStickyTop, isStickyBottom } = this.state;
    const { stickyPosition } = this.props;
    const canStickyHeader = stickyPosition === StickyPositionType.Both || stickyPosition === StickyPositionType.Header;
    const canStickyFooter = stickyPosition === StickyPositionType.Both || stickyPosition === StickyPositionType.Footer;

    this.setState({
      isStickyTop: canStickyHeader && ((top <= headerBound.bottom) || (isStickyTop && bottom < headerBound.bottom)),
      isStickyBottom: canStickyFooter && ((bottom >= footerBound.top) || (isStickyBottom && top > footerBound.top))
    });
  }

  private _setSticky(callback: () => void): void {
    if (this.content.parentElement) {
      this.content.parentElement.removeChild(this.content);
    }
    callback();
  }

  private _resetSticky(callback: () => void): void {
    if (this.root.current) {
      this.root.current.appendChild(this.content);
    }

    setTimeout((): void => {
      if (this.props.stickyClassName) {
        this.content.children[0].classList.remove(this.props.stickyClassName);
      }
    }, 1);
    callback();
  }

  // Gets background of nearest parent element that has a declared background-color attribute
  private _getBackground(): string | null {
    if (!this.root.current) {
      return null;
    }

    let curr: HTMLElement = this.root.current;

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
