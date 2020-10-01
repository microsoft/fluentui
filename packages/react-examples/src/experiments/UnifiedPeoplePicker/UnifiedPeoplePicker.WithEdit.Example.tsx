import * as React from 'react';
import {
  IFloatingSuggestionItemProps,
  IFloatingSuggestionItem,
  IFloatingPeopleSuggestionsProps,
} from '@uifabric/experiments/lib/FloatingPeopleSuggestionsComposite';
import { UnifiedPeoplePicker } from '@uifabric/experiments/lib/UnifiedPeoplePicker';
import { IPersonaProps, IPersona } from '@fluentui/react/lib/Persona';
import { mru, people } from '@uifabric/example-data';
import {
  ISelectedPeopleListProps,
  SelectedPersona,
  TriggerOnContextMenu,
  EditableItem,
  DefaultEditingItem,
  EditingItemInnerFloatingPickerProps,
} from '@uifabric/experiments/lib/SelectedItemsList';
import { IInputProps } from '@fluentui/react';
import { SuggestionsStore } from '@uifabric/experiments/lib/FloatingSuggestions';
import { FloatingPeopleSuggestions } from '@uifabric/experiments/lib/FloatingPeopleSuggestions';

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

  const ref = React.useRef<any>();

  // Used to resolve suggestions on the editableItem
  const model = new ExampleSuggestionsModel<IPersonaProps>(people);
  const suggestionsStore = new SuggestionsStore<IPersonaProps>();

  /**
   * Build a custom selected item capable of being edited when the item is right clicked
   */
  const SelectedItem = EditableItem({
    itemComponent: TriggerOnContextMenu(SelectedPersona),
    editingItemComponent: DefaultEditingItem({
      getEditingItemText: persona => persona.text || '',
      onRenderFloatingPicker: (props: EditingItemInnerFloatingPickerProps<IPersonaProps>) => (
        <FloatingPeopleSuggestions
          {...props}
          suggestionsStore={suggestionsStore}
          onResolveSuggestions={model.resolveSuggestions}
        />
      ),
    }),
  });

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

  const _replaceItem = (newItem: IPersonaProps | IPersona[], index: number): void => {
    const newItemsArray = !Array.isArray(newItem) ? [newItem] : newItem;

    if (index >= 0) {
      const newItems: IPersonaProps[] = [...peopleSelectedItems];
      newItems.splice(index, 1, ...newItemsArray);
      setPeopleSelectedItems(newItems);
    }
  };

  const _onInputChange = (filterText: string): void => {
    // Clear the input if the user types a semicolon or comma
    // This is meant to be an example of using the forward ref,
    // feel free to comment out if it impacts your testing
    const lastCharIndex = filterText.length - 1;
    const lastChar = filterText[lastCharIndex];
    if (lastChar === ';' || lastChar === ',') {
      ref.current?.clearInput();
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
    dropItemsAt: _dropItemsAt,
    onRenderItem: SelectedItem,
    replaceItem: _replaceItem,
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
      />
    </>
  );
};

type IBaseExampleType = {
  text?: string;
  name?: string;
};

class ExampleSuggestionsModel<T extends IBaseExampleType> {
  private suggestionsData: T[];

  public constructor(data: T[]) {
    this.suggestionsData = [...data];
  }

  public resolveSuggestions = (filterText: string, currentItems?: T[]): Promise<T[]> => {
    let filteredItems: T[] = [];
    if (filterText) {
      filteredItems = this._filterItemsByText(filterText);
      filteredItems = this._removeDuplicates(filteredItems, currentItems || []);
    }

    return this._convertResultsToPromise(filteredItems);
  };

  public removeSuggestion(item: T) {
    const index = this.suggestionsData.indexOf(item);
    console.log('removing', item, 'at', index);
    if (index !== -1) {
      this.suggestionsData.splice(index, 1);
    }
  }

  private _filterItemsByText(filterText: string): T[] {
    return this.suggestionsData.filter((item: T) => {
      const itemText = item.text || item.name;
      return itemText ? this._doesTextStartWith(itemText, filterText) : false;
    });
  }

  private _doesTextStartWith(text: string, filterText: string): boolean {
    return text.toLowerCase().indexOf(filterText.toLowerCase()) === 0;
  }

  private _removeDuplicates(items: T[], possibleDupes: T[]): T[] {
    return items.filter((item: T) => !this._listContainsItem(item, possibleDupes));
  }

  private _listContainsItem(item: T, Items: T[]): boolean {
    if (!Items || !Items.length || Items.length === 0) {
      return false;
    }
    return Items.filter((i: T) => (i.text || i.name) === (item.text || item.name)).length > 0;
  }

  private _convertResultsToPromise(results: T[]): Promise<T[]> {
    return new Promise<T[]>(resolve => setTimeout(() => resolve(results), 150));
  }
}
