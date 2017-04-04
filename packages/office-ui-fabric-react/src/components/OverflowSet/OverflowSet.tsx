import * as React from 'react';
import {
  css,
  getNativeProps,
  divProperties,
  EventGroup,
  getId
} from '../../Utilities';
import { IOverflowSetProps } from './OverflowSet.Props';
import { IconButton } from '../../Button';
import { IContextualMenuItem } from '../../ContextualMenu';

const styles: any = require('./OverflowSet.scss');

export interface IOverflowSetState {
  renderedItems?: IContextualMenuItem[];
  renderedOverflowItems?: IContextualMenuItem[];
}

export class OverflowSet extends React.Component<IOverflowSetProps, IOverflowSetState> {

  public static defaultProps = {
  };

  public refs: {
    [key: string]: React.ReactInstance;
    overflowSet: HTMLElement;
  };

  private _itemWidths: { [key: string]: number };
  private _events: EventGroup;
  private _id: string;

  constructor(props: IOverflowSetProps) {
    super(props);
    this.state = {
      renderedItems: this.props.items
    };
    this._id = getId('OverflowSet');
    this._events = new EventGroup(this);
  }

  public componentDidMount() {
    this._updateItemMeasurements();
    this._updateRenderedItems();

    this._events.on(window, 'resize', this._updateRenderedItems);
  }

  public componentWillUnmount() {
    this._events.dispose();
  }

  public componentDidUpdate(prevProps: IOverflowSetProps) {
    if (!this._itemWidths) {
      this._updateItemMeasurements();
      this._updateRenderedItems();
    }
  }

  public render() {
    let { className, items } = this.props;
    let divProps = getNativeProps(this.props, divProperties);

    // onRenderOverflow will eventually take all overflow items
    return (
      <div ref='overflowSet' { ...divProps } className={ css('ms-OverflowSet', styles.root, className) } >
        { items && this._onRenderSetItems(this.state.renderedItems) }
        { this.state.renderedOverflowItems && this._onRenderOverflowButton(this.state.renderedOverflowItems) }
        { this.props.children && this._onRenderSetItems(this.props.children) }
      </div>
    );
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

  private _onRenderSetItems(items) {
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

  private _updateItemMeasurements() {

    if (!this._itemWidths) {
      this._itemWidths = {};
    }

    for (let i = 0; i < this.props.items.length; i++) {
      let item = this.props.items[i];

      if (!this._itemWidths[item.key]) {
        let el = this.refs[item.key] as HTMLElement;

        if (el) {
          let style = window.getComputedStyle(el);
          this._itemWidths[item.key] = el.getBoundingClientRect().width + parseInt(style.marginRight, 10) + parseInt(style.marginLeft, 10);
        }
      }
    }
  }

  private _updateRenderedItems() {
    let { items, overflowItems = []} = this.props;
    let renderedItems = [].concat(items);
    let renderedOverflowItems = overflowItems;
    let overflowSet = this.refs.overflowSet;
    let consumedWidth = 0;
    let isOverflowVisible = renderedOverflowItems && renderedOverflowItems.length;

    let style = window.getComputedStyle(overflowSet);
    // reduce availableWidth by 32 to account for overflowButton. This could be improved to support custom button sizes
    let availableWidth = overflowSet.clientWidth - parseInt(style.marginLeft, 10) - parseInt(style.marginRight, 10) - 32;
    for (let i = 0; i < renderedItems.length; i++) {
      let item = renderedItems[i];
      let itemWidth = this._itemWidths[item.key];

      if ((consumedWidth + itemWidth) >= availableWidth) {

        renderedOverflowItems = renderedItems.splice(i).concat(overflowItems);
        break;
      } else {
        consumedWidth += itemWidth;
      }
    }

    this.setState({
      renderedItems: renderedItems,
      renderedOverflowItems: renderedOverflowItems.length ? renderedOverflowItems : null,
    });
  }
}
