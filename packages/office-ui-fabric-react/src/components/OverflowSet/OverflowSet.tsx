import * as React from 'react';
import {
  css,
  autobind,
  BaseComponent
} from '../../Utilities';
import { IOverflowSetProps } from './OverflowSet.Props';
import { IconButton } from '../../Button';

const styles: any = require('./OverflowSet.scss');

export class OverflowSet extends BaseComponent<IOverflowSetProps, null> {

  constructor(props: IOverflowSetProps) {
    super(props);
  }

  public render() {
    let { items, overflowItems } = this.props;
    return (
      <div className={ css('ms-OverflowSet', styles.root) } >
        { items && this._onRenderItems(items) }
        { overflowItems && this._onRenderOverflowButton(overflowItems) }
      </div>
    );
  }

  @autobind
  private _onRenderOverflowButton(items) {
    let { overflowIcon = 'More' } = this.props;
    return (
      <IconButton
        icon={ overflowIcon }
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
}
