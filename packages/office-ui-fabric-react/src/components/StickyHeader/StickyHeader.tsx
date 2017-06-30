/* tslint:disable:no-unused-variable */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
/* tslint:enable:no-unused-variable */

import * as PropTypes from 'prop-types';
import {
  BaseComponent,
  autobind,
  getId
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
    subscribe: (handler: Function) => void;
    addStickyHeader: (id: string, height: number) => void;
    removeStickyHeader: (id: string, height: number) => void;
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
  private _stickyId: string;

  constructor(props: IStickyHeaderProps) {
    super(props);
    this.state = {
      isSticky: false
    };
    this._headerHeight = null;
    this._stickyId = getId('Sticky');
    console.log(this._stickyId);
  }

  @autobind
  public componentDidMount() {
    console.log('did mount');
    if (!this.context.subscribe) {
      debugger;
      throw new TypeError('Expected Sticky to be mounted within ScrollablePane');
    }

    this.context.subscribe(this.handleScrollEvent);
  }

  public componentWillMount() {
  }

  @autobind
  public handleScrollEvent(topScrollBound: number, scrollDistance: number, topHeaderHeight: number) {
    const rootBounds: ClientRect = this.refs.root.getBoundingClientRect();
    const distanceFromSticky = rootBounds.top - topScrollBound;
    console.log('distance from top', distanceFromSticky);
    console.log('scrolling', rootBounds.top, 'distance', distanceFromSticky, 'topboundheight', this.context.topBound);
    console.log('OOFFSET TOP', this.refs.root.offsetTop, 'scrolldistance', scrollDistance, 'header height', topHeaderHeight, this._headerHeight);
    const topHeight = this._headerHeight !== null ? this._headerHeight : topHeaderHeight;
    console.log(topHeight);
    const isSticky = (distanceFromSticky <= topHeight);

    this.setState({
      distanceFromSticky: distanceFromSticky,
      isSticky: isSticky
    });

    if (isSticky) {
      if (this._headerHeight === null) {
        debugger;
        this._headerHeight = topHeaderHeight;
        this._offsetTop = this.context.scrollContainer.offsetTop;
      }
      this.context.addStickyHeader(this._stickyId, this.refs.root.clientHeight);
    } else {
      this.context.removeStickyHeader(this._stickyId, this.refs.root.clientHeight);
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
  }

  public render() {
    const { isSticky, topPosition } = this.state;
    const style = isSticky
      ? {
        position: 'fixed',
        top: `${this._offsetTop + this._headerHeight}px`,
        width: `${this.refs.root.clientWidth}px`,
        transform: 'translateZ(0)',
        background: this._getBackground(),
        zIndex: 1
      } : {};

    if (isSticky) {
      console.log('DEBUG THIS', this._offsetTop, this._headerHeight);
    }
    const placeholderStyle = isSticky ? {
      paddingBottom: `${this.refs.root.clientHeight}px`
    } : {};

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
    let curr = this.refs.root;
    while (window.getComputedStyle(curr, null).getPropertyValue('background-color') === 'rgba(0, 0, 0, 0)') {
      curr = curr.parentElement;
    }
    console.log('background', curr, window.getComputedStyle(curr, null).getPropertyValue('background-color'));
    return window.getComputedStyle(curr, null).getPropertyValue('background-color');
  }
}
