import * as React from 'react';
import { getStyles } from './UnifiedPicker.styles';
import { classNamesFunction, css, SelectionMode, Selection, KeyCodes } from '../../Utilities';
import { DragDropHelper } from '@fluentui/react/lib/DragDrop';
import { FocusZoneDirection, FocusZone, SelectionZone, Autofill } from '@fluentui/react';
import { useFloatingSuggestionItems } from './hooks/useFloatingSuggestionItems';
import { useSelectedItems } from './hooks/useSelectedItems';
import { getTheme } from '@fluentui/react/lib/Styling';
import { mergeStyles } from '@fluentui/merge-styles';
import { Announced } from '@fluentui/react/lib/Announced';
import type { IDragDropContext } from '@fluentui/react/lib/DragDrop';
import type { IUnifiedPickerStyleProps, IUnifiedPickerStyles } from './UnifiedPicker.styles';
import type { IInputProps, IDragDropEvents } from '@fluentui/react';
import type { IUnifiedPickerProps } from './UnifiedPicker.types';
import type { IFloatingSuggestionItemProps } from '../../FloatingSuggestionsComposite';

export const UnifiedPicker = <T extends {}>(props: IUnifiedPickerProps<T>): JSX.Element => {
  const getClassNames = classNamesFunction<IUnifiedPickerStyleProps, IUnifiedPickerStyles>();
  const classNames = getClassNames(getStyles);

  const {
    dragDropEvents,
    onKeyDown,
    onDropAutoFill,
    onPaste,
    className,
    focusZoneProps,
    inputProps,
    onRenderSelectedItems,
    selectedItemsListProps,
    onRenderFloatingSuggestions,
    floatingSuggestionProps,
    headerComponent,
    onInputChange,
    customClipboardType,
    onValidateInput,
    itemListAriaLabel,
    getAccessibleTextForDelete,
  } = props;

  const {
    pickerWidth,
    suggestions,
    selectedSuggestionIndex,
    selectedFooterIndex,
    selectedHeaderIndex,
    pickerSuggestionsProps,
    isSuggestionsVisible,
    onSuggestionSelected,
    onFloatingSuggestionsDismiss,
    onRemoveSuggestion,
  } = props.floatingSuggestionProps;

  const {
    onItemsRemoved: selectedItemsListOnItemsRemoved,
    dropItemsAt: selectedItemsListDropItemsAt,
    getItemCopyText: selectedItemsListGetItemCopyText,
    replaceItem: selectedItemsListReplaceItem,
    itemsAreEqual,
    deserializeItemsFromDrop,
    serializeItemsForDrag,
    createGenericItem,
  } = props.selectedItemsListProps;

  const { onClick: inputPropsOnClick, onFocus: inputPropsOnFocus } = props.inputProps || {};

  const rootRef = React.createRef<HTMLDivElement>();
  const input = React.useRef<Autofill>(null);
  const [selection, setSelection] = React.useState(new Selection({ onSelectionChanged: () => _onSelectionChanged() }));
  const [focusedItemIndices, setFocusedItemIndices] = React.useState(selection.getSelectedIndices() || []);
  const [announcementText, setAnnouncementText] = React.useState('');

  const [draggedIndex, setDraggedIndex] = React.useState<number>(-1);
  const dragDropHelper = new DragDropHelper({
    selection: selection,
  });

  const {
    focusItemIndex,
    suggestionItems,
    footerItemIndex,
    footerItems,
    headerItemIndex,
    headerItems,
    isSuggestionsShown,
    showPicker,
    selectPreviousSuggestion,
    selectNextSuggestion,
    queryString,
    setQueryString,
  } = useFloatingSuggestionItems(
    suggestions,
    pickerSuggestionsProps?.footerItemsProps,
    pickerSuggestionsProps?.headerItemsProps,
    selectedSuggestionIndex,
    selectedFooterIndex,
    selectedHeaderIndex,
    isSuggestionsVisible,
  );

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
    selectAll,
  } = useSelectedItems(selection, props.selectedItemsListProps.selectedItems);

  const _onSelectionChanged = () => {
    showPicker(false);
    setSelection(selection);
    setFocusedItemIndices(selection.getSelectedIndices());
  };

  const defaultDragDropEnabled = props.defaultDragDropEnabled !== undefined ? props.defaultDragDropEnabled : true;

  const autofillDragDropEnabled =
    props.autofillDragDropEnabled !== undefined ? props.autofillDragDropEnabled : defaultDragDropEnabled;

  React.useImperativeHandle(props.componentRef, () => ({
    clearInput: () => {
      if (input.current) {
        input.current.clear();
      }
    },
    focus: () => {
      if (input.current) {
        input.current.focus();
      }
    },
    getSelectedItems: () => {
      return getSelectedItems() as T[];
    },
    forceResolve: () => {
      if (focusItemIndex >= 0) {
        _onSuggestionSelected(undefined, suggestionItems[focusItemIndex]);
        return true;
      } else {
        return false;
      }
    },
  }));

  // All of the drag drop functions are the default behavior. Users can override that by setting the dragDropEvents prop
  const theme = getTheme();
  const dragEnterClass = mergeStyles({
    backgroundColor: theme.palette.neutralLight,
  });

  const setDeleteAnnouncementText = React.useCallback(
    (items: T[]): void => {
      if (getAccessibleTextForDelete) {
        setAnnouncementText(getAccessibleTextForDelete(items));
      }
    },
    [getAccessibleTextForDelete],
  );

  const _onDragEnter = (item?: any, event?: DragEvent): string => {
    // return string is the css classes that will be added to the entering element.
    return dragEnterClass;
  };

  let insertIndex = -1;
  let isInDropAction = false;
  let deferDropActionToDragEnd = false;
  let deferredDropAction: (() => void) | undefined = undefined;
  const _dropItemsAt = (newItems: T[]): void => {
    const isDragWithinTheSameWell = draggedIndex > -1;
    function _dropItemsAtInner(): void {
      let indicesToRemove: number[] = [];
      // If we are moving items within the same picker, remove them from their old places as well
      if (isDragWithinTheSameWell) {
        indicesToRemove = focusedItemIndices.includes(draggedIndex) ? [...focusedItemIndices] : [draggedIndex];
      }
      selectedItemsListDropItemsAt?.(insertIndex, newItems, indicesToRemove);
      dropItemsAt(insertIndex, newItems, indicesToRemove);
      unselectAll();
      insertIndex = -1;
      setDraggedIndex(-1);
      isInDropAction = false;
    }

    // The dropItemsAt() call above will unregister all the dragndrop handlers.
    // If the onDragEnd handler has not yet run, then defer this code until *after* the onDragEnd handler,
    // so that we can reliably execute all the handlers when dragging WITHIN the same well.
    if (deferDropActionToDragEnd) {
      deferredDropAction = _dropItemsAtInner;
    } else {
      _dropItemsAtInner();
    }
  };

  const _onDragOverAutofill = (event?: React.DragEvent<HTMLDivElement>) => {
    if (autofillDragDropEnabled) {
      event?.preventDefault();
    }
  };

  const _onDropAutoFill = (event?: React.DragEvent<HTMLDivElement>) => {
    isInDropAction = true;
    event?.preventDefault();
    if (onDropAutoFill) {
      onDropAutoFill(event);
    } else {
      insertIndex = selectedItems.length;
      _onDropInner(event?.dataTransfer);
    }
  };

  const _canDrop = (dropContext?: IDragDropContext, dragContext?: IDragDropContext): boolean => {
    return defaultDragDropEnabled && !focusedItemIndices.includes(dropContext!.index);
  };

  const _onDropList = (item?: any, event?: DragEvent): void => {
    isInDropAction = true;
    /* indexOf compares using strict equality
       if the item is something where properties can change frequently, then the
       itemsAreEqual prop should be overloaded
       Otherwise it's possible for the indexOf check to fail and return -1 */
    if (itemsAreEqual) {
      insertIndex = selectedItems.findIndex(currentItem => (itemsAreEqual ? itemsAreEqual(currentItem, item) : false));
    } else {
      insertIndex = selectedItems.indexOf(item);
    }

    event?.preventDefault();
    _onDropInner(event?.dataTransfer !== null ? event?.dataTransfer : undefined);
  };

  const _onDropInner = (dataTransfer?: DataTransfer): void => {
    const isDragWithinTheSameWell = draggedIndex > -1;
    deferDropActionToDragEnd = isDragWithinTheSameWell;
    let isDropHandled = false;
    if (dataTransfer) {
      const data = dataTransfer.items;
      for (let i = 0; i < data.length; i++) {
        if (data[i].kind === 'string' && data[i].type === customClipboardType) {
          data[i].getAsString((dropText: string) => {
            if (deserializeItemsFromDrop) {
              const newItems = deserializeItemsFromDrop(dropText);
              _dropItemsAt(newItems);
            }
          });
          isDropHandled = true;
          break;
        }
      }
    }
    if (!isDropHandled && isDragWithinTheSameWell) {
      const newItems = focusedItemIndices.includes(draggedIndex)
        ? (getSelectedItems() as T[])
        : [selectedItems[draggedIndex]];
      _dropItemsAt(newItems);
    }
  };

  const _onDragStart = (item?: any, itemIndex?: number, tempSelectedItems?: any[], event?: DragEvent): void => {
    /* eslint-disable-next-line eqeqeq */
    const draggedItemIndex = itemIndex != null ? itemIndex! : -1;
    setDraggedIndex(draggedItemIndex);
    if (event && event.dataTransfer) {
      event.dataTransfer.effectAllowed = 'move';
    }

    if (event) {
      const dataList = event?.dataTransfer?.items;
      if (serializeItemsForDrag && customClipboardType) {
        const draggedItems = focusedItemIndices.includes(draggedItemIndex) ? [...getSelectedItems()] : [item];
        const dragText = serializeItemsForDrag(draggedItems);
        dataList?.add(dragText, customClipboardType);
      }
    }
  };

  const _onDragEnd = (item?: any, event?: DragEvent): void => {
    // Because these calls are async, it's possible for us to get the drag end call while
    // we're in the middle of a drop action, so don't run the delete code if that's the case
    if (event && !isInDropAction) {
      // If we have a move event, and we still have selected items (indicating that we
      // haven't already moved items within the well) we should remove the item(s)
      if (event.dataTransfer?.dropEffect === 'move' && focusedItemIndices.length > 0) {
        const itemsToRemove = focusedItemIndices.includes(draggedIndex)
          ? (getSelectedItems() as T[])
          : [selectedItems[draggedIndex]];
        const indicesToRemove = focusedItemIndices.includes(draggedIndex) ? focusedItemIndices : [draggedIndex];
        _onRemoveSelectedItems(itemsToRemove, indicesToRemove);
      }
      // Clear any remaining drag data
      const dataList = event?.dataTransfer?.items;
      dataList?.clear();
    }

    // Ensure the dropAction executes *after* the onDragEnd handler runs.
    deferredDropAction?.();
    deferredDropAction = undefined;
    deferDropActionToDragEnd = false;

    setDraggedIndex(-1);
    isInDropAction = false;
  };

  const defaultDragDropEvents: IDragDropEvents = {
    canDrop: _canDrop,
    canDrag: () => defaultDragDropEnabled,
    onDragEnter: _onDragEnter,
    onDragLeave: () => undefined,
    onDrop: _onDropList,
    onDragStart: _onDragStart,
    onDragEnd: _onDragEnd,
  };

  const _onSuggestionSelected = React.useCallback(
    (ev: any, item: IFloatingSuggestionItemProps<T>) => {
      addItems([item.item]);
      onSuggestionSelected?.(ev, item);
      if (input.current) {
        input.current.clear();
      }
      showPicker(false);
    },
    [addItems, onSuggestionSelected, showPicker],
  );

  const _onKeyDown = React.useCallback(
    (ev: React.KeyboardEvent<HTMLDivElement>) => {
      // Allow the caller to handle the key down
      onKeyDown?.(ev);

      // eslint-disable-next-line deprecation/deprecation
      if (ev.ctrlKey && ev.which === KeyCodes.a) {
        selectAll();
      }

      // This is a temporary work around, it has localization issues
      // we plan on rewriting how this works in the future
      /* eslint-disable deprecation/deprecation */
      const isDel = ev.which === KeyCodes.del;
      const isCut = (ev.shiftKey && isDel) || (ev.ctrlKey && ev.which === KeyCodes.x);
      const isBackspace = ev.which === KeyCodes.backspace;
      const isCopy = ev.ctrlKey && ev.which === KeyCodes.c;
      /* eslint-enable deprecation/deprecation */
      const needToCopy = isCut || isCopy;
      const needToDelete =
        (isBackspace && selectedItems.length > 0) || ((isCut || isDel) && focusedItemIndices.length > 0);

      // Handle copy (or cut) if focus is in the selected items list
      if (needToCopy) {
        if (focusedItemIndices.length > 0 && selectedItemsListGetItemCopyText) {
          ev.preventDefault();
          const copyItems = selection.getSelection() as T[];
          const copyString = selectedItemsListGetItemCopyText(copyItems);
          navigator.clipboard.writeText(copyString).then(
            () => {
              /* clipboard successfully set */
            },
            () => {
              /* clipboard write failed */
              // Swallow the error
            },
          );
        }
      }
      // Handle delete of items via Backspace/Del/Ctrl+X
      if (needToDelete) {
        if (
          focusedItemIndices.length === 0 &&
          input &&
          input.current &&
          !input.current.isValueSelected &&
          input.current.inputElement === ev.currentTarget.ownerDocument.activeElement &&
          (input.current as Autofill).cursorLocation === 0
        ) {
          const indexToRemove = selectedItems.length - 1;
          const item = selectedItems[indexToRemove];
          showPicker(false);
          ev.preventDefault();
          setDeleteAnnouncementText([item]);
          selectedItemsListOnItemsRemoved?.([item], [indexToRemove]);
          removeItemAt(selectedItems.length - 1);
        } else if (focusedItemIndices.length > 0) {
          showPicker(false);
          ev.preventDefault();
          setDeleteAnnouncementText(getSelectedItems());
          selectedItemsListOnItemsRemoved?.(getSelectedItems(), focusedItemIndices);
          removeSelectedItems();
          input.current?.focus();
        }
      }
    },
    [
      focusedItemIndices,
      getSelectedItems,
      onKeyDown,
      removeItemAt,
      removeSelectedItems,
      selectedItems,
      selectedItemsListGetItemCopyText,
      selectedItemsListOnItemsRemoved,
      selection,
      showPicker,
      selectAll,
      setDeleteAnnouncementText,
    ],
  );

  const _onValidateInput = React.useCallback(() => {
    if (onValidateInput && createGenericItem) {
      const itemToConvert = createGenericItem(queryString, onValidateInput(queryString));
      if (itemToConvert !== null && itemToConvert !== undefined) {
        _onSuggestionSelected(undefined, { item: itemToConvert, isSelected: false });
      }
    }
  }, [onValidateInput, createGenericItem, queryString, _onSuggestionSelected]);

  const _onInputKeyDown = React.useCallback(
    (ev: React.KeyboardEvent<Autofill | HTMLElement>) => {
      if (isSuggestionsShown) {
        // eslint-disable-next-line deprecation/deprecation
        const keyCode = ev.which;
        switch (keyCode) {
          case KeyCodes.escape:
            showPicker(false);
            ev.preventDefault();
            ev.stopPropagation();
            break;
          case KeyCodes.enter:
          case KeyCodes.tab:
            if (!ev.shiftKey && !ev.ctrlKey && (focusItemIndex >= 0 || footerItemIndex >= 0 || headerItemIndex >= 0)) {
              ev.preventDefault();
              ev.stopPropagation();
              if (focusItemIndex >= 0) {
                // Get the focused element and add it to selectedItemsList
                showPicker(false);
                _onSuggestionSelected(ev, suggestionItems[focusItemIndex]);
              } else if (footerItemIndex >= 0) {
                // execute the footer action
                footerItems![footerItemIndex].onExecute!();
              } else if (headerItemIndex >= 0) {
                // execute the header action
                headerItems![headerItemIndex].onExecute!();
              }
            } else {
              _onValidateInput();
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
    },
    [
      _onSuggestionSelected,
      focusItemIndex,
      footerItemIndex,
      footerItems,
      headerItemIndex,
      headerItems,
      isSuggestionsShown,
      selectNextSuggestion,
      selectPreviousSuggestion,
      showPicker,
      suggestionItems,
      _onValidateInput,
    ],
  );

  React.useEffect(() => {
    const inputElement = input.current?.inputElement;
    inputElement?.addEventListener('keydown', _onInputKeyDown as () => void);

    return () => {
      inputElement?.removeEventListener('keydown', _onInputKeyDown as () => void);
    };
  });

  const _onCopy = React.useCallback(
    (ev: React.ClipboardEvent<HTMLInputElement>) => {
      if (focusedItemIndices.length > 0 && selectedItemsListGetItemCopyText) {
        const copyItems = selection.getSelection() as T[];
        const copyString = selectedItemsListGetItemCopyText(copyItems);
        ev.clipboardData.setData('text/plain', copyString);
        ev.preventDefault();
      }
    },
    [focusedItemIndices.length, selectedItemsListGetItemCopyText, selection],
  );

  const _onInputFocus = React.useCallback(
    (ev: React.FocusEvent<HTMLInputElement | Autofill>): void => {
      unselectAll();
      inputPropsOnFocus?.(ev as React.FocusEvent<HTMLInputElement>);
    },
    [inputPropsOnFocus, unselectAll],
  );

  const _onInputClick = React.useCallback(
    (ev: React.MouseEvent<HTMLInputElement | Autofill>) => {
      unselectAll();
      showPicker(true);
      inputPropsOnClick?.(ev as React.MouseEvent<HTMLInputElement>);
    },
    [inputPropsOnClick, showPicker, unselectAll],
  );

  const _onInputChange = React.useCallback(
    (value: string, composing?: boolean, resultItemsList?: T[]) => {
      if (!composing) {
        // update query string
        setQueryString(value);
        // if suggestions aren't showing and we haven't just cleared the input, show the picker
        !isSuggestionsShown && value !== '' ? showPicker(true) : null;
        if (!resultItemsList) {
          resultItemsList = [];
        }
        if (onInputChange) {
          onInputChange(value, composing, resultItemsList);
          if (resultItemsList && resultItemsList.length > 0) {
            addItems(resultItemsList);
            showPicker(false);
            // Clear the input
            if (input.current) {
              input.current.clear();
            }
          }
        }
      }
    },
    [addItems, isSuggestionsShown, onInputChange, setQueryString, showPicker],
  );

  const _onPaste = React.useCallback(
    (ev: React.ClipboardEvent<Autofill | HTMLInputElement>) => {
      if (onPaste) {
        const inputText = ev.clipboardData.getData('Text');
        ev.preventDefault();
        // Pass current selected items
        onPaste(inputText, selectedItems);
        setSelectedItems(selectedItems);
        selection.setItems(selectedItems);
      }
    },
    [onPaste, selectedItems, selection, setSelectedItems],
  );

  const _renderSelectedItemsList = (): JSX.Element => {
    return onRenderSelectedItems({
      ...selectedItemsListProps,
      selectedItems: selectedItems,
      focusedItemIndices: focusedItemIndices,
      onItemsRemoved: _onRemoveSelectedItems,
      replaceItem: _replaceItem,
      dragDropHelper: dragDropHelper,
      dragDropEvents: dragDropEvents || defaultDragDropEvents,
    });
  };

  const _onFloatingSuggestionsDismiss = React.useCallback(
    (ev: React.MouseEvent): void => {
      onFloatingSuggestionsDismiss?.(ev);
      showPicker(false);
    },
    [onFloatingSuggestionsDismiss, showPicker],
  );

  const _onFloatingSuggestionRemoved = React.useCallback(
    (ev: any, item: IFloatingSuggestionItemProps<T>) => {
      onRemoveSuggestion?.(ev, item);
      // We want to keep showing the picker to show the user that the entry has been removed from the list.
      showPicker(true);
    },
    [onRemoveSuggestion, showPicker],
  );

  const _onRemoveSelectedItems = React.useCallback(
    (itemsToRemove: T[], indicesToRemove: number[]) => {
      setDeleteAnnouncementText(itemsToRemove);
      removeItems(itemsToRemove, indicesToRemove);
      selectedItemsListOnItemsRemoved?.(itemsToRemove, indicesToRemove);
    },
    [selectedItemsListOnItemsRemoved, removeItems, setDeleteAnnouncementText],
  );

  const _replaceItem = React.useCallback(
    (newItem: T | T[], index: number) => {
      const newItems = Array.isArray(newItem) ? newItem : [newItem];
      dropItemsAt(index, newItems, [index]);
      selectedItemsListReplaceItem?.(newItem, index);
    },
    [dropItemsAt, selectedItemsListReplaceItem],
  );

  const _renderFloatingPicker = () =>
    onRenderFloatingSuggestions({
      ...floatingSuggestionProps,
      pickerWidth: pickerWidth || '300px',
      targetElement: input.current?.inputElement,
      isSuggestionsVisible: isSuggestionsShown,
      suggestions: suggestionItems,
      selectedSuggestionIndex: focusItemIndex,
      selectedFooterIndex: footerItemIndex,
      selectedHeaderIndex: headerItemIndex,
      pickerSuggestionsProps: pickerSuggestionsProps,
      onFloatingSuggestionsDismiss: _onFloatingSuggestionsDismiss,
      onSuggestionSelected: _onSuggestionSelected,
      onKeyDown: _onInputKeyDown,
      onRemoveSuggestion: _onFloatingSuggestionRemoved,
    });

  const renderPickerInput = () => {
    return (
      <div
        aria-owns={isSuggestionsShown ? 'suggestion-list' : undefined}
        aria-expanded={isSuggestionsShown}
        aria-haspopup="listbox"
        role="combobox"
        className={css('ms-BasePicker-div', classNames.pickerDiv)}
        onDrop={_onDropAutoFill}
        onDragOver={_onDragOverAutofill}
      >
        <Autofill
          {...(inputProps as IInputProps)}
          className={css('ms-BasePicker-input', classNames.pickerInput)}
          ref={input}
          onFocus={_onInputFocus}
          onClick={_onInputClick}
          onInputValueChange={_onInputChange}
          aria-autocomplete="list"
          aria-activedescendant={
            isSuggestionsShown && focusItemIndex >= 0 ? 'FloatingSuggestionsItemId-' + focusItemIndex : undefined
          }
          disabled={false}
          onPaste={_onPaste}
          suggestedDisplayValue={queryString}
        />
      </div>
    );
  };

  const _canAddItems = () => true;

  return (
    <div
      ref={rootRef}
      className={css('ms-BasePicker ms-BaseExtendedPicker', className ? className : '')}
      onKeyDown={_onKeyDown}
      onCopy={_onCopy}
    >
      <FocusZone
        direction={FocusZoneDirection.bidirectional}
        {...focusZoneProps}
        /* TODO: create mouse drag selection capability */
      >
        <SelectionZone
          selection={selection}
          selectionMode={SelectionMode.multiple}
          className={css('ms-UnifiedPicker-selectionZone', classNames.selectionZone)}
        >
          <div className={css('ms-BasePicker-text', classNames.pickerText)}>
            <Announced message={announcementText} />
            <div
              className={css('ms-UnifiedPicker-listDiv', classNames.listDiv)}
              role={selectedItems.length > 0 ? 'listbox' : ''}
              aria-orientation={'horizontal'}
              aria-multiselectable={'true'}
              aria-label={itemListAriaLabel}
            >
              {headerComponent}
              {_renderSelectedItemsList()}
              {_canAddItems() && renderPickerInput()}
            </div>
          </div>
        </SelectionZone>
      </FocusZone>
      {_renderFloatingPicker()}
    </div>
  );
};
