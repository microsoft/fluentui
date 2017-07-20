/* tslint:disable:no-unused-variable */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
/* tslint:enable:no-unused-variable */

import * as PropTypes from 'prop-types';
import {
  css,
  BaseComponent,
  autobind
} from '../../Utilities';
import { ScrollablePane } from '../../ScrollablePane';
import { IStickyProps } from './Sticky.Props';
import { IStyle } from '../../Styling';
import * as stylesImport from './Sticky.scss';
const styles: any = stylesImport;

export interface IStickyState {
  isStickyTop: boolean;
  isStickyBottom: boolean;
  topDistance?: number;
  bottomDistance?: number;
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
    sticky: HTMLElement;
  };

  public context: {
    subscribe: (handler: Function) => void;
    addStickyHeader: (sticky: Sticky) => void;
    removeStickyHeader: (sticky: Sticky) => void;
    addStickyFooter: (sticky: Sticky) => void;
    removeStickyFooter: (sticky: Sticky) => void;
  };

  private _offsetTop: number;
  private _offsetBottom: number;
  private _scrollContainerHeight: number;

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
    this.context.subscribe(this.handleScrollEvent);
  }

  @autobind
  public handleScrollEvent(
    topScrollBound: number,
    topHeaderHeight: number,
    offsetTop: number,
    bottomScrollBound: number,
    bottomFooterHeight: number,
    scrollContainerHeight: number
    ) {
    const rootBounds: ClientRect = this.refs.root.getBoundingClientRect();
    const distanceFromStickyTop = rootBounds.top - topScrollBound;
    const distanceFromStickyBottom = rootBounds.bottom - bottomScrollBound;
    const topHeight = this.state.topDistance !== undefined ? this.state.topDistance : topHeaderHeight;
    const bottomHeight = this.state.bottomDistance !== undefined ? this.state.bottomDistance : bottomFooterHeight;

    const setStickyTop = distanceFromStickyTop <= topHeight;
    const setStickyBottom = distanceFromStickyBottom >= -bottomHeight;
    this._offsetTop = offsetTop;
    this._offsetBottom = offsetTop + scrollContainerHeight;
    this._scrollContainerHeight = scrollContainerHeight;
    if (setStickyTop !== this.state.isStickyTop || setStickyBottom !== this.state.isStickyBottom) {
      this.setState({
        isStickyTop: setStickyTop,
        isStickyBottom: setStickyBottom
      }, () => {
        if (setStickyTop) {
          this.context.addStickyHeader(this);
        } else {
          this.context.removeStickyHeader(this);
        }
        if (setStickyBottom) {
          this.context.addStickyFooter(this);
        } else {
          this.context.removeStickyFooter(this);
        }
      });
    }

  }

  public setTopDistance(distance: number) {
    this.setState({
      topDistance: distance
    });
  }

  public setBottomDistance(distance: number) {
    this.setState({
      bottomDistance: distance
    });
  }

  public render() {
    const { isStickyTop, isStickyBottom, topDistance, bottomDistance } = this.state;
    const { stickyClassName } = this.props;
    const isSticky = isStickyTop || isStickyBottom;
    const isEdge = navigator.userAgent.toLowerCase().indexOf('edge') > -1;

    let style: IStyle;
    if (isSticky) {
      const top = isStickyTop ?
        (isEdge ?
          topDistance :
          this._offsetTop + topDistance) :
        (isEdge ?
          this._scrollContainerHeight - bottomDistance - this.refs.root.clientHeight :
          this._offsetBottom - this.refs.root.clientHeight - bottomDistance);
      style = {
        top: `${top}px`,
        width: `${this.refs.root.clientWidth}px`,
        background: this._getBackground()
      };
    }

    const placeholderStyle: IStyle = isSticky ?
      {
        paddingBottom: `${this.refs.sticky.clientHeight}px`
      } : {};

    return (
      <div ref='root'>
        <div ref='placeholder' style={ placeholderStyle } />
        <div ref='sticky' className={ css({
          [styles.isSticky]: isSticky,
          [stickyClassName]: isSticky && stickyClassName
        }) } style={ style }>
          { this.props.children }
        </div>
      </div>
    );
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
