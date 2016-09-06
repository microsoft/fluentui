import * as React from 'react';
import { IPivotItem } from './Pivot.Props';
import {
  autobind,
  css
} from '../../Utilities';

export interface IPivotTabProps extends React.Props<React.Component<any, any>> {
  pivotId: string;
  item: IPivotItem;
  isSelected: boolean;
  onSelectTab: (item?: IPivotItem) => void;
}

export class PivotTab<T extends IPivotItem> extends React.Component<IPivotTabProps, {}> {
  public render() {
    let { item, children, pivotId, isSelected } = this.props;

    return (
      <button
        { ...item.buttonProps }
        id={ pivotId + '-tab' }
        className={ css('ms-Pivot-tabButton', {
          'is-selected': isSelected }) }
        onClick={ this._onClick }
        role='tab'
        disabled={ item.disabled }
        aria-label={ item.ariaLabel }
        aria-controls={ pivotId + '-panel' }
        aria-selected={ isSelected }>
        { children }
      </button>
    );
  }

  @autobind
  private _onClick() {
    this.props.onSelectTab(this.props.item);
  }
}
