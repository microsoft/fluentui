import * as React from 'react';

import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { IPersonaProps } from 'office-ui-fabric-react/lib/Persona';
import { people } from './PeopleExampleData';
import { SelectedPeopleList, ISelectedPeopleList } from '../SelectedPeopleList';
import { Selection } from 'office-ui-fabric-react/lib/Selection';
import { SelectedPersona } from '../Items/SelectedPersona';
import { ItemWithContextMenu } from '../../Items/ItemWithContextMenu';
import { copyToClipboard } from '../../utils/copyToClipboard';
import { EditableItem } from '../../Items/EditableItem';
import { DefaultEditingItem } from '../../Items/subcomponents/DefaultEditingItem';
import { EditingItemInnerFloatingPickerProps } from '../../Items/subcomponents/DefaultEditingItem';
import { FloatingPeopleSuggestions } from '../../../FloatingSuggestions/FloatingPeopleSuggestions/FloatingPeopleSuggestions';
import { SuggestionsStore } from '../../../FloatingSuggestions/Suggestions/SuggestionsStore';
import { ExampleSuggestionsModel } from './ExampleSuggestionsModel';
import { TriggerOnContextMenu } from '../../Items/TriggerOnContextMenu';

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
