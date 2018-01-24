/* tslint:disable */
import * as React from 'react';
/* tslint:enable */
import { BaseComponent, KeyCodes, autobind, getId, getNativeProps, inputProperties } from '../../../../Utilities';
import { FloatingPeoplePicker, IBaseFloatingPickerProps } from '../../../../FloatingPicker';
import { ISelectedPeopleItemProps } from '../SelectedPeopleList';
import { IExtendedPersonaProps } from '../SelectedPeopleList';
import { IPeoplePickerItemState } from './ExtendedSelectedItem';

import * as stylesImport from './EditingItem.scss';

// tslint:disable-next-line:no-any
const styles: any = stylesImport;

export interface IEditingSelectedPeopleItemProps extends ISelectedPeopleItemProps {
  // tslint:disable-next-line:no-any
  onEditingComplete: (oldItem: any, newItem: any) => void;
  onRenderFloatingPicker?: (props: IBaseFloatingPickerProps<IExtendedPersonaProps>) => JSX.Element;
  floatingPickerProps?: IBaseFloatingPickerProps<IExtendedPersonaProps>;
  getEditingItemText?: (item: IExtendedPersonaProps) => string;
}

export class EditingItem extends BaseComponent<IEditingSelectedPeopleItemProps, IPeoplePickerItemState> {
  private editingInput: HTMLInputElement;
  private editingFloatingPicker: FloatingPeoplePicker;
  private onRenderFloatingPicker: (props: IBaseFloatingPickerProps<IExtendedPersonaProps>) => JSX.Element;
  private floatingPickerProps: IBaseFloatingPickerProps<IExtendedPersonaProps>;

  constructor(props: IEditingSelectedPeopleItemProps) {
    super(props);
    this.state = { contextualMenuVisible: false };
    this.onRenderFloatingPicker = this.props.onRenderFloatingPicker as
      (props: IBaseFloatingPickerProps<IExtendedPersonaProps>) => JSX.Element;
    this.floatingPickerProps = this.props.floatingPickerProps as IBaseFloatingPickerProps<IExtendedPersonaProps>;
  }

  public componentDidMount(): void {
    let getEditingItemText = this.props.getEditingItemText as (item: IExtendedPersonaProps) => string;
    let itemText = getEditingItemText(this.props.item);
    this.editingFloatingPicker.onQueryStringChanged(itemText);
    this.editingInput.value = itemText;
    this.editingInput.focus();
  }

  @autobind
  public render(): JSX.Element {
    const itemId = getId();
    const nativeProps = getNativeProps(this.props, inputProperties);
    return (
      <div aria-labelledby={ 'editingItemPersona-' + itemId }>
        <input
          { ...nativeProps}
          ref={ this._resolveInputRef }
          autoCapitalize={ 'off' }
          autoComplete={ 'off' }
          onChange={ this._onInputChange }
          onKeyDown={ this._onInputKeyDown }
          onBlur={ this._onInputBlur }
          onClick={ this._onInputClick }
          data-lpignore={ true }
          className={ styles.editingInput }
          id={ itemId }
        />
        { this._renderEditingSuggestions() }
      </div>);
  }

  @autobind
  private _renderEditingSuggestions(): JSX.Element {
    let onRenderFloatingPicker = this.onRenderFloatingPicker;
    return (onRenderFloatingPicker({
      componentRef: this._resolveRef('editingFloatingPicker'),
      onChange: this._onSuggestionSelected,
      inputElement: this.editingInput,
      selectedItems: [],
      ...this.floatingPickerProps
    }));
  }

  @autobind
  private _resolveInputRef(ref: HTMLInputElement): void {
    this.editingInput = ref;

    this.forceUpdate(() => { this.editingInput.focus(); });
  }

  @autobind
  private _onInputClick(): void {
    this.editingFloatingPicker.showPicker();
  }

  @autobind
  private _onInputBlur(): void {
    this.editingFloatingPicker.forceResolveSuggestion();
  }

  @autobind
  private _onInputChange(ev: React.FormEvent<HTMLElement>): void {
    let value: string = (ev.target as HTMLInputElement).value;

    if (value === '') {
      if (this.props.onRemoveItem) {
        this.props.onRemoveItem();
      }
    } else {
      this.editingFloatingPicker.onQueryStringChanged(value);
    }
  }

  private _onInputKeyDown(ev: React.KeyboardEvent<HTMLInputElement>): void {
    if (ev.which === KeyCodes.backspace || ev.which === KeyCodes.del) {
      ev.stopPropagation();
    }
  }

  @autobind
  private _onSuggestionSelected(item: IExtendedPersonaProps): void {
    this.props.onEditingComplete(this.props.item, item);
  }
}