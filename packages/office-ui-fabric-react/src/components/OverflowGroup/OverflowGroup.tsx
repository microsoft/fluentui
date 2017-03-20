import * as React from 'react';
import {
  css,
  getNativeProps,
  divProperties,
  EventGroup,
  getId
} from '../../Utilities';
import { IOverflowGroupProps, GutterWidth } from './OverflowGroup.Props';
import { IconButton } from '../../Button';
import { IContextualMenuItem } from '../../ContextualMenu';

import styles from './OverflowGroup.scss';

export interface IOverflowGroupState {
  renderedItems?: IContextualMenuItem[];
  renderedOverflowItems?: IContextualMenuItem[];
}

export class OverflowGroup extends React.Component<IOverflowGroupProps, IOverflowGroupState> {

  public static defaultProps = {
    gutterWidth: GutterWidth.none
  };

  public refs: {
    [key: string]: React.ReactInstance;
    overflowGroup: HTMLElement;
  };

  private _itemWidths: { [key: string]: number };
  private _events: EventGroup;
  private _id: string;

  constructor(props: IOverflowGroupProps) {
    super(props);
    this.state = {
      renderedItems: this.props.items
    }
    this._id = getId('OverflowGroup');
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

  public componentDidUpdate(prevProps: IOverflowGroupProps) {
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
      <div ref='overflowGroup' { ...divProps } className={ css('ms-OverflowGroup', styles.root, className) } >
        { items && this._onRenderGroupItems(this.state.renderedItems) }
        { this.state.renderedOverflowItems && this._onRenderOverflowButton(this.state.renderedOverflowItems) }
        { this.props.children && this._onRenderGroupItems(this.props.children) }
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

  private _onRenderGroupItems(items) {
    let { gutterWidth } = this.props;
    let widths = [null, 2, 4, 8, 12, 16];
    let itemStyle = {
      'marginRight': widths[gutterWidth] / 2,
      'marginLeft': widths[gutterWidth] / 2
    };

    return items.map((item, i) => {

      let key = item.key ? item.key : i;
      let onRender = item.onRender ? item.onRender : this.props.onRenderItem;
      return (
        <div
          style={ itemStyle }
          className={ css('ms-OverflowGroup-item', styles.item) }
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
    let overflowGroup = this.refs.overflowGroup;
    let consumedWidth = 0;
    let isOverflowVisible = renderedOverflowItems && renderedOverflowItems.length;

    let style = window.getComputedStyle(overflowGroup);
    // reduce availableWidth by 32 to account for overflowButton. This could be improved to support custom button sizes
    let availableWidth = overflowGroup.clientWidth - parseInt(style.marginLeft, 10) - parseInt(style.marginRight, 10) - 32;
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
