import * as React from 'react';
import { ComboBox } from './ComboBox';
import { List } from '../../List';
import { initializeComponentRef } from '../../Utilities';
import type { IComboBoxProps, IComboBox, IComboBoxOption } from './ComboBox.types';
import type { IList } from '../../List';
import type { ISelectableOption } from '../../SelectableOption';

export class VirtualizedComboBox extends React.Component<IComboBoxProps, {}> implements IComboBox {
  /** The combo box element */
  private _comboBox = React.createRef<IComboBox>();
  /** The virtualized list element */
  private _list = React.createRef<IList>();

  constructor(props: IComboBoxProps) {
    super(props);

    initializeComponentRef(this);
  }

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

  public focus(shouldOpenOnFocus?: boolean, useFocusAsync?: boolean) {
    if (this._comboBox.current) {
      this._comboBox.current.focus(shouldOpenOnFocus, useFocusAsync);
      return true;
    }

    return false;
  }

  public render(): JSX.Element {
    return (
      <ComboBox
        {...this.props}
        componentRef={this._comboBox}
        onRenderList={this._onRenderList}
        onScrollToItem={this._onScrollToItem}
      />
    );
  }

  protected _onRenderList = (props: IComboBoxProps): JSX.Element => {
    const { id, onRenderItem } = props;

    // Render virtualized list
    return (
      <List
        componentRef={this._list}
        role="listbox"
        id={`${id}-list`}
        aria-labelledby={`${id}-label`}
        items={props.options}
        // eslint-disable-next-line react/jsx-no-bind
        onRenderCell={onRenderItem ? (item: ISelectableOption) => onRenderItem(item) : () => null}
      />
    );
  };

  protected _onScrollToItem = (itemIndex: number): void => {
    // We are using the List component, call scrollToIndex
    this._list.current && this._list.current.scrollToIndex(itemIndex);
  };
}
