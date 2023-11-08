import * as React from 'react';
import {
  KeyCodes,
  getId,
  getNativeProps,
  inputProperties,
  classNamesFunction,
  initializeComponentRef,
} from '../../../../Utilities';
import { FloatingPeoplePicker } from '../../../../FloatingPicker';
import { getStyles } from './EditingItem.styles';
import type { IExtendedPersonaProps } from '../SelectedPeopleList';
import type { IPeoplePickerItemState } from './ExtendedSelectedItem';
import type {
  IEditingSelectedPeopleItemProps,
  IEditingSelectedPeopleItemStyles,
  IEditingSelectedPeopleItemStylesProps,
} from './EditingItem.types';

export class EditingItem extends React.Component<IEditingSelectedPeopleItemProps, IPeoplePickerItemState> {
  private _editingInput: HTMLInputElement;
  private _editingFloatingPicker = React.createRef<FloatingPeoplePicker>();

  constructor(props: IEditingSelectedPeopleItemProps) {
    super(props);

    initializeComponentRef(this);
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
    const nativeProps = getNativeProps<React.InputHTMLAttributes<HTMLInputElement>>(this.props, inputProperties);
    const getClassNames = classNamesFunction<IEditingSelectedPeopleItemStylesProps, IEditingSelectedPeopleItemStyles>();
    const classNames = getClassNames(getStyles);
    return (
      <div aria-labelledby={'editingItemPersona-' + itemId} className={classNames.root}>
        <input
          autoCapitalize={'off'}
          autoComplete={'off'}
          {...nativeProps}
          ref={this._resolveInputRef}
          onChange={this._onInputChange}
          onKeyDown={this._onInputKeyDown}
          onBlur={this._onInputBlur}
          onClick={this._onInputClick}
          data-lpignore={true}
          className={classNames.input}
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
      if (
        target.className.indexOf('ms-Suggestions-itemButton') === -1 &&
        target.className.indexOf('ms-Suggestions-sectionButton') === -1
      ) {
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
    // eslint-disable-next-line deprecation/deprecation
    if (ev.which === KeyCodes.backspace || ev.which === KeyCodes.del) {
      ev.stopPropagation();
    }
  }

  private _onSuggestionSelected = (item: IExtendedPersonaProps): void => {
    this.props.onEditingComplete(this.props.item, item);
  };
}
