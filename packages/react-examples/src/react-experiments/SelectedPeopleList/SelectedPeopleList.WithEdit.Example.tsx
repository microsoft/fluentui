import * as React from 'react';
import { PrimaryButton } from '@fluentui/react/lib/Button';
import { IPersonaProps, IPersona } from '@fluentui/react/lib/Persona';
import { people } from '@fluentui/example-data';
import {
  SelectedPeopleList,
  SelectedPersona,
  TriggerOnContextMenu,
  EditableItem,
  DefaultEditingItem,
  EditingItemInnerFloatingPickerProps,
} from '@fluentui/react-experiments/lib/SelectedItemsList';
import {
  FloatingPeopleSuggestions,
  IFloatingSuggestionItem,
  IFloatingSuggestionItemProps,
} from '@fluentui/react-experiments/lib/FloatingPeopleSuggestionsComposite';

export const SelectedPeopleListWithEditExample = (): JSX.Element => {
  const [currentSelectedItems, setCurrentSelectedItems] = React.useState<IPersonaProps[]>([people[40]]);
  const [editingIndex, setEditingIndex] = React.useState(-1);

  const _startsWith = (text: string, filterText: string): boolean => {
    return text.toLowerCase().indexOf(filterText.toLowerCase()) === 0;
  };

  const _getSuggestions = (value: string): IFloatingSuggestionItemProps<IPersonaProps>[] => {
    const allPeople = people;
    const suggestions = allPeople.filter((item: IPersonaProps) => _startsWith(item.text || '', value));
    const suggestionList = suggestions.map(item => {
      return { item: item, isSelected: false, key: item.key } as IFloatingSuggestionItem<IPersonaProps>;
    });
    return suggestionList;
  };

  /**
   * Build a custom selected item capable of being edited when the item is right clicked
   */
  const SelectedItem = EditableItem<IPersonaProps>({
    itemComponent: TriggerOnContextMenu(SelectedPersona),
    editingItemComponent: DefaultEditingItem({
      getEditingItemText: persona => persona.text || '',
      getSuggestions: _getSuggestions,
      onRenderFloatingPicker: (props: EditingItemInnerFloatingPickerProps<IPersonaProps>) => (
        <FloatingPeopleSuggestions {...props} isSuggestionsVisible={true} />
      ),
    }),
    getIsEditing: (item, index) => index === editingIndex,
    onEditingStarted: (item, index) => setEditingIndex(index),
    onEditingCompleted: () => setEditingIndex(-1),
  });

  const _onAddItemButtonClicked = React.useCallback(() => {
    const randomPerson = people[Math.floor(Math.random() * (people.length - 1))];
    setCurrentSelectedItems([...currentSelectedItems, randomPerson]);
  }, [currentSelectedItems]);

  const _onItemsRemoved = React.useCallback(
    (items: IPersona[]): void => {
      const currentSelectedItemsCopy = [...currentSelectedItems];
      items.forEach(item => {
        const indexToRemove = currentSelectedItemsCopy.indexOf(item);
        currentSelectedItemsCopy.splice(indexToRemove, 1);
        setCurrentSelectedItems([...currentSelectedItemsCopy]);
      });
    },
    [currentSelectedItems],
  );

  const _replaceItem = React.useCallback(
    (newItem: IPersonaProps | IPersona[], index: number): void => {
      const newItemsArray = !Array.isArray(newItem) ? [newItem] : newItem;

      if (index >= 0) {
        const newItems: IPersonaProps[] = [...currentSelectedItems];
        newItems.splice(index, 1, ...newItemsArray);
        setCurrentSelectedItems(newItems);
      }
    },
    [currentSelectedItems],
  );

  return (
    <>
      <div className={'ms-BasePicker-text'}>
        Right click any persona to edit it
        <br />
        <PrimaryButton text="Add another item" onClick={_onAddItemButtonClicked} />
        <div>
          <SelectedPeopleList
            key={'normal'}
            removeButtonAriaLabel={'Remove'}
            selectedItems={[...currentSelectedItems]}
            onRenderItem={SelectedItem}
            onItemsRemoved={_onItemsRemoved}
            replaceItem={_replaceItem}
          />
        </div>
      </div>
    </>
  );
};
