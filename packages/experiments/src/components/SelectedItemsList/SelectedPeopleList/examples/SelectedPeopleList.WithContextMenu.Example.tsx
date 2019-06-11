import * as React from 'react';

import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { IPersonaProps } from 'office-ui-fabric-react/lib/Persona';
import { people } from '@uifabric/experiments/lib/components/SelectedItemsList/SelectedPeopleList/examples/PeopleExampleData';
import {
  SelectedPeopleList,
  IUncontrolledSelectedPeopleList
} from '@uifabric/experiments/lib/components/SelectedItemsList/SelectedPeopleList/SelectedPeopleList';
import { Selection } from 'office-ui-fabric-react/lib/Selection';
import { SelectedPersona } from '@uifabric/experiments/lib/components/SelectedItemsList/SelectedPeopleList/Items/SelectedPersona';
import { ItemWithContextMenu } from '@uifabric/experiments/lib/components/SelectedItemsList/Items/ItemWithContextMenu';
import { copyToClipboard } from '@uifabric/experiments/lib/utilities/copyToClipboard';
import { TriggerOnContextMenu } from '@uifabric/experiments/lib/components/SelectedItemsList/Items/TriggerOnContextMenu';

export class SelectedPeopleListWithContextMenuExample extends React.Component<{}> {
  private _selectionList: IUncontrolledSelectedPeopleList;
  private selection: Selection = new Selection({ onSelectionChanged: () => this._onSelectionChange() });

  /**
   * Build a custom selected item capable of being edited with a dropdown and
   * capable of editing
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
          isControlled={false}
          key={'normal'}
          removeButtonAriaLabel={'Remove'}
          defaultSelectedItems={[people[40]]}
          componentRef={this._setComponentRef}
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
