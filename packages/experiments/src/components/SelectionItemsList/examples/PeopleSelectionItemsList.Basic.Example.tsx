/* tslint:disable */
import * as React from 'react';
/* tslint:enable */
import {
  BaseComponent,
  autobind
} from 'office-ui-fabric-react/lib/Utilities';
import { PeopleItemSelectionList } from '../PeopleItemList/PeopleItemList';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { people, groupOne, groupTwo } from './PeopleExampleData';
import '../../../../../office-ui-fabric-react/src/components/Pickers/PeoplePicker/examples/PeoplePicker.Types.Example.scss';
import { IBaseSelectionItemsListProps } from '../BaseSelectionItemsList.Props';
import { IExtendedPersonaProps, IPeopleSelectionItemProps } from '../PeopleItemList/PeopleItemList';

export class PeopleSelectionItemsListExample extends BaseComponent<IBaseSelectionItemsListProps<IExtendedPersonaProps>, {}> {
  private _selectionList: PeopleItemSelectionList;
  private index: number;

  public render(): JSX.Element {
    return (
      <div>
        { this._renderExtendedPicker() }
        <PrimaryButton
          text='Add another item'
          onClick={ this._onAddItemButtonClicked }
        />
      </div>
    );
  }

  private _renderExtendedPicker(): JSX.Element {
    return (
      <PeopleItemSelectionList
        className={ 'ms-PeoplePicker' }
        key={ 'normal' }
        removeButtonAriaLabel={ 'Remove' }
        defaultSelectedItems={ [people[40]] }
        componentRef={ this._setComponentRef }
        onCopyItems={ this._onCopyItems }
        onExpandGroup={ this._onExpandItem }
        copyMenuItemText={ 'Copy' }
        removeMenuItemText={ 'Remove' }
      />
    );
  }

  @autobind
  private _setComponentRef(component: PeopleItemSelectionList): void {
    this._selectionList = component;
  }

  @autobind
  private _onAddItemButtonClicked(): void {
    if (this._selectionList) {
      if (!this.index) {
        this.index = 0;
      }
      this._selectionList.addItem(people[this.index]);
      this.index++;
    }
  }

  @autobind
  private _onExpandItem(item: IPeopleSelectionItemProps): void {
    this._selectionList.onExpandItem(item, this._getExpandedGroupItems(item as any));
  }

  private _onCopyItems(items: IExtendedPersonaProps[]): string {
    let copyText = '';
    items.forEach((item: IExtendedPersonaProps, index: number) => {
      copyText += item.primaryText;

      if (index < items.length - 1) {
        copyText += ', ';
      }
    });

    return copyText;
  }

  private _getExpandedGroupItems(item: IExtendedPersonaProps): IExtendedPersonaProps[] {
    switch (item.primaryText) {
      case 'Group One':
        return groupOne;
      case 'Group Two':
        return groupTwo;
      default:
        return [];
    }
  }
}