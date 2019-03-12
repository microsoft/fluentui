import * as React from 'react';

import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { people, groupOne, groupTwo } from '../../../ExtendedPicker';
import { IExtendedPersonaProps, SelectedPeopleList, ISelectedPeopleItemProps } from '../SelectedPeopleList/SelectedPeopleList';
import { ExtendedSelectedItem } from '../SelectedPeopleList/Items/ExtendedSelectedItem';
import { Selection } from 'office-ui-fabric-react/lib/Selection';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';

export interface IPeopleSelectedItemsListExampleState {
  currentSelectedItems: IExtendedPersonaProps[];
  controlledComponent: boolean;
}

export class PeopleSelectedItemsListExample extends React.Component<{}, IPeopleSelectedItemsListExampleState> {
  private _selectionList: SelectedPeopleList;
  private index: number;
  private selection: Selection = new Selection({ onSelectionChanged: () => this._onSelectionChange() });

  constructor(props: {}) {
    super(props);

    this.state = {
      controlledComponent: false,
      currentSelectedItems: [people[40]]
    };
  }

  public render(): JSX.Element {
    return (
      <div className={'ms-BasePicker-text'}>
        <Toggle label="Controlled component" defaultChecked={false} onChange={this._toggleControlledComponent} />
        <PrimaryButton text="Add another item" onClick={this._onAddItemButtonClicked} />
        {this._renderExtendedPicker()}
      </div>
    );
  }

  private _toggleControlledComponent = (ev: React.MouseEvent<HTMLElement>, toggleState: boolean): void => {
    this.setState({ controlledComponent: toggleState });
  };

  private _renderExtendedPicker(): JSX.Element {
    return (
      <div>
        <SelectedPeopleList
          key={'normal'}
          removeButtonAriaLabel={'Remove'}
          defaultSelectedItems={[people[40]]}
          selectedItems={this.state.controlledComponent ? this.state.currentSelectedItems : undefined}
          componentRef={this._setComponentRef}
          onCopyItems={this._onCopyItems}
          onExpandGroup={this._onExpandItem}
          copyMenuItemText={'Copy'}
          removeMenuItemText={'Remove'}
          selection={this.selection}
          onRenderItem={this._onRenderItem}
          onItemDeleted={this.state.controlledComponent ? this._onItemDeleted : undefined}
        />
      </div>
    );
  }

  private _onRenderItem = (props: ISelectedPeopleItemProps): JSX.Element => {
    return <ExtendedSelectedItem {...props} />;
  };

  private _setComponentRef = (component: SelectedPeopleList): void => {
    this._selectionList = component;
  };

  private _onAddItemButtonClicked = (): void => {
    if (this._selectionList) {
      if (!this.index) {
        this.index = 0;
      }

      if (this.state.controlledComponent) {
        this.setState({ currentSelectedItems: [...this.state.currentSelectedItems, people[this.index]] });
      } else {
        this._selectionList.addItems([people[this.index]]);
      }
      this.index++;
    }
  };

  private _onItemDeleted = (item: IExtendedPersonaProps): void => {
    const indexToRemove = this.state.currentSelectedItems.indexOf(item);
    this.setState({
      currentSelectedItems: this.state.currentSelectedItems
        .slice(0, indexToRemove)
        .concat(this.state.currentSelectedItems.slice(indexToRemove + 1))
    });
  };

  private _onExpandItem = (item: IExtendedPersonaProps): void => {
    if (this.state.controlledComponent) {
      const indexToExpand = this.state.currentSelectedItems.indexOf(item);
      this.setState({
        currentSelectedItems: this.state.currentSelectedItems
          .slice(0, indexToExpand)
          .concat(this._getExpandedGroupItems(item as any))
          .concat(this.state.currentSelectedItems.slice(indexToExpand + 1))
      });
    } else {
      this._selectionList.replaceItem(item, this._getExpandedGroupItems(item as any));
    }
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
