import * as React from 'react';
import { useConst } from '@fluentui/react-hooks';
import {
  IFloatingSuggestionItemProps,
  IFloatingSuggestionItem,
  IFloatingPeopleSuggestionsProps,
} from '@fluentui/react-experiments/lib/FloatingPeopleSuggestionsComposite';
import { UnifiedPeoplePicker } from '@fluentui/react-experiments/lib/UnifiedPeoplePicker';
import { IPersonaProps, IPersona, PersonaSize } from '@fluentui/react/lib/Persona';
import { mru, people } from '@fluentui/example-data';
import {
  ISelectedPeopleListProps,
  SelectedPersona,
  TriggerOnContextMenu,
  EditableItem,
  DefaultEditingItem,
  EditingItemInnerFloatingPickerProps,
  ItemWithContextMenu,
  ISelectedItemProps,
} from '@fluentui/react-experiments/lib/SelectedItemsList';
import { IInputProps } from '@fluentui/react';
import { FloatingPeopleSuggestions } from '@fluentui/react-experiments/lib/FloatingPeopleSuggestionsComposite';
import { KeyCodes } from '@fluentui/react-experiments/lib/Utilities';
import { mergeStyleSets } from '@fluentui/react/lib/Styling';

const classNames = mergeStyleSets({
  to: {
    display: 'inline-block',
    position: 'relative',
    height: 32,
    lineHeight: 32,
    margin: '4px',
    minWidth: '52px',
    padding: '0 4px',
    textAlign: 'center',
    color: '#005A9E',
    backgroundColor: '#EFF6FC',
    borderRadius: '2px',
  },
});

const _suggestions = [
  {
    key: '1',
    id: '1',
    displayText: 'Suggestion 1',
    item: mru[0],
    isSelected: true,
    showRemoveButton: true,
  },
  {
    key: '2',
    id: '2',
    displayText: 'Suggestion 2',
    item: mru[1],
    isSelected: false,
    showRemoveButton: true,
  },
  {
    key: '3',
    id: '3',
    displayText: 'Suggestion 3',
    item: mru[2],
    isSelected: false,
    showRemoveButton: true,
  },
  {
    key: '4',
    id: '4',
    displayText: 'Suggestion 4',
    item: mru[3],
    isSelected: false,
    showRemoveButton: true,
  },
  {
    key: '5',
    id: '5',
    displayText: 'Suggestion 5',
    item: mru[4],
    isSelected: false,
    showRemoveButton: true,
  },
] as IFloatingSuggestionItem<IPersonaProps>[];

export const UnifiedPeoplePickerWithEditExample = (): JSX.Element => {
  const [peopleSuggestions, setPeopleSuggestions] = React.useState<IFloatingSuggestionItemProps<IPersonaProps>[]>([
    ..._suggestions,
  ]);

  const [peopleSelectedItems, setPeopleSelectedItems] = React.useState<IPersonaProps[]>([]);
  const [inputText, setInputText] = React.useState<string>('');
  const [editingIndex, setEditingIndex] = React.useState(-1);

  const ref = React.useRef<any>();

  const suggestionProps = useConst(() => {
    return {
      // uncomment below section to see any example of a selectable header item
      headerItemsProps: [
        {
          renderItem: () => {
            return <>People Suggestions</>;
          },
          shouldShow: () => {
            return peopleSuggestions.length > 0;
          },
          /*onExecute: () => {
            alert('People suggestions selected');
          },*/
        },
      ],
      footerItemsProps: [
        {
          renderItem: () => {
            return <>Showing {peopleSuggestions.length} results</>;
          },
          shouldShow: () => {
            return peopleSuggestions.length > 0;
          },
          // uncomment to see an example of multiple selectable footer items
          /*onExecute: () => {
            alert('Showing people suggestions executed');
          },*/
        },
        {
          renderItem: () => {
            return <>Select to log out to console</>;
          },
          shouldShow: () => {
            return peopleSuggestions.length > 0;
          },
          onExecute: () => {
            console.log(peopleSuggestions);
          },
        },
      ],
    };
  });

  const _getSuggestions = (value: string): IFloatingSuggestionItemProps<IPersonaProps>[] => {
    const allPeople = people;
    const suggestions = allPeople.filter((item: IPersonaProps) => _startsWith(item.text || '', value));
    const suggestionList = suggestions.map(item => {
      return { item: item, isSelected: false, key: item.key } as IFloatingSuggestionItem<IPersonaProps>;
    });
    return suggestionList;
  };

  const _isValid = React.useCallback((item: IPersonaProps): boolean => Boolean(item.secondaryText), []);

  const SelectedItemInternal = (props: ISelectedItemProps<IPersonaProps>) => {
    props.item.size = PersonaSize.size48;

    return <SelectedPersona isValid={_isValid} {...props} />;
  };

  /**
   * Build a custom selected item capable of being edited when the item is right clicked
   */
  const SelectedItem = EditableItem({
    editingItemComponent: DefaultEditingItem({
      getEditingItemText: persona => persona.text || '',
      getSuggestions: _getSuggestions,
      pickerSuggestionsProps: suggestionProps,
      onRenderFloatingPicker: (props: EditingItemInnerFloatingPickerProps<IPersonaProps>) => (
        <FloatingPeopleSuggestions {...props} isSuggestionsVisible={true} />
      ),
    }),
    itemComponent: ItemWithContextMenu<IPersona>({
      menuItems: (item, onTrigger) => [
        {
          key: 'copy',
          text: 'copy',
          onClick: () => {
            _copyToClipboardWrapper(item);
          },
        },
        {
          key: 'edit',
          text: 'Edit',
          onClick: () => onTrigger && onTrigger(),
        },
      ],
      itemComponent: TriggerOnContextMenu(SelectedItemInternal),
    }),
    getIsEditing: (item, index) => index === editingIndex,
    onEditingStarted: (item, index) => setEditingIndex(index),
    onEditingCompleted: () => setEditingIndex(-1),
  });

  const _copyToClipboardWrapper = (item: IPersona) => {
    const selectedItems = ref.current?.getSelectedItems();
    if (selectedItems && selectedItems.length > 1) {
      _copyToClipboard(_getItemsCopyText(selectedItems));
    } else {
      _copyToClipboard(_getItemsCopyText([item]));
    }
  };

  const _copyToClipboard = (copyString: string): void => {
    navigator.clipboard.writeText(copyString).then(
      () => {
        /* clipboard successfully set */
      },
      () => {
        /* clipboard write failed */
        throw new Error();
      },
    );
  };

  const _onSuggestionSelected = (
    ev: React.MouseEvent<HTMLElement, MouseEvent>,
    item: IFloatingSuggestionItemProps<IPersonaProps>,
  ) => {
    _markSuggestionSelected(item);
    setPeopleSelectedItems(prevPeopleSelectedItems => [...prevPeopleSelectedItems, item.item]);
  };

  const _onSuggestionRemoved = (
    ev: React.MouseEvent<HTMLElement, MouseEvent>,
    suggestionToRemove: IFloatingSuggestionItemProps<IPersonaProps>,
  ) => {
    // Intentionally checking on complete item object to ensure it is removed. Id cannot be used as the
    // property is not populated for all the suggestions, and key does not exist on type checking.
    setPeopleSuggestions(suggestions => {
      const modifiedSuggestions = suggestions.filter(suggestion => suggestion.item !== suggestionToRemove.item);
      return modifiedSuggestions;
    });
  };

  const _markSuggestionSelected = (selectedSuggestion: IFloatingSuggestionItemProps<IPersonaProps>) => {
    setPeopleSuggestions(suggestions => {
      const modifiedSuggestions = suggestions.map(suggestion =>
        suggestion.id === selectedSuggestion.id
          ? { ...suggestion, isSelected: true }
          : { ...suggestion, isSelected: false },
      );
      return modifiedSuggestions;
    });
  };

  const _getItemsCopyText = (itemsToCopy: IPersonaProps[]): string => {
    let copyText = '';
    if (itemsToCopy && itemsToCopy.length > 0) {
      itemsToCopy.forEach(item => {
        copyText = copyText.concat((item.text || '') + ',');
      });
    }

    return copyText;
  };

  const _onPaste = (pastedValue: string, selectedItemsList: IPersonaProps[]): void => {
    // Find the suggestion corresponding to the specific text name
    // and update the selectedItemsList to re-render everything.
    const newList: IPersonaProps[] = [];
    if (pastedValue !== null) {
      pastedValue.split(',').forEach(textValue => {
        if (textValue) {
          people.forEach(suggestionItem => {
            if (suggestionItem.text === textValue) {
              selectedItemsList.push(suggestionItem);
              newList.push(suggestionItem);
            }
          });
        }
      });
    }

    setPeopleSelectedItems(prevPeopleSelectedItems => [...prevPeopleSelectedItems, ...newList]);
  };

  const _onItemsRemoved = (itemsToRemove: IPersonaProps[]): void => {
    // Updating the local copy as well at the parent level.
    const currentItems: IPersonaProps[] = [...peopleSelectedItems];
    const updatedItems: IPersonaProps[] = currentItems;
    // Intentionally not using .filter here as we want to only remove a specific
    // item in case of duplicates of same item.
    itemsToRemove.forEach(item => {
      const index: number = updatedItems.indexOf(item);
      updatedItems.splice(index, 1);
    });
    setPeopleSelectedItems(updatedItems);
  };

  const _replaceItem = (newItem: IPersonaProps | IPersona[], index: number): void => {
    const newItemsArray = !Array.isArray(newItem) ? [newItem] : newItem;

    if (index >= 0) {
      const newItems: IPersonaProps[] = [...peopleSelectedItems];
      newItems.splice(index, 1, ...newItemsArray);
      setPeopleSelectedItems(newItems);
    }
  };

  const _createGenericItem = (input: string) => {
    if (input) {
      return { text: input };
    } else {
      return null;
    }
  };

  const _addGenericItem = (text: string) => {
    const newItem = _createGenericItem(text);
    if (newItem) {
      setPeopleSelectedItems(prevPeopleSelectedItems => [...prevPeopleSelectedItems, newItem]);
      ref.current?.clearInput();
      setInputText('');
    }
  };

  const _onInputChange = (filterText: string): void => {
    // Add a generic item to the end of the list
    // and clear the input if the user types a semicolon or comma
    const lastCharIndex = filterText.length - 1;
    const lastChar = filterText[lastCharIndex];
    if (lastChar === ';' || lastChar === ',') {
      const itemText = filterText.slice(0, filterText.length - 1);
      _addGenericItem(itemText);
    } else {
      // Save the input text for force resolve
      setInputText(filterText);
    }

    const allPeople = people;
    const suggestions = allPeople.filter((item: IPersonaProps) => _startsWith(item.text || '', filterText));
    const suggestionList = suggestions.map(item => {
      return { item: item, isSelected: false, key: item.key } as IFloatingSuggestionItem<IPersonaProps>;
    });
    // We want to show top 5 results
    setPeopleSuggestions(suggestionList.splice(0, 5));
  };

  function _startsWith(text: string, filterText: string): boolean {
    return text.toLowerCase().indexOf(filterText.toLowerCase()) === 0;
  }

  const _onKeyDown = React.useCallback(
    (ev: React.KeyboardEvent<HTMLDivElement>) => {
      // eslint-disable-next-line deprecation/deprecation
      if (ev.ctrlKey && ev.which === KeyCodes.k) {
        ev.preventDefault();
        // If the input has text, resolve that
        if (inputText !== undefined && inputText !== '' && inputText !== null) {
          // try force resolving, then if that doesn't work, add a generic item
          if (!ref.current?.forceResolve()) {
            _addGenericItem(inputText);
          }
        } else {
          // put invalid items into edit mode
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [inputText, ref],
  );

  const _onValidateInput = React.useCallback((input: string) => {
    return true;
  }, []);

  const _getAccessibleTextForDelete = React.useCallback((items: IPersonaProps[]): string => {
    if (items.length !== 1) {
      return 'Selection deleted';
    }

    return items[0].text || '';
  }, []);

  const floatingPeoplePickerProps = {
    suggestions: [...peopleSuggestions],
    isSuggestionsVisible: false,
    targetElement: null,
    onSuggestionSelected: _onSuggestionSelected,
    onRemoveSuggestion: _onSuggestionRemoved,
    suggestionsHeaderText: 'People suggestions',
    noResultsFoundText: 'No suggestions',
    onFloatingSuggestionsDismiss: undefined,
    showSuggestionRemoveButton: true,
    pickerWidth: '300px',
  } as IFloatingPeopleSuggestionsProps;

  const selectedPeopleListProps = {
    selectedItems: [...peopleSelectedItems],
    removeButtonAriaLabel: 'Remove',
    onItemsRemoved: _onItemsRemoved,
    getItemCopyText: _getItemsCopyText,
    onRenderItem: SelectedItem,
    replaceItem: _replaceItem,
    createGenericItem: _createGenericItem,
  } as ISelectedPeopleListProps<IPersonaProps>;

  const inputProps = {
    'aria-label': 'Add people',
  } as IInputProps;

  return (
    <>
      <UnifiedPeoplePicker
        componentRef={ref}
        selectedItemsListProps={selectedPeopleListProps}
        floatingSuggestionProps={floatingPeoplePickerProps}
        inputProps={inputProps}
        // eslint-disable-next-line react/jsx-no-bind
        onInputChange={_onInputChange}
        // eslint-disable-next-line react/jsx-no-bind
        onPaste={_onPaste}
        defaultDragDropEnabled={false}
        onKeyDown={_onKeyDown}
        onValidateInput={_onValidateInput}
        itemListAriaLabel="Recipient list"
        getAccessibleTextForDelete={_getAccessibleTextForDelete}
        headerComponent={
          <div className={classNames.to} data-is-focusable>
            To
          </div>
        }
      />
    </>
  );
};
