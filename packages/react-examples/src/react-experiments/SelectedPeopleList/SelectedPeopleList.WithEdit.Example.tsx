import * as React from 'react';
import { PrimaryButton } from '@fluentui/react/lib/compat/Button';
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
import { FloatingPeopleSuggestions } from '@fluentui/react-experiments/lib/FloatingPeopleSuggestions';
import { SuggestionsStore } from '@fluentui/react-experiments/lib/FloatingSuggestions';

export const SelectedPeopleListWithEditExample = (): JSX.Element => {
  const [currentSelectedItems, setCurrentSelectedItems] = React.useState<IPersonaProps[]>([people[40]]);

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
