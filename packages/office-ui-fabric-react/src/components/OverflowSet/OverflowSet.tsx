import * as React from 'react';
import {
  css,
  autobind,
  BaseComponent
} from '../../Utilities';
import { IOverflowSet, IOverflowSetProps } from './OverflowSet.Props';
import { FocusZone, FocusZoneDirection } from '../../FocusZone';

import * as stylesImport from './OverflowSet.scss';
const styles: any = stylesImport;

export class OverflowSet extends BaseComponent<IOverflowSetProps, {}> implements IOverflowSet {

  private _focusZone: FocusZone;

  public render() {
    let {
      items,
      overflowItems,
      onRenderOverflowButton,
      className
    } = this.props;

    return (
      <FocusZone
        componentRef={ this._resolveRef('_focusZone') }
        className={ css('ms-OverflowSet', styles.root, className) }
        direction={ FocusZoneDirection.horizontal }
        role='menubar'
      >
        { items && this._onRenderItems(items) }
        { overflowItems && overflowItems.length > 0 && onRenderOverflowButton(overflowItems) }
      </FocusZone>
    );
  }

  public focus() {
    if (this._focusZone) {
      this._focusZone.focus();
    }
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