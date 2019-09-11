import * as React from 'react';

import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Selection } from 'office-ui-fabric-react/lib/Selection';
import { IPersonaProps } from 'office-ui-fabric-react/lib/Persona';
import { people } from '@uifabric/example-data';
import {
  SelectedPeopleList,
  ISelectedPeopleList,
  SelectedPersona,
  TriggerOnContextMenu,
  ItemWithContextMenu,
  EditableItem,
  DefaultEditingItem,
  EditingItemInnerFloatingPickerProps,
  copyToClipboard
} from '@uifabric/experiments/lib/SelectedItemsList';
import { FloatingPeopleSuggestions } from '@uifabric/experiments/lib/FloatingPeopleSuggestions';
import { SuggestionsStore } from '@uifabric/experiments/lib/FloatingSuggestions';

export interface IPeopleSelectedItemsListExampleState {
  currentSelectedItems: IPersonaProps[];
  controlledComponent: boolean;
}

export class SelectedPeopleListWithEditInContextMenuExample extends React.Component<{}, IPeopleSelectedItemsListExampleState> {
  private _selectionList: ISelectedPeopleList;
  private selection: Selection = new Selection({ onSelectionChanged: () => this._onSelectionChange() });

  // Used to resolve suggestions on the editableItem
  private model = new ExampleSuggestionsModel<IPersonaProps>(people);
  private suggestionsStore = new SuggestionsStore<IPersonaProps>();

  /**
   * Build a custom selected item capable of being edited with a dropdown and capable of editing
   */
  private EditableItemWithContextMenu = EditableItem({
    editingItemComponent: DefaultEditingItem({
      getEditingItemText: (persona: IPersonaProps) => persona.text || '',
      onRenderFloatingPicker: (props: EditingItemInnerFloatingPickerProps<IPersonaProps>) => (
        <FloatingPeopleSuggestions
          {...props}
          suggestionsStore={this.suggestionsStore}
          onResolveSuggestions={this.model.resolveSuggestions}
        />
      )
    }),
    itemComponent: ItemWithContextMenu({
      menuItems: (item, onTrigger) => [
        {
          key: 'remove',
          text: 'Remove',
          onClick: () => {
            this._selectionList.removeItems([item]);
          }
        },
        {
          key: 'copy',
          text: 'Copy',
          onClick: () => copyToClipboard(this._getCopyItemsText([item]))
        },
        {
          key: 'edit',
          text: 'Edit',
          onClick: () => onTrigger && onTrigger()
        }
      ],
      itemComponent: TriggerOnContextMenu(SelectedPersona)
    })
  });

  public render(): JSX.Element {
    return (
      <div className={'ms-BasePicker-text'}>
        Right click any persona to open the context menu
        <br />
        <PrimaryButton text="Add another item" onClick={this._onAddItemButtonClicked} />
        {this._renderExtendedPicker()}
      </div>
    );
  }
  private _renderExtendedPicker(): JSX.Element {
    return (
      <div>
        <SelectedPeopleList
          key={'normal'}
          removeButtonAriaLabel={'Remove'}
          defaultSelectedItems={[people[40]]}
          ref={this._setComponentRef}
          selection={this.selection}
          onRenderItem={this.EditableItemWithContextMenu}
        />
      </div>
    );
  }

  private _setComponentRef = (component: ISelectedPeopleList): void => {
    this._selectionList = component;
  };

  private _onAddItemButtonClicked = (): void => {
    const randomPerson = people[Math.floor(Math.random() * (people.length - 1))];
    this._selectionList.addItems([randomPerson]);
  };

  private _onSelectionChange(): void {
    this.forceUpdate();
  }

  private _getCopyItemsText(items: IPersonaProps[]): string {
    let copyText = '';
    items.forEach((item: IPersonaProps, index: number) => {
      copyText += item.text;

      if (index < items.length - 1) {
        copyText += ', ';
      }
    });

    return copyText;
  }
}

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
