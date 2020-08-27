import * as React from 'react';
import { getStyles } from './UnifiedPicker.styles';
import { classNamesFunction, css, SelectionMode, Selection, KeyCodes } from '../../Utilities';
import { DragDropHelper } from 'office-ui-fabric-react/lib/utilities/dragdrop/DragDropHelper';
import { IUnifiedPickerStyleProps, IUnifiedPickerStyles } from './UnifiedPicker.styles';
import {
  FocusZoneDirection,
  FocusZone,
  SelectionZone,
  Autofill,
  IInputProps,
  MarqueeSelection,
  IDragDropEvents,
} from 'office-ui-fabric-react';
import { IUnifiedPickerProps } from './UnifiedPicker.types';
import { useQueryString } from './hooks/useQueryString';
import { useFloatingSuggestionItems } from './hooks/useFloatingSuggestionItems';
import { useSelectedItems } from './hooks/useSelectedItems';
import { IFloatingSuggestionItemProps } from '../../FloatingSuggestionsComposite';
import { getTheme } from 'office-ui-fabric-react/lib/Styling';
import { mergeStyles } from '@uifabric/merge-styles';

export const UnifiedPicker = <T extends {}>(props: IUnifiedPickerProps<T>): JSX.Element => {
  const getClassNames = classNamesFunction<IUnifiedPickerStyleProps, IUnifiedPickerStyles>();
  const classNames = getClassNames(getStyles);

  const rootRef = React.createRef<HTMLDivElement>();
  const input = React.useRef<Autofill>(null);
  const { setQueryString } = useQueryString('');
  const [selection, setSelection] = React.useState(new Selection({ onSelectionChanged: () => _onSelectionChanged() }));
  const [focusedItemIndices, setFocusedItemIndices] = React.useState(selection.getSelectedIndices() || []);
  const { suggestions, selectedSuggestionIndex, isSuggestionsVisible } = props.floatingSuggestionProps;
  const [draggedIndex, setDraggedIndex] = React.useState<number>(-1);
  const dragDropHelper = new DragDropHelper({
    selection: selection,
  });

  const {
    focusItemIndex,
    suggestionItems,
    isSuggestionsShown,
    showPicker,
    selectPreviousSuggestion,
    selectNextSuggestion,
  } = useFloatingSuggestionItems(suggestions, selectedSuggestionIndex, isSuggestionsVisible);

  const {
    selectedItems,
    addItems,
    dropItemsAt,
    removeItems,
    removeItemAt,
    removeSelectedItems,
    unselectAll,
    getSelectedItems,
    setSelectedItems,
  } = useSelectedItems(selection, props.selectedItemsListProps.selectedItems);

  const _onSelectionChanged = () => {
    showPicker(false);
    setSelection(selection);
    setFocusedItemIndices(selection.getSelectedIndices());
  };

  const {
    className,
    focusZoneProps,
    inputProps,
    onRenderSelectedItems,
    selectedItemsListProps,
    onRenderFloatingSuggestions,
    floatingSuggestionProps,
    headerComponent,
    onInputChange,
  } = props;

  // All of the drag drop functions are the default behavior. Users can override that by setting the dragDropEvents prop
  const theme = getTheme();
  const dragEnterClass = mergeStyles({
    backgroundColor: theme.palette.neutralLight,
  });

  const _onDragEnter = (item?: any, event?: DragEvent): string => {
    // return string is the css classes that will be added to the entering element.
    return dragEnterClass;
  };

  const _dropItemsAt = (insertIndex: number, newItems: T[]): void => {
    let indicesToRemove: number[] = [];
    // If we are moving items within the same picker, remove them from their old places as well
    if (draggedIndex > -1) {
      indicesToRemove = focusedItemIndices.includes(draggedIndex) ? [...focusedItemIndices] : [draggedIndex];
    }
    if (props.selectedItemsListProps.dropItemsAt) {
      props.selectedItemsListProps.dropItemsAt(insertIndex, newItems, indicesToRemove);
    }
    dropItemsAt(insertIndex, newItems, indicesToRemove);
  };

  const _onDrop = (item?: any, event?: DragEvent): void => {
    const insertIndex = selectedItems.indexOf(item);
    let isDropHandled = false;
    if (event?.dataTransfer) {
      event.preventDefault();
      const data = event.dataTransfer.items;
      for (let i = 0; i < data.length; i++) {
        if (data[i].kind === 'string' && data[i].type === props.customClipboardType) {
          data[i].getAsString((dropText: string) => {
            if (props.selectedItemsListProps.deserializeItemsFromDrop) {
              const newItems = props.selectedItemsListProps.deserializeItemsFromDrop(dropText);
              _dropItemsAt(insertIndex, newItems);
              isDropHandled = true;
            }
          });
        }
      }
    }
    if (!isDropHandled && draggedIndex > -1) {
      const newItems = focusedItemIndices.includes(draggedIndex)
        ? (getSelectedItems() as T[])
        : [selectedItems[draggedIndex]];
      _dropItemsAt(insertIndex, newItems);
    }
  };

  const _onDragStart = (item?: any, itemIndex?: number, tempSelectedItems?: any[], event?: DragEvent): void => {
    const draggedItemIndex = itemIndex ? itemIndex! : -1;
    setDraggedIndex(draggedItemIndex);
    if (event) {
      const dataList = event?.dataTransfer?.items;
      if (props.selectedItemsListProps.serializeItemsForDrag && props.customClipboardType) {
        const draggedItems = focusedItemIndices.includes(draggedItemIndex) ? [...getSelectedItems()] : [item];
        const dragText = props.selectedItemsListProps.serializeItemsForDrag(draggedItems);
        dataList?.add(dragText, props.customClipboardType);
      }
    }
  };

  const _onDragEnd = (item?: any, event?: DragEvent): void => {
    setDraggedIndex(-1);
    if (event) {
      const dataList = event?.dataTransfer?.items;
      // Clear any remaining drag data
      dataList?.clear();
    }
  };

  const defaultDragDropEvents: IDragDropEvents = {
    canDrop: () => true,
    canDrag: () => true,
    onDragEnter: _onDragEnter,
    onDragLeave: () => undefined,
    onDrop: _onDrop,
    onDragStart: _onDragStart,
    onDragEnd: _onDragEnd,
  };

  const _onBackspace = (ev: React.KeyboardEvent<HTMLDivElement>) => {
    if (ev.which !== KeyCodes.backspace) {
      return;
    }

    if (selectedItems.length) {
      if (
        focusedItemIndices.length === 0 &&
        input &&
        input.current &&
        !input.current.isValueSelected &&
        input.current.inputElement === document.activeElement &&
        (input.current as Autofill).cursorLocation === 0
      ) {
        showPicker(false);
        ev.preventDefault();
        if (props.selectedItemsListProps.onItemsRemoved) {
          props.selectedItemsListProps.onItemsRemoved([selectedItems[selectedItems.length - 1]]);
        }
        removeItemAt(selectedItems.length - 1);
      } else if (focusedItemIndices.length > 0) {
        showPicker(false);
        ev.preventDefault();
        if (props.selectedItemsListProps.onItemsRemoved) {
          props.selectedItemsListProps.onItemsRemoved(getSelectedItems());
        }
        removeSelectedItems();
        input.current?.focus();
      }
    }
  };

  const _onInputKeyDown = (ev: React.KeyboardEvent<Autofill | HTMLElement>) => {
    if (isSuggestionsShown) {
      const keyCode = ev.which;
      switch (keyCode) {
        case KeyCodes.escape:
          showPicker(false);
          ev.preventDefault();
          ev.stopPropagation();
          break;
        case KeyCodes.enter:
        case KeyCodes.tab:
          if (!ev.shiftKey && !ev.ctrlKey && focusItemIndex >= 0) {
            ev.preventDefault();
            ev.stopPropagation();
            // Get the focused element and add it to selectedItemsList
            showPicker(false);
            _onSuggestionSelected(ev, suggestionItems[focusItemIndex]);
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
    }
  };

  const _onCopy = (ev: React.ClipboardEvent<HTMLInputElement>) => {
    if (focusedItemIndices.length > 0 && props.selectedItemsListProps?.getItemCopyText) {
      const copyItems = selection.getSelection() as T[];
      const copyString = props.selectedItemsListProps.getItemCopyText(copyItems);
      ev.clipboardData.setData('text/plain', copyString);
      ev.preventDefault();
    }
  };
  const _onInputFocus = (ev: React.FocusEvent<HTMLInputElement | Autofill>): void => {
    unselectAll();
    if (props.inputProps && props.inputProps.onFocus) {
      props.inputProps.onFocus(ev as React.FocusEvent<HTMLInputElement>);
    }
  };
  const _onInputClick = () => {
    unselectAll();
    showPicker(true);
  };
  const _onInputChange = (value: string, composing?: boolean) => {
    if (!composing) {
      // update query string
      setQueryString(value);
      !isSuggestionsVisible ? showPicker(true) : null;
      onInputChange ? onInputChange(value) : null;
    }
  };
  const _onPaste = (ev: React.ClipboardEvent<Autofill | HTMLInputElement>) => {
    if (props.onPaste) {
      const inputText = ev.clipboardData.getData('Text');
      ev.preventDefault();
      // Pass current selected items
      props.onPaste(inputText, selectedItems);
      setSelectedItems(selectedItems);
      selection.setItems(selectedItems);
    }
  };

  const _renderSelectedItemsList = (): JSX.Element => {
    return onRenderSelectedItems({
      ...selectedItemsListProps,
      selectedItems: selectedItems,
      focusedItemIndices: focusedItemIndices,
      onItemsRemoved: _onRemoveSelectedItems,
      dragDropHelper: dragDropHelper,
      dragDropEvents: props.dragDropEvents ? props.dragDropEvents : defaultDragDropEvents,
    });
  };
  const _canAddItems = () => true;
  const _onFloatingSuggestionsDismiss = (ev: React.MouseEvent): void => {
    if (props.floatingSuggestionProps.onFloatingSuggestionsDismiss) {
      props.floatingSuggestionProps.onFloatingSuggestionsDismiss();
    }
    showPicker(false);
  };
  const _onFloatingSuggestionRemoved = (ev: any, item: IFloatingSuggestionItemProps<T>) => {
    if (props.floatingSuggestionProps.onRemoveSuggestion) {
      props.floatingSuggestionProps.onRemoveSuggestion(ev, item);
    }
    // We want to keep showing the picker to show the user that the entry has been removed from the list.
    showPicker(true);
  };
  const _onSuggestionSelected = (ev: any, item: IFloatingSuggestionItemProps<T>) => {
    addItems([item.item]);
    if (props.floatingSuggestionProps.onSuggestionSelected) {
      props.floatingSuggestionProps.onSuggestionSelected(ev, item);
    }
    if (input.current) {
      input.current.clear();
    }
    showPicker(false);
  };
  const _onRemoveSelectedItems = (itemsToRemove: T[]) => {
    removeItems(itemsToRemove);
    if (props.selectedItemsListProps.onItemsRemoved) {
      props.selectedItemsListProps.onItemsRemoved(itemsToRemove);
    }
  };
  const _renderFloatingPicker = () =>
    onRenderFloatingSuggestions({
      ...floatingSuggestionProps,
      targetElement: input.current?.inputElement,
      isSuggestionsVisible: isSuggestionsShown,
      suggestions: suggestionItems,
      selectedSuggestionIndex: focusItemIndex,
      onFloatingSuggestionsDismiss: _onFloatingSuggestionsDismiss,
      onSuggestionSelected: _onSuggestionSelected,
      onKeyDown: _onInputKeyDown,
      onRemoveSuggestion: _onFloatingSuggestionRemoved,
    });

  return (
    <div
      ref={rootRef}
      className={css('ms-BasePicker ms-BaseExtendedPicker', className ? className : '')}
      onKeyDown={_onBackspace}
      onCopy={_onCopy}
    >
      <FocusZone direction={FocusZoneDirection.bidirectional} {...focusZoneProps}>
        <MarqueeSelection selection={selection} isEnabled={true}>
          <SelectionZone selection={selection} selectionMode={SelectionMode.multiple}>
            <div className={css('ms-BasePicker-text', classNames.pickerText)}>
              {headerComponent}
              {_renderSelectedItemsList()}
              {_canAddItems() && (
                <div
                  aria-owns={isSuggestionsShown ? 'suggestion-list' : undefined}
                  aria-expanded={isSuggestionsShown}
                  aria-haspopup="listbox"
                  role="combobox"
                >
                  <Autofill
                    {...(inputProps as IInputProps)}
                    className={css('ms-BasePicker-input', classNames.pickerInput)}
                    ref={input}
                    /* eslint-disable react/jsx-no-bind */
                    onFocus={_onInputFocus}
                    onClick={_onInputClick}
                    onInputValueChange={_onInputChange}
                    /* eslint-enable react/jsx-no-bind */
                    aria-autocomplete="list"
                    aria-activedescendant={
                      isSuggestionsShown && focusItemIndex >= 0
                        ? 'FloatingSuggestionsItemId-' + focusItemIndex
                        : undefined
                    }
                    disabled={false}
                    /* eslint-disable react/jsx-no-bind */
                    onPaste={_onPaste}
                    onKeyDown={_onInputKeyDown}
                    /* eslint-enable react/jsx-no-bind */
                  />
                </div>
              )}
            </div>
          </SelectionZone>
        </MarqueeSelection>
      </FocusZone>
      {_renderFloatingPicker()}
    </div>
  );
};
