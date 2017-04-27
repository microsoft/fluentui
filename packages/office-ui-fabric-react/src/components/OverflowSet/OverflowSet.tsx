import * as React from 'react';
import {
  css,
  autobind,
  BaseComponent
} from '../../Utilities';
import { IButtonProps } from '../../Button';
import { IOverflowSetProps } from './OverflowSet.Props';
import { FocusZone, FocusZoneDirection } from '../../FocusZone';

import * as stylesImport from './OverflowSet.scss';
const styles: any = stylesImport;

export class OverflowSet extends BaseComponent<IOverflowSetProps, null> {

  public render() {
    let {
      items,
      overflowItems,
      onRenderOverflowButton
    } = this.props;

    const overflowButtonProps: IButtonProps = {
      menuProps: { items: overflowItems }
    }

    return (
      <FocusZone className={ css('ms-OverflowSet', styles.root) } direction={ FocusZoneDirection.horizontal } role='menubar' >
        { items && this._onRenderItems(items) }
        { overflowItems.length && onRenderOverflowButton(overflowButtonProps) }
      </FocusZone>
    );
  }

  @autobind
  private _onRenderItems(items: any[]): JSX.Element[] {
    return items.map((item, i) => {
      return (
        <div key={ i } className={ css('ms-OverflowSet-item', styles.item) }>
          { this.props.onRenderItem(item) }
        </div>
      );
    });
  }
}
