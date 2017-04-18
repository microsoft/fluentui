import * as React from 'react';
import {
  css,
  BaseComponent
} from '../../Utilities';
import { IResizeGroupProps } from './ResizeGroup.Props';
import styles = require('./ResizeGroup.scss');

export interface IResizeGroupState {
  renderedItems?: any[];
  measuredItems: any[];
  shouldMeasure?: boolean;
}

export interface IOverFlowItemState {
  [index: number]: any;
}

export class ResizeGroup<T> extends BaseComponent<IResizeGroupProps, IResizeGroupState> {

  private _root: HTMLElement;
  private _measured: HTMLElement;

  constructor(props: IResizeGroupProps) {
    super(props);
    this.state = {
      shouldMeasure: true,
      renderedItems: [],
      measuredItems: this.props.items.concat([]),
    };
  }

  public componentDidMount() {
    this._measureItems();
    this._events.on(window, 'resize', this._onResize);
  }

  public render() {
    let { onRenderItems, onReduceItems, items } = this.props;
    let { shouldMeasure, renderedItems, measuredItems } = this.state;
    return (
      <div ref={ this._resolveRef('_root') }>
        { shouldMeasure && (
          <div className={ css(styles.measured) } ref={ this._resolveRef('_measured') }>
            { onRenderItems(measuredItems) }
          </div>
        ) }

        { renderedItems.length > 0 && onRenderItems(renderedItems) }
      </div>

    );
  }

  public componentDidUpdate(prevProps: IResizeGroupProps) {
    this._measureItems();
  }

  protected _onResize() {
    this.setState({ shouldMeasure: true });
  }

  private _measureItems() {
    let { items, onReduceItems } = this.props;
    let {
      shouldMeasure,
      renderedItems,
      measuredItems,
    } = this.state;

    if (shouldMeasure && items && items.length > 0) {
      let container = this._root.getBoundingClientRect();
      let measured = this._measured.getBoundingClientRect();
      if ((measured.width > container.width)) {
        this.setState((prevState, props) => {
          return {
            measuredItems: onReduceItems(prevState.measuredItems, props),
          };
        });
      } else {
        this.setState((prevState, props) => {
          return {
            renderedItems: measuredItems,
            measuredItems: this.props.items.concat([]),
            shouldMeasure: false
          };
        });
      }
    }
  }
}
