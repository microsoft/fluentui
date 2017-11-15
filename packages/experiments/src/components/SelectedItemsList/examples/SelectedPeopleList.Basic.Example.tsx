/* tslint:disable */
import * as React from 'react';
/* tslint:enable */
import {
  BaseComponent,
  autobind
} from 'office-ui-fabric-react/lib/Utilities';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { people, groupOne, groupTwo } from '../../ExtendedPicker';
import 'office-ui-fabric-react/lib/components/Pickers/PeoplePicker/examples/PeoplePicker.Types.Example.scss';
import { IBaseSelectedItemsListProps } from '../BaseSelectedItemsList.types';
import { IExtendedPersonaProps, SelectedPeopleList } from '../SelectedPeopleList/SelectedPeopleList';

export class PeopleSelectedItemsListExample extends BaseComponent<IBaseSelectedItemsListProps<IExtendedPersonaProps>, {}> {
  private _selectionList: SelectedPeopleList;
  private index: number;

  public render(): JSX.Element {
    return (
      <div className={ 'ms-BasePicker-text' }>
        <PrimaryButton
          text='Add another item'
          onClick={ this._onAddItemButtonClicked }
        />
        { this._renderExtendedPicker() }
      </div>
    );
  }

  private _renderExtendedPicker(): JSX.Element {
    return (
      <SelectedPeopleList
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
  private _setComponentRef(component: SelectedPeopleList): void {
    this._selectionList = component;
  }

  @autobind
  private _onAddItemButtonClicked(): void {
    if (this._selectionList) {
      if (!this.index) {
        this.index = 0;
      }
      this._selectionList.addItems([people[this.index]]);
      this.index++;
    }
  }

  @autobind
  private _onExpandItem(item: IExtendedPersonaProps): void {
    // tslint:disable-next-line:no-any
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
