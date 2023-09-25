import * as React from 'react';
import { KeyCodes, getId, getNativeProps, inputProperties, css } from '@fluentui/react/lib/Utilities';
import { useFloatingSuggestionItems } from '../../../UnifiedPicker/hooks/useFloatingSuggestionItems';
import { getStyles } from '../../../FloatingSuggestionsComposite/FloatingSuggestionsList/FloatingSuggestionsList.styles';
import { getStyles as getFloatingSuggestionStyles } from '../../../FloatingSuggestionsComposite/FloatingSuggestions.styles';
import * as styles from './DefaultEditingItem.scss';
import type {
  IBaseFloatingSuggestionsProps,
  IBaseFloatingPickerHeaderFooterProps,
} from '../../../FloatingSuggestionsComposite/FloatingSuggestions.types';
import type { IFloatingSuggestionItemProps } from '../../../FloatingSuggestionsComposite/FloatingSuggestionsItem/FloatingSuggestionsItem.types';
import type { EditingItemComponentProps } from '../EditableItem';

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

  /**
   * Callback used to retrieve the suggestions to show in the floating suggestions
   */
  getSuggestions: (value: string) => IFloatingSuggestionItemProps<TItem>[];

  /**
   * The header and footer props for the floating picker
   * This should be set here instead of in onRenderFloatingPicker if you want them to be keyboard selectable
   */
  pickerSuggestionsProps?: IBaseFloatingPickerHeaderFooterProps;

  /**
   * Function that specifies how arbitrary text entered into the edit input is handled.
   */
  createGenericItem?: (input: string) => TItem;
}

export type EditingItemInnerFloatingPickerProps<T> = Pick<
  IBaseFloatingSuggestionsProps<T>,
  | 'componentRef'
  | 'suggestions'
  | 'onSuggestionSelected'
  | 'targetElement'
  | 'onRemoveSuggestion'
  | 'onFloatingSuggestionsDismiss'
  | 'onKeyDown'
  | 'selectedSuggestionIndex'
  | 'selectedHeaderIndex'
  | 'selectedFooterIndex'
  | 'pickerSuggestionsProps'
>;

/**
 * Wrapper around an item in a selection well that renders an item with a context menu for
 * replacing that item with another item.
 */
export const DefaultEditingItemInner = <TItem extends any>(
  props: IDefaultEditingItemInnerProps<TItem>,
): JSX.Element => {
  const editingInput = React.useRef<any>();
  const editingFloatingPicker = React.createRef<any>();
  const [editingSuggestions, setEditingSuggestions] = React.useState<IFloatingSuggestionItemProps<TItem>[]>([]);
  const [inputValue, setInputValue] = React.useState<string>('');

  const {
    item,
    onEditingComplete,
    getSuggestions,
    onRemoveItem,
    createGenericItem,
    getEditingItemText,
    pickerSuggestionsProps,
  } = props;

  const {
    focusItemIndex,
    setFocusItemIndex,
    suggestionItems,
    footerItemIndex,
    footerItems,
    headerItemIndex,
    headerItems,
    selectPreviousSuggestion,
    selectNextSuggestion,
  } = useFloatingSuggestionItems(
    editingSuggestions,
    pickerSuggestionsProps?.footerItemsProps,
    pickerSuggestionsProps?.headerItemsProps,
  );

  React.useEffect(() => {
    const itemText: string = getEditingItemText(props.item);

    setEditingSuggestions(getSuggestions(itemText));
    if (editingInput.current) {
      editingInput.current.value = itemText;
      setInputValue(itemText);
      editingInput.current.focus();
    }
    setFocusItemIndex(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // We only want to run this once

  const _renderEditingSuggestions = (): JSX.Element => {
    const FloatingPicker = props.onRenderFloatingPicker;
    if (!FloatingPicker) {
      return <></>;
    }
    return (
      <FloatingPicker
        componentRef={editingFloatingPicker}
        onSuggestionSelected={_onSuggestionSelected}
        targetElement={editingInput.current}
        onRemoveSuggestion={_onRemoveItem}
        onFloatingSuggestionsDismiss={props.onDismiss}
        suggestions={suggestionItems}
        selectedSuggestionIndex={focusItemIndex}
        selectedHeaderIndex={headerItemIndex}
        selectedFooterIndex={footerItemIndex}
        pickerSuggestionsProps={pickerSuggestionsProps}
      />
    );
  };

  const _onInputBlur = React.useCallback(
    (ev: React.FocusEvent<HTMLElement>): void => {
      if (editingFloatingPicker.current) {
        const rootStyles = getStyles({}).root;
        const floatingSuggestionsListClassName = '.' + (Array.isArray(rootStyles) ? rootStyles[0] : rootStyles);
        const triggeredByRecipientPicker =
          (ev.relatedTarget as HTMLElement)?.closest(floatingSuggestionsListClassName) !== null;
        const calloutStyles = getFloatingSuggestionStyles({}).callout;
        const footerClassName = '.' + (Array.isArray(calloutStyles) ? calloutStyles[0] : calloutStyles);
        const triggeredByFooter = (ev.relatedTarget as HTMLElement)?.closest(footerClassName) !== null;

        // We don't want to exit out if the user has clicked on anything in the picker
        if (!triggeredByRecipientPicker && !triggeredByFooter) {
          if (focusItemIndex >= 0) {
            _onSuggestionSelected(ev, suggestionItems[focusItemIndex]);
          } else if (createGenericItem) {
            onEditingComplete(item, createGenericItem(inputValue));
          }
          // else, we come out of editing mode
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps -- these are the only dependencies which matter
    [suggestionItems, focusItemIndex, item, createGenericItem, inputValue, onEditingComplete, editingFloatingPicker],
  );

  const _onInputChange = React.useCallback(
    (ev: React.FormEvent<HTMLElement>): void => {
      const value: string = (ev.target as HTMLInputElement).value;
      setInputValue(value);

      if (value === '') {
        if (onRemoveItem) {
          onRemoveItem(item);
        }
      } else {
        setEditingSuggestions(getSuggestions(value));
      }
    },
    [onRemoveItem, getSuggestions, item],
  );

  const _onInputKeyDown = React.useCallback(
    (ev: React.KeyboardEvent<HTMLInputElement>): void => {
      // eslint-disable-next-line deprecation/deprecation
      const keyCode = ev.which;
      switch (keyCode) {
        case KeyCodes.backspace:
        case KeyCodes.del:
          ev.stopPropagation();
          break;
        case KeyCodes.enter:
        case KeyCodes.tab:
          if (!ev.shiftKey && !ev.ctrlKey && (focusItemIndex >= 0 || footerItemIndex >= 0 || headerItemIndex >= 0)) {
            ev.preventDefault();
            ev.stopPropagation();
            if (focusItemIndex >= 0) {
              // Get the focused element and add it to selectedItemsList
              _onSuggestionSelected(ev, suggestionItems[focusItemIndex]);
            } else if (footerItemIndex >= 0) {
              // execute the footer action
              footerItems![footerItemIndex].onExecute!();
            } else if (headerItemIndex >= 0) {
              // execute the header action
              headerItems![headerItemIndex].onExecute!();
            }
          }
          break;
        case KeyCodes.up:
          ev.preventDefault();
          ev.stopPropagation();
          selectPreviousSuggestion();
          break;
        case KeyCodes.down:
          ev.preventDefault();
          ev.stopPropagation();
          selectNextSuggestion();
          break;
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps -- these are the only dependencies which matter
    [suggestionItems, focusItemIndex, footerItems, footerItemIndex, headerItems, headerItemIndex],
  );

  const _onSuggestionSelected = React.useCallback(
    (ev: any, itemProps: IFloatingSuggestionItemProps<TItem>) => {
      onEditingComplete(item, itemProps.item);
    },
    [onEditingComplete, item],
  );

  const _onRemoveItem = React.useCallback(
    (ev: any, itemProps: IFloatingSuggestionItemProps<TItem>) => {
      if (onRemoveItem) {
        onRemoveItem(itemProps.item);
      }
    },
    [onRemoveItem],
  );

  const itemId = getId();
  const nativeProps = getNativeProps<React.HTMLAttributes<HTMLInputElement>>(props, inputProperties);
  return (
    <span aria-labelledby={'editingItemPersona-' + itemId} className={css('ms-EditingItem', styles.editingContainer)}>
      <input
        {...nativeProps}
        ref={editingInput}
        autoCapitalize={'off'}
        autoComplete={'off'}
        onChange={_onInputChange}
        onKeyDown={_onInputKeyDown}
        onBlur={_onInputBlur}
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

export const DefaultEditingItem =
  <T extends any>(outerProps: EditingItemProps<T>) =>
  (innerProps: EditingItemComponentProps<T>) =>
    <DefaultEditingItemInner {...outerProps} {...innerProps} />;
