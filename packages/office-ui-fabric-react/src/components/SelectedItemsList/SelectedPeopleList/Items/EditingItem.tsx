/* tslint:disable */
import * as React from 'react';
/* tslint:enable */
import { BaseComponent, KeyCodes, getId, getNativeProps, inputProperties, css } from '../../../../Utilities';
import { FloatingPeoplePicker, IBaseFloatingPickerProps } from '../../../../FloatingPicker';
import { ISelectedPeopleItemProps } from '../SelectedPeopleList';
import { IExtendedPersonaProps } from '../SelectedPeopleList';
import { IPeoplePickerItemState } from './ExtendedSelectedItem';
import { IPersonaProps } from '../../../../Persona';

import * as stylesImport from './EditingItem.scss';

// tslint:disable-next-line:no-any
const styles: any = stylesImport;

export interface IEditingSelectedPeopleItemProps extends ISelectedPeopleItemProps {
  // tslint:disable-next-line:no-any
  onEditingComplete: (oldItem: any, newItem: any) => void;
  onRenderFloatingPicker?: React.ComponentType<IBaseFloatingPickerProps<IPersonaProps>>;
  floatingPickerProps?: IBaseFloatingPickerProps<IPersonaProps>;
  getEditingItemText?: (item: IExtendedPersonaProps) => string;
}

export class EditingItem extends BaseComponent<IEditingSelectedPeopleItemProps, IPeoplePickerItemState> {
  private _editingInput: HTMLInputElement;
  private _editingFloatingPicker = React.createRef<FloatingPeoplePicker>();

  constructor(props: IEditingSelectedPeopleItemProps) {
    super(props);
    this.state = { contextualMenuVisible: false };
  }

  public componentDidMount(): void {
    const getEditingItemText = this.props.getEditingItemText as (item: IExtendedPersonaProps) => string;
    const itemText = getEditingItemText(this.props.item);

    this._editingFloatingPicker.current && this._editingFloatingPicker.current.onQueryStringChanged(itemText);
    this._editingInput.value = itemText;
    this._editingInput.focus();
  }

  public render(): JSX.Element {
    const itemId = getId();
    const nativeProps = getNativeProps(this.props, inputProperties);
    return (
      <div aria-labelledby={'editingItemPersona-' + itemId} className={css('ms-EditingItem', styles.editingContainer)}>
        <input
          {...nativeProps}
          ref={this._resolveInputRef}
          autoCapitalize={'off'}
          autoComplete={'off'}
          onChange={this._onInputChange}
          onKeyDown={this._onInputKeyDown}
          onBlur={this._onInputBlur}
          onClick={this._onInputClick}
          data-lpignore={true}
          className={styles.editingInput}
          id={itemId}
        />
        {this._renderEditingSuggestions()}
      </div>
    );
  }

  private _renderEditingSuggestions = (): JSX.Element => {
    const FloatingPicker = this.props.onRenderFloatingPicker;
    const floatingPickerProps = this.props.floatingPickerProps;
    if (!FloatingPicker || !floatingPickerProps) {
      return <></>;
    }
    return (
      <FloatingPicker
        componentRef={this._editingFloatingPicker}
        onChange={this._onSuggestionSelected}
        inputElement={this._editingInput}
        selectedItems={[]}
        {...floatingPickerProps}
      />
    );
  };

  private _resolveInputRef = (ref: HTMLInputElement): void => {
    this._editingInput = ref;

    this.forceUpdate(() => {
      this._editingInput.focus();
    });
  };

  private _onInputClick = (): void => {
    this._editingFloatingPicker.current && this._editingFloatingPicker.current.showPicker(true /*updatevalue*/);
  };

  private _onInputBlur = (ev: React.FocusEvent<HTMLElement>): void => {
    if (this._editingFloatingPicker.current && ev.relatedTarget !== null) {
      const target = ev.relatedTarget as HTMLElement;
      if (target.className.indexOf('ms-Suggestions-itemButton') === -1 && target.className.indexOf('ms-Suggestions-sectionButton') === -1) {
        this._editingFloatingPicker.current.forceResolveSuggestion();
      }
    }
  };

  private _onInputChange = (ev: React.FormEvent<HTMLElement>): void => {
    const value: string = (ev.target as HTMLInputElement).value;

    if (value === '') {
      if (this.props.onRemoveItem) {
        this.props.onRemoveItem();
      }
    } else {
      this._editingFloatingPicker.current && this._editingFloatingPicker.current.onQueryStringChanged(value);
    }
  };

  private _onInputKeyDown(ev: React.KeyboardEvent<HTMLInputElement>): void {
    if (ev.which === KeyCodes.backspace || ev.which === KeyCodes.del) {
      ev.stopPropagation();
    }
  }

  private _onSuggestionSelected = (item: IExtendedPersonaProps): void => {
    this.props.onEditingComplete(this.props.item, item);
  };
}
