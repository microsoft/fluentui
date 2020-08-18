import * as React from 'react';
import {
  IFloatingSuggestionItemProps,
  IFloatingSuggestionItem,
  IFloatingPeopleSuggestionsProps,
} from '@uifabric/experiments/lib/FloatingPeopleSuggestionsComposite';
import { UnifiedPeoplePicker } from '@uifabric/experiments/lib/UnifiedPeoplePicker';
import { IPersonaProps } from 'office-ui-fabric-react/lib/Persona';
import { mru, people } from '@uifabric/example-data';
import { ISelectedPeopleListProps } from '@uifabric/experiments/lib/SelectedItemsList';
import { IInputProps } from 'office-ui-fabric-react';

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

  const _getSerializedItems = (items: IPersonaProps[]): string => {
    return _getItemsCopyText(items); // Do we want to combine these or have them be separate?
  };

  const _getDeserializedItems = (input: string): IPersonaProps[] => {
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

      currentItems.forEach(item => {
        const currentIndex = currentItems.indexOf(item);
        // If this is the insert before index, insert the dragged items, then the current item
        if (currentIndex === insertIndex) {
          newItems.forEach(draggedItem => {
            updatedItems.push(draggedItem);
          });
          updatedItems.push(item);
        } else if (!indicesToRemove.includes(currentIndex)) {
          // only insert items into the new list that are not being dragged
          updatedItems.push(item);
        }
      });
      setPeopleSelectedItems(updatedItems);
    }
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

  const _onInputChange = (filterText: string): void => {
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
    getSerializedItems: _getSerializedItems,
    getDeserializedItems: _getDeserializedItems,
    dropItemsAt: _dropItemsAt,
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
