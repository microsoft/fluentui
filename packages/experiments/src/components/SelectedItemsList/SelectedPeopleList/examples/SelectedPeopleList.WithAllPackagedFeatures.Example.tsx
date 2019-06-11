import * as React from 'react';

import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { IPersonaProps } from 'office-ui-fabric-react/lib/Persona';
import {
  people,
  groupOne,
  groupTwo
} from '@uifabric/experiments/lib/components/SelectedItemsList/SelectedPeopleList/examples/PeopleExampleData';
import {
  SelectedPeopleList,
  IUncontrolledSelectedPeopleList
} from '@uifabric/experiments/lib/components/SelectedItemsList/SelectedPeopleList/SelectedPeopleList';
import { Selection } from 'office-ui-fabric-react/lib/Selection';
import { SelectedPersona } from '@uifabric/experiments/lib/components/SelectedItemsList/SelectedPeopleList/Items/SelectedPersona';
import { ItemWithContextMenu } from '@uifabric/experiments/lib/components/SelectedItemsList/Items/ItemWithContextMenu';
import { EditableItem } from '@uifabric/experiments/lib/components/SelectedItemsList/Items/EditableItem';
import { DefaultEditingItem } from '@uifabric/experiments/lib/components/SelectedItemsList/Items/subcomponents/DefaultEditingItem';
// tslint:disable-next-line:max-line-length : Export item subcomponents in a way that doesn't inflate the bundle
import { EditingItemInnerFloatingSuggestionsProps } from '@uifabric/experiments/lib/components/SelectedItemsList/Items/subcomponents/DefaultEditingItem';
// tslint:disable-next-line:max-line-length : move FloatingPeopleSuggestions up a level
import { FloatingPeopleSuggestions } from '@uifabric/experiments/lib/components/FloatingSuggestions/FloatingPeopleSuggestions/FloatingPeopleSuggestions';
import { SuggestionsStore } from '@uifabric/experiments/lib/components/FloatingSuggestions/Suggestions/SuggestionsStore';
// tslint:disable-next-line:max-line-length : move people example data up the tree
import { ExampleSuggestionsModel } from '@uifabric/experiments/lib/components/SelectedItemsList/SelectedPeopleList/examples/ExampleSuggestionsModel';
import { TriggerOnContextMenu } from '@uifabric/experiments/lib/components/SelectedItemsList/Items/TriggerOnContextMenu';
import { copyToClipboard } from '@uifabric/experiments/lib/utilities/copyToClipboard';

export interface IPeopleSelectedItemsListExampleState {
  currentSelectedItems: IPersonaProps[];
  controlledComponent: boolean;
}

export class SelectedPeopleListWithAllPackagedFeaturesExample extends React.Component<{}, IPeopleSelectedItemsListExampleState> {
  private _selectionList: IUncontrolledSelectedPeopleList;
  private selection: Selection = new Selection({ onSelectionChanged: () => this._onSelectionChange() });

  // Used to resolve suggestions on the editableItem
  private model = new ExampleSuggestionsModel<IPersonaProps>(people);
  private suggestionsStore = new SuggestionsStore<IPersonaProps>();

  /**
   * Build a custom selected item capable of being edited with a dropdown and capable of editing, with group expansion
   */
  private EditableExpandableItemWithContextMenuAndGroupExpand = EditableItem({
    editingItemComponent: DefaultEditingItem({
      onRemoveItem: persona => this._selectionList.removeItems([persona]),
      getEditingItemText: (persona: IPersonaProps) => persona.text || '',
      onRenderFloatingSuggestions: (props: EditingItemInnerFloatingSuggestionsProps<IPersonaProps>) => (
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
      itemComponent: TriggerOnContextMenu(props => (
        <SelectedPersona {...props} canExpand={this._canExpandItem} getExpandedItems={this._getExpandedGroupItems} />
      ))
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
          isControlled={false}
          key={'normal'}
          removeButtonAriaLabel={'Remove'}
          defaultSelectedItems={[people[40]]}
          componentRef={this._setComponentRef}
          selection={this.selection}
          onRenderItem={this.EditableExpandableItemWithContextMenuAndGroupExpand}
        />
      </div>
    );
  }

  private _setComponentRef = (component: IUncontrolledSelectedPeopleList): void => {
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

  private _getExpandedGroupItems(item: IPersonaProps): IPersonaProps[] {
    switch (item.text) {
      case 'Group One':
        return groupOne;
      case 'Group Two':
        return groupTwo;
      default:
        return [];
    }
  }

  private _canExpandItem(item: IPersonaProps): boolean {
    return item.text !== undefined && item.text.indexOf('Group') !== -1;
  }
}
