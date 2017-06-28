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
import { IStickyHeaderProps } from './StickyHeader.Props';
import * as stylesImport from './StickyHeader.scss';
const styles: any = stylesImport;

export interface IStickyHeaderState {
  isSticky: boolean;
  topPosition?: number;
  distanceFromSticky?: number;
}

export class StickyHeader extends BaseComponent<IStickyHeaderProps, IStickyHeaderState> {

  public refs: {
    root: HTMLElement;
    placeholder: HTMLElement;
  };

  public static contextTypes = {
    addStickyHeader: PropTypes.func,
    removeStickyHeader: PropTypes.func,
    addStickyFooter: PropTypes.func,
    scrollContainer: PropTypes.element,
    topBound: PropTypes.number,
    bottomBound: PropTypes.number,
    subscribe: PropTypes.func
  };

  public context: {
    subscribe: Function;
    addStickyHeader: Function;
    removeStickyHeader: Function;
    addStickyFooter: Function;
    scrollContainer: HTMLElement;
    topBound: number;
    bottomBound: number;
  };

  private _scrollablePane: ScrollablePane;
  private _scrollPaneElement: HTMLElement;
  private _stickyDistance: number;
  private _headerHeight: number;
  private _offsetTop: number;

  constructor(props: IStickyHeaderProps) {
    super(props);
    this.state = {
      isSticky: false
    };
    this._headerHeight = null;
  }

  @autobind
  public componentDidMount() {
    console.log('did mount');
    if (this.context.scrollContainer) {
      this._checkBounds();
    }
    if (!this.context.subscribe) {
      debugger;
      throw new TypeError('Expected Sticky to be mounted within ScrollablePane');
    }

    this.context.subscribe(this.handleScrollEvent);

    // this.refs.placeholder.style.position = 'absolute';
    // this.refs.placeholder.style.top = `${this.refs.placeholder.offsetTop}px`;
  }

  public componentWillMount() {
  }

  @autobind
  public handleScrollEvent(topScrollBound, scrollDistance, topHeaderHeight) {
    const rootBounds: ClientRect = this.refs.root.getBoundingClientRect();
    const distanceFromSticky = rootBounds.top - topScrollBound;
    console.log('distance from top', distanceFromSticky);
    console.log('scrolling', rootBounds.top, 'distance', distanceFromSticky, 'topboundheight', this.context.topBound);
    console.log('OOFFSET TOP', this.refs.root.offsetTop, 'scrolldistance', scrollDistance, 'header height', topHeaderHeight, this._headerHeight);
    const topHeight = this._headerHeight !== null ? this._headerHeight : topHeaderHeight;
    console.log(topHeight);
    // const isSticky = (scrollDistance + topHeight > this.refs.root.offsetTop);
    const isSticky = (distanceFromSticky <= topHeight);

    this.setState({
      distanceFromSticky: distanceFromSticky,
      isSticky: isSticky
    });

    if (isSticky) {
      if (this._headerHeight === null) {
        this._headerHeight = topHeaderHeight;
        this._offsetTop = this.context.scrollContainer.offsetTop;
      }
      this.context.addStickyHeader(this);
    } else {
      this.context.removeStickyHeader(this);
    }
  }

  @autobind
  public componentWillReceiveProps(newProps: IStickyHeaderProps) {
    console.log('receive props', this, newProps.children, this.props.children);
    console.log('current props', this.props.children);
    if (this.props.children !== newProps.children) {
      debugger;
      this.forceUpdate();
    }
  }

  public componentDidUpdate(prevProps: IStickyHeaderProps, prevState: IStickyHeaderState) {
    // console.log('update', this.context);
    this._checkBounds();
  }

  public render() {
    const { isSticky, topPosition } = this.state;
    const style = isSticky
      ? {
        // position: 'fixed',
        // top: `${this._offsetTop + this._headerHeight}px`,
        // width: `${this.refs.root.clientWidth}px`,
        // transform: 'translateZ(0)',
        // background: this._getBackground(),
        // zIndex: 1
      } : {};

    const placeholderStyle = isSticky ? {
      // paddingBottom: `${this.refs.root.clientHeight}px`
    } : {};

    console.log('offsettop', this._offsetTop);

    return (
      <div ref='root'>
        <div ref='placeholder' style={ placeholderStyle } />
        <div className={ styles.root } style={ style }>
          { this.props.children }
        </div>
      </div>
    );
  }

  public setSticky(position: number) {
    this.setState({
      isSticky: true,
      topPosition: position
    });
  }

  public setNotSticky() {
    this.setState({
      isSticky: false,
      topPosition: null
    });
  }

  private _getBackground(): string {
    debugger;
    let curr = this.refs.root;
    while (window.getComputedStyle(curr, null).getPropertyValue('background-color') === 'rgba(0, 0, 0, 0)') {
      curr = curr.parentElement;
    }
    console.log('background', curr, window.getComputedStyle(curr, null).getPropertyValue('background-color'));
    return window.getComputedStyle(curr, null).getPropertyValue('background-color');
  }

  private _checkBounds() {
    // const rootBounds: ClientRect = this.refs.root.getBoundingClientRect();
    // const { isSticky } = this.state;
    // // console.log('scrolltop', this.context.scrollContainer.scrollTop);

    // // console.log(rootBounds.top, this.context.topBound)
    // if (rootBounds.top < this.context.topBound && !isSticky) {
    //   if (this._stickyDistance === undefined) {
    //     // debugger;
    //     this._stickyDistance = this.context.scrollContainer.scrollTop;
    //     console.log(this._stickyDistance);
    //   }
    //   // this.context.addStickyHeader(this);
    // }

    // else if (rootBounds.bottom >= this.context.topBound && rootBounds.top <= this.context.bottomBound) {
    //   debugger;
    // } else {
    //   this.context.addStickyFooter(this);
    // }

    // if (rootBounds.top > this.context.topBound - this.refs.root.clientHeight && !!isSticky) {
    //   debugger;
    //   console.log(rootBounds.top, this.context.topBound);
    // }
    // else if (rootBounds.bottom > this.context.topBound &&
    //   rootBounds.top < this.context.topBound &&
    //   isSticky) {
    //   debugger;
    //   this.context.removeStickyHeader(this);
    // }
  }
}
