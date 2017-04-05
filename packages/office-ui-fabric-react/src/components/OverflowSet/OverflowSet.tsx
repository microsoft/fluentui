import * as React from 'react';
import {
  css,
  autobind,
  getNativeProps,
  divProperties,
  EventGroup,
  getId,
  BaseComponent,
  getRTL
} from '../../Utilities';
import { IOverflowSetProps } from './OverflowSet.Props';
import { IconButton } from '../../Button';
import { IContextualMenuItem, IContextualMenuProps } from '../../ContextualMenu';

const styles: any = require('./OverflowSet.scss');
const ITEM_CLASS = 'ms-OverflowSet-item';

export interface IOverflowSetState {
  renderedItems?: any[];
  renderedOverflowItems?: any[];
  shouldMeasure?: boolean;
  overflowMenuProps?: IContextualMenuProps;
}

export class OverflowSet extends BaseComponent<IOverflowSetProps, IOverflowSetState> {

  public static defaultProps = {
    items: []
  };

  private _root: HTMLElement;
  private _measured: HTMLElement;
  private _overflow: HTMLElement;
  private _itemWidths: { [key: string]: number };
  private _id: string;

  constructor(props: IOverflowSetProps) {
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
    let { className, items, children } = this.props;
    let { shouldMeasure, renderedItems, renderedOverflowItems } = this.state;
    // onRenderOverflow will eventually take all overflow items
    return (
      <div ref={ this._resolveRef('_root') } className={ css('ms-OverflowSet', styles.root, className) } >
        { shouldMeasure && (
          <div className={ styles.measured } ref={ this._resolveRef('_measured') }>
            { items && this._onRenderItems(items) }
            <div ref={ this._resolveRef('_overflow') } >
              { this._onRenderOverflowButton(null) }
            </div>
          </div>
        ) }
        { renderedItems.length > 0 && this._onRenderItems(renderedItems) }
        { renderedOverflowItems.length > 0 && this._onRenderOverflowButton(renderedOverflowItems) }
        { children && this._onRenderItems(children) }
      </div>
    );
  }


  protected _onResize() {
    this.setState({ shouldMeasure: true });
  }

  public componentDidUpdate(prevProps: IOverflowSetProps) {
    this._measureItems();
  }

  private _onRenderOverflowButton(items) {
    return (
      <IconButton
        icon='More'
        menuIconName='none'
        menuProps={ {
          items: items
        } }
      />
    );
  }

  @autobind
  private _onRenderItems(items) {
    return items.map((item, i) => {
      let key = item.key ? item.key : i;
      let onRender = item.onRender ? item.onRender : this.props.onRenderItem;
      return (
        <div
          className={ css('ms-OverflowSet-item', styles.item) }
          key={ key }
          ref={ key } >
          { onRender ? onRender(item, i) : item }
        </div>
      );
    });
  }

  private _measureItems() {
    let { items } = this.props;
    let { shouldMeasure } = this.state;
    let isRTL = getRTL();

    if (shouldMeasure && items && items.length > 0) {
      let itemElements = this._measured.querySelectorAll('.' + ITEM_CLASS);
      let overflowButton = this._overflow;
      let containerSize = this._root.getBoundingClientRect();
      let renderedItems = [];
      let renderedOverflowItems = [];

      for (let i = 0; i < items.length; i++) {
        let item = items[i];
        let itemSize = itemElements[i].getBoundingClientRect();
        let isOverflowed = this.state.renderedOverflowItems.length;
        let isOutOfBounds = isRTL ?
          itemSize.left < (isOverflowed ? containerSize.left + overflowButton.clientWidth : containerSize.left)
          :
          itemSize.right > (isOverflowed ? containerSize.right - overflowButton.clientWidth : containerSize.right);

        if (isOutOfBounds) {
          // // get bounding box of last item
          // let overflowSize = itemElements[items.length].getBoundingClientRect();
          // // if current item left position + width of last item is greater than right position of container
          // let isTooLarge = isRTL ? (itemSize.right - overflowSize.width) < containerSize.left : (itemSize.left + overflowSize.width) > containerSize.right;

          // if (i > 0 && isTooLarge) {
          //   i--;
          //   renderedItems.pop();
          // }

          renderedOverflowItems = items.slice(i);

          break;
        }

        renderedItems.push(item);
      }

      this.setState({ renderedItems, renderedOverflowItems, shouldMeasure: false });
    }
  }


}
