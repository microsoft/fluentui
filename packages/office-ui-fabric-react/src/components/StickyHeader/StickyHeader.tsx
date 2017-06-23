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
}

export class StickyHeader extends BaseComponent<IStickyHeaderProps, IStickyHeaderState> {

  public refs: {
    root: HTMLElement;
  };

  public static contextTypes = {
    addStickyHeader: PropTypes.func,
    removeStickyHeader: PropTypes.func,
    addStickyFooter: PropTypes.func,
    scrollContainer: PropTypes.element,
    topBound: PropTypes.number,
    bottomBound: PropTypes.number
  };

  public context: {
    addStickyHeader: Function;
    removeStickyHeader: Function;
    addStickyFooter: Function;
    scrollContainer: HTMLElement;
    topBound: number;
    bottomBound: number;
  };

  private _scrollablePane: ScrollablePane;
  private _scrollPaneElement: HTMLElement;

  constructor(props: IStickyHeaderProps) {
    super(props);
    this.state = {
      isSticky: false
    };
  }

  @autobind
  public componentDidMount() {
    console.log('did mount');
    if (this.context.scrollContainer) {
      this._checkBounds();
    }
  }

  @autobind
  public componentWillReceiveProps(newProps: IStickyHeaderProps) {
    console.log('receive props', this, newProps, this.props);
  }

  public componentDidUpdate(prevProps: IStickyHeaderProps, prevState: IStickyHeaderState) {
    console.log('update', this.context);
    this._checkBounds();
    // this._async.setTimeout(() => {
    // }, 0);
  }

  public render() {
    return (
      <div ref='root'>
        { this.props.children }
      </div>
    );
  }

  public setSticky() {
    this.setState({
      isSticky: true
    });
  }

  public setNotSticky() {
    this.setState({
      isSticky: false
    });
  }

  private _checkBounds() {
    const rootBounds: ClientRect = this.refs.root.getBoundingClientRect();
    const { isSticky } = this.state;
    if (rootBounds.top < this.context.topBound && !isSticky) {
      this.context.addStickyHeader(this);
    } else if (rootBounds.bottom >= this.context.topBound && rootBounds.top <= this.context.bottomBound) {
      debugger;
    } else {
      this.context.addStickyFooter(this);
    }

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
