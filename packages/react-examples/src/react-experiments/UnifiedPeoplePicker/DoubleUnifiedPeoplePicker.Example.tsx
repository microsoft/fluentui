import * as React from 'react';
import {
  IFloatingSuggestionItemProps,
  IFloatingSuggestionItem,
  IFloatingPeopleSuggestionsProps,
} from '@fluentui/react-experiments/lib/FloatingPeopleSuggestionsComposite';
import { UnifiedPeoplePicker } from '@fluentui/react-experiments/lib/UnifiedPeoplePicker';
import { IPersonaProps } from '@fluentui/react/lib/Persona';
import { mru, people } from '@fluentui/example-data';
import { ISelectedPeopleListProps } from '@fluentui/react-experiments/lib/SelectedItemsList';
import { IInputProps } from '@fluentui/react';

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

const UnifiedPeoplePickerExample = (): JSX.Element => {
  const [peopleSuggestions, setPeopleSuggestions] = React.useState<IFloatingSuggestionItemProps<IPersonaProps>[]>([
    ..._suggestions,
  ]);

  const [peopleSelectedItems, setPeopleSelectedItems] = React.useState<IPersonaProps[]>([]);

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

  const _serializeItemsForDrag = (items: IPersonaProps[]): string => {
    return _getItemsCopyText(items);
  };

  const _deserializeItemsFromDrop = (input: string): IPersonaProps[] => {
    // Turn the dropped text into items
    const newItems: IPersonaProps[] = [];
    if (input !== null) {
      input.split(',').forEach(textValue => {
        if (textValue) {
          people.forEach(suggestionItem => {
            if (suggestionItem.text === textValue) {
              newItems.push(suggestionItem);
            }
          });
        }
      });
    }
    return newItems;
  };

  const _dropItemsAt = (insertIndex: number, newItems: IPersonaProps[], indicesToRemove: number[]): void => {
    // Insert those items into the current list
    if (insertIndex > -1) {
      const currentItems: IPersonaProps[] = [...peopleSelectedItems];
      const updatedItems: IPersonaProps[] = [];

      for (let i = 0; i < currentItems.length; i++) {
        const item = currentItems[i];
        // If this is the insert before index, insert the dragged items, then the current item
        if (i === insertIndex) {
          newItems.forEach(draggedItem => {
            updatedItems.push(draggedItem);
          });
          updatedItems.push(item);
        } else if (!indicesToRemove.includes(i)) {
          // only insert items into the new list that are not being dragged
          updatedItems.push(item);
        }
      }
      if (insertIndex === currentItems.length) {
        newItems.forEach(draggedItem => {
          updatedItems.push(draggedItem);
        });
      }
      setPeopleSelectedItems(updatedItems);
    }
  };

  const _itemsAreEqual = (item1?: any, item2?: any): boolean => {
    return item1?.key === item2?.key;
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

  const SEPARATOR_REGEX = new RegExp(';|,|\\n|\u000A', 'g');
  const splitPasteInputIntoRecipientStrings = (inputText: string) =>
    inputText
      .split(SEPARATOR_REGEX)
      .map((token: string) => token.trim())
      .filter((token: string) => !!token);

  const _onInputChange = (filterText: string, composing?: boolean, resultItemsList?: IPersonaProps[]): void => {
    const allPeople = people;
    const suggestions = allPeople.filter((item: IPersonaProps) => _startsWith(item.text || '', filterText));
    const suggestionList = suggestions.map(item => {
      return { item: item, isSelected: false, key: item.key } as IFloatingSuggestionItem<IPersonaProps>;
    });

    const updatedItems: IPersonaProps[] = [];
    const currentItems: IPersonaProps[] = [...peopleSelectedItems];

    const lastCharIndex = filterText.length - 1;
    const lastChar = filterText[lastCharIndex];
    for (let i = 0; i < currentItems.length; i++) {
      const item = currentItems[i];
      updatedItems.push(item);
    }

    if (lastChar === ';' || lastChar === ',') {
      const pastedText = splitPasteInputIntoRecipientStrings(filterText);
      pastedText.forEach(itemText => {
        let result;
        const extractedText = itemText.substring(0, lastCharIndex);
        // We need to do an exact match

        allPeople.forEach((item: IPersonaProps) => {
          if (item.text?.toLowerCase() === extractedText.toLowerCase()) {
            result = item;
          }
        });

        if (result && resultItemsList) {
          resultItemsList.push(result);
          updatedItems.push(result);
        }
        setPeopleSelectedItems(updatedItems);
      });
    } else {
      // We want to show top 5 results
      setPeopleSuggestions(suggestionList.splice(0, 5));
    }
  };

  function _startsWith(text: string, filterText: string): boolean {
    return text.toLowerCase().indexOf(filterText.toLowerCase()) === 0;
  }

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
  } as IFloatingPeopleSuggestionsProps;

  const selectedPeopleListProps = {
    selectedItems: [...peopleSelectedItems],
    removeButtonAriaLabel: 'Remove',
    onItemsRemoved: _onItemsRemoved,
    getItemCopyText: _getItemsCopyText,
    serializeItemsForDrag: _serializeItemsForDrag,
    deserializeItemsFromDrop: _deserializeItemsFromDrop,
    dropItemsAt: _dropItemsAt,
    itemsAreEqual: _itemsAreEqual,
  } as ISelectedPeopleListProps<IPersonaProps>;

  const inputProps = {
    'aria-label': 'Add people',
  } as IInputProps;

  return (
    <>
      <UnifiedPeoplePicker
        selectedItemsListProps={selectedPeopleListProps}
        floatingSuggestionProps={floatingPeoplePickerProps}
        inputProps={inputProps}
        // eslint-disable-next-line react/jsx-no-bind
        onInputChange={_onInputChange}
        // eslint-disable-next-line react/jsx-no-bind
        onPaste={_onPaste}
        customClipboardType="recipients"
      />
    </>
  );
};

export const DoubleUnifiedPeoplePickerExample = (): JSX.Element => {
  return (
    <>
      To: <UnifiedPeoplePickerExample />
      CC: <UnifiedPeoplePickerExample />
    </>
  );
};
