import * as React from 'react';
import {
  css,
  BaseComponent,
  createRef
} from '../../Utilities';
import { mergeStyles } from '../../Styling';
import { IOverflowSet, IOverflowSetProps, IOverflowSetItemProps } from './OverflowSet.types';
import { IContextualMenuItem } from '../../ContextualMenu';
import { FocusZone, FocusZoneDirection } from '../../FocusZone';

import * as stylesImport from './OverflowSet.scss';
const styles: any = stylesImport;

export class OverflowSet extends BaseComponent<IOverflowSetProps, {}> implements IOverflowSet {

  private _focusZone = createRef<FocusZone>();

  public render() {
    const {
      items,
      overflowItems,
      className,
      focusZoneProps,
      vertical = false,
      role = 'menubar'
    } = this.props;

    return (
      <FocusZone
        { ...focusZoneProps }
        componentRef={ this._focusZone }
        className={ mergeStyles(
          'ms-OverflowSet',
          styles.root,
          vertical && styles.rootVertical,
          className
        ) }
        direction={ vertical ? FocusZoneDirection.vertical : FocusZoneDirection.horizontal }
        role={ role }
      >
        { items && this._onRenderItems(items) }
        { overflowItems && overflowItems.length > 0 && this._onRenderOverflowButtonWrapper(overflowItems) }
      </FocusZone>
    );
  }

  public focus() {
    if (this._focusZone.value) {
      this._focusZone.value.focus();
    }
  }

  private _onRenderItems = (items: IOverflowSetItemProps[]): JSX.Element[] => {
    return items.map((item, i) => {
      const wrapperDivProps: React.HTMLProps<HTMLDivElement> = { className: css('ms-OverflowSet-item', styles.item) };

      return (
        <div key={ item.key } { ...wrapperDivProps }>
          { this.props.onRenderItem(item) }
        </div>
      );
    });
  }

  private _onRenderOverflowButtonWrapper = (items: {}[]): JSX.Element => {
    const wrapperDivProps: React.HTMLProps<HTMLDivElement> = { className: css('ms-OverflowSet-overflowButton', styles.item) };
    return (
      <div { ...wrapperDivProps }>
        { this.props.onRenderOverflowButton(items) }
      </div>
    );
  }

}