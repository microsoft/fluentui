/* tslint:disable:no-unused-variable */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
/* tslint:enable:no-unused-variable */

import * as PropTypes from 'prop-types';
import {
  BaseComponent,
  autobind
} from '../../Utilities';
import { ScrollablePane } from '../../ScrollablePane';
import { IStickyProps, StickyPositionType } from './Sticky.Props';
import * as stylesImport from './Sticky.scss';
const styles: any = stylesImport;

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

  public refs: {
    root: HTMLElement;
    placeholder: HTMLElement;
  };

  public context: {
    scrollablePane: {
      subscribe: (handler: Function) => void;
      addStickyHeader: (sticky: Sticky) => void;
      removeStickyHeader: (sticky: Sticky) => void;
      addStickyFooter: (sticky: Sticky) => void;
      removeStickyFooter: (sticky: Sticky) => void;
    }
  };

  public content: HTMLElement;

  constructor(props: IStickyProps) {
    super(props);
    this.state = {
      isStickyTop: false,
      isStickyBottom: false
    };
  }

  @autobind
  public componentDidMount() {
    if (!this.context.scrollablePane) {
      throw new TypeError('Expected Sticky to be mounted within ScrollablePane');
    }
    const { scrollablePane } = this.context;
    const { stickyClassName } = this.props;
    scrollablePane.subscribe(this._onScrollEvent);
    this.content = document.createElement('div');
    this.content.style.background = this._getBackground();
    ReactDOM.render(<div>{ this.props.children }</div>, this.content);
    this.refs.root.appendChild(this.content);
  }

  public componentDidUpdate(prevProps: IStickyProps, prevState: IStickyState) {
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
    } else if (isStickyBottom && !prevState.isStickyBottom) {
      this._setSticky(() => {
        scrollablePane.addStickyFooter(this);
      });
    } else if (!isStickyBottom && prevState.isStickyBottom) {
      this._resetSticky(() => {
        scrollablePane.removeStickyFooter(this);
      });
    }
  }

  public shouldComponentUpdate(nextProps: IStickyProps, nextState: IStickyState) {
    const { isStickyTop, isStickyBottom, placeholderHeight } = this.state;
    return isStickyTop !== nextState.isStickyTop ||
      isStickyBottom !== nextState.isStickyBottom ||
      placeholderHeight !== nextState.placeholderHeight ||
      this.props.children !== nextProps.children;
  }

  public setPlaceholderHeight(height: number) {
    this.setState({
      placeholderHeight: height
    });
  }

  public render() {
    const { isStickyTop, isStickyBottom, placeholderHeight } = this.state;
    const isSticky = isStickyTop || isStickyBottom;

    return (
      <div ref='root'>
        <div ref='placeholder' style={ { height: (isSticky ? placeholderHeight : 0) } } />
      </div>
    );
  }

  @autobind
  private _onScrollEvent(headerBound: ClientRect, footerBound: ClientRect) {
    const { top, bottom } = this.refs.root.getBoundingClientRect();
    const { isStickyTop, isStickyBottom } = this.state;
    const { stickyPosition } = this.props;
    const canStickyHeader = stickyPosition === StickyPositionType.Both || stickyPosition == StickyPositionType.Header;
    const canStickyFooter = stickyPosition === StickyPositionType.Both || stickyPosition == StickyPositionType.Footer;

    this.setState({
      isStickyTop: canStickyHeader && ((!isStickyTop && top <= headerBound.bottom) || (isStickyTop && bottom < headerBound.bottom)),
      isStickyBottom: canStickyFooter && ((!isStickyBottom && bottom >= footerBound.top) || (isStickyBottom && top > footerBound.top))
    });
  }
  private _setSticky(callback: () => void) {
    if (this.content.parentElement) {
      this.content.parentElement.removeChild(this.content);
    }
    callback();
  }

  private _resetSticky(callback: () => void) {
    this.refs.root.appendChild(this.content);
    setTimeout(() => {
      if (this.props.stickyClassName) {
        this.content.children[0].classList.remove(this.props.stickyClassName);
      }
    }, 1);
    callback();
  }

  // Gets background of nearest parent element that has a declared background-color attribute
  private _getBackground(): string {
    let curr = this.refs.root;
    while (window.getComputedStyle(curr).getPropertyValue('background-color') === 'rgba(0, 0, 0, 0)' ||
      window.getComputedStyle(curr).getPropertyValue('background-color') === 'transparent') {
      if (curr.parentElement) {
        curr = curr.parentElement;
      }
    }
    return window.getComputedStyle(curr).getPropertyValue('background-color');
  }
}
