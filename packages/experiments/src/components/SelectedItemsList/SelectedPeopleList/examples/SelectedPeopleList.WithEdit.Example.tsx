import * as React from 'react';

import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { people } from './PeopleExampleData';
import { SelectedPeopleList, ISelectedPeopleList } from '../SelectedPeopleList';
import { Selection } from 'office-ui-fabric-react/lib/Selection';
import { IPersonaProps } from 'office-ui-fabric-react/lib/Persona';
import { SelectedPersona } from '../Items/SelectedPersona';
import { EditableItem } from '../../Items/EditableItem';
import { DefaultEditingItem } from '../../Items/subcomponents/DefaultEditingItem';
import { FloatingPeopleSuggestions } from '../../../FloatingSuggestions/FloatingPeopleSuggestions/FloatingPeopleSuggestions';
import { SuggestionsStore } from '../../../FloatingSuggestions/Suggestions/SuggestionsStore';
import { EditingItemInnerFloatingPickerProps } from '../../Items/subcomponents/DefaultEditingItem';
import { ExampleSuggestionsModel } from './ExampleSuggestionsModel';
import { TriggerOnContextMenu } from '../../Items/TriggerOnContextMenu';

export interface IPeopleSelectedItemsListExampleState {
  currentSelectedItems: IPersonaProps[];
  controlledComponent: boolean;
}

export class SelectedPeopleListWithEditExample extends React.Component<{}, IPeopleSelectedItemsListExampleState> {
  private _selectionList: ISelectedPeopleList;
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
      getEditingItemText: persona => persona.text || '',
      onRenderFloatingPicker: (props: EditingItemInnerFloatingPickerProps<IPersonaProps>) => (
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
          key={'normal'}
          ref={this._setComponentRef}
          removeButtonAriaLabel={'Remove'}
          defaultSelectedItems={[people[40]]}
          selection={this.selection}
          onRenderItem={this.SelectedItem}
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
}
