import * as React from 'react';
import {
  css,
  autobind,
  BaseComponent
} from '../../Utilities';
import { IOverflowSetProps } from './OverflowSet.Props';
import { FocusZone, FocusZoneDirection } from '../../FocusZone';

import * as stylesImport from './OverflowSet.scss';
const styles: any = stylesImport;

export class OverflowSet extends BaseComponent<IOverflowSetProps, {}> {

  public render() {
    let {
      items,
      overflowItems,
      onRenderOverflowButton
    } = this.props;

    return (
      <FocusZone className={ css('ms-OverflowSet', styles.root, this.props.className) } direction={ FocusZoneDirection.horizontal } role='menubar' >
        { items && this._onRenderItems(items) }
        { overflowItems && overflowItems.length > 0 && onRenderOverflowButton(overflowItems) }
      </FocusZone>
    );
  }

  @autobind
  private _onRenderItems(items: any[]): JSX.Element[] {
    return items.map((item, i) => {
      let wrapperDivProps: React.HTMLProps<HTMLDivElement> = { className: css('ms-OverflowSet-item', styles.item) };
      if (item.key) {
        wrapperDivProps.key = item.key;
      }
      return (
        <div {...wrapperDivProps}>
          { this.props.onRenderItem(item) }
        </div>
      );
    });
  }
}
