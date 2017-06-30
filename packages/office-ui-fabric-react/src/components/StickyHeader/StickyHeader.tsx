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
import { IStickyHeaderProps } from './StickyHeader.Props';
import * as stylesImport from './StickyHeader.scss';
const styles: any = stylesImport;

export interface IStickyHeaderState {
  isSticky: boolean;
  topDistance?: number;
}

export class StickyHeader extends BaseComponent<IStickyHeaderProps, IStickyHeaderState> {
  public static contextTypes = {
    addStickyHeader: PropTypes.func,
    removeStickyHeader: PropTypes.func,
    addStickyFooter: PropTypes.func,
    subscribe: PropTypes.func
  };

  public refs: {
    root: HTMLElement;
    placeholder: HTMLElement;
  };

  public context: {
    subscribe: (handler: Function) => void;
    addStickyHeader: (sticky: StickyHeader) => void;
    removeStickyHeader: (sticky: StickyHeader) => void;
    addStickyFooter: Function;
  };

  private _offsetTop: number;

  constructor(props: IStickyHeaderProps) {
    super(props);
    this.state = {
      isSticky: false
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
  public handleScrollEvent(topScrollBound: number, topHeaderHeight: number, offsetTop: number) {
    const rootBounds: ClientRect = this.refs.root.getBoundingClientRect();
    const distanceFromSticky = rootBounds.top - topScrollBound;
    const topHeight = this.state.topDistance !== undefined ? this.state.topDistance : topHeaderHeight;
    const isSticky = distanceFromSticky <= topHeight;
    this._offsetTop = offsetTop;

    if (isSticky !== this.state.isSticky) {
      if (isSticky) {
        this.context.addStickyHeader(this);
      } else {
        this.context.removeStickyHeader(this);
      }
      this.setState({
        isSticky: isSticky
      });
    }
  }

  public setTopDistance(distance: number) {
    this.setState({
      topDistance: distance
    });
  }

  public render() {
    const { isSticky, topDistance } = this.state;
    const style = isSticky ?
      {
        top: `${this._offsetTop + topDistance}px`,
        width: `${this.refs.root.clientWidth}px`,
        background: this._getBackground()
      } : {};

    const placeholderStyle = isSticky ?
      {
        paddingBottom: `${this.refs.root.clientHeight}px`
      } : {};

    return (
      <div ref='root'>
        <div ref='placeholder' style={ placeholderStyle } />
        <div className={ css({
          [styles.isSticky]: isSticky
        }) } style={ style }>
          { this.props.children }
        </div>
      </div>
    );
  }

  private _getBackground(): string {
    let curr = this.refs.root;
    while (window.getComputedStyle(curr, null).getPropertyValue('background-color') === 'rgba(0, 0, 0, 0)') {
      curr = curr.parentElement;
    }
    return window.getComputedStyle(curr, null).getPropertyValue('background-color');
  }
}
