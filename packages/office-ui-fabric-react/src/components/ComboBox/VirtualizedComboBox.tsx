import * as React from 'react';
import { autobind, BaseComponent, customizable } from '../../Utilities';
import { ComboBox } from './ComboBox';
import { IComboBoxProps, IComboBox } from './ComboBox.types';
import { List } from '../../List';
import { SelectableOptionMenuItemType, ISelectableOption } from '../../utilities/selectableOption/SelectableOption.types';

export class VirtualizedComboBox extends BaseComponent<IComboBoxProps, {}> implements IComboBox {
  /** The combo box element */
  private _comboBox: ComboBox;
  /** The virtualized list element */
  private _list: List;

  public dismissMenu(): void {
    if (this._comboBox) {
      return this._comboBox.dismissMenu();
    }
  }

  public focus() {
    if (this._comboBox) {
      this._comboBox.focus();
      return true;
    }

    return false;
  }

  public render(): JSX.Element {
    return (
      <ComboBox
        {...this.props}
        componentRef={ this._resolveRef('_comboBox') }
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
        onRenderCell={ onRenderItem ? (item: ISelectableOption) => onRenderItem(item) : () => null }
      />
    );
  }

  @autobind
  protected _onScrollToItem(itemIndex: number): void {
    // We are using the List component, call scrollToIndex
    this._list.scrollToIndex(itemIndex);
  }
}