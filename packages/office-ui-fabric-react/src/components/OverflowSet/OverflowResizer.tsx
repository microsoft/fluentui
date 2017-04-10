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
  measuredItems: any[];
  measuredOverflowItems: IContextualMenuProps[];
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
      renderedOverflowItems: [],
      measuredItems: this.props.items,
      measuredOverflowItems: []
    };
  }

  public componentDidMount() {
    this._measureItems();
    this._events.on(window, 'resize', this._onResize);
  }

  public render() {
    let { overflowSetProps } = this.props;
    let { shouldMeasure, renderedItems, renderedOverflowItems, measuredItems, measuredOverflowItems } = this.state;
    return (
      <div ref={ this._resolveRef('_root') }>
        { shouldMeasure && (
          <div className={ css(styles.measured) } ref={ this._resolveRef('_measured') }>
            <OverflowSet
              { ...assign(overflowSetProps, { items: measuredItems, overflowItems: measuredOverflowItems }) }
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

  private _onOverflowState(prevState, props) {
    let { measuredOverflowItems, measuredItems } = prevState;

    measuredOverflowItems.push(measuredItems.pop());
    return { measuredItems, measuredOverflowItems }
  }

  private _onOverflowFitState(prevState, props) {
    let items = props.items;
    let { renderedItems, renderedOverflowItems, measuredItems, measuredOverflowItems } = prevState;
    return {
      renderedItems: measuredItems,
      renderedOverflowItems: measuredOverflowItems,
      // measuredItems: items,
      // measuredOverflowItems: [],
      shouldMeasure: false
    };
  }

  private _measureItems() {
    let { items, onOverflow } = this.props;
    let {
      shouldMeasure,
      renderedItems,
      renderedOverflowItems,
      measuredItems,
      measuredOverflowItems
    } = this.state;

    if (shouldMeasure && items && items.length > 0) {
      let container = this._root.getBoundingClientRect();
      let measured = this._measured.getBoundingClientRect();
      if ((measured.width > container.width) ? true : false) {
        this.setState((prevState, props) => {
          return this._onOverflowState(prevState, props)
        });
      } else {
        this.setState((prevState, props) => {
          return this._onOverflowFitState(prevState, props)
        });
      }
    }
  }
}
