import * as React from 'react';
import { KeyCodes, getId, getNativeProps, inputProperties, css } from '@fluentui/react/lib/Utilities';
import { IBaseFloatingSuggestionsProps } from '../../../FloatingSuggestionsComposite';
import { IFloatingSuggestionItemProps } from '../../../FloatingSuggestionsComposite/FloatingSuggestionsItem/FloatingSuggestionsItem.types';
import { EditingItemComponentProps } from '../EditableItem';

import * as styles from './DefaultEditingItem.scss';

export interface IDefaultEditingItemInnerProps<TItem> extends React.HTMLAttributes<any> {
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
   * Callback for when the FloatingSuggestions is dismissed
   */
  onDismiss?: () => void;

  /**
   * Renders the floating suggestions for suggesting the result of the item edit.
   *
   * Not actually optional, since is what is needed to resolve the new item.
   */
  onRenderFloatingPicker?: React.ComponentType<EditingItemInnerFloatingPickerProps<TItem>>;

  /**
   * Callback for when the editing item removes the item from the well
   *
   * Called when the item is currently being edited and the text length goes to zero
   */
  onRemoveItem?: (item: TItem) => void;

  /**
   * Callback used by the EditingItem to populate the initial value of the editing item
   */
  getEditingItemText: (item: TItem) => string;
}

export type EditingItemInnerFloatingPickerProps<T> = Pick<
  IBaseFloatingSuggestionsProps<T>,
  'componentRef' | 'onSuggestionSelected' | 'targetElement' | 'onRemoveSuggestion' | 'onFloatingSuggestionsDismiss'
>;

/**
 * Wrapper around an item in a selection well that renders an item with a context menu for
 * replacing that item with another item.
 */
export const DefaultEditingItemInner = <TItem extends any>(
  props: IDefaultEditingItemInnerProps<TItem>,
): JSX.Element => {
  let editingInput: HTMLInputElement;
  const editingFloatingPicker = React.createRef<any>();

  React.useEffect(() => {
    const itemText: string = props.getEditingItemText(props.item);

    //editingFloatingPicker.current && editingFloatingPicker.current.onQueryStringChanged(itemText);
    editingInput.value = itemText;
    editingInput.focus();
  }, []);

  const _renderEditingSuggestions = (): JSX.Element => {
    const FloatingPicker = props.onRenderFloatingPicker;
    if (!FloatingPicker) {
      return <></>;
    }
    return (
      <FloatingPicker
        componentRef={editingFloatingPicker}
        onSuggestionSelected={_onSuggestionSelected}
        targetElement={editingInput}
        onRemoveSuggestion={_onRemoveItem}
        onFloatingSuggestionsDismiss={props.onDismiss}
      />
    );
  };

  const _resolveInputRef = (ref: HTMLInputElement): void => {
    editingInput = ref;
  };

  const _onInputClick = (): void => {
    editingFloatingPicker.current && editingFloatingPicker.current.showPicker(true /*updatevalue*/);
  };

  const _onInputBlur = (ev: React.FocusEvent<HTMLElement>): void => {
    if (editingFloatingPicker.current && ev.relatedTarget !== null) {
      const target = ev.relatedTarget as HTMLElement;
      if (
        target.className.indexOf('ms-Suggestions-itemButton') === -1 &&
        target.className.indexOf('ms-Suggestions-sectionButton') === -1
      ) {
        editingFloatingPicker.current.forceResolveSuggestion();
      }
    }
  };

  const _onInputChange = (ev: React.FormEvent<HTMLElement>): void => {
    const value: string = (ev.target as HTMLInputElement).value;

    if (value === '') {
      if (props.onRemoveItem) {
        props.onRemoveItem(props.item);
      }
    } /*else {
      editingFloatingPicker.current && editingFloatingPicker.current.onQueryStringChanged(value);
    }*/
  };

  const _onInputKeyDown = (ev: React.KeyboardEvent<HTMLInputElement>): void => {
    if (ev.which === KeyCodes.backspace || ev.which === KeyCodes.del) {
      ev.stopPropagation();
    }
  };

  const _onSuggestionSelected = (ev: React.MouseEvent<HTMLElement>, itemProps: IFloatingSuggestionItemProps<TItem>) => {
    props.onEditingComplete(props.item, itemProps.item);
  };

  const _onRemoveItem = (ev: any, itemProps: IFloatingSuggestionItemProps<TItem>) => {
    if (props.onRemoveItem) {
      props.onRemoveItem(itemProps.item);
    }
  };

  const itemId = getId();
  const nativeProps = getNativeProps<React.HTMLAttributes<HTMLInputElement>>(props, inputProperties);
  return (
    <span aria-labelledby={'editingItemPersona-' + itemId} className={css('ms-EditingItem', styles.editingContainer)}>
      <input
        {...nativeProps}
        ref={_resolveInputRef}
        autoCapitalize={'off'}
        autoComplete={'off'}
        onChange={_onInputChange}
        onKeyDown={_onInputKeyDown}
        onBlur={_onInputBlur}
        onClick={_onInputClick}
        data-lpignore={true}
        className={styles.editingInput}
        id={itemId}
      />
      {_renderEditingSuggestions()}
    </span>
  );
};

type EditingItemProps<T> = Pick<
  IDefaultEditingItemInnerProps<T>,
  Exclude<keyof IDefaultEditingItemInnerProps<T>, keyof EditingItemComponentProps<T>>
>;

export const DefaultEditingItem = <T extends any>(outerProps: EditingItemProps<T>) => (
  innerProps: EditingItemComponentProps<T>,
) => <DefaultEditingItemInner {...outerProps} {...innerProps} />;
