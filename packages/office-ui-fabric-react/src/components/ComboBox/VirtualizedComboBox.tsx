import * as React from 'react';
import { autobind, BaseComponent, customizable } from '../../Utilities';
import { ComboBox } from './ComboBox';
import { IComboBoxProps } from './ComboBox.Props';
import { List } from "../../List";
import { SelectableOptionMenuItemType, ISelectableOption } from '../../utilities/selectableOption/SelectableOption.Props';

export class VirtualizedComboBox extends BaseComponent<IComboBoxProps, {}> {

  // The virtualized list element
  private _list: List;

  public render(): JSX.Element {
    return (
      <ComboBox
        {...this.props}
        onRenderList={ this._onRenderList }
        onScrollToItem={ this._onScrollToItem }
      />
    );
  }

  @autobind
  protected _onRenderList(props: IComboBoxProps): JSX.Element {
    const {
      onRenderItem
    } = props;

    // Render virtualized list
    return (
      <List
        componentRef={ this._resolveRef('_list') }
        role='listbox'
        items={ props.options }
        onRenderCell={ onRenderItem != null ? (item: ISelectableOption) => onRenderItem(item) : () => null }
      />
    );
  }

  protected _onScrollToItem(itemIndex: number): void {
    // We are using the List component, call scrollToIndex
    this._list.scrollToIndex(itemIndex);
  }
}