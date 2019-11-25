import * as React from 'react';

import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Selection } from 'office-ui-fabric-react/lib/Selection';
import { IPersonaProps } from 'office-ui-fabric-react/lib/Persona';
import { people, groupOne, groupTwo } from '@uifabric/example-data';
import { SelectedPeopleList, ISelectedPeopleList, SelectedPersona, ISelectedItemProps } from '@uifabric/experiments/lib/SelectedItemsList';

export interface IPeopleSelectedItemsListExampleState {
  currentSelectedItems: IPersonaProps[];
  controlledComponent: boolean;
}

export class SelectedPeopleListWithGroupExpandExample extends React.Component<{}, IPeopleSelectedItemsListExampleState> {
  private _selectionList: ISelectedPeopleList;
  private selection: Selection = new Selection({ onSelectionChanged: () => this._onSelectionChange() });

  public render(): JSX.Element {
    return (
      <div className={'ms-BasePicker-text'}>
        Click the '+' icon to the left of the group to expand it into a number of personas
        <br />
        <PrimaryButton text="Add another item" onClick={this._onAddItemButtonClicked} />
        {this._renderExtendedPicker()}
      </div>
    );
  }

  /**
   * Build a custom selected item capable of being edited with a dropdown and
   * capable of eidting
   */
  private SelectedItem = (props: ISelectedItemProps<IPersonaProps>) => (
    <SelectedPersona canExpand={this._canExpandItem} getExpandedItems={this._getExpandedGroupItems} {...props} />
  );

  private _renderExtendedPicker(): JSX.Element {
    return (
      <div>
        <SelectedPeopleList
          key={'normal'}
          removeButtonAriaLabel={'Remove'}
          defaultSelectedItems={[people[40]]}
          ref={this._setComponentRef}
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
