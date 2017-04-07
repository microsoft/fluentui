import * as React from 'react';
import {
  css,
  autobind,
  BaseComponent,
  assign
} from '../../Utilities';
import { IOverflowResizerProps } from './OverflowResizer.Props';
import { OverflowSet } from './OverflowSet';
import { IContextualMenuProps } from '../../ContextualMenu';
import styles = require('./OverflowResizer.scss');

export interface IOverflowResizerState {
  renderedItems: any[];
  renderedOverflowItems: IContextualMenuProps[];
  shouldMeasure: boolean;
}

export class OverflowResizer extends BaseComponent<IOverflowResizerProps, IOverflowResizerState> {

  private _root: HTMLElement;
  private _measured: HTMLElement;

  public static defaultProps = {
    items: []
  };

  constructor(props: IOverflowResizerProps) {
    super(props);
    this.state = {
      shouldMeasure: true,
      renderedItems: [],
      renderedOverflowItems: []
    };
  }

  public componentDidMount() {
    this._measureItems();
    this._events.on(window, 'resize', this._onResize);
  }

  public render() {
    let { items, onOverflow, overflowSetProps } = this.props;
    let { shouldMeasure, renderedItems, renderedOverflowItems } = this.state;
    return (
      <div ref={ this._resolveRef('_root') }>
        { shouldMeasure && (
          <div className={ css(styles.measured) } ref={ this._resolveRef('_measured') }>
            <OverflowSet
              { ...assign(overflowSetProps, { items: items }) }
            />
          </div>
        ) }

        <OverflowSet
          { ...assign(overflowSetProps, { items: renderedItems, overflowItems: renderedOverflowItems }) }
        />
      </div>

    );
  }

  public componentDidUpdate(prevProps: IOverflowResizerProps) {
    this._measureItems();
  }

  protected _onResize() {
    this.setState({ shouldMeasure: true });
  }

  private _measureItems() {
    let { items } = this.props;
    let { shouldMeasure } = this.state;

    if (shouldMeasure && items && items.length > 0) {
      let container = this._root.getBoundingClientRect();
      let measured = this._measured.getBoundingClientRect();
      let renderedItems = this.props.items;
      let renderedOverflowItems = null;
      if (container.width > measured.width) {
        this.setState({ renderedItems, renderedOverflowItems, shouldMeasure: false });
      } else {
        // while (measured.width > container.width) {
        //   let foo = this.props.onOverflow(renderedItems) {
        //     return {items, overflow };
        // }
        // this.setState({

        // });
      }
    }
  }
}

