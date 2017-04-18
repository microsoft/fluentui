import * as React from 'react';
import {
  css,
  autobind,
  BaseComponent
} from '../../Utilities';
import { IOverflowSetProps } from './OverflowSet.Props';
import { IconButton } from '../../Button';
import { FocusZone, FocusZoneDirection } from '../../FocusZone';

const styles: any = require('./OverflowSet.scss');

export class OverflowSet extends BaseComponent<IOverflowSetProps, null> {

  public render() {
    let { items, overflowItems } = this.props;
    return (
      <FocusZone className={ css('ms-OverflowSet', styles.root) } direction={ FocusZoneDirection.horizontal } role='menubar' >
        { items && this._onRenderItems(items) }
        { overflowItems.length && this._onRenderOverflowButton(overflowItems) }
      </FocusZone>
    );
  }

  @autobind
  private _onRenderOverflowButton(items) {
    let { iconProps } = this.props;
    iconProps.iconName = iconProps.iconName ? iconProps.iconName : 'More';
    return (
      <IconButton
        icon={ iconProps.iconName }
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
