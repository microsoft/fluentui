import * as React from 'react';
import { PrimaryButton } from '@fluentui/react/lib/compat/Button';
import { IPersonaProps, IPersona } from '@fluentui/react/lib/Persona';
import { people, mru } from '@fluentui/example-data';
import {
  SelectedPeopleList,
  SelectedPersona,
  TriggerOnContextMenu,
  ItemWithContextMenu,
  EditableItem,
  DefaultEditingItem,
  EditingItemInnerFloatingPickerProps,
} from '@fluentui/react-experiments/lib/SelectedItemsList';
import {
  FloatingPeopleSuggestions,
  IFloatingSuggestionItem,
} from '@fluentui/react-experiments/lib/FloatingPeopleSuggestionsComposite';

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

export const SelectedPeopleListWithEditInContextMenuExample = (): JSX.Element => {
  const [currentSelectedItems, setCurrentSelectedItems] = React.useState<IPersonaProps[]>([people[40]]);

  /**
   * Build a custom selected item capable of being edited with a dropdown and capable of editing
   */
  const EditableItemWithContextMenu = EditableItem({
    editingItemComponent: DefaultEditingItem({
      getEditingItemText: (persona: IPersonaProps) => persona.text || '',
      onRenderFloatingPicker: (props: EditingItemInnerFloatingPickerProps<IPersonaProps>) => (
        <FloatingPeopleSuggestions {...props} isSuggestionsVisible={true} suggestions={_suggestions} />
      ),
    }),
    itemComponent: ItemWithContextMenu<IPersona>({
      menuItems: (item, onTrigger) => [
        {
          key: 'remove',
          text: 'Remove',
          onClick: () => {
            _onItemsRemoved([item]);
          },
        },
        {
          key: 'copy',
          text: 'Copy',
          onClick: () => {
            _copyToClipboard(_getCopyItemsText([item]));
          },
        },
        {
          key: 'edit',
          text: 'Edit',
          onClick: () => onTrigger && onTrigger(),
        },
      ],
      itemComponent: TriggerOnContextMenu(SelectedPersona),
    }),
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

  const _getCopyItemsText = (items: IPersonaProps[]): string => {
    let copyText = '';
    items.forEach((item: IPersonaProps, index: number) => {
      copyText += item.text;

      if (index < items.length - 1) {
        copyText += ', ';
      }
    });

    return copyText;
  };

  return (
    <div className={'ms-BasePicker-text'}>
      Right click any persona to open the context menu
      <br />
      <PrimaryButton text="Add another item" onClick={_onAddItemButtonClicked} />
      <div>
        <SelectedPeopleList
          key={'normal'}
          removeButtonAriaLabel={'Remove'}
          selectedItems={[...currentSelectedItems]}
          onRenderItem={EditableItemWithContextMenu}
          onItemsRemoved={_onItemsRemoved}
          replaceItem={_replaceItem}
        />
      </div>
    </div>
  );
};
