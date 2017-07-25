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
import { IStickyProps } from './Sticky.Props';
import * as stylesImport from './Sticky.scss';
const styles: any = stylesImport;

export interface IStickyState {
  isStickyTop: boolean;
  isStickyBottom: boolean;
  placeholderHeight?: number;
}

export class Sticky extends BaseComponent<IStickyProps, IStickyState> {
  public static contextTypes = {
    addStickyHeader: PropTypes.func,
    removeStickyHeader: PropTypes.func,
    addStickyFooter: PropTypes.func,
    removeStickyFooter: PropTypes.func,
    subscribe: PropTypes.func
  };

  public refs: {
    root: HTMLElement;
    placeholder: HTMLElement;
  };

  public context: {
    subscribe: (handler: Function) => void;
    addStickyHeader: (sticky: Sticky) => void;
    removeStickyHeader: (sticky: Sticky) => void;
    addStickyFooter: (sticky: Sticky) => void;
    removeStickyFooter: (sticky: Sticky) => void;
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
    if (!this.context.subscribe) {
      throw new TypeError('Expected Sticky to be mounted within ScrollablePane');
    }
    const { stickyClassName } = this.props;
    this.context.subscribe(this._onScrollEvent);
    this.content = document.createElement('div');
    this.content.style.background = this._getBackground();
    ReactDOM.render(<div>{ this.props.children }</div>, this.content);
    this.refs.root.appendChild(this.content);
  }

  public componentDidUpdate(prevProps: IStickyProps, prevState: IStickyState) {
    if (this.state.isStickyTop && !prevState.isStickyTop) {
      this._setSticky(() => {
        this.context.addStickyHeader(this);
      });
    } else if (!this.state.isStickyTop && prevState.isStickyTop) {
      this._resetSticky(() => {
        this.context.removeStickyHeader(this);
      });
    } else if (this.state.isStickyBottom && !prevState.isStickyBottom) {
      this._setSticky(() => {
        this.context.addStickyFooter(this);
      });
    } else if (!this.state.isStickyBottom && prevState.isStickyBottom) {
      this._resetSticky(() => {
        this.context.removeStickyFooter(this);
      });
    }
  }

  public setPlaceholderHeight(height: number) {
    this.setState({
      placeholderHeight: height
    });
  }

  public render() {
    const { isStickyTop, isStickyBottom, placeholderHeight } = this.state;
    const { stickyClassName } = this.props;
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

    this.setState({
      isStickyTop: (!isStickyTop && top <= headerBound.bottom) || (isStickyTop && bottom < headerBound.bottom),
      isStickyBottom: (!isStickyBottom && bottom >= footerBound.top) || (isStickyBottom && top > footerBound.top)
    });
  }
  private _setSticky(callback: () => void) {
    this.content.parentElement.removeChild(this.content);
    callback();
  }

  private _resetSticky(callback: () => void) {
    this.refs.root.appendChild(this.content);
    setTimeout(() => {
      this.content.children[0].classList.remove(this.props.stickyClassName);
    }, 1);
    callback();
  }

  // Gets background of nearest parent element that has a declared background-color attribute
  private _getBackground(): string {
    let curr = this.refs.root;
    while (window.getComputedStyle(curr, null).getPropertyValue('background-color') === 'rgba(0, 0, 0, 0)' ||
      window.getComputedStyle(curr, null).getPropertyValue('background-color') === 'transparent') {
      curr = curr.parentElement;
    }
    return window.getComputedStyle(curr, null).getPropertyValue('background-color');
  }
}
