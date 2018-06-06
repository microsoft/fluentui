/* tslint:disable */
import * as React from 'react';
/* tslint:enable */
import { BaseComponent } from 'office-ui-fabric-react/lib/Utilities';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { people, groupOne, groupTwo } from '../../ExtendedPicker';
import 'office-ui-fabric-react/lib/components/pickers/PeoplePicker/examples/PeoplePicker.Types.Example.scss';
import {
  IExtendedPersonaProps,
  SelectedPeopleList,
  ISelectedPeopleItemProps
} from '../SelectedPeopleList/SelectedPeopleList';
import { ExtendedSelectedItem } from '../SelectedPeopleList/Items/ExtendedSelectedItem';
import { Selection } from 'office-ui-fabric-react/lib/Selection';

import * as stylesImport from './SelectedPeopleList.Basic.Example.scss';
const styles: any = stylesImport;

export class PeopleSelectedItemsListExample extends BaseComponent<{}, {}> {
  private _selectionList: SelectedPeopleList;
  private index: number;
  private selection: Selection = new Selection({ onSelectionChanged: () => this._onSelectionChange() });

  public render(): JSX.Element {
    return (
      <div className={ 'ms-BasePicker-text' }>
        <PrimaryButton text="Add another item" onClick={ this._onAddItemButtonClicked } />
        { this._renderExtendedPicker() }
      </div>
    );
  }

  private _renderExtendedPicker(): JSX.Element {
    return (
      <div className={ styles.container }>
        <SelectedPeopleList
          key={ 'normal' }
          removeButtonAriaLabel={ 'Remove' }
          defaultSelectedItems={ [people[40]] }
          componentRef={ this._setComponentRef }
          onCopyItems={ this._onCopyItems }
          onExpandGroup={ this._onExpandItem }
          copyMenuItemText={ 'Copy' }
          removeMenuItemText={ 'Remove' }
          selection={ this.selection }
          onRenderItem={ this._onRenderItem }
        />
      </ div>
    );
  }

  private _onRenderItem = (props: ISelectedPeopleItemProps): JSX.Element => {
    return <ExtendedSelectedItem { ...props } />;
  }

  private _setComponentRef = (component: SelectedPeopleList): void => {
    this._selectionList = component;
  };

  private _onAddItemButtonClicked = (): void => {
    if (this._selectionList) {
      if (!this.index) {
        this.index = 0;
      }
      this._selectionList.addItems([people[this.index]]);
      this.index++;
    }
  };

  private _onExpandItem = (item: IExtendedPersonaProps): void => {
    // tslint:disable-next-line:no-any
    this._selectionList.replaceItem(item, this._getExpandedGroupItems(item as any));
  };

  private _onSelectionChange(): void {
    this.forceUpdate();
  }

  private _onCopyItems(items: IExtendedPersonaProps[]): string {
    let copyText = '';
    items.forEach((item: IExtendedPersonaProps, index: number) => {
      copyText += item.text;

      if (index < items.length - 1) {
        copyText += ', ';
      }
    });

    return copyText;
  }

  private _getExpandedGroupItems(item: IExtendedPersonaProps): IExtendedPersonaProps[] {
    switch (item.text) {
      case 'Group One':
        return groupOne;
      case 'Group Two':
        return groupTwo;
      default:
        return [];
    }
  }
}
