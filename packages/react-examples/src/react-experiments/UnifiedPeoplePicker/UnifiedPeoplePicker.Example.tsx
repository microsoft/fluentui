import * as React from 'react';
import {
  IFloatingSuggestionItemProps,
  IFloatingSuggestionItem,
  IFloatingPeopleSuggestionsProps,
} from '@fluentui/react-experiments/lib/FloatingPeopleSuggestionsComposite';
import { UnifiedPeoplePicker } from '@fluentui/react-experiments/lib/UnifiedPeoplePicker';
import { IPersonaProps } from '@fluentui/react/lib/Persona';
import { mru, people, groupOne, groupTwo } from '@fluentui/example-data';
import { ISelectedPeopleListProps } from '@fluentui/react-experiments/lib/SelectedItemsList';
import { IInputProps } from '@fluentui/react';
import { useConst } from '@fluentui/react-hooks';
import { SelectedPersona, ISelectedItemProps } from '@fluentui/react-experiments/lib/SelectedItemsList';

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
  {
    key: '6',
    id: '6',
    displayText: 'Suggestion 6',
    item: people[5],
    isSelected: false,
    showRemoveButton: true,
  },
  {
    key: '7',
    id: '7',
    displayText: 'Suggestion 7',
    item: people[6],
    isSelected: false,
    showRemoveButton: true,
  },
] as IFloatingSuggestionItem<IPersonaProps>[];

export const UnifiedPeoplePickerExample = (): JSX.Element => {
  const [peopleSuggestions, setPeopleSuggestions] = React.useState<IFloatingSuggestionItemProps<IPersonaProps>[]>([
    ..._suggestions,
  ]);

  const [peopleSelectedItems, setPeopleSelectedItems] = React.useState<IPersonaProps[]>([people[40]]);

  const ref = React.useRef<any>();

  const suggestionProps = useConst(() => {
    return {
      // uncomment below section to see any example of a selectable header item
      /*headerItemsProps: [
        {
          renderItem: () => {
            return <>People Suggestions</>;
          },
          shouldShow: () => {
            return peopleSuggestions.length > 0;
          },
          onExecute: () => {
            alert('People suggestions selected');
          },
        },
      ],*/
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

  const _replaceItem = (newItem: IPersonaProps | IPersonaProps[], index: number): void => {
    const newItemsArray = !Array.isArray(newItem) ? [newItem] : newItem;

    if (index >= 0) {
      const newItems: IPersonaProps[] = [...peopleSelectedItems];
      newItems.splice(index, 1, ...newItemsArray);
      setPeopleSelectedItems(newItems);
    }
  };

  /**
   * Build a custom selected item capable of being edited with a dropdown and
   * capable of editing
   */
  const SelectedItem = (props: ISelectedItemProps<IPersonaProps>) => (
    <SelectedPersona canExpand={_canExpandItem} getExpandedItems={_getExpandedGroupItems} {...props} />
  );

  const _getExpandedGroupItems = async (item: IPersonaProps): Promise<IPersonaProps[]> => {
    switch (item.text) {
      case 'Group One':
        return groupOne;
      case 'Group Two':
        return groupTwo;
      default:
        return [];
    }
  };

  const _canExpandItem = (item: IPersonaProps): boolean => {
    return item.text !== undefined && item.text.indexOf('Group') !== -1;
  };

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
    pickerSuggestionsProps: suggestionProps,
  } as IFloatingPeopleSuggestionsProps;

  const selectedPeopleListProps = {
    selectedItems: [...peopleSelectedItems],
    onRenderItem: SelectedItem,
    removeButtonAriaLabel: 'Remove',
    onItemsRemoved: _onItemsRemoved,
    getItemCopyText: _getItemsCopyText,
    dropItemsAt: _dropItemsAt,
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
        autofillDragDropEnabled={false}
      />
    </>
  );
};
