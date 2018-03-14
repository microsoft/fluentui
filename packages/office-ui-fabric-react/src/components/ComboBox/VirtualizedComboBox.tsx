import * as React from 'react';
import { autobind, BaseComponent, createRef } from '../../Utilities';
import { ComboBox } from './ComboBox';
import { IComboBoxProps, IComboBox } from './ComboBox.types';
import { List } from '../../List';
import { ISelectableOption } from '../../utilities/selectableOption/SelectableOption.types';

export class VirtualizedComboBox extends BaseComponent<IComboBoxProps, {}> implements IComboBox {
  /** The combo box element */
  private _comboBox = createRef<IComboBox>();
  /** The virtualized list element */
  private _list = createRef<List>();

  public dismissMenu(): void {
    if (this._comboBox.value) {
      return this._comboBox.value.dismissMenu();
    }
  }

  public focus() {
    if (this._comboBox.value) {
      this._comboBox.value.focus();
      return true;
    }

    return false;
  }

  public render(): JSX.Element {
    return (
      <ComboBox
        { ...this.props }
        componentRef={ this._comboBox }
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
        componentRef={ this._list }
        role='listbox'
        items={ props.options }
        onRenderCell={ onRenderItem ? (item: ISelectableOption) => onRenderItem(item) : () => null }
      />
    );
  }

  @autobind
  protected _onScrollToItem(itemIndex: number): void {
    // We are using the List component, call scrollToIndex
    this._list.value && this._list.value.scrollToIndex(itemIndex);
  }
}