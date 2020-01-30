import * as React from 'react';

import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { IPersonaProps } from 'office-ui-fabric-react/lib/Persona';
import { Selection } from 'office-ui-fabric-react/lib/Selection';
import { people } from '@uifabric/example-data';
import {
  SelectedPeopleList,
  ISelectedPeopleList,
  SelectedPersona,
  ItemWithContextMenu,
  TriggerOnContextMenu,
  copyToClipboard
} from '@uifabric/experiments/lib/SelectedItemsList';

export interface IPeopleSelectedItemsListExampleState {
  currentSelectedItems: IPersonaProps[];
  controlledComponent: boolean;
}

export class SelectedPeopleListWithContextMenuExample extends React.Component<{}, IPeopleSelectedItemsListExampleState> {
  private _selectionList: ISelectedPeopleList;
  private selection: Selection = new Selection({ onSelectionChanged: () => this._onSelectionChange() });

  /**
   * Build a custom selected item capable of being edited with a dropdown and
   * capable of eidting
   */
  private SelectedItem = ItemWithContextMenu({
    menuItems: item => [
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
      }
    ],
    itemComponent: TriggerOnContextMenu(SelectedPersona)
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
