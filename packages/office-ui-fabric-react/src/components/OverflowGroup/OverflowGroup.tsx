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

import styles from './OverflowGroup.scss';

interface IOverflowGroupState {
  overflowItems: any[];
}

export class OverflowGroup extends React.Component<IOverflowGroupProps, {}> {

  public static defaultProps = {
    gutterWidth: GutterWidth.none
  };

  public refs: {
    [key: string]: React.ReactInstance;
  };

  private _commandItemWidths: { [key: string]: number };
  private _events: EventGroup;
  private _id: string;

  constructor(props: IOverflowGroupProps) {
    super(props);

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
    if (!this._commandItemWidths) {
      this._updateItemMeasurements();
      this._updateRenderedItems();
    }
  }

  public render() {
    let { className, items } = this.props;
    let divProps = getNativeProps(this.props, divProperties);

    // onRenderOverflow will eventually take all overflow items
    return (
      <div { ...divProps } className={ css('ms-OverflowGroup', styles.root, className) } >
        { this._onRenderOverflowButton(items) }
        { this._onRenderGroup(items) }
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


  private _onRenderGroup(items) {
    let { gutterWidth } = this.props;
    let widths = [null, 2, 4, 8, 12, 16];
    let itemStyle = {
      'marginRight': widths[gutterWidth]
    };

    return items.map((item, i) => {

      item.key = item.key ? item.key : i;
      let onRender = item.onRender ? item.onRender : this.props.onRenderItem;

      if (i === items.length - 1) {
        itemStyle = null;
      }
      return (
        <div
          style={ itemStyle }
          className={ css('ms-OverflowGroup-item', styles.item) }
          key={ item.key }
          ref={ item.key } >
          { onRender(item, i) }
        </div>
      );
    });
  }

  private _updateItemMeasurements() {

    if (!this._commandItemWidths) {
      this._commandItemWidths = {};
    }

    for (let i = 0; i < this.props.items.length; i++) {
      let item = this.props.items[i];

      if (!this._commandItemWidths[item.key]) {
        let el = this.refs[item.key] as HTMLElement;
        console.log(el);

        if (el) {
          this._commandItemWidths[item.key] = el.getBoundingClientRect().width;
        }
      }
    }
  }

  private _updateRenderedItems() {
    console.log(this._commandItemWidths);
  }
}
