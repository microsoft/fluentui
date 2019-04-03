/* tslint:disable */
import * as React from 'react';
/* tslint:enable */
import { KeyCodes, getId, getNativeProps, inputProperties, css } from '../../../../Utilities';
import { FloatingPeoplePicker, IBaseFloatingPickerProps } from '../../../../FloatingPicker';
import { IExtendedPersonaProps } from '../SelectedPeopleList';
import { IPeoplePickerItemState } from './ExtendedSelectedItem';
import { IPersonaProps } from '../../../../Persona';

import * as styles from './EditingItem.scss';

export interface IEditingItemProps<TItem> extends React.HTMLAttributes<any> {
  /**
   * The current item of the EditingItem
   */
  item: TItem;

  /**
   * Callback for when the edited item's new value has been selected.
   * Invoked indirectly by the picker mounted by onRenderFloatingPicker.
   */
  onEditingComplete: (oldItem: TItem, newItem: TItem) => void;

  /**
   * Renders the floating picker for suggesting the result of the item edit.
   *
   * Not actually optional, since is what is needed to resolve the new item.
   */
  onRenderFloatingPicker?: React.ComponentType<EditingItemFloatingPickerProps<TItem>>;

  /**
   * Callback for when the editing item removes the item from the well
   *
   * Called when the item is currently being edited and the text length goes to zero
   */
  onRemoveItem?: (item: TItem) => void;

  /**
   * Custom props to be passed to the floating picker opened when editing the pill.
   *
   * @deprecated Instead of using this prop, bind this yourself inyour onRenderFloatingPicker.
   */
  floatingPickerProps?: IBaseFloatingPickerProps<TItem>;

  /**
   * Callback used by the EditingItem to populate the initial value of the editing item
   */
  getEditingItemText: (item: IExtendedPersonaProps) => string;
}

/**
 * @deprecated Use IEditingItemProps
 */
export interface IEditingSelectedPeopleItemProps extends IEditingItemProps<IPersonaProps> {}

export type EditingItemFloatingPickerProps<T> = Pick<
  IBaseFloatingPickerProps<T>,
  'componentRef' | 'onChange' | 'inputElement' | 'selectedItems' | 'onRemoveSuggestion'
>;

/**
 * Wrapper around an item in a selection well that renders an item with a context menu for
 * replacing that item with another item.
 */
export class EditingItem<TItem = IPersonaProps> extends React.PureComponent<IEditingItemProps<TItem>, IPeoplePickerItemState> {
  private _editingInput: HTMLInputElement;
  private _editingFloatingPicker = React.createRef<FloatingPeoplePicker>();

  constructor(props: IEditingItemProps<TItem>) {
    super(props);
    this.state = { contextualMenuVisible: false };
  }

  public componentDidMount(): void {
    const itemText: string = this.props.getEditingItemText(this.props.item);

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
    if (!FloatingPicker) {
      return <></>;
    }
    return (
      <FloatingPicker
        componentRef={this._editingFloatingPicker}
        onChange={this._onSuggestionSelected}
        inputElement={this._editingInput}
        selectedItems={[]}
        onRemoveSuggestion={this.props.onRemoveItem}
        {...this.props.floatingPickerProps || {}}
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
        this.props.onRemoveItem(this.props.item);
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

  private _onSuggestionSelected = (item: TItem): void => {
    this.props.onEditingComplete(this.props.item, item);
  };
}
