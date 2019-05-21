import * as React from 'react';
import { BaseComponent } from '../../Utilities';
import { ComboBox } from './ComboBox';
import { IComboBoxProps, IComboBox, IComboBoxOption } from './ComboBox.types';
import { IList, List } from '../../List';
import { ISelectableOption } from '../../utilities/selectableOption/SelectableOption.types';

export class VirtualizedComboBox extends BaseComponent<IComboBoxProps, {}> implements IComboBox {
  /** The combo box element */
  private _comboBox = React.createRef<IComboBox>();
  /** The virtualized list element */
  private _list = React.createRef<IList>();

  /**
   * All selected options
   */
  public get selectedOptions(): IComboBoxOption[] {
    if (this._comboBox.current) {
      return this._comboBox.current.selectedOptions;
    }
    return [];
  }

  public dismissMenu(): void {
    if (this._comboBox.current) {
      return this._comboBox.current.dismissMenu();
    }
  }

  public focus() {
    if (this._comboBox.current) {
      this._comboBox.current.focus();
      return true;
    }

    return false;
  }

  public render(): JSX.Element {
    return (
      <ComboBox {...this.props} componentRef={this._comboBox} onRenderList={this._onRenderList} onScrollToItem={this._onScrollToItem} />
    );
  }

  protected _onRenderList = (props: IComboBoxProps): JSX.Element => {
    const { onRenderItem } = props;

    // Render virtualized list
    return (
      <List
        componentRef={this._list}
        role="listbox"
        items={props.options}
        onRenderCell={onRenderItem ? (item: ISelectableOption) => onRenderItem(item) : () => null}
      />
    );
  };

  protected _onScrollToItem = (itemIndex: number): void => {
    // We are using the List component, call scrollToIndex
    this._list.current && this._list.current.scrollToIndex(itemIndex);
  };
}
