import * as React from 'react';

import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { people } from '@uifabric/experiments/lib/components/SelectedItemsList/SelectedPeopleList/examples/PeopleExampleData';
import {
  SelectedPeopleList,
  IUncontrolledSelectedPeopleList
} from '@uifabric/experiments/lib/components/SelectedItemsList/SelectedPeopleList/SelectedPeopleList';
import { Selection } from 'office-ui-fabric-react/lib/Selection';
import { IPersonaProps } from 'office-ui-fabric-react/lib/Persona';
import { SelectedPersona } from '@uifabric/experiments/lib/components/SelectedItemsList/SelectedPeopleList/Items/SelectedPersona';
import { EditableItem } from '@uifabric/experiments/lib/components/SelectedItemsList/Items/EditableItem';
import { DefaultEditingItem } from '@uifabric/experiments/lib/components/SelectedItemsList/Items/subcomponents/DefaultEditingItem';
// tslint:disable-next-line:max-line-length : move FloatingPeopleSuggestions up a level
import { FloatingPeopleSuggestions } from '@uifabric/experiments/lib/components/FloatingSuggestions/FloatingPeopleSuggestions/FloatingPeopleSuggestions';
import { SuggestionsStore } from '@uifabric/experiments/lib/components/FloatingSuggestions/Suggestions/SuggestionsStore';
// tslint:disable-next-line:max-line-length : move FloatingPeopleSuggestions up a level
import { EditingItemInnerFloatingSuggestionsProps } from '@uifabric/experiments/lib/components/SelectedItemsList/Items/subcomponents/DefaultEditingItem';
// tslint:disable-next-line:max-line-length : move people example data up the tree
import { ExampleSuggestionsModel } from '@uifabric/experiments/lib/components/SelectedItemsList/SelectedPeopleList/examples/ExampleSuggestionsModel';
import { TriggerOnContextMenu } from '@uifabric/experiments/lib/components/SelectedItemsList/Items/TriggerOnContextMenu';

export interface IPeopleSelectedItemsListExampleState {
  currentSelectedItems: IPersonaProps[];
  controlledComponent: boolean;
}

export class SelectedPeopleListWithEditExample extends React.Component<{}, IPeopleSelectedItemsListExampleState> {
  private _selectionList: IUncontrolledSelectedPeopleList;
  private selection: Selection = new Selection({ onSelectionChanged: () => this._onSelectionChange() });

  // Used to resolve suggestions on the editableItem
  private model = new ExampleSuggestionsModel<IPersonaProps>(people);
  private suggestionsStore = new SuggestionsStore<IPersonaProps>();

  /**
   * Build a custom selected item capable of being edited when the item is right clicked
   */
  private SelectedItem = EditableItem({
    itemComponent: TriggerOnContextMenu(SelectedPersona),
    editingItemComponent: DefaultEditingItem({
      onRemoveItem: persona => this._selectionList.removeItems([persona]),
      getEditingItemText: persona => persona.text || '',
      onRenderFloatingSuggestions: (props: EditingItemInnerFloatingSuggestionsProps<IPersonaProps>) => (
        <FloatingPeopleSuggestions
          {...props}
          suggestionsStore={this.suggestionsStore}
          onResolveSuggestions={this.model.resolveSuggestions}
        />
      )
    })
  });

  public render(): JSX.Element {
    return (
      <div className={'ms-BasePicker-text'}>
        Right click any persona to edit it
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
          componentRef={this._setComponentRef}
          removeButtonAriaLabel={'Remove'}
          defaultSelectedItems={[people[40]]}
          selection={this.selection}
          onRenderItem={this.SelectedItem}
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
}
