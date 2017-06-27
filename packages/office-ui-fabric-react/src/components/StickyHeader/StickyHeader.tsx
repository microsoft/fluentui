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

    this.refs.placeholder.style.position = 'absolute';
    this.refs.placeholder.style.top = `${this.refs.placeholder.offsetTop}px`;
  }

  public componentWillMount() {
  }

  @autobind
  public handleScrollEvent(topScrollBound, scrollDistance, topHeaderHeight) {
    const rootBounds: ClientRect = this.refs.root.getBoundingClientRect();
    const distanceFromSticky = rootBounds.top - topScrollBound;
    console.log('distance from top', distanceFromSticky);
    // console.log('scrolling', rootBounds.top, topBound, 'distance', distanceFromSticky, 'topboundheight', this.context.topBound);
    // console.log('OOFFSET TOP', this.refs.root.offsetTop, 'scrolldistance', scrollDistance, 'header height', topHeaderHeight, this._headerHeight);
    const topHeight = this._headerHeight !== null ? this._headerHeight : topHeaderHeight;
    console.log(topHeight);
    const isSticky = (scrollDistance + topHeight > this.refs.root.offsetTop);

    this.setState({
      distanceFromSticky: distanceFromSticky,
      isSticky: isSticky
    });

    if (isSticky) {
      if (this._headerHeight === null) {
        this._headerHeight = topHeaderHeight;
      }
      this.context.addStickyHeader(this);
    } else {
      this.context.removeStickyHeader(this);
    }
  }

  @autobind
  public componentWillReceiveProps(newProps: IStickyHeaderProps) {
    // console.log('receive props', this, newProps, this.props);
  }

  public componentDidUpdate(prevProps: IStickyHeaderProps, prevState: IStickyHeaderState) {
    // console.log('update', this.context);
    this._checkBounds();
  }

  public render() {
    const { isSticky, topPosition } = this.state;
    const style = isSticky
      ? {
      } : {};

    return (
      <div ref='root'>
        <div ref='placeholder' />
        <div style={ style }>
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

  private _checkBounds() {
    const rootBounds: ClientRect = this.refs.root.getBoundingClientRect();
    const { isSticky } = this.state;
    // console.log('scrolltop', this.context.scrollContainer.scrollTop);

    // console.log(rootBounds.top, this.context.topBound)
    if (rootBounds.top < this.context.topBound && !isSticky) {
      if (this._stickyDistance === undefined) {
        // debugger;
        this._stickyDistance = this.context.scrollContainer.scrollTop;
        console.log(this._stickyDistance);
      }
      // this.context.addStickyHeader(this);
    }

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
