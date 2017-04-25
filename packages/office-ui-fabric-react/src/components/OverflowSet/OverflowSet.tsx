import * as React from 'react';
import {
  css,
  autobind,
  BaseComponent
} from '../../Utilities';
import { IButtonProps } from '../../Button';
import { IOverflowSetProps } from './OverflowSet.Props';
import { DefaultButton } from '../../Button';
import { FocusZone, FocusZoneDirection } from '../../FocusZone';

const styles: any = require('./OverflowSet.scss');

export class OverflowSet extends BaseComponent<IOverflowSetProps, null> {

  public render() {
    let {
      items,
      overflowItems,
      onRenderOverflowButton = this._onRenderOverflowButton,
    } = this.props;

    const buttonProps: IButtonProps = {
      iconProps: { iconName: 'More' },
      menuProps: { items: overflowItems }
    }

    return (
      <FocusZone className={ css('ms-OverflowSet', styles.root) } direction={ FocusZoneDirection.horizontal } role='menubar' >
        { items && this._onRenderItems(items) }
        { overflowItems.length && onRenderOverflowButton(buttonProps, this._onRenderOverflowButton) }
      </FocusZone>
    );
  }

  @autobind
  private _onRenderOverflowButton(props: IButtonProps): JSX.Element {
    return (
      <DefaultButton
        className={ css(styles.overflowIcon) }
        iconProps={ props.iconProps }
        menuIconProps={ null }
        menuProps={ props.menuProps }
      />
    );
  }

  @autobind
  private _onRenderItems(items: any[]): JSX.Element[] {
    return items.map((item, i) => {
      let onRender = item.onRender ? item.onRender : this.props.onRenderItem;
      return (
        <div className={ css('ms-OverflowSet-item', styles.item) }>
          { onRender(item) }
        </div>
      );
    });
  }
}
